
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin } from "lucide-react";

const provinces = [
  "کابل", "هرات", "قندهار", "مزار شریف", "جلال آباد", "لشکرگاه",
  "کندوز", "غزنی", "باگلان", "پروان", "لوگر", "نورستان",
  "کنر", "لغمان", "کاپیسا", "پکتیا", "خوست", "پکتیکا",
  "زابل", "اروزگان", "غور", "بادغیس", "فراه", "نیمروز",
  "هلمند", "فاریاب", "سرپل", "جوزجان", "تخار", "بدخشان",
  "پنجشیر", "دایکندی", "بامیان", "وردک"
];

export default function ProvinceCircles() {
  return (
    <Card className="glassmorphism border-white/20 w-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-black mb-4 text-center">ولایات</h3>
        <ScrollArea className="h-28 w-full">
          <div className="flex flex-row items-center space-x-4 pb-2">
            {provinces.map((province, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 hover:from-orange-500 hover:to-orange-700 transition-all duration-300 cursor-pointer shadow-lg border-2 border-white/30 flex-shrink-0"
              >
                <div className="text-center">
                  <MapPin className="h-3 w-3 text-white mx-auto mb-1" />
                  <span className="text-xs text-white font-medium leading-none text-center">{province}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
