import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollTriggerProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
  glitchOnReveal?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  once?: boolean;
}

export function ScrollTrigger({
  children,
  threshold = 0.2,
  className = '',
  glitchOnReveal = false,
  direction = 'up',
  delay = 0,
  once = true,
}: ScrollTriggerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we want it to trigger once and it's already visible, do nothing
        if (once && isVisible) return;
        
        // If the element is intersecting with the viewport, show it
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
        } else if (!once) {
          // If not once, hide it when it leaves viewport
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, isVisible, once, delay]);

  // Determine classes based on direction and if glitch effect is wanted
  const getDirectionClass = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translate-y-8 opacity-0';
        case 'down':
          return '-translate-y-8 opacity-0';
        case 'left':
          return 'translate-x-8 opacity-0';
        case 'right':
          return '-translate-x-8 opacity-0';
        default:
          return 'opacity-0';
      }
    }
    return 'translate-y-0 translate-x-0 opacity-100';
  };

  const directionClass = getDirectionClass();
  const glitchClass = glitchOnReveal && isVisible ? 'scroll-glitch revealed' : '';
  const visibilityClass = isVisible ? 'revealed' : '';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${directionClass} ${className} ${glitchClass} ${visibilityClass}`}
    >
      {children}
    </div>
  );
}

export function GlitchWord({
  text,
  className = '',
  splitWords = false,
  dataAttr = false,
}: {
  text: string;
  className?: string;
  splitWords?: boolean;
  dataAttr?: boolean;
}) {
  const words = splitWords ? text.split(' ') : [text];
  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <span 
            className="glitch-hover" 
            data-text={dataAttr ? word : undefined}
          >
            {word}
          </span>
          {index < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  );
}