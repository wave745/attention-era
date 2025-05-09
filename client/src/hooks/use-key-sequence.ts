import { useState, useEffect, useCallback } from "react";

export const useGlitchStorm = (targetSequence = "CHAOS") => {
  const [keySequence, setKeySequence] = useState("");
  const [isGlitchStormActive, setIsGlitchStormActive] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    
    setKeySequence(prev => {
      const updated = prev + key;
      // Limit sequence length
      return updated.slice(-10);
    });
    
    // Highlight the key if it's part of the target sequence
    if (targetSequence.includes(key)) {
      setActiveKeys(prev => ({ ...prev, [key]: true }));
    }
    
    // Check if sequence contains the target
    if ((keySequence + key).includes(targetSequence)) {
      setIsGlitchStormActive(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsGlitchStormActive(false);
        setActiveKeys({});
      }, 3000);
      
      // Reset sequence
      setKeySequence("");
    }
  }, [keySequence, targetSequence]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    isGlitchStormActive,
    activeKeys,
    targetSequence
  };
};
