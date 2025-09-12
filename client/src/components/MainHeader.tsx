import { useState } from "react";
import { useLocation } from "wouter";

interface MainHeaderProps {
  onSearch?: (query: string, category?: string, location?: string) => void;
}

export default function MainHeader({ onSearch }: MainHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchQuery, selectedCategory, selectedLocation);
    } else {
      // Navigate to products page with filters
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedCategory) params.set('category', selectedCategory);
      if (selectedLocation) params.set('location', selectedLocation);
      
      setLocation(`/products?${params.toString()}`);
    }
  };

  return (
    <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-center text-white mb-6 text-shadow">
        🏪 بازار افغانستان
      </h1>
      
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
  );
}
