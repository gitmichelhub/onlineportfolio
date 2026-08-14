import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { usePageMeta } from "@/hooks/use-page-meta";
import SubpageHeader from "@/components/SubpageHeader";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  usePageMeta("404 — Michel Werner");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const t = {
    en: { message: "Oops! This page doesn't exist.", back: "Return to Home" },
    de: { message: "Ups! Diese Seite existiert nicht.", back: "Zurück zur Startseite" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-glass-light via-white to-glass-cream px-4 py-6 sm:py-8">
      <div className="w-full max-w-4xl mx-auto">
        <SubpageHeader />
      </div>
      <div className="flex flex-1 items-center justify-center pb-20">
        <div className="glass glass-content liquid-glass-soft rounded-content p-10 text-center max-w-md">
          <h1 className="text-6xl font-semibold text-gradient-warm mb-4 font-playfair">404</h1>
          <p className="text-xl text-glass-muted mb-8">{t[language].message}</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-glass-copper text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:bg-glass-amber hover:shadow-lg"
          >
            <ArrowLeft size={16} />
            <span>{t[language].back}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
