import type { Product } from "@shared/schema";
import { useLanguage } from "@/hooks/useLanguage";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { t } = useLanguage();

  return (
    <div 
      className="product-card bg-card rounded-lg shadow-md overflow-hidden border border-border transition-all duration-300 cursor-pointer"
      onClick={onClick}
      data-testid={`product-card-${product.id}`}
    >
      {product.images && product.images.length > 0 ? (
        <img 
          src={product.images[0]} 
          alt={product.title}
          className="w-full h-48 object-cover"
          data-testid={`product-image-${product.id}`}
        />
      ) : (
        <div className="w-full h-48 bg-muted flex items-center justify-center">
          <i className="fas fa-image text-4xl text-muted-foreground"></i>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2" data-testid={`product-title-${product.id}`}>
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2" data-testid={`product-location-${product.id}`}>
          📍 {product.location}
        </p>
        <p className="text-lg font-bold text-primary" data-testid={`product-price-${product.id}`}>
          {product.price}
        </p>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2" data-testid={`product-description-${product.id}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded" data-testid={`product-category-${product.id}`}>
            {product.category}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(product.createdAt!).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
