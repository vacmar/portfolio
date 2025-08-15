import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);

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

  const handleInteraction = () => {
    setIsExiting(true);
    // Remove body class immediately when exiting
    document.body.classList.remove('welcome-active');
    document.documentElement.classList.remove('welcome-active');
    // Delay the callback to allow exit animation
    setTimeout(() => {
      onEnter();
    }, 1000); // Reduced for simple fade transition
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
            opacity: { duration: 0.5 },
            scale: { duration: 1.5, ease: "easeInOut" }
          }}
          onClick={handleInteraction}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleInteraction()}
          onTouchStart={handleInteraction}
          tabIndex={0}
        >
          <div className="welcome-content">
            {/* Welcome message */}
            <motion.h1
              className="welcome-message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Welcome to my Portfolio and to Experience
              <span className="typing-cursor">|</span>
            </motion.h1>

            {/* Interactive prompt */}
            <motion.div
              className="interaction-prompt"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <motion.div
                className="prompt-text"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Interact to start
              </motion.div>
              
              {/* Ambient audio alert */}
              <motion.div
                className="audio-alert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                (ambient audio alert)
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
                    duration: 0.5,
                    delay: 3 + i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2
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
              duration: 6,
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
            duration: 1,
            ease: "easeInOut"
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
