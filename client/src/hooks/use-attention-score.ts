import { useState, useCallback, useEffect } from "react";

export const useAttentionScore = () => {
  const [score, setScore] = useState(37286.19);
  
  // Randomly adjust score when user interacts
  const incrementScore = useCallback(() => {
    if (Math.random() > 0.7) { // Only update sometimes to create unpredictability
      setScore(prevScore => prevScore + (Math.random() - 0.3) * 100);
    }
  }, []);
  
  // Also update randomly without user interaction
  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => prevScore + (Math.random() - 0.4) * 50);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format with dots separating number groups
  const formattedScore = score.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  return { score, formattedScore, incrementScore };
};
