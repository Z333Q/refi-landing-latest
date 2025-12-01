import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Benchmarks from './components/Benchmarks';
import HowItWorksSection from './components/HowItWorksSection';
import UserSegments from './components/UserSegments';
import TrustSection from './components/TrustSection';
import ProofEngine from './components/ProofEngine';
import Regulatory from './components/Regulatory';
import ActionModulesSection from './components/ActionModulesSection';
import Pricing from './components/Pricing';
import CompactRoadmapSection from './components/CompactRoadmapSection';
import CompactTeamSection from './components/CompactTeamSection';
import PartnerLogosSection from './components/PartnerLogosSection';
import LatestInsightsSection from './components/LatestInsightsSection';
import FaqSection from './components/FaqSection';
import FinalActionSection from './components/FinalActionSection';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import DemoPage from './pages/DemoPage';
import WaitlistPage from './pages/WaitlistPage';
import PartnersPage from './pages/PartnersPage';
import CareersPage from './pages/CareersPage';
import Footer from './components/Footer';
import ConvAIWidget from './components/ConvAIWidget';
import PolicyPage from './components/PolicyPage';
import { getFaqSchema } from './components/SeoFaq';

// Memoize particle interface to prevent recreations
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  element: HTMLDivElement;
  lines: HTMLDivElement[];
}

// Move policies outside component to prevent recreations
const POLICIES = {
  privacy: {
    title: "Privacy Policy",
    content: "ReFi.Trading respects your privacy and complies with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). We collect only necessary information (e.g., name, email) to communicate with users and partners. You have the right to access, correct, or delete your data. We never sell your personal data. For all data-related requests, email hello@refi.trading."
  },
  terms: {
    title: "Terms of Service",
    content: "By using ReFi.Trading, you agree to abide by applicable laws and regulations. All content is for informational purposes and not financial advice. We do not guarantee uptime or accuracy. Use of ReFi.Trading is at your own risk, and all liability limitations apply to the maximum extent permitted by law."
  },
  cookies: {
    title: "Cookie Policy",
    content: "ReFi.Trading uses cookies and similar tracking technologies in accordance with GDPR and CCPA. Cookies help us analyze site traffic and improve the user experience. No personally identifiable data is stored in cookies. You can manage cookie preferences through your browser or via our cookie banner. Continued use of the site indicates your consent."
  }
};

// Reduce particle count and optimize animation
const PARTICLE_COUNT = 30; // Reduced from 75
const CONNECTION_DISTANCE = 100; // Reduced from 150
const ANIMATION_FRAME_SKIP = 2; // Skip frames for better performance

function App() {
  const [currentPolicy, setCurrentPolicy] = useState<string | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const frameCountRef = useRef<number>(0);

  // Memoize policy handler to prevent recreations
  const handlePolicyClick = useCallback((policy: string) => {
    setCurrentPolicy(policy);
  }, []);

  // Optimize particle system
  useEffect(() => {
    if (!containerRef.current || window.innerWidth < 768) return; // Disable on mobile

    const container = containerRef.current;
    const numParticles = PARTICLE_COUNT;
    const particles: Particle[] = [];
    const connectionDistance = CONNECTION_DISTANCE;

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const element = document.createElement('div');
      element.className = 'particle';
      const size = Math.random() * 4 + 2; // Smaller particles
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      const particle: Particle = {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement
        vy: (Math.random() - 0.5) * 0.3,
        size,
        opacity: Math.random() * 0.3 + 0.1, // Lower opacity
        element,
        lines: []
      };

      particle.element.style.opacity = particle.opacity.toString();
      particles.push(particle);
      container.appendChild(element);

      // Reduce connection lines
      if (i % 3 === 0) { // Only every 3rd particle gets lines
        for (let j = 0; j < Math.min(numParticles, 5); j++) { // Max 5 connections
          if (i !== j) {
            const line = document.createElement('div');
            line.className = 'particle-line';
            container.appendChild(line);
            particle.lines.push(line);
          }
        }
      }
    }

    particlesRef.current = particles;

    // Optimize connection updates
    const updateParticleConnections = (particle: Particle, index: number) => {
      if (particle.lines.length === 0) return; // Skip if no lines
      
      let lineIndex = 0;
      // Only check nearby particles for connections
      for (let j = 0; j < particles.length && lineIndex < particle.lines.length; j++) {
        const other = particles[j];
        if (index === j) return;

        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const line = particle.lines[lineIndex];
        if (!line) break;
        
        if (distance < connectionDistance) {
          const angle = Math.atan2(dy, dx);
          const opacity = (1 - distance / connectionDistance) * 0.3; // Lower opacity

          line.style.width = `${distance}px`;
          line.style.height = '1px';
          line.style.transform = `translate(${particle.x}px, ${particle.y}px) rotate(${angle}rad)`;
          line.style.opacity = opacity.toString();
        } else {
          line.style.opacity = '0';
        }
        lineIndex++;
      }
    };

    // Optimize animation loop with frame skipping
    const animate = () => {
      frameCountRef.current++;
      
      // Skip frames for better performance
      if (frameCountRef.current % ANIMATION_FRAME_SKIP !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const bounds = container.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reduce random movement
        particle.vx += (Math.random() - 0.5) * 0.005;
        particle.vy += (Math.random() - 0.5) * 0.005;

        particle.vx *= 0.995; // Slightly more damping
        particle.vy *= 0.995;

        const maxVelocity = 0.5; // Slower max velocity
        particle.vx = Math.max(Math.min(particle.vx, maxVelocity), -maxVelocity);
        particle.vy = Math.max(Math.min(particle.vy, maxVelocity), -maxVelocity);

        if (particle.x <= 0 || particle.x >= bounds.width) {
          particle.vx *= -0.9;
          particle.x = Math.max(0, Math.min(bounds.width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= bounds.height) {
          particle.vy *= -0.9;
          particle.y = Math.max(0, Math.min(bounds.height, particle.y));
        }

        // Optimize collision detection - only check nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];

          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = (particle.size + other.size) * 1.5; // Smaller collision distance

          if (distance < minDist) {
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            const vx1 = particle.vx * cos + particle.vy * sin;
            const vy1 = particle.vy * cos - particle.vx * sin;
            const vx2 = other.vx * cos + other.vy * sin;
            const vy2 = other.vy * cos - other.vx * sin;

            particle.vx = vx2 * cos - vy1 * sin * 0.95;
            particle.vy = vy1 * cos + vx2 * sin * 0.95;
            other.vx = vx1 * cos - vy2 * sin * 0.95;
            other.vy = vy2 * cos + vx1 * sin * 0.95;

            // Remove expensive opacity animation
          }
        }

        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        
        // Update connections less frequently
        if (frameCountRef.current % (ANIMATION_FRAME_SKIP * 2) === 0) {
          updateParticleConnections(particle, i);
        }
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
        particle.lines.forEach(line => line.remove());
      });
    };
  }, []);

  // Memoize policy component to prevent recreations
  if (currentPolicy) {
    const policy = POLICIES[currentPolicy as keyof typeof POLICIES];
    return (
      <div className="min-h-screen bg-charcoal text-white">
        <Helmet>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: getFaqSchema(),
            }}
          />
        </Helmet>
        <Header />
        <PolicyPage title={policy.title} content={policy.content} />
        <Footer onPolicyClick={handlePolicyClick} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-white overflow-x-hidden relative">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Helmet>
        <html lang="en" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getFaqSchema(),
          }}
        />
      </Helmet>
      
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-50"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <Routes>
          <Route path="/" element={
            <div id="main-content" role="main">
            <main>
              <HeroSection />
              <Benchmarks />
              <HowItWorksSection />
              <PartnerLogosSection />
              <UserSegments />
              <TrustSection />
              <ProofEngine />
              <Regulatory />
              <ActionModulesSection />
              <Pricing />
              <CompactRoadmapSection />
              <CompactTeamSection />
              <LatestInsightsSection />
              <FaqSection />
              <FinalActionSection />
            </main>
            </div>
          } />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
        <Footer onPolicyClick={handlePolicyClick} />
      </div>
      
      {/* ElevenLabs ConvAI Widget */}
      <div aria-hidden="true">
        <ConvAIWidget />
      </div>
    </div>
  );
}

export default App;