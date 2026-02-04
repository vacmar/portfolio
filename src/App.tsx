import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import Header from './components/Header';
import Hero from './components/Hero';
import WelcomeScreen from './components/WelcomeScreen';

// Lazy load heavy components
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Roadmaps = lazy(() => import('./components/Roadmaps'));
const Contact = lazy(() => import('./components/Contact'));
const MusicPlayer = lazy(() => import('./components/MusicPlayer'));

import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [startMusic, setStartMusic] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleEnterPortfolio = () => {
    setShowWelcome(false);
    setStartMusic(true);
  };

  // Track scroll position to show/hide scroll to top button
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Clear previous timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      // Throttle scroll events
      timeoutId = setTimeout(() => {
        const scrollTop = window.pageYOffset;
        
        // Show button after scrolling past hero section (500px)
        setShowScrollTop(scrollTop > 500);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ParallaxProvider>
      <div className="App">
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <WelcomeScreen 
              key="welcome"
              onEnter={handleEnterPortfolio}
            />
          ) : (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.6,
                ease: "easeInOut"
              }}
            >
              <Header />
              <main>
                <Hero />
                <Suspense fallback={<div className="section-loader" />}>
                  <About />
                  <Experience />
                  <Projects />
                  <Roadmaps />
                  <Contact />
                </Suspense>
              </main>
              
              {/* Only render MusicPlayer after welcome interaction */}
              <Suspense fallback={null}>
                {startMusic && <MusicPlayer shouldStart={true} />}
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && !showWelcome && (
            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaArrowUp />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </ParallaxProvider>
  );
}

export default App;
