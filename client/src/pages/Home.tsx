import { useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
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

  // Track user interactions for attention score
  useEffect(() => {
    const handleInteraction = () => {
      incrementScore();
    };

    // Track various user interactions
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("click", handleInteraction);
    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [incrementScore]);

  return (
    <MotionConfig {...motionConfig}>
      <div className={isGlitchStormActive ? "glitch-storm" : ""}>
        <div className="noise-overlay"></div>
        <div className="scanlines-overlay"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <HeroSection />
          <AboutSection />
          <LoreSection />
          <ContactSection />
        </motion.div>
      </div>
    </MotionConfig>
  );
}
