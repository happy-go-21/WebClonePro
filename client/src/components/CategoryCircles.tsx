import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Category } from "@shared/schema";

export default function CategoryCircles() {
  const [, setLocation] = useLocation();
  
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleCategoryClick = (categoryName: string) => {
    setLocation(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  if (isLoading) {
    return (
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
          دسته‌بندی‌های محبوب
        </h2>
        <div className="flex gap-6 overflow-x-auto p-4 scrollbar-hide">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="w-36 h-36 rounded-full glassmorphism animate-pulse flex-shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
        دسته‌بندی‌های محبوب
      </h2>
      
      <div className="flex gap-6 overflow-x-auto p-4 scrollbar-hide">
        {categories?.map((category) => (
          <div 
            key={category.id}
            className="circle-gradient morph-hover shimmer w-36 h-36 rounded-full flex flex-col items-center justify-center text-white font-bold cursor-pointer shadow-2xl border-2 border-white/20 flex-shrink-0 relative overflow-hidden golden-border"
            onClick={() => handleCategoryClick(category.name)}
            data-testid={`circle-category-${category.id}`}
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <span className="text-lg text-center">{category.name}</span>
            {(category.count || 0) > 0 && (
              <span className="text-xs mt-1 opacity-80">({category.count})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
