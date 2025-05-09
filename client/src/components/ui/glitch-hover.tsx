import React, { useState } from 'react';

interface GlitchHoverProps {
  children: React.ReactNode;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlitchHover({
  children,
  className = '',
  element = 'span',
  intensity = 'medium',
}: GlitchHoverProps) {
  const [isHovering, setIsHovering] = useState(false);
  const Element = element as any;
  
  // Extract text content from children to use in data-text attribute
  let textContent = '';
  if (typeof children === 'string') {
    textContent = children;
  } else if (React.isValidElement(children) && typeof children.props.children === 'string') {
    textContent = children.props.children;
  }
  
  // Set intensity class based on prop
  const intensityClass = intensity === 'low' 
    ? 'hover:text-opacity-90' 
    : intensity === 'high' 
      ? 'hover:animate-glitch-2'
      : '';
  
  return (
    <Element
      className={`glitch-hover ${intensityClass} ${className}`}
      data-text={textContent}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </Element>
  );
}