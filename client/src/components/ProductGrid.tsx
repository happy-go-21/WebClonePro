import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import type { Product } from "@shared/schema";
import { useLanguage } from "@/hooks/useLanguage";

interface ProductGridProps {
  searchQuery?: string;
  category?: string;
  location?: string;
  limit?: number;
  title?: string;
}

export default function ProductGrid({ searchQuery, category, location, limit, title }: ProductGridProps) {
  const { t } = useLanguage();

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products", { search: searchQuery, category, location, limit }],
  });

  if (error) {
    return (
      <div className="bg-card rounded-lg p-8 shadow-md border border-border">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-destructive mb-4"></i>
          <h3 className="text-lg font-semibold text-foreground mb-2">{t("error")}</h3>
          <p className="text-muted-foreground">{t("failedToLoadProducts")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-md border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {title || t("featuredProducts")}
        </h2>
        {products.length > 0 && (
          <span className="text-sm text-muted-foreground" data-testid="products-count">
            {products.length} {t("productsFound")}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: limit || 8 }).map((_, index) => (
            <div key={index} className="bg-muted rounded-lg h-64 animate-pulse" data-testid={`skeleton-${index}`} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-search text-6xl text-muted-foreground mb-4"></i>
          <h3 className="text-lg font-semibold text-foreground mb-2">{t("noProductsFound")}</h3>
          <p className="text-muted-foreground">{t("tryDifferentSearch")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onClick={() => {
                // TODO: Navigate to product detail page
                console.log("Product clicked:", product.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
