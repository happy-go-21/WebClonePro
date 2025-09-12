import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Province } from "@shared/schema";

export default function ProvinceCircles() {
  const [, setLocation] = useLocation();
  
  const { data: provinces, isLoading } = useQuery<Province[]>({
    queryKey: ["/api/provinces"],
  });

  const handleProvinceClick = (provinceName: string) => {
    setLocation(`/products?location=${encodeURIComponent(provinceName)}`);
  };

  if (isLoading) {
    return (
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-white/30 pb-2">
          انتخاب ولایت
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
        انتخاب ولایت
      </h2>
      
      <div className="flex gap-6 overflow-x-auto p-4 scrollbar-hide">
        {provinces?.map((province) => (
          <div 
            key={province.id}
            className="province-gradient province-morph shimmer w-36 h-36 rounded-full flex flex-col items-center justify-center text-white font-bold cursor-pointer shadow-2xl border-2 border-white/20 flex-shrink-0 relative overflow-hidden golden-border"
            onClick={() => handleProvinceClick(province.name)}
            data-testid={`circle-province-${province.id}`}
          >
            <div className="text-3xl mb-2">{province.icon}</div>
            <span className="text-lg text-center">{province.name}</span>
            {province.population && (
              <span className="text-xs mt-1 opacity-80">{province.population}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
