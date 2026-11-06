import React, { useEffect, useRef, useState } from 'react';
import { LuSparkles, LuCat, LuHeart, LuZap, LuStar, LuMail, LuFileText, LuX } from 'react-icons/lu';
import { GiStrawberry } from 'react-icons/gi';
import { resumeData } from '../data/resumeData';
import './Hero.css';

const POOKIE_STICKERS = [
  { id: 'sparkles', icon: <LuSparkles />, label: 'sparkle', top: '10%', left: '8%' },
  { id: 'catpaw', icon: <LuCat />, label: 'purr', top: '75%', left: '4%' },
  { id: 'strawberry', icon: <GiStrawberry />, label: 'berry sweet', top: '12%', right: '8%' },
  { id: 'ribbon', icon: <LuHeart />, label: 'pookie', top: '78%', right: '6%' }
];

const Hero: React.FC = () => {
  const photoCanvasRef = useRef<HTMLCanvasElement>(null);
  const [photoDoodleColor, setPhotoDoodleColor] = useState('#f87171');
  const [photoPenSize, setPhotoPenSize] = useState(3);
  const isDrawing = useRef(false);
  const lastPhotoPos = useRef<{ x: number; y: number } | null>(null);

  const [stats, setStats] = useState({
    projects: 0,
    internships: 0,
    tools: 0
  });

  const totalTools =
    resumeData.skills.languages.length +
    resumeData.skills.backend.length +
    resumeData.skills.databases.length +
    resumeData.skills.aiml.length;

  useEffect(() => {
    const duration = 2200;
    // Delay counter until stats section smoothly fades in
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const animateStats = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        setStats({
          projects: Math.round(resumeData.projects.length * easeProgress),
          internships: Math.round(resumeData.experience.length * easeProgress),
          tools: Math.round(totalTools * easeProgress)
        });

        if (progress < 1) {
          requestAnimationFrame(animateStats);
        }
      };

      requestAnimationFrame(animateStats);
    }, 2400);

    return () => clearTimeout(timer);
  }, [totalTools]);

  // Handle doodle on profile photo
  useEffect(() => {
    const cv = photoCanvasRef.current;
    if (!cv) return;
    const d = window.devicePixelRatio || 1;
    const rect = cv.getBoundingClientRect();
    cv.width = rect.width * d;
    cv.height = rect.height * d;
    const ctx = cv.getContext('2d');
    if (ctx) {
      ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const getPhotoPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const cv = photoCanvasRef.current;
    if (!cv) return { x: 0, y: 0 };
    const r = cv.getBoundingClientRect();
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };
  };

  const handlePhotoPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const p = getPhotoPos(e);
    lastPhotoPos.current = p;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePhotoPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !lastPhotoPos.current) return;
    const cv = photoCanvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const p = getPhotoPos(e);
    ctx.strokeStyle = photoDoodleColor;
    ctx.lineWidth = photoPenSize;
    ctx.beginPath();
    ctx.moveTo(lastPhotoPos.current.x, lastPhotoPos.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();

    lastPhotoPos.current = p;
  };

  const handlePhotoPointerEnd = () => {
    isDrawing.current = false;
    lastPhotoPos.current = null;
  };

  const handleClearPhotoDoodles = () => {
    const cv = photoCanvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, cv.width, cv.height);
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero">
        <div className="hero-intro">
          <div className="notebook-edition-tag">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <LuSparkles style={{ color: 'var(--accent)', fontSize: '0.9rem' }} /> notebook no. 21
            </span> • <span>backend craft</span> • <span>2026</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm{' '}
            <span className="circled-name">
              {resumeData.personalInfo.name}
              <svg viewBox="0 0 260 110" preserveAspectRatio="none" aria-hidden="true" className="ink-circle-svg">
                <path d="M22 54 C12 24 120 6 198 18 C252 28 248 82 134 96 C48 104 2 78 24 42 C38 18 90 10 130 10" />
              </svg>
            </span>
            .
          </h1>

          <p className="hero-role-lead">
            <strong>Software Engineer</strong> building resilient APIs, payment flows, and microservices with Python, FastAPI, PostgreSQL, and AWS ECS Fargate, wrapped in deterministic AI guardrails.
          </p>

          <div className="competitive-pill-row">
            <a
              href="https://leetcode.com/u/VAAHEESAN"
              target="_blank"
              rel="noopener noreferrer"
              className="comp-stat-badge sk"
            >
              <span className="badge-icon"><LuZap /></span>
              <span>LeetCode Contest Rating: <strong>1655</strong> (Top 17.5%)</span>
            </a>
            <a
              href="https://www.hackerrank.com/profile/vaahee21"
              target="_blank"
              rel="noopener noreferrer"
              className="comp-stat-badge sk"
            >
              <span className="badge-icon"><LuStar /></span>
              <span>HackerRank: <strong>5-Star Gold Badge</strong> in Python (<span style={{ display: 'inline-flex', gap: '2px', verticalAlign: '-1px' }}><LuStar /><LuStar /><LuStar /><LuStar /><LuStar /></span>)</span>
            </a>
          </div>

          <div className="cta-row">
            <a className="btn primary" href="#projects">
              see my projects ↓
            </a>
            <a className="btn" href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>write to me</span>
              <LuMail />
            </a>
            <a
              className="btn small"
              href="/Vaaheesan-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Vaaheesan_Resume.pdf"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <LuFileText />
              <span>download resume</span>
            </a>
          </div>
        </div>

        {/* Polaroid Photo Column with Left-side Curved Arrow & Right-side Sticky Note */}
        <div className="polaroid-wrapper">
          <div className="arrow-pointer-container" aria-hidden="true">
            <span className="arrow-text">this is me →</span>
            <svg className="hand-drawn-arrow" viewBox="0 0 150 110" aria-hidden="true">
              <path d="M8 96 C30 40 80 20 128 38 M128 38 L104 26 M128 38 L112 62" />
            </svg>
          </div>

          <div className="sticky-post-it">
            currently: open to work!
          </div>

          <figure className="polaroid-frame sk">
            <i className="washi-tape-strip" aria-hidden="true" />
            
            <div className="photo-container">
              <img
                src="/Image.jpg"
                alt="Vaaheesan S"
                className="profile-photo"
              />
              {/* Overlay Canvas allowing users to draw glasses, hats, mustaches, or hearts on profile */}
              <canvas
                ref={photoCanvasRef}
                className="photo-doodle-canvas"
                onPointerDown={handlePhotoPointerDown}
                onPointerMove={handlePhotoPointerMove}
                onPointerUp={handlePhotoPointerEnd}
                onPointerCancel={handlePhotoPointerEnd}
              />
            </div>

            <figcaption className="polaroid-caption">
              Vaaheesan S · Chennai, India
            </figcaption>

            {/* Doodle controls for profile photo */}
            <div className="photo-doodle-toolbar">
              <div className="photo-color-dots">
                {['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#2d2a26'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="photo-color-dot"
                    style={{ background: color, outline: photoDoodleColor === color ? '2px solid #2d2a26' : 'none' }}
                    onClick={() => setPhotoDoodleColor(color)}
                    aria-label={`Color ${color}`}
                  />
                ))}
                <button
                  type="button"
                  className="btn-clear-photo"
                  onClick={handleClearPhotoDoodles}
                  title="Wipe doodle"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                >
                  <span>clear</span>
                  <LuX style={{ fontSize: '0.85rem' }} />
                </button>
              </div>
            </div>
          </figure>
        </div>
      </div>

      {/* Stats with count-up banner */}
      <div className="stats" aria-label="At a glance">
        <div className="stat sk">
          <b>{stats.projects}</b>
          <span>projects built</span>
        </div>
        <div className="stat sk">
          <b>{stats.internships}</b>
          <span>internships</span>
        </div>
        <div className="stat sk">
          <b>{stats.tools}</b>
          <span>tools in my kit</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
