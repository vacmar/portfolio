import React, { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '../hooks';
import './MusicPlayer.css';

interface MusicPlayerProps {
  shouldStart?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ shouldStart = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false);
  const isMobile = useIsMobile();

  const tracks = [
    {
      name: "Ambient Focus",
      src: "/music/ambient-focus.mp3"
    }
  ];

  // Handle page visibility and focus changes for mobile/tablet
  useEffect(() => {
    if (!isMobile) return; // Only apply this behavior on mobile/tablet

    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        // Page is hidden (tab switched or app backgrounded)
        if (!audio.paused) {
          setWasPlayingBeforeHidden(true);
          audio.pause();
          setIsPlaying(false);
        }
      } else {
        // Page is visible again
        if (wasPlayingBeforeHidden) {
          audio.play().then(() => {
            setIsPlaying(true);
            setWasPlayingBeforeHidden(false);
          }).catch(error => {
            console.log("🔇 Failed to resume music:", error);
            setWasPlayingBeforeHidden(false);
          });
        }
      }
    };

    const handleBlur = () => {
      // Window lost focus (switched to another app)
      const audio = audioRef.current;
      if (!audio) return;

      if (!audio.paused) {
        setWasPlayingBeforeHidden(true);
        audio.pause();
        setIsPlaying(false);
      }
    };

    const handleFocus = () => {
      // Window gained focus
      const audio = audioRef.current;
      if (!audio) return;

      if (wasPlayingBeforeHidden) {
        audio.play().then(() => {
          setIsPlaying(true);
          setWasPlayingBeforeHidden(false);
        }).catch(error => {
          console.log("🔇 Failed to resume music on focus:", error);
          setWasPlayingBeforeHidden(false);
        });
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isMobile, wasPlayingBeforeHidden]);

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
