import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { apiRequest } from "@/lib/queryClient";
import { categories, provinces } from "@/lib/sampleData";
import type { InsertProduct } from "@shared/schema";

export default function PostAd() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<InsertProduct>({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    images: [],
    isActive: true,
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const response = await apiRequest("POST", "/api/products", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t("success"),
        description: t("adPostedSuccessfully"),
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("failedToPostAd"),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.category || !formData.location) {
      toast({
        title: t("error"),
        description: t("fillAllRequiredFields"),
        variant: "destructive",
      });
      return;
    }

    createProductMutation.mutate(formData);
  };

  const updateField = (field: keyof InsertProduct, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h1 className="text-3xl font-bold text-center text-foreground mb-6">
          📝 {t("postNewAd")}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground text-sm font-bold mb-2">
                {t("adTitle")} *
              </label>
              <Input
                type="text"
                placeholder={t("adTitle")}
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
                data-testid="input-title"
              />
            </div>
            
            <div>
              <label className="block text-foreground text-sm font-bold mb-2">
                {t("category")} *
              </label>
              <Select value={formData.category} onValueChange={(value) => updateField("category", value)}>
                <SelectTrigger data-testid="select-category">
                  <SelectValue placeholder={t("selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground text-sm font-bold mb-2">
                {t("price")} *
              </label>
              <Input
                type="text"
                placeholder={t("priceInAFN")}
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                required
                data-testid="input-price"
              />
            </div>
            
            <div>
              <label className="block text-foreground text-sm font-bold mb-2">
                {t("location")} *
              </label>
              <Select value={formData.location} onValueChange={(value) => updateField("location", value)}>
                <SelectTrigger data-testid="select-location">
                  <SelectValue placeholder={t("selectLocation")} />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.name}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-foreground text-sm font-bold mb-2">
              {t("description")} *
            </label>
            <Textarea
              placeholder={t("adDescription")}
              rows={4}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="resize-none"
              required
              data-testid="textarea-description"
            />
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/")}
              data-testid="button-cancel"
            >
              {t("cancel")}
            </Button>
            
            <Button
              type="submit"
              disabled={createProductMutation.isPending}
              className="px-8"
              data-testid="button-submit"
            >
              {createProductMutation.isPending ? (
                <div className="loading-spinner mr-2"></div>
              ) : (
                <i className="fas fa-upload mr-2"></i>
              )}
              {createProductMutation.isPending ? t("posting") : t("postAd")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
