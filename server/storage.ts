import { type User, type InsertUser, type Category, type Province, type Product, type InsertProduct, type Conversation, type InsertConversation, type Message, type InsertMessage, users, categories, provinces, products, conversations, messages } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, ilike, count, sql } from "drizzle-orm";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

export interface IStorage {
  // Session store for auth
  sessionStore: any;
  
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  
  // Province methods
  getProvinces(): Promise<Province[]>;
  getProvince(id: string): Promise<Province | undefined>;
  
  // Product methods
  getProducts(filters?: { search?: string; category?: string; location?: string; limit?: number }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct & { userId: string }): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined>;
  getLatestProduct(): Promise<Product | null>;
  
  // Conversation methods
  getConversations(userId: string): Promise<Conversation[]>;
  getConversation(id: string): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  
  // Message methods
  getMessages(conversationId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessagesAsRead(conversationId: string, userId: string): Promise<void>;
  
  // Product count management
  updateProductCounts(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    // Initialize session store using PostgreSQL
    const PostgresSessionStore = connectPgSimple(session);
    this.sessionStore = new PostgresSessionStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getProducts(filters?: { search?: string; category?: string; location?: string; limit?: number }): Promise<Product[]> {
    let conditions = [eq(products.isActive, true)];
    
    if (filters?.search) {
      // Search in both title and description with case-insensitive matching
      const searchTerm = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(products.title, searchTerm),
          ilike(products.description, searchTerm)
        )
      );
    }
    
    if (filters?.category) {
      conditions.push(eq(products.category, filters.category));
    }
    
    if (filters?.location) {
      conditions.push(eq(products.location, filters.location));
    }
    
    let query = db.select().from(products).where(and(...conditions)).orderBy(desc(products.createdAt));
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    return await query;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct & { userId: string }): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values([product])
      .returning();
    
    // Update product counts after creating a new product
    await this.updateProductCounts();
    
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }

  async getLatestProduct(): Promise<Product | null> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(desc(products.createdAt))
      .limit(1);
    return product || null;
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    return await db
      .select()
      .from(conversations)
      .where(or(eq(conversations.buyerId, userId), eq(conversations.sellerId, userId)))
      .orderBy(desc(conversations.createdAt));
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    const [conversation] = await db.select().from(conversations).where(eq(conversations.id, id));
    return conversation || undefined;
  }

  async createConversation(conversation: InsertConversation): Promise<Conversation> {
    const [newConversation] = await db
      .insert(conversations)
      .values([conversation])
      .returning();
    return newConversation;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values([message])
      .returning();
    return newMessage;
  }

  async markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
    await db
      .update(messages)
      .set({ isRead: true })
      .where(
        and(
          eq(messages.conversationId, conversationId),
          eq(messages.senderId, userId)
        )
      );
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.name);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getProvinces(): Promise<Province[]> {
    return await db.select().from(provinces).orderBy(provinces.name);
  }

  async getProvince(id: string): Promise<Province | undefined> {
    const [province] = await db.select().from(provinces).where(eq(provinces.id, id));
    return province || undefined;
  }

  async updateProductCounts(): Promise<void> {
    // Update category product counts
    const categoryCountsQuery = db
      .select({
        category: products.category,
        count: count(products.id).as('count')
      })
      .from(products)
      .where(eq(products.isActive, true))
      .groupBy(products.category);
    
    const categoryCounts = await categoryCountsQuery;
    
    for (const categoryCount of categoryCounts) {
      await db
        .update(categories)
        .set({ productCount: Number(categoryCount.count) })
        .where(eq(categories.name, categoryCount.category));
    }

    // Update province product counts
    const provinceCountsQuery = db
      .select({
        location: products.location,
        count: count(products.id).as('count')
      })
      .from(products)
      .where(eq(products.isActive, true))
      .groupBy(products.location);
    
    const provinceCounts = await provinceCountsQuery;
    
    for (const provinceCount of provinceCounts) {
      await db
        .update(provinces)
        .set({ productCount: Number(provinceCount.count) })
        .where(eq(provinces.name, provinceCount.location));
    }
  }
}

export const storage = new DatabaseStorage();
