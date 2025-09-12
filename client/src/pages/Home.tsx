import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import MainHeader from "@/components/MainHeader";
import CategoryCircles from "@/components/CategoryCircles";
import ProvinceCircles from "@/components/ProvinceCircles";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: latestAd } = useQuery<Product | null>({
    queryKey: ["/api/latest-ad"],
  });

  return (
    <>
      <MainHeader />
      
      {/* منوی اصلی */}
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
          منوی اصلی
        </h2>
        
        <div className="nav-grid">
          <Link 
            href="/" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-home"
          >
            🏠 خانه
          </Link>
          <Link 
            href="/post-ad" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-post-ad"
          >
            📝 ثبت آگهی
          </Link>
          <Link 
            href="/products" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-products"
          >
            🛍️ محصولات
          </Link>
          <Link 
            href="/products?category=املاک" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-realestate"
          >
            🏘️ املاک
          </Link>
          <Link 
            href="/products?category=خودرو" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-vehicles"
          >
            🚗 خودرو
          </Link>
          <Link 
            href="/products?category=الکترونیکی" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-electronics"
          >
            📱 الکترونیکی
          </Link>
          <Link 
            href="/products?category=لباس مردانه" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-clothing"
          >
            👕 پوشاک
          </Link>
          <Link 
            href="/products?category=لوازم خانگی" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-home-appliances"
          >
            🏠 لوازم خانگی
          </Link>
          <Link 
            href="/products?category=کتاب و آموزش" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-books"
          >
            📚 کتاب
          </Link>
          <Link 
            href="/products?category=لوازم کودک" 
            className="glassmorphism p-3 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-xs flex items-center justify-center no-underline"
            data-testid="link-kids"
          >
            👶 کودک
          </Link>
        </div>
      </div>

      <CategoryCircles />
      <ProvinceCircles />

      {/* آخرین آگهی */}
      {latestAd && (
        <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
            آخرین آگهی
          </h2>
          
          <div className="flex justify-center">
            <div 
              className="glassmorphism rounded-xl p-8 text-center cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 max-w-md w-full golden-border"
              data-testid="card-latest-ad"
            >
              <h3 className="text-2xl font-bold text-white mb-3" data-testid="text-latest-title">
                {latestAd.title}
              </h3>
              <div className="text-xl text-yellow-400 font-bold mb-3" data-testid="text-latest-price">
                {latestAd.price}
              </div>
              <div className="text-gray-300 mb-4" data-testid="text-latest-location">
                📍 {latestAd.location}
              </div>
              <p className="text-gray-200 leading-relaxed" data-testid="text-latest-description">
                {latestAd.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <ProductGrid limit={4} />

      {/* درباره بازار */}
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
          خوش آمدید به بازار افغانستان
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          بزرگترین بازار آنلاین افغانستان که در آن می‌توانید هر چیزی که نیاز دارید پیدا کنید.
          از املاک و وسایل نقلیه گرفته تا لوازم خانگی، الکترونیکی و فرصت‌های شغلی.
        </p>
        <p className="text-gray-300 leading-relaxed">
          با استفاده از سیستم جستجوی پیشرفته و دسته‌بندی‌های کامل، به راحتی آنچه که می‌خواهید پیدا کنید.
        </p>
      </div>

      {/* Footer */}
      <footer className="glassmorphism rounded-xl p-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">درباره ما</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              بازار افغانستان بزرگترین پلتفرم خرید و فروش آنلاین کشور است که خدمات متنوعی در زمینه تجارت الکترونیک ارائه می‌دهد.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-3">تماس با ما</h3>
            <div className="text-gray-300 text-sm space-y-1">
              <div>📞 تلفن: +93 xxx xxx xxx</div>
              <div>📧 ایمیل: info@bazaar-afghanistan.com</div>
              <div>📍 آدرس: کابل، افغانستان</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-3">شبکه‌های اجتماعی</h3>
            <div className="flex justify-center gap-4">
              <a href="#" className="glassmorphism w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 no-underline">📘</a>
              <a href="#" className="glassmorphism w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 no-underline">📸</a>
              <a href="#" className="glassmorphism w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 no-underline">🐦</a>
              <a href="#" className="glassmorphism w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 no-underline">💬</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/30 pt-4">
          <p className="text-gray-400 text-sm">
            © ۲۰۲۴ بازار افغانستان. تمامی حقوق محفوظ است.
          </p>
        </div>
      </footer>
    </>
  );
}
