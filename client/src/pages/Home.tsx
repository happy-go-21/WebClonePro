import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import CategoryCircles from "@/components/CategoryCircles";
import ProvinceCircles from "@/components/ProvinceCircles";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import type { Product } from "@shared/schema";

export default function Home() {
  const { t } = useLanguage();

  const { data: latestAd } = useQuery<Product | null>({
    queryKey: ["/api/latest-ad"],
  });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 rounded-xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t("heroTitle1")}
            <span className="text-primary block">{t("heroTitle2")}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="px-8 py-3" data-testid="button-explore-products">
                <i className="fas fa-search mr-2"></i>
                {t("exploreProducts")}
              </Button>
            </Link>
            <Link href="/post-ad">
              <Button variant="outline" size="lg" className="px-8 py-3" data-testid="button-start-selling">
                <i className="fas fa-store mr-2"></i>
                {t("startSelling")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CategoryCircles />

      {/* Featured Products */}
      <ProductGrid limit={4} title={t("featuredProducts")} />

      {/* Latest Ad */}
      {latestAd && (
        <section className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            {t("latestAd")}
          </h2>
          
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 text-center max-w-md w-full border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-3" data-testid="text-latest-title">
                {latestAd.title}
              </h3>
              <div className="text-xl text-primary font-bold mb-3" data-testid="text-latest-price">
                {latestAd.price}
              </div>
              <div className="text-muted-foreground mb-4" data-testid="text-latest-location">
                📍 {latestAd.location}
              </div>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-latest-description">
                {latestAd.description}
              </p>
            </div>
          </div>
        </section>
      )}

      <ProvinceCircles />

      {/* About Section */}
      <section className="bg-card rounded-xl p-8 shadow-md border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
          {t("aboutTitle")}
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>{t("aboutDescription1")}</p>
          <p>{t("aboutDescription2")}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card rounded-xl p-8 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">{t("aboutUs")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footerDescription")}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">{t("contactUs")}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>📞 {t("phone")}: +93 xxx xxx xxx</div>
              <div>📧 {t("email")}: info@afghan-bazaar.com</div>
              <div>📍 {t("address")}: {t("addressText")}</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">{t("socialMedia")}</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 {t("siteName")}. {t("allRightsReserved")}
          </p>
        </div>
      </footer>
    </div>
  );
}
