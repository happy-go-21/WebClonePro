
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
    <Card className="glassmorphism border-white/20">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 text-center">ولایات</h3>
        <ScrollArea className="h-80">
          <div className="space-y-2">
            {provinces.map((province, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-medium">{province}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
