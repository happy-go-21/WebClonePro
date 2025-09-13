

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Car, Home, Smartphone, Users, Shirt, Baby, Book, Utensils, Gamepad2, Trophy, Briefcase, Hammer, Apple, Gem, Sofa, Truck, Plane, Bike, Music, Camera, Watch, Heart, Palette, Coffee, Gift } from "lucide-react";

const categories = [
  { id: 1, name: "وسایل نقلیه", icon: Car, color: "bg-blue-500" },
  { id: 2, name: "املاک", icon: Home, color: "bg-green-500" },
  { id: 3, name: "الکترونیکی", icon: Smartphone, color: "bg-purple-500" },
  { id: 4, name: "لباس مردانه", icon: Shirt, color: "bg-indigo-500" },
  { id: 5, name: "لباس زنانه", icon: ShoppingBag, color: "bg-pink-500" },
  { id: 6, name: "لباس کودکان", icon: Baby, color: "bg-orange-500" },
  { id: 7, name: "طلا و جواهرات", icon: Gem, color: "bg-yellow-500" },
  { id: 8, name: "آموزش", icon: Book, color: "bg-teal-500" },
  { id: 9, name: "لوازم کودک", icon: Baby, color: "bg-cyan-500" },
  { id: 10, name: "لوازم خانگی", icon: Sofa, color: "bg-emerald-500" },
  { id: 11, name: "استخدام", icon: Briefcase, color: "bg-slate-500" },
  { id: 12, name: "خدمات", icon: Hammer, color: "bg-red-500" },
  { id: 13, name: "میوه‌جات", icon: Apple, color: "bg-lime-500" },
  { id: 14, name: "مواد غذایی", icon: Utensils, color: "bg-amber-500" },
  { id: 15, name: "ورزشی", icon: Trophy, color: "bg-blue-600" },
  { id: 16, name: "سرگرمی", icon: Gamepad2, color: "bg-violet-500" },
  { id: 17, name: "موسیقی", icon: Music, color: "bg-rose-500" },
  { id: 18, name: "دوربین", icon: Camera, color: "bg-gray-500" },
  { id: 19, name: "ساعت", icon: Watch, color: "bg-zinc-500" },
  { id: 20, name: "هدایا", icon: Gift, color: "bg-fuchsia-500" }
];

export default function CategoryCircles() {
  return (
    <Card className="glassmorphism border-white/20 w-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-black mb-4 text-center">دسته‌بندی‌ها</h3>
        <ScrollArea className="h-32 w-full">
          <div className="flex flex-row items-center space-x-4 pb-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className={`${category.color} w-20 h-20 rounded-full flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg flex-shrink-0`}
                >
                  <IconComponent className="h-5 w-5 text-white mb-1" />
                  <span className="text-xs text-white font-medium text-center px-1 leading-none">{category.name}</span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
