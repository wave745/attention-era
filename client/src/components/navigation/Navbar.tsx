import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/ui/glitch-text";
import { RGBSplitText } from "@/components/ui/rgb-split";
import { motion, AnimatePresence } from "framer-motion";
import { 
  EyeIcon, 
  MenuIcon, 
  XIcon, 
  EyeOffIcon, 
  HomeIcon, 
  FileTextIcon, 
  ExternalLinkIcon
} from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleReducedMotion, isReducedMotion } = useReducedMotion();
  const [logoHovered, setLogoHovered] = useState(false);

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", path: "/", icon: HomeIcon },
    { label: "MANIFESTO", path: "/manifesto", icon: FileTextIcon },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logo animation variants
  const logoVariants = {
    normal: { 
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  // Mobile menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Navbar background classes based on scroll position
  const navbarBgClasses = scrolled 
    ? "bg-cyber-black/80 backdrop-blur-md border-cyber-cyan/20" 
    : "bg-transparent border-transparent";

  // Reveal glitch effect when scrolling down
  const navbarGlitchEffect = scrolled ? "nav-scrolled" : "";

  return (
    <nav 
      className={`fixed top-0 w-full z-40 border-b ${navbarBgClasses} transition-all duration-300 ${navbarGlitchEffect}`}
      style={{ 
        boxShadow: scrolled ? '0 0 20px rgba(0, 255, 255, 0.05)' : 'none' 
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div 
            className="flex items-center space-x-3 group" 
            variants={logoVariants}
            initial="normal"
            animate={logoHovered ? "hover" : "normal"}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <div className="relative w-8 h-8 border border-cyber-cyan rounded-full flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-cyber-cyan/10"></div>
              <div className="w-4 h-4 bg-cyber-cyan/80 rounded-full group-hover:bg-cyber-magenta transition-colors duration-300"></div>
              <div className="absolute inset-0 bg-gradient-radial from-cyber-cyan/20 to-transparent opacity-60"></div>
            </div>
            
            <RGBSplitText element="span" className="text-xl font-bold tracking-wider hidden sm:block">
              <GlitchText element="span" intensity={scrolled ? "medium" : "low"} className="animate-neon">
                ATTENTION_ERA
              </GlitchText>
            </RGBSplitText>
            
            <RGBSplitText element="span" className="text-xl font-bold tracking-wider block sm:hidden">
              <GlitchText element="span" intensity={scrolled ? "medium" : "low"} className="animate-neon">
                AE
              </GlitchText>
            </RGBSplitText>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm relative group transition-all duration-300 ${
                  location === link.path 
                    ? "text-cyber-cyan font-medium" 
                    : "text-white hover:text-cyber-cyan"
                }`}
              >
                <div className="flex items-center space-x-1">
                  <link.icon className="w-4 h-4" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                    <GlitchText 
                      intensity={location === link.path ? "medium" : "low"}
                    >
                      {link.label}
                    </GlitchText>
                  </span>
                </div>
                
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyber-cyan/60 to-cyber-cyan/80 transition-all duration-300 ${
                  location === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
                
                {location === link.path && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-cyber-cyan/30 animate-pulse"></span>
                )}
              </Link>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className={`border-cyber-cyan/30 text-sm text-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300 gap-2 group
              ${isReducedMotion ? 'bg-cyber-cyan/10' : ''}`
            }
            title={isReducedMotion ? "Enable animations" : "Reduce motion"}
            onClick={toggleReducedMotion}
          >
            {isReducedMotion ? (
              <>
                <EyeIcon className="w-4 h-4 group-hover:animate-pulse" />
                <span className="hidden sm:inline-block">ENABLE FX</span>
              </>
            ) : (
              <>
                <EyeOffIcon className="w-4 h-4 group-hover:animate-pulse" />
                <span className="hidden sm:inline-block">REDUCE FX</span>
              </>
            )}
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon"
            className="border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 transition-all"
            title={isReducedMotion ? "Enable animations" : "Reduce motion"}
            onClick={toggleReducedMotion}
          >
            {isReducedMotion ? (
              <EyeIcon className="w-4 h-4" />
            ) : (
              <EyeOffIcon className="w-4 h-4" />
            )}
          </Button>
          
          <Button 
            variant="outline"
            size="icon"
            className="border-cyber-magenta/30 hover:bg-cyber-magenta/10 text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <XIcon className="w-4 h-4 text-cyber-magenta" />
            ) : (
              <MenuIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-cyber-black/90 backdrop-blur-md border-b border-cyber-cyan/20 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="px-6 py-6 space-y-5">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`block transition-all duration-300 ${
                    location === link.path 
                      ? "text-cyber-cyan"
                      : "text-white hover:text-cyber-cyan"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <link.icon className="w-5 h-5" />
                    <GlitchText intensity="low" className="text-lg">
                      {link.label}
                    </GlitchText>
                  </div>
                </Link>
              ))}
              
              {/* Border with scanline effect */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent my-3">
                <div className="h-full w-full animate-scanline"></div>
              </div>
              
              {/* System info */}
              <div className="text-white/40 text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span>SYSTEM:</span>
                  <span className="text-cyber-cyan">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>MODE:</span>
                  <span className="text-cyber-cyan">{isReducedMotion ? "REDUCED" : "FULL"}</span>
                </div>
                <div className="flex justify-between">
                  <span>VERSION:</span>
                  <span className="text-cyber-cyan">1.0.2</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
