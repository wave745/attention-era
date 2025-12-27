import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GlitchText } from "@/components/ui/glitch-text";
import { RGBSplitText, RGBSplitImage } from "@/components/ui/rgb-split";
import { useAttentionScore } from "@/hooks/use-attention-score";
import { NeonGridBackground } from "@/components/ui/neon-grid-background";
import { useEffect, useState, useRef } from "react";
import { ChevronDownIcon } from "lucide-react";

export default function HeroSection() {
  const { formattedScore } = useAttentionScore();
  const [typing, setTyping] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const sloganRef = useRef<HTMLDivElement>(null);

  // Typewriter effect 
  useEffect(() => {
    const timer = setTimeout(() => {
      setTyping(true);
    }, 1800);

    const arrowTimer = setTimeout(() => {
      setShowArrow(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(arrowTimer);
    };
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    if (!sloganRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(sloganRef.current);

    return () => {
      if (sloganRef.current) {
        observer.unobserve(sloganRef.current);
      }
    };
  }, []);

  return (
    <motion.header
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated neon grid background */}
      <NeonGridBackground />

      {/* Overlay with cyberpunk figure */}
      <RGBSplitImage
        src="/attached_assets/we212eawdsa.gif"
        alt="A cyberpunk figure with VR headset and glitch effects"
        className="absolute inset-0 z-10 bg-cover bg-center opacity-30 object-cover"
      />

      {/* Dark gradient overlay for better text contrast */}
      <div className="absolute inset-0 z-20 bg-gradient-radial from-transparent via-black/60 to-black/90"></div>

      <div className="relative z-30 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold mb-6 font-glitch tracking-tighter"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <RGBSplitText>
            <GlitchText element="span" intensity="high" className="animate-neon animate-glitch-3" rgb={true}>
              ATTENTION ERA
            </GlitchText>
          </RGBSplitText>
        </motion.h1>

        <motion.div
          className="h-px w-48 sm:w-64 mx-auto bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        ></motion.div>

        <motion.div
          ref={sloganRef}
          className="text-xl sm:text-2xl md:text-3xl font-light mb-10 font-sans max-w-2xl mx-auto scroll-glitch"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className={`typing-effect ${typing ? 'visible' : ''}`}>
            <GlitchText intensity="medium" className="animate-glitch-2">
              You are not the user. <span className="text-cyber-magenta animate-neon font-semibold">You are the used.</span>
            </GlitchText>
          </div>
        </motion.div>

        <motion.div
          id="attention-score"
          className="text-sm opacity-70 mb-10 font-mono bg-black/30 backdrop-blur-sm py-2 px-4 rounded-sm inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <span className="text-cyber-green">Attention Score:</span> <span className="font-glitch animate-blink">{formattedScore}</span>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <Button
            asChild
            className="w-full sm:w-auto px-8 py-6 bg-cyber-cyan/20 hover:bg-cyber-cyan/40 border border-cyber-cyan text-cyber-cyan rounded-sm transition-all duration-300 relative overflow-hidden group hover:scale-105"
          >
            <a href="#lore">
              <span className="relative z-10">
                <GlitchText>ENTER THE BREACH</GlitchText>
              </span>
              <span className="absolute inset-0 bg-cyber-cyan/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 bg-transparent hover:bg-cyber-magenta/20 border border-cyber-magenta text-cyber-magenta rounded-sm transition-all duration-300 hover:scale-105"
          >
            <Link href="/manifesto">
              <GlitchText>READ MANIFESTO</GlitchText>
            </Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        className={`absolute bottom-10 left-0 right-0 flex justify-center transition-opacity duration-500 ${showArrow ? 'opacity-60' : 'opacity-0'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: showArrow ? 0.6 : 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <a
          href="#about"
          className="animate-bounce text-cyber-cyan p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
          aria-label="Scroll to About section"
        >
          <ChevronDownIcon className="w-6 h-6" />
        </a>
      </motion.div>

      {/* Decorative background X symbol */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] opacity-5 font-glitch pointer-events-none select-none z-10">
        <RGBSplitText>X</RGBSplitText>
      </div>
    </motion.header>
  );
}
