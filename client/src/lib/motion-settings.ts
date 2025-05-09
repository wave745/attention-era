import { MotionConfigProps } from "framer-motion";
import { useReducedMotion } from "../hooks/use-reduced-motion";

// Default motion configuration for consistency across components
export const motionConfig: MotionConfigProps = {
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
  // Disable animations automatically for users with reduced motion preferences
  // This is just the default, but components should also check useReducedMotion
  reducedMotion: "user",
};

// Motion variants for common animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const glitchAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    x: [0, -2, 2, -2, 0],
    y: [0, 1, -1, 1, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 0.2,
        ease: "easeInOut"
      },
      y: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }
};

// Create a custom hook that merges user's reduced motion preference into animation settings
export const useMotionSettings = () => {
  const { isReducedMotion } = useReducedMotion();
  
  return {
    ...motionConfig,
    transition: isReducedMotion 
      ? { duration: 0 } // No animation when reduced motion is enabled
      : motionConfig.transition
  };
};
