import React, { useState, useEffect, lazy, Suspense } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Roadmaps from './components/Roadmaps';
import Stack from './components/Stack';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ScribblePad from './components/ScribblePad';
import BugPuzzle from './components/BugPuzzle';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DoodleCursor from './components/DoodleCursor';
import MobileSecretPopup from './components/MobileSecretPopup';

const MusicPlayer = lazy(() => import('./components/MusicPlayer'));

import './App.css';

function App() {
  const [weatherMood, setWeatherMood] = useState<'sunny' | 'rainy' | 'sunset' | 'midnight'>('sunny');
  const [isCalm, setIsCalm] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    try {
      const savedWeather = localStorage.getItem('weather-mood') as any;
      if (['sunny', 'rainy', 'sunset', 'midnight'].includes(savedWeather)) {
        setWeatherMood(savedWeather);
        document.documentElement.setAttribute('data-weather', savedWeather);
      } else {
        document.documentElement.setAttribute('data-weather', 'sunny');
      }

      const savedCalm = localStorage.getItem('calm');
      if (savedCalm === '1') {
        setIsCalm(true);
        document.documentElement.classList.add('calm');
      }
    } catch {
      // ignore
    }
  }, []);

  // IntersectionObserver to add in-order scroll reveal: bounce, subtle random tilt (-2.5deg to +2.5deg), and smooth fade in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-bounced-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Apply to sections, cards, and grid items in order (Hero has its own dedicated slow sequenced landing animation)
    const elementsToReveal = document.querySelectorAll(
      '.about-layout > div, .pin, .group, .cert-sticker-card, .flip, .job, .edu, .letter, .postcard, .stop .card'
    );

    elementsToReveal.forEach((el, index) => {
      // Assign subtle random rotation (-2.2deg to +2.2deg) and order delay
      const randomAngle = ((Math.sin(index * 99) * 2.2)).toFixed(1);
      (el as HTMLElement).style.setProperty('--scroll-tilt', `${randomAngle}deg`);
      el.classList.add('scroll-reveal-item');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleWeatherChange = (newWeather: 'sunny' | 'rainy' | 'sunset' | 'midnight') => {
    setWeatherMood(newWeather);
    document.documentElement.setAttribute('data-weather', newWeather);
    try {
      localStorage.setItem('weather-mood', newWeather);
    } catch {
      // ignore
    }
  };

  const handleToggleCalm = (calm: boolean) => {
    setIsCalm(calm);
    document.documentElement.classList.toggle('calm', calm);
    try {
      localStorage.setItem('calm', calm ? '1' : '0');
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    let timeoutId: number;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setShowScrollTop(window.scrollY > 400);
      }, 80);
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
      behavior: isCalm ? 'auto' : 'smooth'
    });
  };

  return (
    <div className="sketchbook-app">
      {/* Hand-drawn Pastel Pencil Cursor, Confetti & Glitter Burst on Click */}
      <DoodleCursor />

      <Header onWeatherChange={handleWeatherChange} activeWeather={weatherMood} />

      <main className="wrap">
        <Hero />
        <About />
        <Roadmaps />
        <Stack />
        <Certifications />
        <Projects />
        <Experience />
        <ScribblePad />
        <BugPuzzle />
        <Contact />
        <Footer
          onCalmToggle={handleToggleCalm}
          isCalm={isCalm}
          onWeatherChange={handleWeatherChange}
          currentWeather={weatherMood}
        />
      </main>

      <Suspense fallback={null}>
        <MusicPlayer shouldStart={false} />
      </Suspense>

      {/* Interactive Mobile Secret Popup Pill & Modal */}
      <MobileSecretPopup />

      {showScrollTop && (
        <button
          className="btn scroll-to-top-btn"
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default App;
