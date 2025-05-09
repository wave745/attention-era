import { useCallback } from "react";

interface GlitchOptions {
  intensity?: "low" | "medium" | "high";
}

export const useGlitch = (options: GlitchOptions = {}) => {
  const { intensity = "medium" } = options;

  const intensityClasses = {
    low: "animate-glitch-1",
    medium: "animate-glitch-1",
    high: "animate-glitch-2",
  };

  const applyGlitch = useCallback((isActive: boolean) => {
    if (!isActive) return '';
    return intensityClasses[intensity];
  }, [intensity]);

  return { applyGlitch };
};
