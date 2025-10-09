import React, { useState, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Roadmaps from './components/Roadmaps';
import Contact from './components/Contact';
import MusicPlayer from './components/MusicPlayer';
import WelcomeScreen from './components/WelcomeScreen';

// Import Projects separately to isolate the issue
import Projects from './components/Projects';

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
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          const windowHeight = window.innerHeight;
          
          // Show button right after passing the home/hero section (1 full viewport height)
          setShowScrollTop(scrollTop > windowHeight);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
                <About />
                <Experience />
                <Projects />
                <Roadmaps />
                <Contact />
              </main>
              
              {/* Only render MusicPlayer after welcome interaction */}
              {startMusic && <MusicPlayer shouldStart={true} />}
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
