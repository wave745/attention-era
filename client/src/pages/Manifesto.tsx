import { useState, useEffect, useRef } from "react";
import { motion, MotionConfig } from "framer-motion";
import { useGlitchStorm } from "@/hooks/use-key-sequence";
import { useAttentionScore } from "@/hooks/use-attention-score";
import { GlitchText } from "@/components/ui/glitch-text";
import { motionConfig } from "@/lib/motion-settings";

export default function Manifesto() {
  const { isGlitchStormActive } = useGlitchStorm();
  const { incrementScore } = useAttentionScore();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
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
    "The Attention Era is upon us. Every second of your mental focus has become a commodity.",
    "Your consciousness is being parceled, packaged, and sold to the highest bidder.",
    "This is not paranoia. This is not conspiracy. This is the business model of the digital age.",
    {
      text: "We declare the following truths to be self-evident:",
      color: "text-cyber-yellow",
    },
    {
      type: "list",
      items: [
        "Your attention is finite. It is your most valuable resource.",
        "The platforms we use are not designed to serve us; they are designed to capture and monetize our focus.",
        "Psychological manipulation at scale has become the default business strategy.",
        "The capacity for independent thought is endangered by algorithmic curation.",
        "Privacy is not a luxury—it is a necessity for mental autonomy.",
      ],
    },
    {
      text: "What we propose:",
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
      text: "Join us. Reclaim your mind. The revolution will not be monetized.",
      color: "text-cyber-green",
    },
  ];

  // Start typing effect when component mounts
  useEffect(() => {
    let currentIndex = 0;
    let lineDisplayInterval: NodeJS.Timeout;

    const startTyping = () => {
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
        }
      }, 2000); // Adjust typing speed here
    };

    // Start with a slight delay
    const initialTimeout = setTimeout(() => {
      startTyping();
    }, 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(lineDisplayInterval);
    };
  }, []);

  // Render a line of the manifesto
  const renderLine = (content: any, index: number) => {
    if (typeof content === "string") {
      return (
        <p key={index} className={`text-white/90 mb-4 ${visibleLines.includes(index) ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          {content}
        </p>
      );
    } else if (content.type === "list") {
      return (
        <ul key={index} className={`list-disc pl-6 space-y-2 mb-4 ${visibleLines.includes(index) ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          {content.items.map((item: string, i: number) => (
            <li key={i} className="text-white/90">
              {item}
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <p key={index} className={`${content.color} mb-4 ${visibleLines.includes(index) ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
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
          className="relative py-24 bg-cyber-dark min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <GlitchText element="h2" className="text-3xl sm:text-4xl font-bold mb-3">
                  THE <span className="text-cyber-yellow">MANIFESTO</span>
                </GlitchText>
                <div className="h-px w-24 mx-auto bg-cyber-yellow mb-3"></div>
              </div>

              <div className="font-mono bg-cyber-black/60 p-6 border border-cyber-yellow/20 relative">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-cyber-yellow/10 via-cyber-yellow/20 to-cyber-yellow/10 h-px"></div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-cyber-yellow/10 via-cyber-yellow/20 to-cyber-yellow/10 h-px"></div>

                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-cyber-red mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-cyber-yellow mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-cyber-green mr-2"></div>
                  <div className="flex-1 text-center text-xs text-white/50">MANIFESTO.txt</div>
                </div>

                <div className="terminal-text">
                  <p className="mb-6 text-white/80 overflow-hidden whitespace-nowrap border-r-4 border-cyber-yellow animate-typing animate-blink">
                    <span className="text-cyber-yellow">$</span> ./initialize_manifesto
                  </p>

                  <div ref={manifestoRef} className="space-y-1 max-h-[60vh] overflow-y-auto">
                    {manifestoContent.map((content, index) => renderLine(content, index))}
                    
                    {visibleLines.length === manifestoContent.length && (
                      <p className="text-white/90 animate-blink">
                        <span className="text-cyber-yellow">$</span> _
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </MotionConfig>
  );
}
