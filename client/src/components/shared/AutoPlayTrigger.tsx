import { useEffect, useRef } from 'react';

export function AutoPlayTrigger() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    // Simulate a user interaction to enable autoplay
    const simulateUserInteraction = () => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    };
    
    // Try immediately
    simulateUserInteraction();
    
    // And try again after a short delay, sometimes needed for mobile browsers
    const timerId = setTimeout(simulateUserInteraction, 500);
    
    return () => clearTimeout(timerId);
  }, []);
  
  return (
    <button 
      ref={buttonRef}
      style={{ 
        position: 'absolute', 
        opacity: 0, 
        pointerEvents: 'none',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}
      aria-hidden="true"
    />
  );
}