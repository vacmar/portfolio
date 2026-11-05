import React, { useEffect, useState } from 'react';
import { LuSun, LuCloudRain, LuSunset, LuMoon, LuPenTool, LuX } from 'react-icons/lu';
import './Header.css';

interface HeaderProps {
  onWeatherChange?: (weather: 'sunny' | 'rainy' | 'sunset' | 'midnight') => void;
  activeWeather?: string;
}

const WEATHER_MODES = [
  { id: 'sunny', icon: <LuSun className="weather-icon-svg" />, label: 'sunny' },
  { id: 'rainy', icon: <LuCloudRain className="weather-icon-svg" />, label: 'rainy' },
  { id: 'sunset', icon: <LuSunset className="weather-icon-svg" />, label: 'sunset' },
  { id: 'midnight', icon: <LuMoon className="weather-icon-svg" />, label: 'midnight' }
] as const;

const SIDE_SECTIONS = [
  { id: 'home', num: '01. ', word: 'Hero' },
  { id: 'about', num: '02. ', word: 'About' },
  { id: 'journey', num: '03. ', word: 'Journey' },
  { id: 'stack', num: '04. ', word: 'Stack' },
  { id: 'certs', num: '05. ', word: 'Certs' },
  { id: 'projects', num: '06. ', word: 'Projects' },
  { id: 'experience', num: '07. ', word: 'Experiences' },
  { id: 'scribble', num: '08. ', word: 'Doodle' },
  { id: 'puzzle', num: '09. ', word: 'Puzzle' },
  { id: 'contact', num: '10. ', word: 'Contact' }
];

const Header: React.FC<HeaderProps> = ({ onWeatherChange, activeWeather = 'sunny' }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Typewriter effect state for center header display
  const [typedNum, setTypedNum] = useState('01. ');
  const [typedWord, setTypedWord] = useState('Hero');
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor interval
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  useEffect(() => {
    const current = SIDE_SECTIONS.find((s) => s.id === activeSection) || SIDE_SECTIONS[0];
    const targetNum = current.num;
    const targetWord = current.word;

    let isCancelled = false;
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];

    // Reset initially
    setTypedNum('');
    setTypedWord('');

    // Step 1: Type the number ("01. ") quickly left-to-right
    for (let i = 1; i <= targetNum.length; i++) {
      const t = setTimeout(() => {
        if (!isCancelled) setTypedNum(targetNum.slice(0, i));
      }, i * 40);
      timeoutIds.push(t);
    }

    // Step 2: Immediately continue typing the word without delay
    const numFinishDelay = targetNum.length * 40;
    for (let j = 1; j <= targetWord.length; j++) {
      const t = setTimeout(() => {
        if (!isCancelled) setTypedWord(targetWord.slice(0, j));
      }, numFinishDelay + j * 40);
      timeoutIds.push(t);
    }

    return () => {
      isCancelled = true;
      timeoutIds.forEach((t) => clearTimeout(t));
    };
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      }

      const sections = ['home', 'about', 'journey', 'stack', 'certs', 'projects', 'experience', 'scribble', 'puzzle', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    // Allow body scroll lock to release before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header className="nav">
      <div className="nav-in">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          vaaheesan<span>'s sketchbook</span>
        </a>

        {/* Center Section Indicator with typewriter effect - hidden on small phone screens to prevent collision */}
        <div className="center-section-display" aria-live="polite">
          <span className="center-section-num">{typedNum}</span>
          <span className="center-section-word">{typedWord}</span>
          <span className={`center-section-cursor ${showCursor ? 'visible' : ''}`}>|</span>
        </div>

        {/* Right-aligned Controls: Weather Palette Selector & Animated Mobile Hamburger */}
        <div className="nav-controls">
          <div className="weather-toggle-group" role="group" aria-label="Weather mood theme">
            {WEATHER_MODES.map((w) => (
              <button
                key={w.id}
                type="button"
                className={`btn-weather ${activeWeather === w.id ? 'active' : ''}`}
                title={`${w.label} mood`}
                onClick={() => onWeatherChange && onWeatherChange(w.id)}
              >
                {w.icon}
              </button>
            ))}
          </div>

          {/* Sketchy Animated Hamburger Button for Mobile */}
          <button
            type="button"
            className={`sketch-hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation drawer"
            aria-expanded={mobileMenuOpen}
          >
            <span className="ham-line ham-line-1" />
            <span className="ham-line ham-line-2" />
            <span className="ham-line ham-line-3" />
          </button>
        </div>
      </div>

      <span
        className="bar"
        id="bar"
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Full-Screen Sketch Drawer for Mobile View */}
      <div
        className={`mobile-sketch-drawer ${mobileMenuOpen ? 'active' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="drawer-inner">
          <div className="drawer-header">
            <span className="drawer-title">Chapters & Destinations</span>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <LuX />
            </button>
          </div>

          <nav className="drawer-nav-list" aria-label="Mobile Navigation">
            {SIDE_SECTIONS.map((sec, idx) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  className={`drawer-nav-item ${isActive ? 'active' : ''}`}
                  style={{ animationDelay: `${idx * 45}ms` }}
                  onClick={() => handleNavClick(sec.id)}
                >
                  <span className="drawer-item-num">{sec.num}</span>
                  <span className="drawer-item-name">{sec.word}</span>
                  {isActive && <span className="drawer-active-tag">current</span>}
                </button>
              );
            })}
          </nav>

          <div className="drawer-footer-note">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <LuPenTool style={{ fontSize: '0.95rem', color: 'var(--accent)' }} />
              tap anywhere or choose a chapter to jump
            </span>
          </div>
        </div>
        <div
          className="drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Floating Right-Side Chapter / Section Gauge (GetArtCraft style) with typewriter synced labels */}
      <aside className="artcraft-side-nav" aria-label="Quick section navigation">
        <div className="artcraft-side-track">
          {SIDE_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                className={`artcraft-side-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(sec.id)}
                aria-label={`Jump to ${sec.word}`}
                title={`${sec.num}${sec.word}`}
              >
                <span className="artcraft-side-num">{sec.num.trim()}</span>
                <span className="artcraft-side-tick" />
                <span className="artcraft-side-label">
                  {isActive ? typedWord : sec.word}
                  {isActive && <span className={`side-cursor ${showCursor ? 'visible' : ''}`}>|</span>}
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    </header>
  );
};

export default Header;