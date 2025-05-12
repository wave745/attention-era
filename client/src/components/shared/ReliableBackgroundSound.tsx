import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, ExternalLink } from "lucide-react";

interface ReliableBackgroundSoundProps {
  audioSrc: string;
  initialVolume?: number;
}

export function ReliableBackgroundSound({ 
  audioSrc, 
  initialVolume = 0.2
}: ReliableBackgroundSoundProps) {
  const [muted, setMuted] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [fallbackWindowOpen, setFallbackWindowOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fallbackWindowRef = useRef<Window | null>(null);
  
  // Create a direct audio element in the DOM - most compatible approach
  useEffect(() => {
    // Create a background audio element 
    const audio = document.createElement('audio');
    audio.src = audioSrc;
    audio.loop = true;
    audio.volume = initialVolume;
    audio.style.display = 'none';
    audio.id = 'background-audio';
    
    // Add to DOM
    document.body.appendChild(audio);
    audioRef.current = audio;
    
    // Try to play right away
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("Direct play failed, will need user interaction");
        setUseFallback(true);
      });
    }
    
    // Clean up function
    return () => {
      audio.pause();
      if (audio.parentNode) {
        audio.parentNode.removeChild(audio);
      }
      
      // Close fallback window if open
      if (fallbackWindowRef.current) {
        fallbackWindowRef.current.close();
      }
    };
  }, [audioSrc, initialVolume]);
  
  // Toggle mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);
  
  // Listen for messages from the helper window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'audioStarted') {
        console.log('Audio started in helper window');
        setUseFallback(false);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  
  // Function to open the helper window
  const openHelperWindow = () => {
    if (fallbackWindowRef.current) {
      fallbackWindowRef.current.focus();
      return;
    }
    
    const helperWindow = window.open('/audio-helper.html', 'audioHelper', 
      'width=400,height=300,resizable=yes,scrollbars=no,status=no');
      
    if (helperWindow) {
      fallbackWindowRef.current = helperWindow;
      setFallbackWindowOpen(true);
      
      helperWindow.addEventListener('beforeunload', () => {
        fallbackWindowRef.current = null;
        setFallbackWindowOpen(false);
      });
    }
  };
  
  // Try to play on any user interaction
  const handleUserInteraction = () => {
    if (audioRef.current && !audioRef.current.paused) {
      // Audio is already playing, just toggle mute
      setMuted(!muted);
    } else if (audioRef.current) {
      // Try to play the audio
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setUseFallback(false);
          })
          .catch(() => {
            setUseFallback(true);
          });
      }
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
      {useFallback && !fallbackWindowOpen && (
        <Button
          onClick={openHelperWindow}
          size="sm"
          variant="outline"
          className="bg-cyber-black/80 border border-cyber-magenta text-cyber-magenta hover:bg-cyber-dark hover:text-white animate-pulse"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          <span className="text-xs">Enable Sound</span>
        </Button>
      )}
      
      <Button
        onClick={handleUserInteraction}
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
  );
}