import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  searchQuery?: string;
  category?: string;
  location?: string;
  limit?: number;
  title?: string;
}

export default function ProductGrid({ 
  searchQuery, 
  category, 
  location, 
  limit,
  title = "محصولات جدید" 
}: ProductGridProps) {
  const params = new URLSearchParams();
  if (searchQuery) params.set('search', searchQuery);
  if (category) params.set('category', category);
  if (location) params.set('location', location);
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products", params.toString()],
  });

  const displayProducts = limit ? products?.slice(0, limit) : products;

  if (isLoading) {
    return (
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glassmorphism rounded-lg p-4 animate-pulse">
              <div className="w-full h-40 bg-white/10 rounded-lg mb-4" />
              <div className="h-4 bg-white/10 rounded mb-2" />
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
          {title}
        </h2>
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">خطا در بارگذاری محصولات</p>
          <p className="text-gray-300 text-sm">لطفاً مجدداً تلاش کنید</p>
        </div>
      </div>
    );
  }

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
          {title}
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-300 mb-4">هیچ محصولی یافت نشد</p>
          <p className="text-gray-400 text-sm">
            {searchQuery || category || location 
              ? "فیلترهای جستجو را تغییر دهید" 
              : "هنوز محصولی ثبت نشده است"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <div 
            key={product.id}
            className="glassmorphism rounded-lg p-4 hover:scale-105 hover:shadow-xl transition-all duration-300 golden-border cursor-pointer"
            data-testid={`card-product-${product.id}`}
          >
            <div className="w-full h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg mb-4 flex items-center justify-center text-4xl">
              {product.category === "املاک" && "🏠"}
              {product.category === "خودرو" && "🚗"}
              {product.category === "الکترونیکی" && "📱"}
              {product.category === "لباس مردانه" && "👔"}
              {product.category === "لباس زنانه" && "👗"}
              {product.category === "لباس کودکان" && "👶"}
              {product.category === "طلا و جواهرات" && "💎"}
              {product.category === "لوازم خانگی" && "🛋️"}
              {product.category === "کتاب و آموزش" && "📚"}
              {product.category === "لوازم کودک" && "🧸"}
              {product.category === "استخدام" && "💼"}
              {product.category === "خدمات" && "🛠️"}
              {product.category === "میوه‌جات" && "🍎"}
              {product.category === "مواد غذایی" && "🥘"}
              {product.category === "ورزشی" && "⚽"}
              {product.category === "سرگرمی" && "🎮"}
            </div>
            <h3 className="text-lg font-bold text-white mb-2" data-testid={`text-title-${product.id}`}>
              {product.title}
            </h3>
            <div className="text-yellow-400 font-bold mb-2" data-testid={`text-price-${product.id}`}>
              {product.price}
            </div>
            <div className="text-gray-300 text-sm mb-2" data-testid={`text-location-${product.id}`}>
              📍 {product.location}
            </div>
            <div className="text-gray-400 text-xs" data-testid={`text-category-${product.id}`}>
              🏷️ {product.category}
            </div>
          </div>
        ))}
      </div>
      
      {limit && products && products.length > limit && (
        <div className="text-center mt-6">
          <button 
            className="glassmorphism px-8 py-3 rounded-lg text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border"
            onClick={() => window.location.href = '/products'}
            data-testid="button-view-all"
          >
            مشاهده همه محصولات
          </button>
        </div>
      )}
    </div>
  );
}
