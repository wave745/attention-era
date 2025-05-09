import { useState, useEffect } from "react";
import { useGlitch } from "@/hooks/use-glitch";

type GlitchTextProps = {
  children: React.ReactNode;
  element?: keyof JSX.IntrinsicElements;
  className?: string;
  intensity?: "low" | "medium" | "high";
  rgb?: boolean;
};

export function GlitchText({
  children,
  element = "span",
  className = "",
  intensity = "medium",
  rgb = false,
}: GlitchTextProps) {
  const Element = element as any;
  const { applyGlitch } = useGlitch();
  const [isGlitching, setIsGlitching] = useState(false);

  // Periodically trigger glitch effect
  useEffect(() => {
    const intervalTime = {
      low: { min: 5000, max: 10000 },
      medium: { min: 3000, max: 7000 },
      high: { min: 1000, max: 3000 },
    }[intensity];

    const getRandomInterval = () => 
      Math.floor(Math.random() * (intervalTime.max - intervalTime.min + 1)) + intervalTime.min;

    const triggerGlitch = () => {
      setIsGlitching(true);
      
      setTimeout(() => {
        setIsGlitching(false);
      }, Math.random() * 500 + 200); // Glitch duration varies between 200-700ms
    };

    // Initial glitch with delay
    const initialTimeout = setTimeout(triggerGlitch, Math.random() * 1000);
    
    // Set up interval for periodic glitching
    let interval: NodeJS.Timeout;
    
    const scheduleNextGlitch = () => {
      interval = setTimeout(() => {
        triggerGlitch();
        scheduleNextGlitch();
      }, getRandomInterval());
    };
    
    scheduleNextGlitch();

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(interval);
    };
  }, [intensity]);

  const glitchClass = applyGlitch(isGlitching);
  const rgbClass = rgb ? "rgb-split" : "";

  return (
    <Element className={`glitch-text ${glitchClass} ${rgbClass} ${className}`}>
      {children}
    </Element>
  );
}
