import React, { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '../hooks';
import './MusicPlayer.css';

interface MusicPlayerProps {
  shouldStart?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ shouldStart = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
    if (!isMobile) return;

    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        if (!audio.paused) {
          setWasPlayingBeforeHidden(true);
          audio.pause();
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingBeforeHidden) {
          audio.volume = isMobile ? 0.4 : 0.6;
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
      const audio = audioRef.current;
      if (!audio) return;

      if (!audio.paused) {
        setWasPlayingBeforeHidden(true);
        audio.pause();
        setIsPlaying(false);
      }
    };

    const handleFocus = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (wasPlayingBeforeHidden) {
        audio.volume = isMobile ? 0.4 : 0.6;
        audio.play().then(() => {
          setIsPlaying(true);
          setWasPlayingBeforeHidden(false);
        }).catch(error => {
          console.log("🔇 Failed to resume music on focus:", error);
          setWasPlayingBeforeHidden(false);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isMobile, wasPlayingBeforeHidden]);

  // Initialize audio settings
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMobile ? 0.4 : 0.6;
    audio.loop = true;
  }, [isMobile]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        console.log("⏸️ Music paused");
      } else {
        audio.volume = isMobile ? 0.4 : 0.6;
        await audio.play();
        setIsPlaying(true);
        console.log(`🎵 Music playing! Volume: ${isMobile ? '40%' : '60%'}`);
      }
    } catch (error) {
      console.log("❌ Error toggling music:", error);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={tracks[0].src}
        preload="auto"
        loop
        className="hidden-audio"
      />
      <div className="music-player">
        <button
          className="music-toggle"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause ambient music" : "Play ambient music"}
        >
          <div className="music-icon">
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                <rect x="14" y="4" width="4" height="16" fill="currentColor" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;
