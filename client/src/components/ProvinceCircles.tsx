
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
        <ScrollArea className="h-96 w-full">
          <div className="flex flex-col items-center space-y-4 pr-4">
            {provinces.map((province, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-400 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 hover:from-orange-500 hover:to-orange-700 transition-all duration-300 cursor-pointer shadow-lg border-2 border-white/30"
              >
                <div className="text-center">
                  <MapPin className="h-4 w-4 text-white mx-auto mb-1" />
                  <span className="text-xs text-white font-medium leading-tight">{province}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
