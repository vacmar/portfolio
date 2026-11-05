import React, { useState } from 'react';
import { LuZap, LuPlane, LuTarget, LuSmile, LuSparkles, LuX, LuThumbsUp, LuRotateCcw } from 'react-icons/lu';
import './MobileSecretPopup.css';

const FUN_FACTS = [
  {
    icon: <LuZap style={{ color: 'var(--accent)' }} />,
    tagText: 'BRAINSTORMING',
    title: 'Architecting Solutions',
    text: 'I love sketching system diagrams on physical paper before writing a single line of backend code!'
  },
  {
    icon: <LuPlane style={{ color: '#38bdf8' }} />,
    tagText: 'WANDERLUST',
    title: 'Loves to Travel',
    text: 'Exploring new landscapes and cities resets my engineering thinking — some of my best bug fixes hit me while walking in a new town.'
  },
  {
    icon: <LuTarget style={{ color: '#f43f5e' }} />,
    tagText: 'CRAFT PHILOSOPHY',
    title: 'Hold Up Under Real Use',
    text: 'Building apps with 7 real user roles taught me: true elegance is code that survives real-world chaos.'
  },
  {
    icon: <LuSmile style={{ color: '#fbbf24' }} />,
    tagText: 'OFF THE KEYBOARD',
    title: 'Badminton & Tea',
    text: 'Fast smashes on the court, endless cups of tea, and binge-reading deep distributed systems papers.'
  }
];

const MobileSecretPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [factIdx, setFactIdx] = useState(0);

  // Show a gentle pulsing surprise pill on phone view
  const currentFact = FUN_FACTS[factIdx];

  const handleNextFact = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFactIdx((prev) => (prev + 1) % FUN_FACTS.length);
  };

  return (
    <>
      {/* Mobile Floating Secret Pill */}
      <button
        type="button"
        className="mobile-fact-trigger-pill"
        onClick={() => setIsOpen(true)}
        aria-label="Open fun fact secret note"
      >
        <span className="pill-sparkle"><LuSparkles /></span>
        <span className="pill-text">tap for fun fact</span>
      </button>

      {/* Pop-up Modal Sheet */}
      {isOpen && (
        <div className="mobile-fact-overlay" onClick={() => setIsOpen(false)}>
          <div className="mobile-fact-sheet sk" onClick={(e) => e.stopPropagation()}>
            <i className="washi-tape-strip" aria-hidden="true" />
            
            <button
              type="button"
              className="fact-sheet-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close note"
            >
              <LuX />
            </button>

            <span className="fact-sheet-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              {currentFact.icon}
              <span>{currentFact.tagText}</span>
            </span>
            <h3 className="fact-sheet-title">{currentFact.title}</h3>
            <p className="fact-sheet-text">{currentFact.text}</p>

            <div className="fact-sheet-actions">
              <button
                type="button"
                className="btn small"
                onClick={handleNextFact}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>next fun fact</span>
                <LuRotateCcw />
              </button>
              <button
                type="button"
                className="btn small primary"
                onClick={() => setIsOpen(false)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>got it!</span>
                <LuThumbsUp />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSecretPopup;

