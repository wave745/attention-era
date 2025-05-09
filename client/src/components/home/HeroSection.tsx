import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GlitchText } from "@/components/ui/glitch-text";
import { RGBSplitText, RGBSplitImage } from "@/components/ui/rgb-split";
import { useAttentionScore } from "@/hooks/use-attention-score";

export default function HeroSection() {
  const { formattedScore } = useAttentionScore();

  return (
    <motion.header
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background image with cyberpunk cityscape */}
      <RGBSplitImage
        src="/attached_assets/we212eawdsa.gif"
        alt="A cyberpunk figure with VR headset and glitch effects"
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
      />
      
      <div className="relative z-30 text-center max-w-4xl">
        <motion.h1 
          className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 font-glitch"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <RGBSplitText>
            <GlitchText element="span" intensity="high">
              ATTENTION ERA
            </GlitchText>
          </RGBSplitText>
        </motion.h1>
        
        <motion.div 
          className="h-px w-48 sm:w-64 mx-auto bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mb-6"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        ></motion.div>
        
        <motion.p 
          className="text-xl sm:text-2xl font-light mb-8 font-sans max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <GlitchText>
            You are not the user. <span className="text-cyber-magenta">You are the used.</span>
          </GlitchText>
        </motion.p>
        
        <motion.div 
          id="attention-score" 
          className="text-xs opacity-60 mb-8 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <span className="text-cyber-green">Attention Score:</span> <span className="font-glitch animate-blink">{formattedScore}</span>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <Button
            asChild
            className="px-8 py-6 bg-cyber-cyan/20 hover:bg-cyber-cyan/40 border border-cyber-cyan text-cyber-cyan rounded-sm transition-colors duration-300 relative overflow-hidden group"
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
            className="px-8 py-6 bg-transparent hover:bg-cyber-magenta/20 border border-cyber-magenta text-cyber-magenta rounded-sm transition-colors duration-300"
          >
            <Link href="/manifesto">
              <GlitchText>READ MANIFESTO</GlitchText>
            </Link>
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <a href="#about" className="animate-bounce text-cyber-cyan">
          <i className="fas fa-chevron-down"></i>
        </a>
      </motion.div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] opacity-5 font-glitch pointer-events-none select-none z-0">
        <RGBSplitText>X</RGBSplitText>
      </div>
    </motion.header>
  );
}
