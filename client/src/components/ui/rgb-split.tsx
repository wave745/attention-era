import React from "react";

interface RGBSplitImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function RGBSplitImage({ src, alt, className = "" }: RGBSplitImageProps) {
  return (
    <div 
      className={`rgb-split-img ${className}`} 
      style={{ backgroundImage: `url('${src}')` }}
      role="img" 
      aria-label={alt}
    />
  );
}

interface RGBSplitTextProps {
  children: React.ReactNode;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
}

export function RGBSplitText({ children, className = "", element = "span" }: RGBSplitTextProps) {
  const Element = element as any;
  
  return (
    <Element className={`rgb-split ${className}`}>
      {children}
    </Element>
  );
}
