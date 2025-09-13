
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductGrid from "@/components/ProductGrid";
import CategoryCircles from "@/components/CategoryCircles";
import ProvinceCircles from "@/components/ProvinceCircles";
import { Search, Filter } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
}

interface ProductFilters {
  search?: string;
  category?: string;
  location?: string;
  limit?: number;
}

async function fetchProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, value.toString());
    }
  });
  
  const response = await fetch(`/api/products?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export default function Products() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [searchInput, setSearchInput] = useState("");

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  });

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchInput }));
  };

  const handleFilterChange = (key: keyof ProductFilters, value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: value === "all" ? undefined : value 
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🛒 محصولات و خدمات
        </h1>
        <p className="text-lg text-white/80">
          محصولات و خدمات مختلف را از سراسر افغانستان کشف کنید
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="flex flex-col space-y-6 w-full">
          {/* Categories */}
          <CategoryCircles />
          
          {/* Provinces */}
          <ProvinceCircles />
        </div>

        {/* Products Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <Card className="glassmorphism border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-5 w-5" />
                جستجو و فیلتر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="flex gap-2">
                <Input
                  placeholder="جستجو در محصولات..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    دسته‌بندی
                  </label>
                  <Select value={filters.category || "all"} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه دسته‌ها</SelectItem>
                      <SelectItem value="خرید و فروش">خرید و فروش</SelectItem>
                      <SelectItem value="خودرو">خودرو</SelectItem>
                      <SelectItem value="املاک">املاک</SelectItem>
                      <SelectItem value="الکترونیک">الکترونیک</SelectItem>
                      <SelectItem value="خدمات">خدمات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    موقعیت
                  </label>
                  <Select value={filters.location || "all"} onValueChange={(value) => handleFilterChange('location', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="انتخاب ولایت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه ولایات</SelectItem>
                      <SelectItem value="کابل">کابل</SelectItem>
                      <SelectItem value="هرات">هرات</SelectItem>
                      <SelectItem value="قندهار">قندهار</SelectItem>
                      <SelectItem value="مزار شریف">مزار شریف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products */}
          {isLoading ? (
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
              <p className="mt-4">در حال بارگذاری محصولات...</p>
            </div>
          ) : error ? (
            <Card className="glassmorphism border-red-500/50">
              <CardContent className="p-6 text-center">
                <p className="text-red-400">خطا در بارگذاری محصولات</p>
              </CardContent>
            </Card>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
