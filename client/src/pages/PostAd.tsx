import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertProduct } from "@shared/schema";

export default function PostAd() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<InsertProduct>({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    isActive: true,
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const response = await apiRequest("POST", "/api/products", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "موفقیت",
        description: "آگهی شما با موفقیت ثبت شد!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "خطا",
        description: "در ثبت آگهی خطایی رخ داد. لطفاً مجدداً تلاش کنید.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.category || !formData.location) {
      toast({
        title: "خطا",
        description: "لطفاً همه فیلدهای الزامی را پر کنید.",
        variant: "destructive",
      });
      return;
    }

    createProductMutation.mutate(formData);
  };

  const updateField = (field: keyof InsertProduct, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glassmorphism rounded-xl p-6 mb-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6 text-shadow">
          📝 ثبت آگهی جدید
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-bold mb-2">
                عنوان آگهی *
              </label>
              <Input
                type="text"
                placeholder="عنوان آگهی"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="glassmorphism text-white placeholder-white/70 border-white/30 focus:border-white/50"
                required
                data-testid="input-title"
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-bold mb-2">
                دسته‌بندی *
              </label>
              <Select value={formData.category} onValueChange={(value) => updateField("category", value)}>
                <SelectTrigger 
                  className="glassmorphism text-white border-white/30 focus:border-white/50"
                  data-testid="select-category"
                >
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="املاک">املاک</SelectItem>
                  <SelectItem value="خودرو">خودرو</SelectItem>
                  <SelectItem value="الکترونیکی">الکترونیکی</SelectItem>
                  <SelectItem value="لوازم خانگی">لوازم خانگی</SelectItem>
                  <SelectItem value="لباس مردانه">لباس مردانه</SelectItem>
                  <SelectItem value="لباس زنانه">لباس زنانه</SelectItem>
                  <SelectItem value="لباس کودکان">لباس کودکان</SelectItem>
                  <SelectItem value="طلا و جواهرات">طلا و جواهرات</SelectItem>
                  <SelectItem value="کتاب و آموزش">کتاب و آموزش</SelectItem>
                  <SelectItem value="لوازم کودک">لوازم کودک</SelectItem>
                  <SelectItem value="استخدام">استخدام</SelectItem>
                  <SelectItem value="خدمات">خدمات</SelectItem>
                  <SelectItem value="میوه‌جات">میوه‌جات</SelectItem>
                  <SelectItem value="مواد غذایی">مواد غذایی</SelectItem>
                  <SelectItem value="ورزشی">ورزشی</SelectItem>
                  <SelectItem value="سرگرمی">سرگرمی</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-bold mb-2">
                قیمت *
              </label>
              <Input
                type="text"
                placeholder="قیمت (افغانی/دلار)"
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="glassmorphism text-white placeholder-white/70 border-white/30 focus:border-white/50"
                required
                data-testid="input-price"
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-bold mb-2">
                موقعیت *
              </label>
              <Select value={formData.location} onValueChange={(value) => updateField("location", value)}>
                <SelectTrigger 
                  className="glassmorphism text-white border-white/30 focus:border-white/50"
                  data-testid="select-location"
                >
                  <SelectValue placeholder="انتخاب موقعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="کابل">کابل</SelectItem>
                  <SelectItem value="هرات">هرات</SelectItem>
                  <SelectItem value="بلخ">بلخ</SelectItem>
                  <SelectItem value="قندهار">قندهار</SelectItem>
                  <SelectItem value="ننگرهار">ننگرهار</SelectItem>
                  <SelectItem value="غزنی">غزنی</SelectItem>
                  <SelectItem value="بامیان">بامیان</SelectItem>
                  <SelectItem value="فراه">فراه</SelectItem>
                  <SelectItem value="کندز">کندز</SelectItem>
                  <SelectItem value="بدخشان">بدخشان</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              توضیحات *
            </label>
            <Textarea
              placeholder="توضیحات آگهی..."
              rows={4}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="glassmorphism text-white placeholder-white/70 border-white/30 focus:border-white/50 resize-none"
              required
              data-testid="textarea-description"
            />
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/")}
              className="glassmorphism text-white border-white/30 hover:bg-white/20"
              data-testid="button-cancel"
            >
              انصراف
            </Button>
            
            <Button
              type="submit"
              disabled={createProductMutation.isPending}
              className="bg-white text-primary hover:bg-gray-100 golden-border px-8"
              data-testid="button-submit"
            >
              {createProductMutation.isPending ? "در حال ثبت..." : "📤 ثبت آگهی"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
