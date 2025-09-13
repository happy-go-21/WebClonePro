
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
        <ScrollArea className="h-96 w-full">
          <div className="flex flex-col space-y-3 pr-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className={`${category.color} rounded-lg p-4 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg w-full`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-6 w-6 text-black flex-shrink-0" />
                    <span className="text-black font-medium">{category.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
