import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/ui/glitch-text";
import { RGBSplitText } from "@/components/ui/rgb-split";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleReducedMotion, isReducedMotion } = useReducedMotion();

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "MANIFESTO", path: "/manifesto" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-40 border-b border-cyber-magenta/30 ${
      scrolled ? "bg-cyber-black/80 backdrop-blur-md" : "bg-transparent"
    } transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-6 h-6 border border-cyber-cyan rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-cyber-cyan rounded-full group-hover:bg-cyber-magenta transition-colors duration-300"></div>
          </div>
          <RGBSplitText element="span" className="text-xl font-bold tracking-wider">
            <GlitchText>ATTENTION</GlitchText>
          </RGBSplitText>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`text-sm hover:text-cyber-cyan transition-colors relative group ${
                location === link.path ? "text-cyber-cyan" : ""
              }`}
            >
              <GlitchText>{link.label}</GlitchText>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-cyber-cyan transition-all duration-300 ${
                location === link.path ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
          ))}
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-cyber-cyan hover:text-cyber-cyan/80 hover:bg-transparent"
            title={isReducedMotion ? "Enable animations" : "Reduce motion"}
            onClick={toggleReducedMotion}
          >
            <i className={`fas ${isReducedMotion ? "fa-eye" : "fa-universal-access"}`}></i>
          </Button>
        </div>
        
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost"
            size="icon"
            className="text-white hover:bg-transparent"
            onClick={toggleMenu}
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cyber-dark/90 backdrop-blur-md border-b border-cyber-magenta/30">
          <div className="px-4 py-3 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`block text-sm hover:text-cyber-cyan transition-colors ${
                  location === link.path ? "text-cyber-cyan" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <GlitchText>{link.label}</GlitchText>
              </Link>
            ))}
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-sm hover:bg-transparent"
              onClick={() => {
                toggleReducedMotion();
                setIsMenuOpen(false);
              }}
            >
              <i className={`fas ${isReducedMotion ? "fa-eye" : "fa-universal-access"} mr-2`}></i>
              {isReducedMotion ? "ENABLE ANIMATIONS" : "REDUCE MOTION"}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
