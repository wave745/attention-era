import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
  muted?: boolean;
}

export function AudioPlayer({
  src,
  autoPlay = true,
  loop = true,
  volume = 0.15,
  muted = false
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);

  // Initialize audio player
  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.loop = loop;
    audio.volume = volume;
    audio.muted = muted;

    // Set up event listeners
    audio.addEventListener('ended', handleAudioEnded);
    
    // Try to play on mount if autoPlay is true
    if (autoPlay) {
      playAudio();
    }
    
    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [src, autoPlay, loop, volume, muted]);

  // Handle audio ended event
  const handleAudioEnded = () => {
    if (!loop) {
      setIsPlaying(false);
    }
  };

  // Play audio method
  const playAudio = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      // This promise might be rejected if user hasn't interacted with the document
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Auto-play was prevented, we'll need user interaction
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  // Pause audio method
  const pauseAudio = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  // Toggle mute method
  const toggleMute = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.muted = !audioElement.muted;
      setIsMuted(!isMuted);
    }
  };

  // Update volume method
  const updateVolume = (newVolume: number) => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = Math.min(1, Math.max(0, newVolume));
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Expose public methods (if needed for external control)
  return null; // This is a headless component, no UI is rendered
}