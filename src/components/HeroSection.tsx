import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Play, Shield, Brain, CheckCircle, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  element: HTMLDivElement;
}

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useMemo(() => window.innerWidth < 768, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Optimize hero particle system
  useEffect(() => {
    // Disable particles on mobile for better performance
    if (!containerRef.current || isMobile) return;

    const container = containerRef.current;
    const numParticles = 15; // Reduced for better performance
    const particles: Particle[] = [];

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const element = document.createElement('div');
      element.className = 'particle';
      const size = Math.random() * 3 + 1;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      const particle: Particle = {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size,
        element
      };

      particles.push(particle);
      container.appendChild(element);
    }

    particlesRef.current = particles;

    let frameCount = 0;
    const frameSkip = 3;
    
    const animate = () => {
      frameCount++;
      if (frameCount % frameSkip !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const bounds = container.getBoundingClientRect();
      if (bounds.width === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= bounds.width) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= bounds.height) {
          particle.vy *= -1;
        }

        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particles.forEach(particle => {
        particle.element.remove();
      });
    };
  }, [isMobile]);

  return (
    <>
      <Helmet>
        <title>ReFi.Trading | Wall-Street AI, Radically Accessible</title>
        <meta name="description" content="Revolutionary AI trading platform with self-custodied execution, zero-knowledge risk proofs, and reinforcement learning agents. Launch institutional-grade trading strategies in minutes while maintaining full control of your assets." />
        
        {/* Enhanced structured data for homepage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "ReFi.Trading - AI Trading Platform",
            "description": "Revolutionary AI trading platform with self-custodied execution, zero-knowledge risk proofs, and reinforcement learning agents.",
            "url": "https://refi.trading",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "ReFi.Trading Platform",
              "applicationCategory": "FinanceApplication",
              "description": "Self-custodied AI trading with zero-knowledge risk enforcement",
              "featureList": [
                "Reinforcement Learning Agents",
                "Zero-Knowledge Risk Proofs",
                "Self-Custodied Execution",
                "Portfolio Analysis",
                "Real-time Risk Management"
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://refi.trading"
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      <section 
        id="hero" 
        className="min-h-screen flex items-center pt-16 relative overflow-hidden"
        itemScope 
        itemType="https://schema.org/WebPageElement"
      >
        <meta itemProp="name" content="Hero Section" />
        <meta itemProp="description" content="Introduction to ReFi.Trading AI trading platform" />
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/Slide8.png)' }}
          role="img"
          aria-label="ReFi.Trading platform background"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/80"></div>
        
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
          {!isMobile && (
            <>
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-mint/3 rounded-full filter blur-2xl animate-pulse-slow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mint/3 rounded-full filter blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-mint/3 rounded-full filter blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
            </>
          )}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <header className="max-w-4xl mx-auto text-center" role="banner">
            <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-mint/10 border border-mint/20 rounded-full px-6 py-2 mb-8">
                <span className="text-mint font-medium text-sm">
                  {t('hero.badge')}
                </span>
              </div>
              
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
                itemProp="headline"
              >
                {t('hero.title')}
              </h1>
              
              <p 
                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
                itemProp="description"
              >
                {t('hero.subtitle')}
              </p>
              
              <nav className="flex flex-col sm:flex-row gap-4 mb-6" role="navigation" aria-label="Primary actions">
                <a 
                  href="https://forms.gle/rr74yAhAM2MiGTVi9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-mint hover:bg-mint-dark text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-center flex items-center justify-center text-lg group hover:shadow-[0_0_20px_rgba(12,212,160,0.3)] transform hover:scale-[1.02]"
                  aria-label="Request early access to ReFi.Trading platform"
                >
                  {t('hero.requestAccess')}
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a 
                  href="/demo" 
                  className="bg-transparent border border-gray-600 hover:border-mint/50 text-gray-300 hover:text-mint font-medium px-6 py-4 rounded-lg transition-all duration-300 text-center text-lg flex items-center justify-center group"
                  aria-label="Watch 2-minute demo of ReFi.Trading platform"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {t('hero.watchDemo')}
                </a>
              </nav>
            </div>
          </header>
        </div>
      </section>
    </>
  );
};

export default HeroSection;