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
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set up the audio element on component mount
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = initialVolume;
    audio.muted = muted;
    audioRef.current = audio;
    
    // Try to play immediately for browsers that allow it
    if (hasInteracted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
          setPermissionGranted(false);
        });
      }
    }
    
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audioSrc, initialVolume, hasInteracted]);

  // Update audio when mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  // Handle user interaction to enable audio
  const handleEnableAudio = () => {
    setHasInteracted(true);
    
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPermissionGranted(true);
          })
          .catch(error => {
            console.log("Playback failed:", error);
            setPermissionGranted(false);
          });
      }
    }
  };

  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
  };

  // Only show the audio control when permission is granted or user has interacted
  return (
    <>
      {!hasInteracted ? (
        <div className="fixed bottom-16 right-4 z-50 animate-pulse">
          <Button 
            onClick={handleEnableAudio}
            size="sm"
            variant="outline"
            className="bg-cyber-black/80 border border-cyber-magenta/40 hover:bg-cyber-dark hover:border-cyber-magenta text-white"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            <span className="text-xs">Enable Sound</span>
          </Button>
        </div>
      ) : permissionGranted || audioRef.current?.currentTime ? (
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
      ) : null}
    </>
  );
}