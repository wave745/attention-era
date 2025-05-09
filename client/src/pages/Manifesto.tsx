import { useState, useEffect, useRef } from "react";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { useGlitchStorm } from "@/hooks/use-key-sequence";
import { useAttentionScore } from "@/hooks/use-attention-score";
import { GlitchText } from "@/components/ui/glitch-text";
import { RGBSplitText } from "@/components/ui/rgb-split";
import { Button } from "@/components/ui/button";
import { motionConfig } from "@/lib/motion-settings";

export default function Manifesto() {
  const { isGlitchStormActive } = useGlitchStorm();
  const { incrementScore } = useAttentionScore();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const manifestoRef = useRef<HTMLDivElement>(null);
  
  // Track user interactions for attention score
  useEffect(() => {
    const handleInteraction = () => {
      incrementScore();
    };

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

  const manifestoContent = [
    {
      text: "This is not the future. This is now. And your mind is the battlefield.",
      color: "text-cyber-red",
    },
    "The Attention Era is upon us. Every second of your mental focus has become a commodity.",
    "Your consciousness is being parceled, packaged, and sold to the highest bidder.",
    "This is not paranoia. This is not conspiracy. This is the business model of the digital age.",
    {
      text: "// SYSTEM BREACH //",
      color: "text-cyber-yellow",
    },
    {
      type: "symbol_list",
      items: [
        { symbol: "🧠", text: "Your attention is finite. It is your most valuable resource." },
        { symbol: "🛰️", text: "Your feed is a weapon—engineered to keep you scrolling." },
        { symbol: "🕳️", text: "You are being shaped by shadows you can't see." },
      ],
      color: "text-white/90",
    },
    {
      text: "Big Tech doesn't want you free. It wants you addicted.",
      color: "text-cyber-red",
    },
    "Your dopamine is being mined like oil. The algorithm is not your friend—it is your dealer.",
    {
      text: "We declare the following truths to be self-evident:",
      color: "text-cyber-yellow",
    },
    {
      type: "list",
      items: [
        "The platforms we use are designed to extract, not serve.",
        "Psychological manipulation at scale has become the default business strategy.",
        "The capacity for independent thought is endangered by algorithmic curation.",
        "Privacy is not a luxury—it is a necessity for mental autonomy.",
      ],
    },
    {
      text: "Our mission:",
      color: "text-cyber-magenta",
    },
    {
      type: "list",
      items: [
        "Technologies that serve human needs rather than exploit human psychology",
        "Digital spaces built for connection, not extraction",
        "Tools for reclaiming your attention and mental sovereignty",
        "Education about the mechanisms of manipulation",
      ],
    },
    {
      text: "Remember: Attention is not just currency—it's identity. Where your attention goes, your life follows.",
      color: "text-cyber-cyan",
    },
    "You are not the user. You are the used. But you don't have to be.",
    {
      text: "⚔️ This is your call to arms.",
      color: "text-cyber-green",
    },
    {
      text: "👁️ Reclaim your attention. Reclaim your identity.",
      color: "text-cyber-green",
    },
    {
      text: "🧭 The revolution begins with where you choose to look.",
      color: "text-cyber-green",
    },
    {
      text: "We are not content. We are consciousness.",
      color: "text-cyber-yellow",
    },
    {
      text: "You were never meant to be scrolled.",
      color: "text-cyber-magenta",
    },
  ];

  // Function to show all content immediately
  const showAllContent = () => {
    const allIndices = manifestoContent.map((_, index) => index);
    setVisibleLines(allIndices);
    setIsTypingComplete(true);
    setSkipAnimation(true);
    
    // Scroll to the beginning
    if (manifestoRef.current) {
      manifestoRef.current.scrollTop = 0;
    }
  };

  // Preload all content immediately on first render but keep it hidden
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If reduced motion is preferred, show all content immediately
    if (prefersReducedMotion) {
      showAllContent();
      return;
    }
    
    // For normal users, continue with the typing effect
    let currentIndex = 0;
    let lineDisplayInterval: NodeJS.Timeout;

    const startTyping = () => {
      // Start with showing the first few lines immediately
      setVisibleLines([0, 1, 2]);
      currentIndex = 3;

      lineDisplayInterval = setInterval(() => {
        if (currentIndex < manifestoContent.length) {
          setVisibleLines((prev) => [...prev, currentIndex]);
          currentIndex++;

          // Scroll the container to keep up with the typing
          if (manifestoRef.current) {
            manifestoRef.current.scrollTop = manifestoRef.current.scrollHeight;
          }
        } else {
          clearInterval(lineDisplayInterval);
          setIsTypingComplete(true);
        }
      }, 500); // Faster typing speed (was 2000ms)
    };

    // Start with a shorter delay
    const initialTimeout = setTimeout(() => {
      startTyping();
    }, 300); // Shorter initial delay (was 1000ms)

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(lineDisplayInterval);
    };
  }, []);

  // Handle key press to skip animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space or Enter will skip the animation
      if ((e.key === " " || e.key === "Enter") && !isTypingComplete) {
        showAllContent();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTypingComplete]);

  // Render a line of the manifesto
  const renderLine = (content: any, index: number) => {
    const isVisible = visibleLines.includes(index);
    
    if (typeof content === "string") {
      return (
        <p 
          key={index} 
          className={`text-white/90 mb-4 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        >
          {content}
        </p>
      );
    } else if (content.type === "list") {
      return (
        <ul 
          key={index} 
          className={`list-disc pl-6 space-y-2 mb-4 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        >
          {content.items.map((item: string, i: number) => (
            <li key={i} className="text-white/90">
              {item}
            </li>
          ))}
        </ul>
      );
    } else if (content.type === "symbol_list") {
      return (
        <div 
          key={index} 
          className={`space-y-4 my-6 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        >
          {content.items.map((item: any, i: number) => (
            <div key={i} className={`flex items-start ${content.color || 'text-white/90'}`}>
              <span className="text-2xl mr-3 flex-shrink-0">{item.symbol}</span>
              <p className="mt-1">{item.text}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <p 
          key={index} 
          className={`${content.color} mb-4 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        >
          {content.text}
        </p>
      );
    }
  };

  return (
    <MotionConfig {...motionConfig}>
      <div className={isGlitchStormActive ? "glitch-storm" : ""}>
        <div className="noise-overlay"></div>
        <div className="scanlines-overlay"></div>

        <motion.section
          className="relative py-12 sm:py-24 bg-cyber-dark min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <RGBSplitText>
                  <GlitchText element="h2" className="text-3xl sm:text-4xl font-bold mb-3">
                    THE <span className="text-cyber-yellow">MANIFESTO</span>
                  </GlitchText>
                </RGBSplitText>
                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-cyber-yellow to-transparent mb-3"></div>
              </div>

              {/* Skip Animation Button (only shown if animation is not complete) */}
              <AnimatePresence>
                {!isTypingComplete && (
                  <motion.div 
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={showAllContent}
                      className="bg-cyber-black/60 text-cyber-yellow border border-cyber-yellow/40 hover:bg-cyber-yellow/10 text-sm"
                      size="sm"
                    >
                      Skip Animation
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="font-mono bg-cyber-black/60 p-4 sm:p-6 border border-cyber-yellow/20 relative shadow-lg shadow-cyber-yellow/5">
                {/* Terminal decorations */}
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-cyber-yellow/10 via-cyber-yellow/20 to-cyber-yellow/10 h-px"></div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-cyber-yellow/10 via-cyber-yellow/20 to-cyber-yellow/10 h-px"></div>

                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-cyber-red mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-cyber-yellow mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-cyber-green mr-2"></div>
                  <div className="flex-1 text-center text-xs text-white/50">MANIFESTO.txt</div>
                </div>

                <div className="terminal-text">
                  <p className="mb-4 text-white/80 overflow-hidden whitespace-nowrap border-r-4 border-cyber-yellow animate-typing animate-blink">
                    <span className="text-cyber-yellow">$</span> ./initialize_manifesto
                  </p>

                  <div 
                    ref={manifestoRef} 
                    className="space-y-1 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-2 hide-scrollbar"
                    style={{ 
                      scrollBehavior: skipAnimation ? 'auto' : 'smooth'
                    }}
                  >
                    {/* Render each line of the manifesto */}
                    {manifestoContent.map((content, index) => renderLine(content, index))}
                    
                    {/* Show command prompt after all lines are visible */}
                    {isTypingComplete && (
                      <p className="text-white/90 animate-blink pt-2">
                        <span className="text-cyber-yellow">$</span> _
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Instructions for mobile */}
              <div className="text-center mt-6 text-white/50 text-xs font-mono">
                <p>Press Space or Enter to skip animation | <a href="https://x.com/i/communities/1920969888081862674" target="_blank" rel="noopener noreferrer" className="text-cyber-yellow hover:underline">Join X Community</a></p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </MotionConfig>
  );
}
