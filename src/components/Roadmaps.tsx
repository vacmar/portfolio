import React, { useEffect, useRef, useState } from 'react';
import { LuSparkles, LuPartyPopper } from 'react-icons/lu';
import { resumeData, TrailStop } from '../data/resumeData';
import './Roadmaps.css';

interface RoadConfetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  shape: 'rect' | 'circle' | 'star' | 'heart' | 'ribbon';
  life: number;
  maxLife: number;
}

const CONFETTI_PALETTE = [
  '#f87171', // pastel coral
  '#fbbf24', // pastel sunflower
  '#34d399', // pastel mint
  '#60a5fa', // pastel sky blue
  '#a78bfa', // pastel lavender
  '#f472b6', // pastel pink
  '#ffd166', // warm pastel gold
  '#38bdf8'  // neon starlight cyan
];

const Roadmaps: React.FC = () => {
  const trailRef = useRef<HTMLDivElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const pathBaseRef = useRef<SVGPathElement>(null);
  const pathFillRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finishRef = useRef<HTMLDivElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  const [activeChapter, setActiveChapter] = useState(0);
  const [completedStops, setCompletedStops] = useState<boolean[]>(
    new Array(resumeData.journeyStops.length).fill(false)
  );

  const [isBoxZoomed, setIsBoxZoomed] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const hasCelebratedRef = useRef(false);
  const isRestockedRef = useRef(false);
  const confettiPiecesRef = useRef<RoadConfetti[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Confetti explosion from the finish box where particles get bigger as they burst out
  const fireBoxConfetti = () => {
    const trail = trailRef.current;
    const canvas = confettiCanvasRef.current;
    if (!trail || !canvas) return;

    canvas.width = trail.clientWidth;
    canvas.height = trail.offsetHeight;

    const finishEl = finishRef.current;
    const startX = finishEl ? finishEl.offsetLeft + finishEl.offsetWidth / 2 : trail.clientWidth / 2;
    const startY = finishEl ? finishEl.offsetTop + 10 : trail.offsetHeight - 55;

    // Trigger box zoom animation
    setIsBoxZoomed(true);
    setTimeout(() => setIsBoxZoomed(false), 1300);

    // Spawn 50 celebratory confetti pieces
    const newPieces: RoadConfetti[] = [];
    const shapes: ('rect' | 'circle' | 'star' | 'heart' | 'ribbon')[] = [
      'rect',
      'circle',
      'star',
      'heart',
      'ribbon'
    ];

    for (let i = 0; i < 52; i++) {
      const angle = (Math.PI * 1.05) + Math.random() * (Math.PI * 0.9); // upward arc
      const speed = 4 + Math.random() * 8.5;

      newPieces.push({
        x: startX + (Math.random() - 0.5) * 50,
        y: startY + (Math.random() - 0.5) * 16,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3.5,
        baseSize: 4.5 + Math.random() * 4,
        size: 4.5,
        color: CONFETTI_PALETTE[Math.floor(Math.random() * CONFETTI_PALETTE.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 18,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        life: 0,
        maxLife: 60 + Math.random() * 35
      });
    }

    confettiPiecesRef.current = newPieces;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPiecesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.26; // gravity
        p.vx *= 0.98; // air drag
        p.rotation += p.vRot;
        p.life++;

        const progress = p.life / p.maxLife;

        // Confetti gets bigger as it blows out from the box!
        const growth =
          progress < 0.4
            ? 0.6 + (progress / 0.4) * 1.8 // expands up to 2.4x its original size
            : 2.4 * Math.max(0.4, 1 - (progress - 0.4) * 0.6);
        p.size = p.baseSize * growth;

        const alpha = Math.max(0, 1 - Math.pow(progress, 1.8));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = alpha;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          ctx.beginPath();
          for (let s = 0; s < 5; s++) {
            ctx.lineTo(
              Math.cos(((18 + s * 72) * Math.PI) / 180) * p.size,
              -Math.sin(((18 + s * 72) * Math.PI) / 180) * p.size
            );
            ctx.lineTo(
              Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.size * 0.45),
              -Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.size * 0.45)
            );
          }
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'heart') {
          ctx.beginPath();
          ctx.moveTo(0, p.size * 0.3);
          ctx.bezierCurveTo(-p.size * 0.7, -p.size * 0.5, -p.size, p.size * 0.4, 0, p.size);
          ctx.bezierCurveTo(p.size, p.size * 0.4, p.size * 0.7, -p.size * 0.5, 0, p.size * 0.3);
          ctx.fill();
        } else {
          // ribbon
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(-p.size, -p.size * 0.3);
          ctx.quadraticCurveTo(0, p.size * 0.6, p.size, -p.size * 0.3);
          ctx.stroke();
        }

        ctx.restore();
      });

      confettiPiecesRef.current = confettiPiecesRef.current.filter((p) => p.life < p.maxLife);

      if (confettiPiecesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationFrameRef.current = requestAnimationFrame(renderConfetti);
  };

  // Restock confetti button toggles state to re-activate and immediately blasts celebration
  const handleRestockConfetti = () => {
    hasCelebratedRef.current = false;
    isRestockedRef.current = true;
    setHasCelebrated(false);
    fireBoxConfetti();
  };

  useEffect(() => {
    const trail = trailRef.current;
    const walker = walkerRef.current;
    const base = pathBaseRef.current;
    const fill = pathFillRef.current;
    const svg = svgRef.current;
    if (!trail || !walker || !base || !fill || !svg) return;

    let samples: [number, number, number][] = [];
    let totalLen = 1;
    let yStart = 0;
    let yEnd = 1;
    let curY: number | null = null;
    let raf = 0;

    const layout = () => {
      const W = trail.clientWidth;
      const H = trail.offsetHeight;
      const isWide = window.innerWidth >= 740;
      const cx = isWide ? W / 2 : 40;
      const amp = isWide ? 140 : 36;
      yStart = 70;
      const finishEl = finishRef.current;
      const finishTop = finishEl && finishEl.offsetTop > 0 ? finishEl.offsetTop : H - 110;
      // Blob perches cleanly on top of the finish box, never going underneath or inside
      yEnd = Math.max(finishTop - 10, yStart + 100);
      const finishX = finishEl && finishEl.offsetWidth > 0 ? finishEl.offsetLeft + finishEl.offsetWidth / 2 : cx;

      const pts: { x: number; y: number }[] = [{ x: cx, y: yStart }];

      resumeData.journeyStops.forEach((_, i) => {
        const el = stopRefs.current[i];
        const y = el ? el.offsetTop + 40 : yStart + (i + 1) * 110;
        pts.push({ x: cx, y });
      });

      pts.push({ x: isWide ? cx : finishX, y: yEnd });

      let d = `M${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dy = b.y - a.y;
        d += ` C${a.x + amp} ${a.y + dy / 3} ${b.x - amp} ${a.y + (dy * 2) / 3} ${b.x} ${b.y}`;
      }

      base.setAttribute('d', d);
      fill.setAttribute('d', d);
      svg.setAttribute('width', String(W));
      svg.setAttribute('height', String(H));
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

      totalLen = base.getTotalLength();
      fill.style.strokeDasharray = `${totalLen} ${totalLen}`;

      samples = [];
      const N = 600;
      for (let k = 0; k <= N; k++) {
        const len = (totalLen * k) / N;
        const p = base.getPointAtLength(len);
        samples.push([p.y, p.x, len]);
      }

      curY = null;
      kick();
    };

    const atY = (y: number) => {
      if (samples.length === 0) return { x: 40, len: 0, dx: 0, dy: 1 };
      let lo = 0;
      let hi = samples.length - 1;
      while (hi - lo > 1) {
        const m = (lo + hi) >> 1;
        if (samples[m][0] < y) lo = m;
        else hi = m;
      }
      const a = samples[lo];
      const b = samples[hi];
      const t = b[0] === a[0] ? 0 : Math.max(0, Math.min(1, (y - a[0]) / (b[0] - a[0])));
      return {
        x: a[1] + (b[1] - a[1]) * t,
        len: a[2] + (b[2] - a[2]) * t,
        dx: b[1] - a[1],
        dy: b[0] - a[0]
      };
    };

    const place = (y: number) => {
      const p = atY(y);
      const lean = p.dy > 0 ? (Math.atan2(p.dx, p.dy) * 180) / Math.PI : 0;
      const clampedLean = Math.max(-14, Math.min(14, lean * 0.8));
      const h = walker.offsetHeight || 60;

      walker.style.transform = `translate(${(p.x - 28).toFixed(1)}px, ${(y - h + 8).toFixed(1)}px) rotate(${clampedLean.toFixed(1)}deg)`;
      fill.style.strokeDashoffset = String(totalLen - p.len);

      let doneCount = 0;
      const updated = resumeData.journeyStops.map((_, i) => {
        const stopEl = stopRefs.current[i];
        if (!stopEl) return false;
        const stopY = stopEl.offsetTop + 40;
        // Dot activates when Blob reaches and crosses through the dot
        const isDone = y >= stopY;
        if (isDone) doneCount++;
        return isDone;
      });

      setCompletedStops(updated);
      setActiveChapter(doneCount);

      // Check if Blob has reached the path's end (standing on top of the finish box)
      const atPathEnd = y >= yEnd - 8;
      if (atPathEnd) {
        if (!hasCelebratedRef.current || isRestockedRef.current) {
          hasCelebratedRef.current = true;
          isRestockedRef.current = false;
          setHasCelebrated(true);
          fireBoxConfetti();
        }
      }
    };

    const target = () => {
      const r = trail.getBoundingClientRect();
      return Math.max(yStart, Math.min(yEnd, window.innerHeight * 0.55 - r.top));
    };

    const tick = () => {
      raf = 0;
      const t = target();
      if (curY === null) curY = t;
      else curY += (t - curY) * 0.12;

      const moving = Math.abs(t - curY) > 0.8;
      if (!moving) curY = t;

      place(curY);
      walker.classList.toggle('moving', moving);
      const v = walker.querySelector('.vee');
      if (v) v.classList.toggle('walking', moving);

      if (moving) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', layout);

    layout();
    const timer = setTimeout(layout, 300);

    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', layout);
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <section id="journey" className="journey-section">
      <div className="sh">
        <span className="note-label">journey</span>
        <h2>Follow Blob down the page</h2>
        <p>
          Blob walks as you scroll down the sketchbook path.{' '}
          <span className="chapter" id="chapter">
            chapter {activeChapter} of {resumeData.journeyStops.length}
          </span>
        </p>
      </div>

      <div className="trail" ref={trailRef} id="trail">
        <svg className="route" ref={svgRef} aria-hidden="true">
          <path className="base" ref={pathBaseRef} />
          <path className="fill" ref={pathFillRef} />
        </svg>

        {/* Confetti canvas for celebratory blast */}
        <canvas ref={confettiCanvasRef} className="roadmaps-confetti-canvas" aria-hidden="true" />

        <div className="walker" ref={walkerRef} id="walker" aria-hidden="true">
          <div className="walker-chapter-bubble">
            ch. {activeChapter}/{resumeData.journeyStops.length}
          </div>
          <svg className="vee" viewBox="0 0 120 160" role="img" aria-label="Blob walking character">
            <path d="M60 18 L60 8" />
            <circle className="knob" cx="60" cy="6" r="5" />
            <path className="fill" d="M24 70 C22 34 40 18 60 18 C82 18 98 34 96 70 C95 100 88 118 60 118 C34 118 25 100 24 70 Z" />
            <circle className="dot" cx="46" cy="62" r="4.5" />
            <circle className="dot" cx="74" cy="62" r="4.5" />
            <path d="M48 80 Q60 92 72 80" />
            <ellipse className="cheek" cx="37" cy="76" rx="6" ry="4" />
            <ellipse className="cheek" cx="83" cy="76" rx="6" ry="4" />
            <path className="arm-l" d="M26 84 Q10 92 8 106" />
            <path className="arm-r" d="M94 84 Q112 78 114 60" />
            <path className="leg-l" d="M46 118 L44 144 L34 146" />
            <path className="leg-r" d="M74 118 L76 144 L86 146" />
          </svg>
        </div>

        {resumeData.journeyStops.map((stop: TrailStop, index: number) => {
          const isDone = completedStops[index];
          const isRight = index % 2 === 1;

          return (
            <div
              key={stop.tag}
              ref={(el) => {
                stopRefs.current[index] = el;
              }}
              className={`stop ${isRight ? 'a right' : ''} ${isDone ? 'done' : ''}`}
            >
              <div className="card sk">
                <span className="tag">{stop.tag}</span>
                <h3>{stop.title}</h3>
                <p>{stop.text}</p>
              </div>
              <span className={`dot ${isDone ? 'done' : ''}`} />
            </div>
          );
        })}

        {/* Path's End: Finish box zooms and blasts expanding confetti, plus Restock button */}
        <div className="finish-zone" ref={finishRef}>
          <div className={`finish ${isBoxZoomed ? 'zoomed' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span>there are exciting future plans ahead...</span>
            <LuSparkles style={{ color: 'var(--accent)' }} />
          </div>

          <button
            type="button"
            className="btn-restock-confetti"
            onClick={handleRestockConfetti}
            aria-label="Restock and blast confetti celebration"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <span className="restock-icon" style={{ display: 'inline-flex' }}><LuPartyPopper /></span>
            <span>restock confetti</span>
            <span className="restock-star" style={{ display: 'inline-flex' }}>{hasCelebrated ? <LuSparkles /> : <LuPartyPopper />}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Roadmaps;
