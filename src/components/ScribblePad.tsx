import React, { useEffect, useRef, useState } from 'react';
import './ScribblePad.css';

interface Swatch {
  id: string;
  css: string;
  label: string;
}

const SWATCHES: Swatch[] = [
  { id: 'ink', css: 'var(--ink)', label: 'ink' },
  { id: '#ff5d73', css: '#ff5d73', label: 'pink' },
  { id: '#14b8a6', css: '#14b8a6', label: 'teal' },
  { id: '#4c8dff', css: '#4c8dff', label: 'blue' },
  { id: '#ffb020', css: '#ffb020', label: 'amber' },
  { id: 'eraser', css: '', label: 'eraser' }
];

const ScribblePad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState('ink');
  const [penSize, setPenSize] = useState(5);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const fit = () => {
      const r = cv.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      cv.width = Math.max(1, Math.round(r.width * d));
      cv.height = Math.max(1, Math.round(r.height * d));
      ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const cv = canvasRef.current;
    if (!cv) return { x: 0, y: 0 };
    const r = cv.getBoundingClientRect();
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };
  };

  const drawStroke = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    if (selectedColor === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = penSize * 3;
      ctx.strokeStyle = '#000';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = penSize;
      const inkColor = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#1d2b53';
      ctx.strokeStyle = selectedColor === 'ink' ? inkColor : selectedColor;
    }

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const p = getPos(e);
    lastPos.current = p;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    drawStroke(p, { x: p.x + 0.01, y: p.y + 0.01 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !lastPos.current) return;
    const p = getPos(e);
    drawStroke(lastPos.current, p);
    lastPos.current = p;
  };

  const handlePointerEnd = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  const handleClear = () => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.restore();
  };

  return (
    <section id="scribble" className="scribble-section">
      <div className="sh">
        <span className="note-label">your turn</span>
        <h2>Scribble on my page</h2>
        <p>Draw anything. Leave a sketch, write a signature, or doodle. It stays only for this session, so go wild!</p>
      </div>

      <div className="tools" role="group" aria-label="Pen colours">
        {SWATCHES.map((s) => (
          <button
            key={s.id}
            className={`sw ${s.id === 'eraser' ? 'eraser' : ''}`}
            type="button"
            aria-label={`${s.label} pen`}
            aria-pressed={selectedColor === s.id}
            style={s.css ? ({ '--sw': s.css } as React.CSSProperties) : undefined}
            onClick={() => setSelectedColor(s.id)}
          >
            {s.id === 'eraser' ? 'eraser' : ''}
          </button>
        ))}
      </div>

      <div className="padwrap sk">
        <canvas
          ref={canvasRef}
          className="pad"
          aria-label="Drawing pad. Use mouse, trackpad, or finger to sketch."
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        />
      </div>

      <div className="tools" style={{ marginTop: '16px' }}>
        <button className="btn small" type="button" onClick={handleClear}>
          wipe the page
        </button>
        <span className="sub">pen size</span>
        <input
          type="range"
          min="2"
          max="20"
          value={penSize}
          onChange={(e) => setPenSize(parseInt(e.target.value, 10))}
          aria-label="Pen size"
        />
      </div>
    </section>
  );
};

export default ScribblePad;
