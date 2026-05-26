import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { LanguageProvider } from "@/hooks/use-language";

const queryClient = new QueryClient();
const Imprint = lazy(() => import("./pages/Imprint"));
const BlogPost1 = lazy(() => import("./pages/BlogPost1"));
const BlogPost2 = lazy(() => import("./pages/BlogPost2"));
const BlogPost3 = lazy(() => import("./pages/BlogPost3"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-glass-light via-white to-glass-cream text-glass-muted">
    Loading...
  </div>
);

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="/blog/ai-voice-interfaces" element={<BlogPost1 />} />
              <Route path="/blog/scalable-react-applications" element={<BlogPost2 />} />
              <Route path="/blog/connected-cars-iot" element={<BlogPost3 />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
