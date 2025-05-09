import { useEffect, useRef } from "react";
import { motion, MotionConfig, useScroll, useSpring, useTransform } from "framer-motion";
import { useGlitchStorm } from "@/hooks/use-key-sequence";
import { useAttentionScore } from "@/hooks/use-attention-score";
import { motionConfig } from "@/lib/motion-settings";

import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import LoreSection from "@/components/home/LoreSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  const { isGlitchStormActive } = useGlitchStorm();
  const { incrementScore } = useAttentionScore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end"],
  });
  
  // Smooth out the scroll value for smoother animations
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 20, 
    stiffness: 100,
    restDelta: 0.001 
  });
  
  // Create transform values for parallax effects
  const noiseOpacity = useTransform(smoothProgress, [0, 1], [0.3, 0.2]);
  const scanlinesY = useTransform(smoothProgress, [0, 1], [0, 50]);

  // Track user interactions for attention score with throttling
  useEffect(() => {
    let lastInteractionTime = 0;
    const throttleTime = 200; // ms
    
    const handleInteraction = () => {
      const now = Date.now();
      if (now - lastInteractionTime > throttleTime) {
        incrementScore();
        lastInteractionTime = now;
      }
    };

    // Track various user interactions
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction);
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchmove", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [incrementScore]);

  // Add metadata for SEO
  useEffect(() => {
    // Update document title
    document.title = "ATTENTION ERA | A Cyberpunk Digital Experience";
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      'Immerse yourself in ATTENTION ERA, a dark cyberpunk digital experience exploring the attention economy and digital surveillance. You are not the user. You are the used.');
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'ATTENTION ERA | A Cyberpunk Digital Experience' },
      { property: 'og:description', content: 'Immerse yourself in ATTENTION ERA, a dark cyberpunk digital experience exploring the attention economy and digital surveillance. You are not the user. You are the used.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/attached_assets/we212eawdsa.gif' },
      { property: 'og:url', content: window.location.href },
      { property: 'twitter:card', content: 'summary_large_image' },
    ];
    
    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Add theme color for mobile browsers
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColor);
    }
    themeColor.setAttribute('content', '#0c0c10');
  }, []);

  return (
    <MotionConfig {...motionConfig}>
      <div 
        ref={containerRef}
        className={`relative ${isGlitchStormActive ? "glitch-storm" : ""}`}
      >
        {/* Animated overlays with parallax effect */}
        <motion.div 
          className="noise-overlay fixed inset-0 z-50 pointer-events-none"
          style={{ opacity: noiseOpacity }}
        />
        
        <motion.div 
          className="scanlines-overlay fixed inset-0 z-40 pointer-events-none"
          style={{ y: scanlinesY }}
        />
        
        {/* Main content with sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen"
        >
          <HeroSection />
          <AboutSection />
          <LoreSection />
          <ContactSection />
        </motion.div>
        
        {/* Glitch storm overlay */}
        <div className={`glitch-storm-overlay ${isGlitchStormActive ? "active" : ""}`} />
      </div>
    </MotionConfig>
  );
}
