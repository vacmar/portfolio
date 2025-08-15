import React, { useRef, useEffect, useState } from 'react';
import './MusicPlayer.css';

interface MusicPlayerProps {
  shouldStart?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ shouldStart = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const tracks = [
    {
      name: "Ambient Focus",
      src: "/music/ambient-focus.mp3"
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldStart || hasAttempted) return;

    const startMusic = async () => {
      try {
        setHasAttempted(true);
        audio.volume = 1; // 100% volume for ambient background
        audio.loop = true;
        
        await audio.play();
        setIsPlaying(true);
        console.log("🎵 Ambient music started successfully! (532KB optimized)");
      } catch (error) {
        console.log("🔇 Music failed to start:", error);
        setIsPlaying(false);
        
        // Simple retry after a short delay
        setTimeout(async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            console.log("🎵 Music started on retry!");
          } catch (retryError) {
            console.log("🔇 Music failed on retry:", retryError);
            setIsPlaying(false);
          }
        }, 1000);
      }
    };

    startMusic();
  }, [shouldStart, hasAttempted]);

  return (
    <audio
      ref={audioRef}
      src={tracks[0].src}
      preload="auto"
      loop
      className="hidden-audio"
    />
  );
};

export default MusicPlayer;
