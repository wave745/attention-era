import { useState, useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import { useGlitchStorm } from "@/hooks/use-key-sequence";
import { useAttentionScore } from "@/hooks/use-attention-score";
import { GlitchText } from "@/components/ui/glitch-text";
import { RGBSplitText } from "@/components/ui/rgb-split";
import { motionConfig } from "@/lib/motion-settings";

// Import original images
import meme1 from "@assets/Screenshot_20250509_214943_Chrome.jpg";
import meme2 from "@assets/image_1746830914986.png";
import meme3 from "@assets/image_1746831213205.png";
import meme4 from "@assets/image_1746832186179.png";
import memeGif from "@assets/we212eawdsa.gif";

// New meme paths - using URLs directly for public folder images
const newMeme1 = "/img/memes/photo_2025-05-12_12-25-14.jpg";
const newMeme2 = "/img/memes/photo_2025-05-12_12-25-12.jpg";
const newMeme3 = "/img/memes/photo_2025-05-12_12-25-11.jpg";
const newMeme4 = "/img/memes/photo_2025-05-12_12-25-10.jpg";
const newMeme5 = "/img/memes/photo_2025-05-12_12-25-08.jpg";
const newMeme6 = "/img/memes/photo_2025-05-12_12-25-07.jpg";
const newMeme7 = "/img/memes/photo_2025-05-12_12-25-05.jpg";
const newMeme8 = "/img/memes/photo_2025-05-12_12-25-04.jpg";
const newMeme9 = "/img/memes/photo_2025-05-12_12-25-02.jpg";
const newMeme10 = "/img/memes/photo_2025-05-12_12-25-00.jpg";

interface MemeItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function Memes() {
  const { isGlitchStormActive } = useGlitchStorm();
  const { incrementScore } = useAttentionScore();
  const [selectedMeme, setSelectedMeme] = useState<MemeItem | null>(null);

  // Track user interactions for attention score
  useEffect(() => {
    const handleInteraction = () => {
      incrementScore();
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("click", handleInteraction);
    window.addEventListener("scroll", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, [incrementScore]);

  // List of meme images
  const memes: MemeItem[] = [
    // Original memes
    { src: meme1, alt: "Social Media Immersion" },
    { src: meme2, alt: "Digital Consumption" },
    { src: meme3, alt: "Attention Economy" },
    { src: meme4, alt: "Distraction Cycle" },
    { src: memeGif, alt: "Attention Glitch GIF" },
    
    // New memes
    { src: newMeme1, alt: "Social Media Trap" },
    { src: newMeme2, alt: "Attention Theater" },
    { src: newMeme3, alt: "Engage - Don't Be a Slave" },
    { src: newMeme4, alt: "$ATTENTION Era Is Here" },
    { src: newMeme5, alt: "You Are Not The User" },
    { src: newMeme6, alt: "Digital Hypnosis" },
    { src: newMeme7, alt: "Social Media Addiction" },
    { src: newMeme8, alt: "Don't Be A Slave - Magenta" },
    { src: newMeme9, alt: "Attention Algorithm" },
    { src: newMeme10, alt: "Attention Era Is Upon Us" }
  ];

  // Function to open a meme in the modal
  const openMeme = (meme: MemeItem) => {
    setSelectedMeme(meme);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  // Function to close the modal
  const closeMeme = () => {
    setSelectedMeme(null);
    document.body.style.overflow = "auto"; // Restore scrolling
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
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10 sm:mb-16">
                <RGBSplitText>
                  <GlitchText element="h2" className="text-3xl sm:text-4xl font-bold mb-3">
                    <span className="text-cyber-magenta">ATTENTION</span> <span className="text-cyber-yellow">MEMES</span>
                  </GlitchText>
                </RGBSplitText>
                <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-cyber-yellow to-transparent mb-5"></div>
                <p className="text-white/70 max-w-2xl mx-auto font-mono">
                  Visual artifacts from the Attention Economy. Click on any image to enlarge.
                </p>
              </div>

              {/* Meme Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {memes.map((meme, index) => (
                  <motion.div
                    key={index}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => openMeme(meme)}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="overflow-hidden border border-cyber-cyan/30 bg-cyber-black/30 rounded-sm relative">
                      {/* Glitch border effect */}
                      <div className="absolute inset-0 border border-cyber-magenta/50 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-[1.01] mix-blend-screen"></div>
                      <div className="absolute inset-0 border border-cyber-cyan/50 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-[0.99] mix-blend-screen"></div>
                      
                      {/* Image */}
                      <img 
                        src={meme.src} 
                        alt={meme.alt}
                        className="w-full h-[200px] sm:h-[220px] object-cover hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Overlay on hover with glitchy scan effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-cyber-cyan/10 mix-blend-overlay"></div>
                        <div className="absolute inset-0 animate-scanline-fast opacity-30"></div>
                      </div>
                    </div>
                    
                    {/* Tag/Info bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-cyber-black/80 p-2 border-t border-cyber-cyan/20 transform translate-y-0 group-hover:border-cyber-cyan/40 transition-all duration-300">
                      <p className="text-cyber-cyan text-xs font-mono truncate">
                        <span className="opacity-50 mr-1">@</span>
                        {meme.alt}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Upload your own meme section */}
              <div className="mt-16 border border-dashed border-cyber-magenta/30 rounded-sm p-6 text-center bg-cyber-black/30">
                <GlitchText intensity="low" className="text-xl font-bold text-cyber-magenta mb-3">
                  Upload Your Own Meme
                </GlitchText>
                <p className="text-white/70 mb-4 max-w-xl mx-auto">
                  Have an ATTENTION meme to share? Join our X Community and share it with us.
                </p>
                <a 
                  href="https://x.com/i/communities/1920969888081862674" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-cyber-black text-cyber-magenta border border-cyber-magenta/40 px-4 py-2 hover:bg-cyber-magenta/10 transition-colors duration-300"
                >
                  <span>Join X Community</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7l10 10M7 17V7h10" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Modal for viewing enlarged memes */}
        {selectedMeme && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-black/90 backdrop-blur-md cursor-pointer"
            onClick={closeMeme}
          >
            <div className="relative max-w-4xl w-full p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="border-2 border-cyber-cyan/30 bg-cyber-black/80 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Border scanline effect */}
                <div className="absolute inset-0 border border-cyber-magenta/30 transform scale-[1.01] mix-blend-screen"></div>
                <div className="absolute inset-0 border border-cyber-cyan/30 transform scale-[0.99] mix-blend-screen"></div>
                
                {/* Close button */}
                <button 
                  className="absolute top-2 right-2 z-10 text-white/70 hover:text-cyber-magenta bg-cyber-black/60 w-8 h-8 flex items-center justify-center border border-cyber-magenta/30 hover:border-cyber-magenta"
                  onClick={closeMeme}
                >
                  ×
                </button>
                
                {/* Image */}
                <div className="flex justify-center items-center p-2">
                  <img 
                    src={selectedMeme.src} 
                    alt={selectedMeme.alt}
                    className="max-h-[80vh] max-w-full object-contain"
                  />
                </div>
                
                {/* Caption */}
                <div className="p-3 border-t border-cyber-cyan/20 bg-cyber-black/80 font-mono">
                  <p className="text-white/70 text-sm">{selectedMeme.alt}</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}