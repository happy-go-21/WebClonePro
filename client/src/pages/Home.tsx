import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import MainHeader from "@/components/MainHeader";
import CategoryCircles from "@/components/CategoryCircles";
import ProvinceCircles from "@/components/ProvinceCircles";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: latestAd } = useQuery<Product | null>({
    queryKey: ["/api/latest-ad"],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedLocation) params.set('location', selectedLocation);
    
    setLocation(`/products?${params.toString()}`);
  };

  return (
    <>
      <MainHeader />
      
      {/* منوی اصلی */}
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
          منوی اصلی
        </h2>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/" 
            className="glassmorphism p-4 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-sm flex items-center justify-center no-underline min-w-32"
            data-testid="link-home"
          >
            🏠 خانه
          </Link>
          <Link 
            href="/products" 
            className="glassmorphism p-4 rounded-lg text-center text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 golden-border text-sm flex items-center justify-center no-underline min-w-32"
            data-testid="link-products"
          >
            🛍️ محصولات
          </Link>
        </div>
      </div>

      {/* جستجو */}
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
          جستجو
        </h2>
        
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-center">
          <input 
            type="text" 
            placeholder="جستجوی محصولات..."
            className="flex-1 min-w-64 px-4 py-3 rounded-lg glassmorphism text-white placeholder-white/70 border-white/30 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search"
          />
          
          <select 
            className="px-4 py-3 rounded-lg glassmorphism text-white border-white/30 focus:border-white/50 focus:outline-none min-w-40"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            data-testid="select-category"
          >
            <option value="">همه دسته‌ها</option>
            <option value="املاک">املاک</option>
            <option value="خودرو">خودرو</option>
            <option value="الکترونیکی">الکترونیکی</option>
            <option value="لوازم خانگی">لوازم خانگی</option>
            <option value="لباس مردانه">لباس مردانه</option>
            <option value="لباس زنانه">لباس زنانه</option>
            <option value="لباس کودکان">لباس کودکان</option>
            <option value="طلا و جواهرات">طلا و جواهرات</option>
            <option value="کتاب و آموزش">کتاب و آموزش</option>
            <option value="لوازم کودک">لوازم کودک</option>
            <option value="استخدام">استخدام</option>
            <option value="خدمات">خدمات</option>
            <option value="میوه‌جات">میوه‌جات</option>
            <option value="مواد غذایی">مواد غذایی</option>
            <option value="ورزشی">ورزشی</option>
            <option value="سرگرمی">سرگرمی</option>
          </select>
          
          <select 
            className="px-4 py-3 rounded-lg glassmorphism text-white border-white/30 focus:border-white/50 focus:outline-none min-w-32"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            data-testid="select-location"
          >
            <option value="">همه شهرها</option>
            <option value="کابل">کابل</option>
            <option value="هرات">هرات</option>
            <option value="بلخ">بلخ</option>
            <option value="قندهار">قندهار</option>
            <option value="ننگرهار">ننگرهار</option>
            <option value="غزنی">غزنی</option>
            <option value="بامیان">بامیان</option>
            <option value="فراه">فراه</option>
            <option value="کندز">کندز</option>
            <option value="بدخشان">بدخشان</option>
          </select>
          
          <button 
            type="submit"
            className="px-6 py-3 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 golden-border"
            data-testid="button-search"
          >
            🔍 جستجو
          </button>
        </form>
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
