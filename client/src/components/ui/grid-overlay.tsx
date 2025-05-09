import React from "react";

interface GridOverlayProps {
  className?: string;
  color?: string;
  spacing?: number;
  lineWidth?: number;
  opacity?: number;
}

export function GridOverlay({
  className = "",
  color = "rgba(0, 255, 255, 0.15)",
  spacing = 30,
  lineWidth = 0.5,
  opacity = 0.3
}: GridOverlayProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <div
        className="grid-x absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${color} ${lineWidth}px, transparent ${lineWidth}px)`,
          backgroundSize: `${spacing}px 100%`,
          backgroundPosition: "center"
        }}
      />
      <div
        className="grid-y absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${color} ${lineWidth}px, transparent ${lineWidth}px)`,
          backgroundSize: `100% ${spacing}px`,
          backgroundPosition: "center"
        }}
      />
    </div>
  );
}