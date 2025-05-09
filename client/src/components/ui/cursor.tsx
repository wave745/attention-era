import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [onLink, setOnLink] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const trailsRef = useRef<{ element: HTMLDivElement, position: { x: number, y: number } }[]>([]);
  const maxTrails = 8;
  
  // Create targeting reticle elements
  useEffect(() => {
    // Create trails container
    const trailContainer = document.createElement('div');
    trailContainer.classList.add('trail-container');
    trailContainer.style.position = 'fixed';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9998';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    document.body.appendChild(trailContainer);
    
    // Create reticle elements container
    const reticleContainer = document.createElement('div');
    reticleContainer.classList.add('reticle-container');
    reticleContainer.style.position = 'fixed';
    reticleContainer.style.pointerEvents = 'none';
    reticleContainer.style.zIndex = '9999';
    reticleContainer.style.top = '0';
    reticleContainer.style.left = '0';
    document.body.appendChild(reticleContainer);
    
    // Outer circle
    const outerCircle = document.createElement('div');
    outerCircle.classList.add('cursor-outer-circle');
    outerCircle.style.position = 'absolute';
    outerCircle.style.width = '50px';
    outerCircle.style.height = '50px';
    outerCircle.style.borderRadius = '50%';
    outerCircle.style.border = '1px dashed rgba(0, 255, 255, 0.4)';
    outerCircle.style.transform = 'translate(-50%, -50%)';
    outerCircle.style.transition = 'transform 0.1s ease-out';
    reticleContainer.appendChild(outerCircle);
    
    // Middle circle
    const middleCircle = document.createElement('div');
    middleCircle.classList.add('cursor-middle-circle');
    middleCircle.style.position = 'absolute';
    middleCircle.style.width = '30px';
    middleCircle.style.height = '30px';
    middleCircle.style.borderRadius = '50%';
    middleCircle.style.border = '1px solid rgba(0, 255, 255, 0.6)';
    middleCircle.style.transform = 'translate(-50%, -50%)';
    middleCircle.style.transition = 'transform 0.15s ease-out';
    reticleContainer.appendChild(middleCircle);
    
    // Crosshair horizontal
    const crosshairH = document.createElement('div');
    crosshairH.classList.add('cursor-crosshair-h');
    crosshairH.style.position = 'absolute';
    crosshairH.style.width = '20px';
    crosshairH.style.height = '1px';
    crosshairH.style.backgroundColor = 'rgba(0, 255, 255, 0.8)';
    crosshairH.style.transform = 'translate(-50%, -50%)';
    reticleContainer.appendChild(crosshairH);
    
    // Crosshair vertical
    const crosshairV = document.createElement('div');
    crosshairV.classList.add('cursor-crosshair-v');
    crosshairV.style.position = 'absolute';
    crosshairV.style.width = '1px';
    crosshairV.style.height = '20px';
    crosshairV.style.backgroundColor = 'rgba(0, 255, 255, 0.8)';
    crosshairV.style.transform = 'translate(-50%, -50%)';
    reticleContainer.appendChild(crosshairV);
    
    // Center dot
    const centerDot = document.createElement('div');
    centerDot.classList.add('cursor-center-dot');
    centerDot.style.position = 'absolute';
    centerDot.style.width = '4px';
    centerDot.style.height = '4px';
    centerDot.style.borderRadius = '50%';
    centerDot.style.backgroundColor = 'rgba(0, 255, 255, 1)';
    centerDot.style.transform = 'translate(-50%, -50%)';
    centerDot.style.boxShadow = '0 0 4px rgba(0, 255, 255, 0.8)';
    reticleContainer.appendChild(centerDot);
    
    // Coordinates display
    const coordinates = document.createElement('div');
    coordinates.classList.add('cursor-coordinates');
    coordinates.style.position = 'absolute';
    coordinates.style.fontSize = '8px';
    coordinates.style.fontFamily = 'monospace';
    coordinates.style.color = 'rgba(0, 255, 255, 0.6)';
    coordinates.style.transform = 'translate(15px, 15px)';
    reticleContainer.appendChild(coordinates);
    
    // Create trail elements
    for (let i = 0; i < maxTrails; i++) {
      const trail = document.createElement('div');
      trail.classList.add('cursor-trail');
      trail.style.position = 'absolute';
      trail.style.width = `${Math.max(3, 8 - i)}px`;
      trail.style.height = `${Math.max(3, 8 - i)}px`;
      trail.style.borderRadius = '50%';
      trail.style.backgroundColor = 'rgba(0, 255, 255, 0.6)';
      trail.style.opacity = `${0.7 - (i * 0.08)}`;
      trail.style.boxShadow = '0 0 4px rgba(0, 255, 255, 0.4)';
      trail.style.transform = 'translate(-50%, -50%)';
      trail.style.zIndex = `${9997 - i}`;
      trailContainer.appendChild(trail);
      
      trailsRef.current.push({
        element: trail,
        position: { x: 0, y: 0 }
      });
    }
    
    return () => {
      document.body.removeChild(trailContainer);
      document.body.removeChild(reticleContainer);
    };
  }, []);

  useEffect(() => {
    // Mouse positions history for trails
    const positions: { x: number, y: number }[] = [];
    
    const updatePosition = (e: MouseEvent) => {
      // Update current position
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!visible) {
        setVisible(true);
      }
      
      // Add current position to history
      positions.unshift({ x: e.clientX, y: e.clientY });
      
      // Trim history to maxTrails length
      if (positions.length > maxTrails) {
        positions.length = maxTrails;
      }
      
      // Update reticle elements
      const outerCircle = document.querySelector('.cursor-outer-circle') as HTMLElement;
      const middleCircle = document.querySelector('.cursor-middle-circle') as HTMLElement;
      const crosshairH = document.querySelector('.cursor-crosshair-h') as HTMLElement;
      const crosshairV = document.querySelector('.cursor-crosshair-v') as HTMLElement;
      const centerDot = document.querySelector('.cursor-center-dot') as HTMLElement;
      const coordinates = document.querySelector('.cursor-coordinates') as HTMLElement;
      
      if (outerCircle) {
        outerCircle.style.left = `${e.clientX}px`;
        outerCircle.style.top = `${e.clientY}px`;
        
        if (clicking) {
          outerCircle.style.transform = 'translate(-50%, -50%) scale(0.8)';
        } else {
          outerCircle.style.transform = 'translate(-50%, -50%) scale(1)';
        }
        
        if (glitching) {
          outerCircle.style.transform += ' translate(3px, -2px)';
        }
        
        if (onLink) {
          outerCircle.style.borderColor = 'rgba(255, 0, 102, 0.4)';
        } else {
          outerCircle.style.borderColor = 'rgba(0, 255, 255, 0.4)';
        }
      }
      
      if (middleCircle) {
        middleCircle.style.left = `${e.clientX}px`;
        middleCircle.style.top = `${e.clientY}px`;
        
        if (clicking) {
          middleCircle.style.transform = 'translate(-50%, -50%) scale(0.9)';
        } else {
          middleCircle.style.transform = 'translate(-50%, -50%) scale(1)';
        }
        
        if (glitching) {
          middleCircle.style.transform += ' translate(-2px, 2px)';
        }
        
        if (onLink) {
          middleCircle.style.borderColor = 'rgba(255, 0, 102, 0.6)';
        } else {
          middleCircle.style.borderColor = 'rgba(0, 255, 255, 0.6)';
        }
      }
      
      if (crosshairH) {
        crosshairH.style.left = `${e.clientX}px`;
        crosshairH.style.top = `${e.clientY}px`;
        
        if (glitching) {
          crosshairH.style.transform = 'translate(-50%, -50%) rotate(3deg)';
        } else {
          crosshairH.style.transform = 'translate(-50%, -50%)';
        }
        
        if (onLink) {
          crosshairH.style.backgroundColor = 'rgba(255, 0, 102, 0.8)';
        } else {
          crosshairH.style.backgroundColor = 'rgba(0, 255, 255, 0.8)';
        }
      }
      
      if (crosshairV) {
        crosshairV.style.left = `${e.clientX}px`;
        crosshairV.style.top = `${e.clientY}px`;
        
        if (glitching) {
          crosshairV.style.transform = 'translate(-50%, -50%) rotate(-3deg)';
        } else {
          crosshairV.style.transform = 'translate(-50%, -50%)';
        }
        
        if (onLink) {
          crosshairV.style.backgroundColor = 'rgba(255, 0, 102, 0.8)';
        } else {
          crosshairV.style.backgroundColor = 'rgba(0, 255, 255, 0.8)';
        }
      }
      
      if (centerDot) {
        centerDot.style.left = `${e.clientX}px`;
        centerDot.style.top = `${e.clientY}px`;
        
        if (glitching) {
          centerDot.style.opacity = '0.5';
        } else {
          centerDot.style.opacity = '1';
        }
        
        if (onLink) {
          centerDot.style.backgroundColor = 'rgba(255, 0, 102, 1)';
          centerDot.style.boxShadow = '0 0 4px rgba(255, 0, 102, 0.8)';
        } else {
          centerDot.style.backgroundColor = 'rgba(0, 255, 255, 1)';
          centerDot.style.boxShadow = '0 0 4px rgba(0, 255, 255, 0.8)';
        }
      }
      
      if (coordinates) {
        coordinates.style.left = `${e.clientX}px`;
        coordinates.style.top = `${e.clientY}px`;
        
        if (glitching) {
          coordinates.textContent = 'X: ERR | Y: ERR';
        } else {
          coordinates.textContent = `X: ${Math.round(e.clientX)} | Y: ${Math.round(e.clientY)}`;
        }
        
        if (onLink) {
          coordinates.style.color = 'rgba(255, 0, 102, 0.6)';
        } else {
          coordinates.style.color = 'rgba(0, 255, 255, 0.6)';
        }
      }
      
      // Update trail positions with delay effect
      trailsRef.current.forEach((trail, i) => {
        if (positions[i]) {
          trail.position = positions[i];
          trail.element.style.left = `${positions[i].x}px`;
          trail.element.style.top = `${positions[i].y}px`;
          
          if (onLink) {
            trail.element.style.backgroundColor = 'rgba(255, 0, 102, 0.6)';
            trail.element.style.boxShadow = '0 0 4px rgba(255, 0, 102, 0.4)';
          } else {
            trail.element.style.backgroundColor = 'rgba(0, 255, 255, 0.6)';
            trail.element.style.boxShadow = '0 0 4px rgba(0, 255, 255, 0.4)';
          }
        }
      });
      
      // Check if cursor is over a link
      const target = e.target as HTMLElement;
      const isLink = target.tagName === 'A' || 
                    target.tagName === 'BUTTON' || 
                    target.closest('a') !== null || 
                    target.closest('button') !== null ||
                    target.getAttribute('role') === 'button';
      
      setOnLink(isLink);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 150);
      }
    }, 2000);
    
    // Hide cursor when mouse is idle
    let timeout: NodeJS.Timeout;
    const resetTimeout = () => {
      clearTimeout(timeout);
      const reticleContainer = document.querySelector('.reticle-container') as HTMLElement;
      const trailContainer = document.querySelector('.trail-container') as HTMLElement;
      
      if (reticleContainer) reticleContainer.style.opacity = '1';
      if (trailContainer) trailContainer.style.opacity = '1';
      
      timeout = setTimeout(() => {
        if (reticleContainer) reticleContainer.style.opacity = '0';
        if (trailContainer) trailContainer.style.opacity = '0';
      }, 5000);
    };
    
    document.addEventListener('mousemove', resetTimeout);
    resetTimeout();
    
    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener('mousemove', resetTimeout);
      clearInterval(glitchInterval);
      clearTimeout(timeout);
    };
  }, [visible]);

  // Hide actual cursor
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Hide custom cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null;
  }

  // This component doesn't render anything visible
  // All cursor elements are created and managed via DOM in the useEffect
  return null;
}
