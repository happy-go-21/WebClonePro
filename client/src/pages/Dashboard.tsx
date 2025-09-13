import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import MessagesSection from "@/components/MessagesSection";
import { useLanguage } from "@/hooks/useLanguage";
import type { User } from "@shared/schema";

export default function Dashboard() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("messages");

  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="bg-card rounded-lg p-8 shadow-md border border-border">
          <i className="fas fa-lock text-4xl text-muted-foreground mb-4"></i>
          <h2 className="text-xl font-semibold text-foreground mb-4">{t("authRequired")}</h2>
          <p className="text-muted-foreground mb-6">{t("pleaseSignIn")}</p>
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors no-underline"
            data-testid="button-go-home"
          >
            {t("goHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Dashboard Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-user text-primary-foreground"></i>
              </div>
              <div>
                <h3 className="font-semibold text-foreground" data-testid="user-name">
                  {user.username}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid="user-phone">
                  {user.phoneNumber || t("noPhoneNumber")}
                </p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection("messages")}
                className={`flex items-center space-x-3 p-3 rounded-md w-full text-left transition-colors ${
                  activeSection === "messages"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
                data-testid="nav-messages"
              >
                <i className="fas fa-envelope"></i>
                <span>{t("messages")}</span>
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">3</span>
              </button>
              
              <button
                onClick={() => setActiveSection("orders")}
                className={`flex items-center space-x-3 p-3 rounded-md w-full text-left transition-colors ${
                  activeSection === "orders"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
                data-testid="nav-orders"
              >
                <i className="fas fa-shopping-bag"></i>
                <span>{t("myOrders")}</span>
              </button>
              
              <button
                onClick={() => setActiveSection("products")}
                className={`flex items-center space-x-3 p-3 rounded-md w-full text-left transition-colors ${
                  activeSection === "products"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
                data-testid="nav-products"
              >
                <i className="fas fa-store"></i>
                <span>{t("myProducts")}</span>
              </button>
              
              <button
                onClick={() => setActiveSection("favorites")}
                className={`flex items-center space-x-3 p-3 rounded-md w-full text-left transition-colors ${
                  activeSection === "favorites"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
                data-testid="nav-favorites"
              >
                <i className="fas fa-heart"></i>
                <span>{t("favorites")}</span>
              </button>
              
              <button
                onClick={() => setActiveSection("settings")}
                className={`flex items-center space-x-3 p-3 rounded-md w-full text-left transition-colors ${
                  activeSection === "settings"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
                data-testid="nav-settings"
              >
                <i className="fas fa-cog"></i>
                <span>{t("settings")}</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {activeSection === "messages" && <MessagesSection />}
          
          {activeSection === "orders" && (
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold mb-6">{t("myOrders")}</h2>
              <div className="text-center py-12">
                <i className="fas fa-shopping-bag text-6xl text-muted-foreground mb-4"></i>
                <h3 className="text-lg font-medium text-foreground mb-2">{t("noOrders")}</h3>
                <p className="text-muted-foreground">{t("noOrdersDesc")}</p>
              </div>
            </div>
          )}
          
          {activeSection === "products" && (
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{t("myProducts")}</h2>
                <Link 
                  href="/post-ad"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors no-underline"
                  data-testid="button-add-product"
                >
                  <i className="fas fa-plus mr-2"></i>
                  {t("addProduct")}
                </Link>
              </div>
              <div className="text-center py-12">
                <i className="fas fa-store text-6xl text-muted-foreground mb-4"></i>
                <h3 className="text-lg font-medium text-foreground mb-2">{t("noProducts")}</h3>
                <p className="text-muted-foreground">{t("noProductsDesc")}</p>
              </div>
            </div>
          )}
          
          {activeSection === "favorites" && (
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold mb-6">{t("favorites")}</h2>
              <div className="text-center py-12">
                <i className="fas fa-heart text-6xl text-muted-foreground mb-4"></i>
                <h3 className="text-lg font-medium text-foreground mb-2">{t("noFavorites")}</h3>
                <p className="text-muted-foreground">{t("noFavoritesDesc")}</p>
              </div>
            </div>
          )}
          
          {activeSection === "settings" && (
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold mb-6">{t("settings")}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-foreground mb-3">{t("accountSettings")}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">{t("username")}</span>
                      <span className="text-sm font-medium">{user.username}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">{t("phoneNumber")}</span>
                      <span className="text-sm font-medium">{user.phoneNumber || t("notSet")}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6">
                  <h3 className="font-medium text-foreground mb-3">{t("preferences")}</h3>
                  <div className="text-center py-8">
                    <i className="fas fa-cog text-4xl text-muted-foreground mb-4"></i>
                    <p className="text-muted-foreground">{t("settingsComingSoon")}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
