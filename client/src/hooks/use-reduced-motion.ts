import { useState, useEffect, useCallback } from "react";

export const useReducedMotion = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Check for system preference on initial load
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  // Toggle reduced motion state
  const toggleReducedMotion = useCallback(() => {
    setIsReducedMotion(prev => !prev);
  }, []);
  
  return { isReducedMotion, toggleReducedMotion };
};
