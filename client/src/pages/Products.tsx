import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import MainHeader from "@/components/MainHeader";
import ProductGrid from "@/components/ProductGrid";

export default function Products() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    
    setSearchQuery(params.get('search') || '');
    setCategory(params.get('category') || '');
    setLocationFilter(params.get('location') || '');
  }, [location]);

  const handleSearch = (query: string, cat?: string, loc?: string) => {
    setSearchQuery(query);
    setCategory(cat || '');
    setLocationFilter(loc || '');
  };

  let title = "همه محصولات";
  if (category && locationFilter) {
    title = `${category} در ${locationFilter}`;
  } else if (category) {
    title = `دسته‌بندی: ${category}`;
  } else if (locationFilter) {
    title = `محصولات در ${locationFilter}`;
  } else if (searchQuery) {
    title = `نتایج جستجو: ${searchQuery}`;
  }

  return (
    <>
      <MainHeader onSearch={handleSearch} />
      
      <ProductGrid 
        searchQuery={searchQuery}
        category={category}
        location={locationFilter}
        title={title}
      />
    </>
  );
}
