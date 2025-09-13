import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export default function BackButton() {
  const [location, setLocation] = useLocation();
  const { t } = useLanguage();

  // Hide back button on home page
  if (location === "/") {
    return null;
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };

  return (
    <div className="container mx-auto px-4 py-3">
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
        data-testid="button-back"
      >
        <i className="fas fa-arrow-left"></i>
        <span>{t("back")}</span>
      </Button>
    </div>
  );
}
