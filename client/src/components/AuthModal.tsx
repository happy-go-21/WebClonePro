import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { apiRequest } from "@/lib/queryClient";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

interface AuthModalProps {
  mode: "login" | "register" | null;
  onClose: () => void;
}

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      phoneNumber: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await apiRequest("POST", "/api/login", data);
      return response.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: t("success"),
        description: t("loggedIn"),
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: t("error"),
        description: error.message || t("loginFailed"),
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      const response = await apiRequest("POST", "/api/register", data);
      return response.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: t("success"),
        description: t("accountCreated"),
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: t("error"),
        description: error.message || t("registrationFailed"),
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleLogin = (data: LoginForm) => {
    setIsSubmitting(true);
    loginMutation.mutate(data);
  };

  const handleRegister = (data: RegisterForm) => {
    setIsSubmitting(true);
    registerMutation.mutate(data);
  };

  return (
    <Dialog open={mode !== null} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]" data-testid="auth-modal">
        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? t("signIn") : t("joinNow")}
          </DialogTitle>
          <DialogDescription>
            {mode === "login" 
              ? t("enterCredentialsToSignIn") 
              : t("createAccountToGetStarted")
            }
          </DialogDescription>
        </DialogHeader>

        {mode === "login" ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("username")}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t("enterUsername")} 
                        {...field}
                        data-testid="input-login-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={t("enterPassword")} 
                        {...field}
                        data-testid="input-login-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                  data-testid="button-login-cancel"
                >
                  {t("cancel")}
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1"
                  data-testid="button-login-submit"
                >
                  {isSubmitting ? t("signingIn") : t("signIn")}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("username")}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t("enterUsername")} 
                        {...field}
                        data-testid="input-register-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={t("enterPassword")} 
                        {...field}
                        data-testid="input-register-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phoneNumber")} ({t("optional")})</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t("enterPhoneNumber")} 
                        {...field}
                        data-testid="input-register-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                  data-testid="button-register-cancel"
                >
                  {t("cancel")}
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1"
                  data-testid="button-register-submit"
                >
                  {isSubmitting ? t("creatingAccount") : t("createAccount")}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}