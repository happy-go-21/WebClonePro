import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import type { Province } from "@shared/schema";

export default function ProvinceCircles() {
  const { t } = useLanguage();

  const { data: provinces = [], isLoading } = useQuery<Province[]>({
    queryKey: ['/api/provinces'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t("exploreByProvince")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-4 text-center animate-pulse relative">
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("exploreByProvince")}</h2>
        <div className="max-h-96 overflow-y-auto border border-border rounded-lg p-4 bg-card">
          <div className="flex flex-col space-y-3">
            {provinces.map((province) => (
              <Link
                key={province.id}
                href={`/products?location=${encodeURIComponent(province.name)}`}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer no-underline relative"
                data-testid={`province-${province.id}`}
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full ml-3"></div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{province.name}</h3>
                    <p className="text-sm text-muted-foreground">{province.productCount} {t("productsText")}</p>
                  </div>
                </div>
                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {province.productCount}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
