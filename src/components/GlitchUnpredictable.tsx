import React, { useEffect, useState } from 'react';
import './GlitchUnpredictable.css';

interface GlitchUnpredictableProps {
  badgeText?: string;
  arrowText?: string;
  arrowPosition?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

// Unpredictable cryptic characters and glyphs
const GLYPHS = 'λ§ΔΩЖΨ§∞≈≠±⌘⌥⌗░▒▓%*?#@!><{}[]01X_~^/\\';

const GlitchUnpredictable: React.FC<GlitchUnpredictableProps> = ({
  badgeText = 'MYSTERY BUILD',
  arrowText = "future is unpredictable, who knows what's next?",
  arrowPosition = 'bottom',
  className = ''
}) => {
  // Generate random cryptic scramble strings
  const [glitchTitle, setGlitchTitle] = useState('§#?_Ω-DELTA');
  const [glitchDesc, setGlitchDesc] = useState('░▒▓ decoding future signals... ▓▒░');
  const [glitchTag, setGlitchTag] = useState('COMING SOON');

  useEffect(() => {
    const scramble = (length: number) => {
      let str = '';
      for (let i = 0; i < length; i++) {
        str += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      return str;
    };

    const interval = setInterval(() => {
      setGlitchTitle(() => scramble(10 + Math.floor(Math.random() * 4)));
      setGlitchDesc(() => {
        const seg1 = scramble(6);
        const seg2 = scramble(8);
        const seg3 = scramble(6);
        return `${seg1} · ${seg2} · ${seg3}`;
      });
      // Occasionally flicker between 'COMING SOON' and scrambled glyphs
      setGlitchTag(() => {
        if (Math.random() > 0.4) return 'COMING SOON';
        return scramble(11);
      });
    }, 75); // rapid, continuous, illegible scrambling

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`unpredictable-box-wrapper ${className}`}>
      {/* The scrambled mysterious coming soon box with handwritten phrase inside */}
      <div className="unpredictable-card-content">
        <span className="unpredictable-badge">{badgeText}</span>

        <p className="unpredictable-phrase">
          ✦ {arrowText} ✦
        </p>

        <h3 className="unpredictable-title" aria-label="Unknown project title">
          {glitchTitle}
        </h3>

        <p className="unpredictable-desc" aria-label="Unreadable future signals">
          {glitchDesc}
        </p>

        <div className="unpredictable-tagline">
          <span className="unpredictable-radar-dot" />
          <span className="unpredictable-tag-text">{glitchTag}</span>
        </div>
      </div>
    </div>
  );
};

export default GlitchUnpredictable;

