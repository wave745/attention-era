import { useState, useEffect, useCallback } from "react";

export const useGlitchStorm = (targetSequence = "CHAOS") => {
  const [keySequence, setKeySequence] = useState("");
  const [isGlitchStormActive, setIsGlitchStormActive] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});
  const [glitchOverlayActive, setGlitchOverlayActive] = useState(false);
  const [glitchAudio, setGlitchAudio] = useState<HTMLAudioElement | null>(null);

  // Create audio element for glitch sound
  useEffect(() => {
    const audioElement = new Audio();
    audioElement.volume = 0.3;
    // Using a data URL for a short white noise sound
    audioElement.src = "data:audio/wav;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAABAAADQgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAA5TEFNRTMuOTlyAc0AAAAAAAAAABSAJAJAQgAAgAAAA0L2YLQxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
    setGlitchAudio(audioElement);
    
    return () => {
      audioElement.pause();
      audioElement.src = "";
    };
  }, []);

  // Create glitch overlay element
  useEffect(() => {
    // Create the glitch overlay element
    const overlayEl = document.createElement('div');
    overlayEl.className = 'glitch-storm-overlay';
    document.body.appendChild(overlayEl);
    
    // Update overlay class based on state
    const updateOverlay = () => {
      if (glitchOverlayActive) {
        overlayEl.classList.add('active');
      } else {
        overlayEl.classList.remove('active');
      }
    };
    
    // Initial setup
    updateOverlay();
    
    // Watch for changes
    const observer = new MutationObserver(() => {
      updateOverlay();
    });
    
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => {
      document.body.removeChild(overlayEl);
      observer.disconnect();
    };
  }, [glitchOverlayActive]);

  // Update key display elements in DOM
  useEffect(() => {
    // Update keyboard key highlights
    Object.keys(activeKeys).forEach(key => {
      const keyEl = document.getElementById(`key-${key.toLowerCase()}`);
      if (keyEl) {
        keyEl.className = 'key-highlight';
      }
    });
    
    // Listen for changes to activeKeys
    return () => {
      targetSequence.split('').forEach(key => {
        const keyEl = document.getElementById(`key-${key.toLowerCase()}`);
        if (keyEl) {
          keyEl.className = '';
        }
      });
    };
  }, [activeKeys, targetSequence]);

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
      
      // Update key displays
      const keyEl = document.getElementById(`key-${key.toLowerCase()}`);
      if (keyEl) {
        keyEl.className = 'key-highlight';
      }
    }
    
    // Check if sequence contains the target
    if ((keySequence + key).includes(targetSequence)) {
      setIsGlitchStormActive(true);
      setGlitchOverlayActive(true);
      
      // Play glitch sound effect
      if (glitchAudio && glitchAudio.paused) {
        glitchAudio.currentTime = 0;
        glitchAudio.play().catch(e => console.log("Audio playback failed:", e));
      }
      
      // Add ambient effects
      document.body.classList.add('glitch-active');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsGlitchStormActive(false);
        setGlitchOverlayActive(false);
        setActiveKeys({});
        document.body.classList.remove('glitch-active');
        
        // Reset key displays
        targetSequence.split('').forEach(k => {
          const keyEl = document.getElementById(`key-${k.toLowerCase()}`);
          if (keyEl) {
            keyEl.className = '';
          }
        });
      }, 5000);
      
      // Reset sequence
      setKeySequence("");
    }
  }, [keySequence, targetSequence, glitchAudio]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    isGlitchStormActive,
    glitchOverlayActive,
    activeKeys,
    targetSequence
  };
};
