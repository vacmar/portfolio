import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
  const [fullscreenAttempted, setFullscreenAttempted] = useState(false);
  const [isCurrentlyFullscreen, setIsCurrentlyFullscreen] = useState(false);

  // Detect if user is on desktop
  React.useEffect(() => {
    const checkIfDesktop = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
      const isDesktopSize = window.innerWidth > 1024;
      
      setIsDesktop(!isMobile && !isTablet && isDesktopSize);
      
      // Show fullscreen prompt for desktop users who aren't already in fullscreen
      if (!isMobile && !isTablet && isDesktopSize && !document.fullscreenElement) {
        setShowFullscreenPrompt(true);
      }
    };

    // Reset fullscreen attempts on page load/refresh
    setFullscreenAttempted(false);
    setIsCurrentlyFullscreen(!!document.fullscreenElement);

    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    
    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setIsCurrentlyFullscreen(isFullscreen);
      
      if (isFullscreen) {
        setShowFullscreenPrompt(false);
        setFullscreenAttempted(true);
      } else {
        // Reset fullscreen attempt when user exits, so it can be tried again
        // This is especially important for mobile where users might exit and want to re-enter
        setTimeout(() => {
          setFullscreenAttempted(false);
          // Re-show prompt if appropriate
          if (isDesktop && !document.fullscreenElement) {
            setShowFullscreenPrompt(true);
          }
        }, 1000);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('resize', checkIfDesktop);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Request fullscreen function with better cross-browser support
  const requestFullscreen = async () => {
    if (fullscreenAttempted || document.fullscreenElement) {
      return;
    }

    try {
      const element = document.documentElement;
      
      // Check if fullscreen is supported
      if (!element.requestFullscreen && 
          !(element as any).webkitRequestFullscreen && 
          !(element as any).mozRequestFullScreen && 
          !(element as any).msRequestFullscreen) {
        console.log('Fullscreen not supported on this device/browser');
        setFullscreenAttempted(true);
        setShowFullscreenPrompt(false);
        return;
      }
      
      // For mobile devices, try different approaches
      if (!isDesktop) {
        // Try mobile-specific fullscreen methods
        if ((element as any).webkitRequestFullscreen) {
          // Safari/iOS specific - try with parameters
          await (element as any).webkitRequestFullscreen((Element as any).ALLOW_KEYBOARD_INPUT);
        } else if (element.requestFullscreen) {
          // Standard method with options for mobile
          await element.requestFullscreen({ 
            navigationUI: "hide",
          });
        } else {
          // Alternative approach for mobile: try to enter fullscreen on body
          const body = document.body;
          if ((body as any).webkitRequestFullscreen) {
            await (body as any).webkitRequestFullscreen();
          } else if ((body as any).requestFullscreen) {
            await (body as any).requestFullscreen({ navigationUI: "hide" });
          } else {
            // Last resort: try to hide address bar and create immersive feel
            if (window.innerHeight < window.screen.height) {
              window.scrollTo(0, 1);
              setTimeout(() => {
                window.scrollTo(0, 0);
                // Try to trigger minimal-ui mode
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                  const originalContent = viewport.getAttribute('content');
                  viewport.setAttribute('content', originalContent + ', minimal-ui');
                  setTimeout(() => {
                    viewport.setAttribute('content', originalContent || '');
                  }, 1000);
                }
              }, 100);
            }
          }
        }
      } else {
        // Desktop fullscreen
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if ((element as any).webkitRequestFullscreen) {
          await (element as any).webkitRequestFullscreen();
        } else if ((element as any).mozRequestFullScreen) {
          await (element as any).mozRequestFullScreen();
        } else if ((element as any).msRequestFullscreen) {
          await (element as any).msRequestFullscreen();
        }
      }
      
      setFullscreenAttempted(true);
      setShowFullscreenPrompt(false);
    } catch (error) {
      console.log('Fullscreen request failed:', error);
      // For mobile, if fullscreen fails, at least try to minimize browser UI
      if (!isDesktop) {
        try {
          window.scrollTo(0, 1);
          setTimeout(() => window.scrollTo(0, 0), 100);
        } catch (scrollError) {
          console.log('Mobile scroll attempt failed:', scrollError);
        }
      }
      setFullscreenAttempted(true);
      setShowFullscreenPrompt(false);
    }
  };

  // Prevent scrolling and spacebar default behavior
  React.useEffect(() => {
    // Add class to body and html to hide scroll
    document.body.classList.add('welcome-active');
    document.documentElement.classList.add('welcome-active');
    
    // Prevent all scroll-related events
    const preventScrollEvents = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    const preventKeyScroll = (e: KeyboardEvent) => {
      // Prevent spacebar, arrow keys, page up/down from scrolling
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    
    // Block all scroll events
    document.addEventListener('scroll', preventScrollEvents, { passive: false });
    document.addEventListener('wheel', preventScrollEvents, { passive: false });
    document.addEventListener('touchmove', preventScrollEvents, { passive: false });
    document.addEventListener('keydown', preventKeyScroll);
    
    // Cleanup
    return () => {
      document.body.classList.remove('welcome-active');
      document.documentElement.classList.remove('welcome-active');
      document.removeEventListener('scroll', preventScrollEvents);
      document.removeEventListener('wheel', preventScrollEvents);
      document.removeEventListener('touchmove', preventScrollEvents);
      document.removeEventListener('keydown', preventKeyScroll);
    };
  }, []);

  const handleInteraction = async () => {
    // Always try to enable fullscreen on any interaction (works better on mobile)
    // Reset attempt flag if we're not currently in fullscreen to allow re-entry
    if (!document.fullscreenElement) {
      if (fullscreenAttempted) {
        // Reset the flag to allow another attempt (important for mobile)
        setFullscreenAttempted(false);
      }
      await requestFullscreen();
    }
    
    // Add a small delay to ensure fullscreen request is processed
    setTimeout(() => {
      setIsExiting(true);
      // Remove body class immediately when exiting
      document.body.classList.remove('welcome-active');
      document.documentElement.classList.remove('welcome-active');
      // Delay the callback to allow exit animation
      setTimeout(() => {
        onEnter();
      }, 1000);
    }, 100); // Small delay to let fullscreen activate
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="welcome-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ scale: 20, opacity: 0 }}
          transition={{ 
            opacity: { duration: 0.3 },
            scale: { duration: 1, ease: "easeInOut" }
          }}
          onClick={handleInteraction}
          onTouchEnd={handleInteraction}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleInteraction()}
          tabIndex={0}
        >
          <div className="welcome-content">
            {/* Welcome message */}
            <motion.h1
              className="welcome-message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Welcome to my Portfolio and to Experience
              <span className="typing-cursor">|</span>
            </motion.h1>

            {/* Interactive prompt */}
            <motion.div
              className="interaction-prompt"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              {/* Fullscreen prompt for desktop - FIRST (1.2s) */}
              {showFullscreenPrompt && isDesktop && !fullscreenAttempted && (
                <motion.div
                  className="fullscreen-prompt"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                >
                  <div className="fullscreen-text">
                    Will enter fullscreen for immersive experience
                  </div>
                  <div className="fullscreen-keys">
                    <kbd>F11</kbd> to toggle • <kbd>Esc</kbd> to exit
                  </div>
                </motion.div>
              )}
              
              {/* Universal fullscreen hint for mobile - FIRST (1.2s) */}
              {!isDesktop && !fullscreenAttempted && (
                <motion.div
                  className="mobile-fullscreen-hint"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                >
                  <div className="mobile-hint-text">
                    Will attempt immersive mode for best experience
                  </div>
                </motion.div>
              )}
              
              {/* Ambient audio alert - SECOND (1.5s) */}
              <motion.div
                className="audio-alert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.5 }}
              >
                (ambient audio alert)
              </motion.div>
              
              {/* Interact to start - THIRD/LAST (1.8s) */}
              <motion.div
                className="prompt-text"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1,
                  scale: [0.8, 1, 1.05, 1],
                }}
                transition={{ 
                  duration: 0.5,
                  delay: 1.8,
                  scale: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.7, 1]
                  }
                }}
              >
                Interact to start
              </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <div className="welcome-decorations">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="decoration-dot"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 2 + i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1.5
                  }}
                />
              ))}
            </div>
          </div>

          {/* Background gradient animation */}
          <motion.div
            className="welcome-bg-gradient"
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, #9333ea 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, #9333ea 0%, transparent 50%)",
                "radial-gradient(circle at 40% 40%, #9333ea 0%, transparent 50%)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      ) : (
        // Exit animation - simple fade to black
        <motion.div
          className="welcome-screen exiting"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ 
            duration: 0.6,
            ease: "easeInOut"
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
