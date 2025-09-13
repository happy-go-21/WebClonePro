import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "@/lib/i18n";

interface Language {
  code: string;
  name: string;
  flag: string;
  dir: "ltr" | "rtl";
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  languages: Language[];
  currentLanguage: Language;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "fa", name: "دری", flag: "🇦🇫", dir: "rtl" },
  { code: "ps", name: "پښتو", flag: "🇦🇫", dir: "rtl" },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("en");

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    
    const selectedLang = languages.find(l => l.code === lang) || languages[0];
    
    // Update document attributes
    document.documentElement.setAttribute("dir", selectedLang.dir);
    document.documentElement.setAttribute("lang", lang);
    
    // Apply Arabic font for Dari and Pashto
    if (lang === "fa" || lang === "ps") {
      document.body.classList.add("arabic-font");
    } else {
      document.body.classList.remove("arabic-font");
    }
  };

  const t = (key: string): string => {
    return (translations as any)[language]?.[key] || (translations as any).en[key] || key;
  };

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && languages.some(l => l.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      languages,
      currentLanguage,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}