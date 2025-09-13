import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductGrid from "@/components/ProductGrid";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import type { Category, Province } from "@shared/schema";

export default function Products() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [, setCurrentLocation] = useLocation();

  // Fetch categories and provinces from API
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: provinces = [], isLoading: provincesLoading } = useQuery<Province[]>({
    queryKey: ['/api/provinces'],
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    
    setSearchQuery(params.get('search') || '');
    setCategory(params.get('category') || '');
    setLocationFilter(params.get('location') || '');
    setSelectedCategory(params.get('category') || 'all');
    setSelectedLocation(params.get('location') || 'all');
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedLocation && selectedLocation !== 'all') params.set('location', selectedLocation);
    
    setCurrentLocation(`/products?${params.toString()}`);
  };

  const handleApplyFilters = () => {
    // Apply additional filters like price range and sorting
    handleSearch(new Event('submit') as any);
  };

  let title = t("allProducts");
  if (category && locationFilter) {
    title = `${category} ${t("in")} ${locationFilter}`;
  } else if (category) {
    title = `${t("category")}: ${category}`;
  } else if (locationFilter) {
    title = `${t("productsIn")} ${locationFilter}`;
  } else if (searchQuery) {
    title = `${t("searchResults")}: ${searchQuery}`;
  }

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">
          {t("search")}
        </h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Input
              type="text"
              placeholder={t("searchProducts")}
              className="flex-1 min-w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="min-w-40" data-testid="select-category">
                <SelectValue placeholder={t("allCategories")} />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectItem value="all">{t("allCategories")}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="min-w-32" data-testid="select-location">
                <SelectValue placeholder={t("allProvinces")} />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectItem value="all">{t("allProvinces")}</SelectItem>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.name}>{province.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button type="submit" data-testid="button-search">
              <i className="fas fa-search mr-2"></i>
              {t("search")}
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-card rounded-lg p-6 border border-border space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t("filters")}</h3>
            
            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-2 text-foreground">{t("priceRange")}</h4>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder={t("min")}
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  data-testid="input-price-min"
                />
                <Input
                  type="number"
                  placeholder={t("max")}
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  data-testid="input-price-max"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h4 className="font-medium mb-2 text-foreground">{t("sortBy")}</h4>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("newestFirst")}</SelectItem>
                  <SelectItem value="price-low">{t("priceLowToHigh")}</SelectItem>
                  <SelectItem value="price-high">{t("priceHighToLow")}</SelectItem>
                  <SelectItem value="popular">{t("mostPopular")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleApplyFilters} className="w-full" data-testid="button-apply-filters">
              {t("applyFilters")}
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <ProductGrid 
            searchQuery={searchQuery}
            category={category}
            location={locationFilter}
            title={title}
          />
        </div>
      </div>
    </div>
  );
}
