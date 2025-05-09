import { useState, useEffect } from "react";
import { Link } from "wouter";
import { GlitchText } from "@/components/ui/glitch-text";
import { RGBSplitText } from "@/components/ui/rgb-split";
import { motion } from "framer-motion";

export default function Footer() {
  const [timeOnPage, setTimeOnPage] = useState({ minutes: 0, seconds: 0 });
  const [isHoveringCommunity, setIsHoveringCommunity] = useState(false);
  
  // Time counter
  useEffect(() => {
    const startTime = new Date();
    
    const intervalId = setInterval(() => {
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = elapsedSeconds % 60;
      
      setTimeOnPage({ minutes, seconds });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Format time as MM:SS
  const formattedTime = `${timeOnPage.minutes.toString().padStart(2, '0')}:${timeOnPage.seconds.toString().padStart(2, '0')}`;
  
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-black border-t border-cyber-cyan/10 py-10 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KICA8cGF0aCBkPSJNMSAxaDQ4djQ4SDFWMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+CiAgPHBhdGggZD0iTTEwIDFWMTBNMjAgMVYxME0zMCAxVjEwTTQwIDFWMTBNMSAxMEgxME0xIDIwSDEwTTEgMzBIMTBNMSA0MEgxME0xMCAxMFYyMEgzMFYxME00MCAxMHYxMGgxMFYxME0xMCAxMEgyME0zMCAxMEg0ME0xMCAyMEgxTTEwIDIwVjMwTTEwIDMwdjEwTTEwIDQwdjlNMTAgNDBIMU0xMCAzMEgxTTEwIDMwSDIwTTEwIDQwSDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L3N2Zz4=')]
        opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo section */}
          <div className="text-center md:text-left">
            <Link href="/">
              <div className="inline-flex items-center space-x-2 group">
                <div className="relative w-5 h-5 border border-cyber-cyan/80 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-cyber-cyan/10"></div>
                  <div className="w-2.5 h-2.5 bg-cyber-cyan/80 rounded-full group-hover:bg-cyber-magenta transition-colors duration-300"></div>
                </div>
                <RGBSplitText element="span" className="text-lg font-bold tracking-wider">
                  <GlitchText element="span" intensity="low">
                    ATTENTION<span className="text-cyber-cyan">_ERA</span>
                  </GlitchText>
                </RGBSplitText>
              </div>
            </Link>
            <p className="mt-3 text-white/40 text-sm hidden md:block">
              An immersive cyberpunk experience
            </p>
          </div>
          
          {/* Community section */}
          <div className="text-center">
            <h4 className="text-white/70 text-sm uppercase mb-3 tracking-wider font-mono">Join Our Community</h4>
            <div className="flex justify-center space-x-5">
              <motion.a 
                href="https://x.com/i/communities/1920969888081862674" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
                aria-label="X Community"
                onMouseEnter={() => setIsHoveringCommunity(true)}
                onMouseLeave={() => setIsHoveringCommunity(false)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <div className={`p-3 bg-cyber-black border ${isHoveringCommunity ? 'border-cyber-cyan' : 'border-white/20'} rounded-sm transition-colors duration-300 relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      className="w-6 h-6 text-white group-hover:text-cyber-cyan transition-colors duration-300"
                      fill="currentColor"
                    >
                      <path d="M13.3 10.6c0 .5.2.9.5 1.2.4.3.7.5 1.2.5h2.6c.5 0 .9-.2 1.2-.5.3-.3.5-.7.5-1.2V7.6c0-.7.9-1 1.3-.5l5.3 5.3c.3.3.3.8 0 1.1l-5.3 5.3c-.4.4-1.3.1-1.3-.5v-3c0-.5-.2-.9-.5-1.2-.3-.3-.7-.5-1.2-.5h-2.6c-.5 0-.9.2-1.2.5-.3.3-.5.7-.5 1.2v3c0 .7-.9 1-1.3.5L6.7 13c-.3-.3-.3-.8 0-1.1l5.3-5.3c.4-.5 1.3-.2 1.3.5v3.5z"/>
                    </svg>
                    
                    {/* Glowing effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isHoveringCommunity ? 'bg-gradient-radial from-cyber-cyan/5 to-transparent' : ''}`}></div>
                  </div>
                  <span className="text-xs text-white/50 mt-2 group-hover:text-cyber-cyan transition-colors duration-300">X Community</span>
                </div>
                
                {/* Info tooltip on hover */}
                {isHoveringCommunity && (
                  <motion.div 
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-cyber-black/90 backdrop-blur-md border border-cyber-cyan/20 py-2 px-3 rounded-sm text-xs text-white/80 pointer-events-none"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Join our X Community
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyber-black/90 border-r border-b border-cyber-cyan/20 rotate-45"></div>
                  </motion.div>
                )}
              </motion.a>
            </div>
          </div>
          
          {/* Terminal section */}
          <div className="text-white/60 text-sm font-mono text-center md:text-right">
            <div className="bg-cyber-black/50 border border-cyber-dark p-3 inline-block min-w-[200px]">
              <div className="text-cyber-cyan mb-1">$ user_session</div>
              <div className="text-xs opacity-80 flex flex-col items-start">
                <span><span className="text-cyber-cyan">→</span> Connected: {formattedTime}</span>
                <span><span className="text-cyber-cyan">→</span> Status: Active</span>
                <span><span className="text-cyber-cyan">→</span> © {currentYear} ATTENTION_ERA</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-cyber-dark/60 text-center">
          <div className="text-white/30 text-xs font-sans flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p>You've been on this page for <span id="time-counter" className="text-cyber-cyan animate-pulse">{formattedTime}</span></p>
            <p className="hidden sm:block">|</p>
            <p>Your attention is being <span className="text-cyber-magenta">monetized</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
