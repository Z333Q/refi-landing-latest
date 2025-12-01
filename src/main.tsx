import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import CriticalCSS from './components/ui/CriticalCSS';
import i18n from './i18n';
import './index.css';

// Lazy load components
const App = lazy(() => import('./App'));

// Add loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-charcoal flex items-center justify-center">
    <div className="text-mint text-xl">Loading...</div>
  </div>
);

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = () => {
    fontLink.rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);

  // Preload hero image
  const heroImageLink = document.createElement('link');
  heroImageLink.rel = 'preload';
  heroImageLink.href = '/green-logo-only-square.png';
  heroImageLink.as = 'image';
  document.head.appendChild(heroImageLink);
};

// Initialize app immediately since i18n is now synchronous
preloadCriticalResources();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CriticalCSS />
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <App />
          </Suspense>
        </BrowserRouter>
      </I18nextProvider>
    </HelmetProvider>
  </StrictMode>
);