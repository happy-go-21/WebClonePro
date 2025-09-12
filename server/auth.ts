import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import rateLimit from "express-rate-limit";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

// Generate CSRF token
function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

// Validate CSRF token
function validateCSRFToken(sessionToken: string, requestToken: string): boolean {
  if (!sessionToken || !requestToken) return false;
  return timingSafeEqual(Buffer.from(sessionToken, 'hex'), Buffer.from(requestToken, 'hex'));
}

// CSRF protection middleware
function csrfProtection(req: any, res: any, next: any) {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  // Skip CSRF for login and register (they use rate limiting instead)
  if (req.path === '/api/login' || req.path === '/api/register') {
    return next();
  }
  
  const sessionToken = req.session?.csrfToken;
  const requestToken = req.headers['x-csrf-token'] || req.body._csrf;
  
  if (!validateCSRFToken(sessionToken, requestToken)) {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  
  next();
}

// Rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { message: "تعداد تلاش‌های شما بیش از حد مجاز است. لطفاً بعداً تلاش کنید." },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // don't count successful requests
});

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "development-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax', // CSRF protection
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());
  
  // CSRF protection middleware
  app.use(csrfProtection);
  
  // Generate CSRF token for each session
  app.use((req: any, res, next) => {
    if (!req.session.csrfToken) {
      req.session.csrfToken = generateCSRFToken();
    }
    next();
  });
  
  // CSRF token endpoint
  app.get('/api/csrf-token', (req: any, res) => {
    res.json({ csrfToken: req.session.csrfToken });
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Registration endpoint with rate limiting
  app.post("/api/register", authLimiter, async (req, res, next) => {
    try {
      // Validate request body
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "نام کاربری قبلاً ثبت شده است" });
      }

      // Create user with hashed password
      const user = await storage.createUser({
        ...validatedData,
        password: await hashPassword(validatedData.password),
      });

      // Auto-login after registration with session regeneration
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Regenerate session to prevent fixation attacks
        req.session.regenerate((regenerateErr) => {
          if (regenerateErr) return next(regenerateErr);
          
          // Generate new CSRF token
          req.session.csrfToken = generateCSRFToken();
          
          // Don't send password in response
          const { password, ...userWithoutPassword } = user;
          res.status(201).json(userWithoutPassword);
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "اطلاعات وارد شده نامعتبر است", 
          errors: error.errors 
        });
      }
      next(error);
    }
  });

  // Login endpoint with rate limiting
  app.post("/api/login", authLimiter, (req, res, next) => {
    passport.authenticate("local", (err: any, user: SelectUser, info: any) => {
      if (err) return next(err);
      
      if (!user) {
        return res.status(401).json({ message: "نام کاربری یا رمز عبور اشتباه است" });
      }

      req.login(user, (err) => {
        if (err) return next(err);
        
        // Regenerate session to prevent fixation attacks
        req.session.regenerate((regenerateErr) => {
          if (regenerateErr) return next(regenerateErr);
          
          // Generate new CSRF token
          req.session.csrfToken = generateCSRFToken();
          
          // Don't send password in response
          const { password, ...userWithoutPassword } = user;
          res.status(200).json(userWithoutPassword);
        });
      });
    })(req, res, next);
  });

  // Logout endpoint
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      
      // Destroy session to prevent fixation attacks
      req.session.destroy((destroyErr) => {
        if (destroyErr) return next(destroyErr);
        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: "با موفقیت خارج شدید" });
      });
    });
  });

  // Get current user endpoint
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "وارد نشده‌اید" });
    }
    
    // Don't send password in response
    const { password, ...userWithoutPassword } = req.user!;
    res.json(userWithoutPassword);
  });

  // Change password endpoint
  app.post("/api/change-password", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "وارد نشده‌اید" });
    }

    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "رمز عبور فعلی و جدید ضروری است" });
      }

      // Verify current password
      const user = await storage.getUser(req.user!.id);
      if (!user || !(await comparePasswords(currentPassword, user.password))) {
        return res.status(400).json({ message: "رمز عبور فعلی اشتباه است" });
      }

      // Update password
      await storage.updateUser(user.id, {
        password: await hashPassword(newPassword),
      });

      res.json({ message: "رمز عبور با موفقیت تغییر یافت" });
    } catch (error) {
      next(error);
    }
  });

  // Update user profile endpoint
  app.patch("/api/user", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "وارد نشده‌اید" });
    }

    try {
      const allowedFields = ["phoneNumber"];
      const updates: any = {};
      
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "هیچ فیلدی برای به‌روزرسانی ارسال نشده" });
      }

      const updatedUser = await storage.updateUser(req.user!.id, updates);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "کاربر یافت نشد" });
      }

      // Don't send password in response
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  });
}