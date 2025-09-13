import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthModal from "./AuthModal";
import { apiRequest } from "@/lib/queryClient";
import type { User } from "@shared/schema";

export default function Header() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAuthModal, setShowAuthModal] = useState<"login" | "register" | null>(null);

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/user"],
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: t("success"),
        description: t("loggedOut"),
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 no-underline" data-testid="link-home">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-mountain text-primary-foreground text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t("siteName")}</h1>
              <p className="text-xs text-muted-foreground">{t("siteTagline")}</p>
            </div>
          </Link>

          {/* Main Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`nav-link text-foreground hover:text-primary font-medium transition-colors flex items-center space-x-2 no-underline ${location === '/' ? 'text-primary' : ''}`}
              data-testid="nav-home"
            >
              <i className="fas fa-home"></i>
              <span>{t("home")}</span>
            </Link>
            <Link 
              href="/products" 
              className={`nav-link text-foreground hover:text-primary font-medium transition-colors flex items-center space-x-2 no-underline ${location === '/products' ? 'text-primary' : ''}`}
              data-testid="nav-products"
            >
              <i className="fas fa-shopping-bag"></i>
              <span>{t("products")}</span>
            </Link>
            {user && (
              <Link 
                href="/post-ad" 
                className={`nav-link text-foreground hover:text-primary font-medium transition-colors flex items-center space-x-2 no-underline ${location === '/post-ad' ? 'text-primary' : ''}`}
                data-testid="nav-post-ad"
              >
                <i className="fas fa-plus-circle"></i>
                <span>{t("postAd")}</span>
              </Link>
            )}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {user && (
                <Link href="/dashboard" className="relative p-2 text-muted-foreground hover:text-primary transition-colors no-underline" data-testid="button-messages">
                  <i className="fas fa-envelope text-lg"></i>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">3</span>
                </Link>
              )}
              
              <div className="hidden md:flex items-center space-x-2">
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : user ? (
                  <>
                    <Link href="/dashboard" className="px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors no-underline" data-testid="button-dashboard">
                      {t("dashboard")}
                    </Link>
                    <Button 
                      onClick={handleLogout}
                      variant="outline"
                      className="px-4 py-2"
                      data-testid="button-logout"
                    >
                      {t("logout")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline"
                      onClick={() => setShowAuthModal("login")}
                      data-testid="button-sign-in"
                    >
                      {t("signIn")}
                    </Button>
                    <Button 
                      onClick={() => setShowAuthModal("register")}
                      data-testid="button-join-now"
                    >
                      {t("joinNow")}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        mode={showAuthModal} 
        onClose={() => setShowAuthModal(null)} 
      />
    </header>
  );
}
