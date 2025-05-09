import { useState, useEffect } from "react";
import { Link } from "wouter";
import { GlitchText } from "@/components/ui/glitch-text";

export default function Footer() {
  const [timeOnPage, setTimeOnPage] = useState({ minutes: 0, seconds: 0 });
  
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
    <footer className="bg-cyber-black border-t border-cyber-magenta/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-4 h-4 border border-cyber-cyan rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-cyber-cyan rounded-full"></div>
              </div>
              <span className="text-lg font-bold tracking-wider">ATTENTION<span className="text-cyber-cyan">ERA</span></span>
            </Link>
          </div>
          
          <div className="flex space-x-6 text-white/50 mb-6 md:mb-0">
            <a href="https://x.com" aria-label="X.com" className="hover:text-cyber-cyan transition-colors">
              <i className="fab fa-brands fa-x-twitter"></i>
            </a>
          </div>
          
          <div className="text-white/50 text-sm font-mono">
            <div>
              <span className="text-cyber-cyan">$</span> echo "© {currentYear} ATTENTION ERA // ALL RIGHTS RESERVED"
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-cyber-dark/60 text-center text-white/30 text-xs font-sans">
          <p>You've been on this page for <span id="time-counter" className="text-cyber-cyan">{formattedTime}</span>. Your attention is valuable.</p>
        </div>
      </div>
    </footer>
  );
}
