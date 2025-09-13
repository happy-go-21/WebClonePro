
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Car, Home, Smartphone, Users } from "lucide-react";

const categories = [
  { id: 1, name: "خرید و فروش", icon: ShoppingBag, color: "bg-blue-500" },
  { id: 2, name: "خودرو", icon: Car, color: "bg-green-500" },
  { id: 3, name: "املاک", icon: Home, color: "bg-yellow-500" },
  { id: 4, name: "الکترونیک", icon: Smartphone, color: "bg-purple-500" },
  { id: 5, name: "خدمات", icon: Users, color: "bg-red-500" },
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
