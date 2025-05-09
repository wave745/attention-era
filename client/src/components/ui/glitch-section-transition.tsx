import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, type Variant } from 'framer-motion';

interface GlitchSectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  intensity?: 'low' | 'medium' | 'high';
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function GlitchSectionTransition({
  children,
  className = '',
  delay = 0,
  intensity = 'medium',
  direction = 'up'
}: GlitchSectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [hasTriggered, setHasTriggered] = useState(false);

  // Set intensity factors
  const intensityFactors = {
    low: { x: 5, y: 5, time: 0.3 },
    medium: { x: 10, y: 10, time: 0.5 },
    high: { x: 20, y: 20, time: 0.7 }
  };

  const factor = intensityFactors[intensity];
  
  // Define direction offsets
  const directionOffsets = {
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 }
  };
  
  const offset = directionOffsets[direction];

  // Create glitch animation sequence
  const glitchVariants: { [key: string]: Variant } = {
    initial: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: 'blur(0px) hue-rotate(0deg)'
    },
    glitchStart: {
      opacity: 0.5,
      x: offset.x / 2,
      y: offset.y / 2,
      filter: 'blur(4px) hue-rotate(45deg)',
      transition: { duration: 0.1 }
    },
    glitch1: {
      opacity: 0.7,
      x: factor.x,
      y: -factor.y / 2,
      filter: 'blur(2px) hue-rotate(90deg)',
      transition: { duration: 0.1 }
    },
    glitch2: {
      opacity: 0.8,
      x: -factor.x / 2,
      y: factor.y,
      filter: 'blur(0px) hue-rotate(180deg)',
      transition: { duration: 0.1 }
    },
    glitch3: {
      opacity: 0.9,
      x: factor.x / 3,
      y: -factor.y / 3,
      filter: 'blur(1px) hue-rotate(270deg)',
      transition: { duration: 0.1 }
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px) hue-rotate(0deg)',
      transition: { duration: 0.2 }
    }
  };

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
      
      // Sequence the animation with delay
      const sequence = async () => {
        // Initial delay
        if (delay) await new Promise(resolve => setTimeout(resolve, delay * 1000));
        
        // Glitch sequence
        await controls.start('glitchStart');
        await controls.start('glitch1');
        await controls.start('glitch2');
        await controls.start('glitch3');
        await controls.start('visible');
      };
      
      sequence();
    } else if (!isInView && hasTriggered) {
      // Reset when out of view (for non-once triggers)
      setHasTriggered(false);
      controls.start('initial');
    }
  }, [isInView, controls, delay, hasTriggered]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial="initial"
      animate={controls}
      variants={glitchVariants}
    >
      {children}
    </motion.div>
  );
}