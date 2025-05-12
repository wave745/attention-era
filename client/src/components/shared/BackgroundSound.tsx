import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface BackgroundSoundProps {
  audioSrc: string;
  initialVolume?: number;
}

export function BackgroundSound({ 
  audioSrc, 
  initialVolume = 0.15 
}: BackgroundSoundProps) {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const attemptCountRef = useRef(0);

  // Set up the audio element on component mount
  useEffect(() => {
    // Use both methods for maximum compatibility
    
    // 1. Programmatic audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = initialVolume;
    audio.muted = muted;
    audio.autoplay = true;
    audioRef.current = audio;
    
    // 2. Get reference to the HTML audio element
    if (htmlAudioRef.current) {
      htmlAudioRef.current.volume = initialVolume;
      htmlAudioRef.current.muted = muted;
    }
    
    // Function to try playing the audio
    const tryPlayAudio = () => {
      if (!audioRef.current) return;
      
      // Try both methods
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay attempt failed:", error);
          
          // Try again with a delay, up to 5 times
          if (attemptCountRef.current < 5) {
            attemptCountRef.current++;
            setTimeout(tryPlayAudio, 1000);
          }
        });
      }
      
      // Also try to play the HTML audio element
      if (htmlAudioRef.current) {
        htmlAudioRef.current.play().catch(err => console.log("HTML audio play failed:", err));
      }
    };
    
    // Try to play immediately
    tryPlayAudio();
    
    // Also try to play on user interaction with the page (once)
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Play on interaction failed:", err));
      }
      
      if (htmlAudioRef.current) {
        htmlAudioRef.current.play().catch(err => console.log("HTML audio play on interaction failed:", err));
      }
      
      // Remove event listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    // Call play method on visibility change as well
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        tryPlayAudio();
      }
    });
    
    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('visibilitychange', () => {});
    };
  }, [audioSrc, initialVolume]);

  // Update audio when mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
    
    if (htmlAudioRef.current) {
      htmlAudioRef.current.muted = muted;
    }
  }, [muted]);

  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
  };

  // Render both control button and audio element
  return (
    <>
      {/* HTML Audio element directly in the DOM for maximum compatibility */}
      <audio 
        ref={htmlAudioRef}
        src={audioSrc}
        autoPlay
        loop
        muted={muted}
        style={{ display: 'none' }}
      />
      
      {/* Mute button control */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleMute}
          size="sm"
          variant="outline"
          className="p-2 bg-cyber-black/80 border border-cyber-cyan/40 hover:bg-cyber-dark hover:border-cyber-cyan"
        >
          {muted ? (
            <VolumeX className="w-4 h-4 text-cyber-cyan" />
          ) : (
            <Volume2 className="w-4 h-4 text-cyber-cyan" />
          )}
        </Button>
      </div>
    </>
  );
}