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

/**
 * Liquid-glass refraction filters.
 *
 * These are designed to be used inside `backdrop-filter` (see `.liquid-glass`
 * in index.css), so they bend the *content behind* the glass while leaving the
 * glass surface's own text crisp and legible — the core principle from Aave's
 * "Building glass for the web". A fractal-noise displacement map produces the
 * organic warp; splitting the displacement per colour channel adds the subtle
 * chromatic aberration you get at the edge of real glass.
 */
const LiquidGlassFilters = () => (
  <svg
    className="liquid-glass-defs"
    width="0"
    height="0"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      {/* Shared organic displacement map */}
      <filter
        id="liquid-refraction"
        x="-35%"
        y="-35%"
        width="170%"
        height="170%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.009 0.013"
          numOctaves="2"
          seed="9"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="1.6" result="map" />

        {/* Per-channel displacement → chromatic aberration at the edges */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="26"
          xChannelSelector="R"
          yChannelSelector="G"
          result="dispR"
        />
        <feColorMatrix
          in="dispR"
          type="matrix"
          values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="chanR"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="18"
          xChannelSelector="R"
          yChannelSelector="G"
          result="dispG"
        />
        <feColorMatrix
          in="dispG"
          type="matrix"
          values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="chanG"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="10"
          xChannelSelector="R"
          yChannelSelector="G"
          result="dispB"
        />
        <feColorMatrix
          in="dispB"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
          result="chanB"
        />
        <feBlend in="chanR" in2="chanG" mode="screen" result="rg" />
        <feBlend in="rg" in2="chanB" mode="screen" />
      </filter>

      {/* Softer variant for small surfaces (nav pills, badges) so the page
          content reading through them stays comfortable */}
      <filter
        id="liquid-refraction-soft"
        x="-25%"
        y="-25%"
        width="150%"
        height="150%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.016"
          numOctaves="2"
          seed="5"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="1.4" result="map" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="9"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-glass-light via-white to-glass-cream text-glass-muted">
    Loading...
  </div>
);

const App = () => (
  <LanguageProvider>
    <LiquidGlassFilters />
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
