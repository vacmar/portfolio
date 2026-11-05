import React, { useEffect, useRef, useState } from 'react';
import {
  LuSparkles,
  LuCat,
  LuHeart,
  LuStar,
  LuCoffee,
  LuPalette,
  LuRocket,
  LuFlame,
  LuGhost,
  LuSmile,
  LuZap,
  LuCompass,
  LuLightbulb,
  LuGlasses,
  LuBug,
  LuAward
} from 'react-icons/lu';
import { GiStrawberry } from 'react-icons/gi';
import './DoodleCursor.css';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  vRot: number;
  shape: 'rect' | 'circle' | 'star' | 'heart' | 'glitter';
  life: number;
  maxLife: number;
}

interface SqueezableSticker {
  id: number;
  x: number;
  y: number;
  iconIndex: number;
  rotation: number;
  scale: number;
  color: string;
  bgColor: string;
}

const PASTEL_PALETTE = [
  '#f87171', // pastel coral
  '#fbbf24', // pastel sunflower
  '#34d399', // pastel mint
  '#60a5fa', // pastel sky blue
  '#a78bfa', // pastel lavender
  '#f472b6', // pastel pink
  '#ffd166', // warm pastel gold
  '#06d6a0'  // pastel seafoam
];

const FUNNY_CLICK_ICONS = [
  { icon: LuSparkles, label: 'sparkle', color: '#f59e0b', bg: '#fef3c7' },
  { icon: LuGhost, label: 'spooky', color: '#8b5cf6', bg: '#ede9fe' },
  { icon: LuSmile, label: 'happy', color: '#eab308', bg: '#fef9c3' },
  { icon: LuRocket, label: 'launch', color: '#ef4444', bg: '#fee2e2' },
  { icon: LuFlame, label: 'fire', color: '#f97316', bg: '#ffedd5' },
  { icon: LuHeart, label: 'love', color: '#ec4899', bg: '#fce7f3' },
  { icon: LuStar, label: 'gold star', color: '#eab308', bg: '#fef08a' },
  { icon: LuCoffee, label: 'tea / coffee', color: '#b45309', bg: '#fef3c7' },
  { icon: LuPalette, label: 'doodle palette', color: '#6366f1', bg: '#e0e7ff' },
  { icon: LuCat, label: 'purr', color: '#14b8a6', bg: '#ccfbf1' },
  { icon: GiStrawberry, label: 'berry sweet', color: '#f43f5e', bg: '#ffe4e6' },
  { icon: LuZap, label: 'lightning', color: '#3b82f6', bg: '#dbeafe' },
  { icon: LuGlasses, label: 'cool geek', color: '#10b981', bg: '#d1fae5' },
  { icon: LuCompass, label: 'explorer', color: '#0284c7', bg: '#e0f2fe' },
  { icon: LuLightbulb, label: 'eureka', color: '#eab308', bg: '#fef08a' },
  { icon: LuBug, label: 'bug caught', color: '#16a34a', bg: '#dcfce7' },
  { icon: LuAward, label: 'winner', color: '#d97706', bg: '#fef3c7' }
];

const DoodleCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorPencilRef = useRef<HTMLDivElement>(null);
  const trailPoints = useRef<{ x: number; y: number; time: number; width: number; color: string }[]>([]);
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const stickersRef = useRef<SqueezableSticker[]>([]);
  const [stickersState, setStickersState] = useState<SqueezableSticker[]>([]);

  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouseVelocity = useRef({
    x: 0,
    y: 0,
    lastX: window.innerWidth / 2,
    lastY: window.innerHeight / 2,
    lastTime: performance.now()
  });
  const planeState = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: 1.5,
    vy: -1.5,
    angle: -45,
    orbitDir: 1 as 1 | -1,
    visible: true,
    orbitRadius: 48
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const pencil = cursorPencilRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let colorIdx = 0;

    const EXCLUDED_SELECTORS = [
      'header',
      '.nav',
      '.nav-in',
      '.weather-toggle-group',
      '.btn-weather',
      '.brand',
      '#scribble',
      '.scribble-section',
      '.padwrap',
      '.pad',
      '.tools',
      '.sw',
      '#home .polaroid-wrapper',
      '.polaroid-wrapper',
      '.polaroid-frame',
      '.photo-container',
      '.profile-photo',
      '.photo-doodle-canvas',
      '.photo-doodle-toolbar',
      '.photo-color-dots',
      '.photo-color-dot',
      '.btn-clear-photo',
      '.sticky-post-it',
      '.arrow-pointer-container',
      '.footer-notebook',
      '.petbox',
      '.catbtn',
      '.cat-svg',
      'button',
      'input',
      'a'
    ];

    const isExcludedZone = (e: MouseEvent | PointerEvent) => {
      // 1. Check event target
      const target = e.target as Element | null;
      if (target && target instanceof Element) {
        for (const selector of EXCLUDED_SELECTORS) {
          if (target.closest(selector)) return true;
        }
      }

      // 2. Check composed path for nested SVG or shadow DOM elements
      if (typeof e.composedPath === 'function') {
        const path = e.composedPath();
        for (const node of path) {
          if (node instanceof Element) {
            for (const selector of EXCLUDED_SELECTORS) {
              if (node.matches(selector) || node.closest(selector)) return true;
            }
          }
        }
      }

      // 3. Coordinate check via elementsFromPoint to catch any covered or canvas overlays
      if (typeof document.elementsFromPoint === 'function') {
        const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
        for (const el of elementsAtPoint) {
          for (const selector of EXCLUDED_SELECTORS) {
            if (el.matches(selector) || el.closest(selector)) return true;
          }
        }
      }

      return false;
    };

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(8, now - mouseVelocity.current.lastTime);
      mouseVelocity.current.x = (e.clientX - mouseVelocity.current.lastX) / dt;
      mouseVelocity.current.y = (e.clientY - mouseVelocity.current.lastY) / dt;
      mouseVelocity.current.lastX = e.clientX;
      mouseVelocity.current.lastY = e.clientY;
      mouseVelocity.current.lastTime = now;

      const inExcluded = isExcludedZone(e);
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      planeState.current.visible = !inExcluded;

      if (pencil) {
        pencil.style.opacity = inExcluded ? '0' : '1';
      }
    };

    // Burst confetti, glitter, and stamps on click (disabled on scribble pad, polaroid, navbar, buttons, and cat petter)
    const onClick = (e: MouseEvent) => {
      if (isExcludedZone(e)) return;

      // 1. Spawn Confetti & Glitters
      for (let i = 0; i < 22; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6.5;
        const shapes: ('rect' | 'circle' | 'star' | 'heart' | 'glitter')[] = ['rect', 'circle', 'star', 'heart', 'glitter'];

        confettiRef.current.push({
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5,
          color: PASTEL_PALETTE[Math.floor(Math.random() * PASTEL_PALETTE.length)],
          size: 4 + Math.random() * 8,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 16,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          life: 0,
          maxLife: 55 + Math.random() * 30
        });
      }

      // 2. Chance to stamp a funny icon badge on the screen upon click (auto-disappears after 3s)
      if (Math.random() > 0.3) {
        const stickerId = Date.now() + Math.random();
        const randIdx = Math.floor(Math.random() * FUNNY_CLICK_ICONS.length);
        const iconConfig = FUNNY_CLICK_ICONS[randIdx];
        const newSticker: SqueezableSticker = {
          id: stickerId,
          x: e.clientX - 16 + (Math.random() - 0.5) * 20,
          y: e.clientY - 16 + (Math.random() - 0.5) * 20,
          iconIndex: randIdx,
          rotation: (Math.random() - 0.5) * 35,
          scale: 0.95 + Math.random() * 0.35,
          color: iconConfig.color,
          bgColor: iconConfig.bg
        };

        stickersRef.current.push(newSticker);
        setStickersState([...stickersRef.current]);

        // Auto remove after 3 seconds (3000ms)
        setTimeout(() => {
          stickersRef.current = stickersRef.current.filter((st) => st.id !== stickerId);
          setStickersState([...stickersRef.current]);
        }, 3000);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (isExcludedZone(e)) {
        trailPoints.current = [];
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick, { capture: true });
    window.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true });

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      // 1. Pure Aerodynamic Flight & Dual-Direction Orbital Slingshot Entry
      const dx = mousePos.current.x - planeState.current.x;
      const dy = mousePos.current.y - planeState.current.y;
      const dist = Math.hypot(dx, dy);

      // Radial displacement vector from mouse to plane
      const rx = planeState.current.x - mousePos.current.x;
      const ry = planeState.current.y - mousePos.current.y;

      const targetR = 48; // Comfortable orbital radius in pixels
      const cruiseSpeed = 2.6; // Gentle paper glider flight speed

      // Heading angle directly pointing towards mouse from plane
      const angleToMouse = (Math.atan2(dy, dx) * 180) / Math.PI;

      // Current heading in radians and forward velocity vector
      const currentRad = (planeState.current.angle * Math.PI) / 180;
      const planeVx = Math.cos(currentRad);
      const planeVy = Math.sin(currentRad);

      // Angular momentum cross-product: (R x V)_z = rx * vy - ry * vx
      // In screen coordinates (+y down):
      // cross > 0: CLOCKWISE rotation (+1)
      // cross < 0: ANTI-CLOCKWISE rotation (-1)
      const cross = (rx * planeVy - ry * planeVx) / (dist || 1);

      // Determine orbit direction:
      // While approaching (outside tight orbit), dynamically adopt clockwise (+1) or anti-clockwise (-1)
      if (dist > targetR * 1.25) {
        if (cross > 0.04) {
          planeState.current.orbitDir = 1; // Clockwise
        } else if (cross < -0.04) {
          planeState.current.orbitDir = -1; // Anti-clockwise
        }
      } else {
        // While orbiting, dynamically detect if the user's cursor movement induces opposite rotation
        const mSpeed = Math.hypot(mouseVelocity.current.x, mouseVelocity.current.y);
        if (mSpeed > 0.25) {
          const relVx = planeVx * cruiseSpeed - mouseVelocity.current.x * 14;
          const relVy = planeVy * cruiseSpeed - mouseVelocity.current.y * 14;
          const relCross = (rx * relVy - ry * relVx) / (dist || 1);
          if (relCross > 0.12) {
            planeState.current.orbitDir = 1;
          } else if (relCross < -0.12) {
            planeState.current.orbitDir = -1;
          }
        }
      }

      const orbitDir = planeState.current.orbitDir;

      // Calculate target heading:
      // In orbit, pure tangent heading is: angleToMouse - orbitDir * 90°
      const pureTangent = angleToMouse - orbitDir * 90;

      let targetHeading: number;

      if (dist > targetR * 2.6) {
        // ZONE 1: Wide Glide Approach
        // Fly towards cursor with a gentle lead offset toward orbital entry
        targetHeading = angleToMouse - orbitDir * 16;
      } else if (dist > targetR * 1.15) {
        // ZONE 2: Slingshot Gravity Belt Entry
        // Smoothly curve from approach heading into circular orbital tangent
        const factor = Math.min(1, Math.max(0, (dist - targetR * 1.15) / (targetR * 1.45)));
        const entryOffset = 90 - 74 * Math.pow(factor, 1.5);
        targetHeading = angleToMouse - orbitDir * entryOffset;
      } else {
        // ZONE 3: Orbital Cruise
        // Pure tangent with gentle radial correction to maintain perfect orbital ring
        const rDiff = dist - targetR;
        const pitch = Math.max(-28, Math.min(30, rDiff * 1.2));
        targetHeading = pureTangent + orbitDir * pitch;
      }

      // Smooth aerodynamic turn (plane tip points straight along its curved flight path)
      let turnDiff = (targetHeading - planeState.current.angle) % 360;
      if (turnDiff < -180) turnDiff += 360;
      if (turnDiff > 180) turnDiff -= 360;

      const maxTurn = dist > targetR * 2 ? 3.4 : 4.6;
      const turnSens = dist > targetR * 2 ? 0.08 : 0.13;
      const turn = Math.max(-maxTurn, Math.min(maxTurn, turnDiff * turnSens));

      planeState.current.angle += turn;

      // Move STRICTLY forward along the plane's true nose heading (NO sideways drift!)
      const rad = (planeState.current.angle * Math.PI) / 180;
      planeState.current.vx = Math.cos(rad) * cruiseSpeed;
      planeState.current.vy = Math.sin(rad) * cruiseSpeed;

      planeState.current.x += planeState.current.vx;
      planeState.current.y += planeState.current.vy;

      // Sync plane DOM element: Tip points straight along flight trajectory
      if (pencil && planeState.current.visible) {
        pencil.style.transform = `translate3d(${planeState.current.x}px, ${planeState.current.y}px, 0) rotate(${planeState.current.angle}deg)`;
      }

      // Dynamic theme color for the dashed flight line
      const activeWeather = document.documentElement.getAttribute('data-weather') || 'spring';
      let trailColor = 'rgba(236, 72, 153, 0.7)'; // Spring petal pink
      if (activeWeather === 'summer' || activeWeather === 'sunny') {
        trailColor = 'rgba(70, 115, 185, 0.65)'; // Summer notebook blue
      } else if (activeWeather === 'rainy') {
        trailColor = 'rgba(59, 130, 246, 0.75)'; // Monsoon rain blue
      } else if (activeWeather === 'autumn' || activeWeather === 'sunset') {
        trailColor = 'rgba(234, 88, 12, 0.75)'; // Autumn amber leaf
      } else if (activeWeather === 'winter' || activeWeather === 'midnight') {
        trailColor = 'rgba(56, 189, 248, 0.85)'; // Winter frost cyan
      }

      // Record dashed flight path trail
      if (planeState.current.visible) {
        const lastP = trailPoints.current[trailPoints.current.length - 1];
        const movedSinceLast = lastP
          ? Math.hypot(planeState.current.x - lastP.x, planeState.current.y - lastP.y)
          : 999;

        if (movedSinceLast > 3.5) {
          trailPoints.current.push({
            x: planeState.current.x,
            y: planeState.current.y,
            time: now,
            width: 1.8,
            color: trailColor
          });
        }
      }

      // Expire older flight path segments smoothly
      const trailLifespan = 1300;
      trailPoints.current = trailPoints.current.filter((p) => now - p.time < trailLifespan);

      // Render the nostalgic theme-matching dashed flight trail
      if (trailPoints.current.length > 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash([5, 6]);

        for (let i = 1; i < trailPoints.current.length; i++) {
          const p1 = trailPoints.current[i - 1];
          const p2 = trailPoints.current[i];
          const age = now - p2.time;
          const alpha = Math.max(0, 1 - age / trailLifespan);

          ctx.strokeStyle = p2.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.8;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Render confetti & glitter
      confettiRef.current.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.22;
        c.vx *= 0.98;
        c.rotation += c.vRot;
        c.life++;

        const progress = c.life / c.maxLife;
        const alpha = Math.max(0, 1 - progress);

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.strokeStyle = c.color;
        ctx.globalAlpha = alpha;

        if (c.shape === 'rect') {
          ctx.fillRect(-c.size / 2, -c.size / 3, c.size, c.size * 0.65);
        } else if (c.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (c.shape === 'star') {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * c.size, -Math.sin(((18 + i * 72) * Math.PI) / 180) * c.size);
            ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * (c.size * 0.45), -Math.sin(((54 + i * 72) * Math.PI) / 180) * (c.size * 0.45));
          }
          ctx.closePath();
          ctx.fill();
        } else if (c.shape === 'glitter') {
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(0, -c.size);
          ctx.lineTo(0, c.size);
          ctx.moveTo(-c.size, 0);
          ctx.lineTo(c.size, 0);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, c.size * 0.3);
          ctx.bezierCurveTo(-c.size * 0.7, -c.size * 0.5, -c.size, c.size * 0.4, 0, c.size);
          ctx.bezierCurveTo(c.size, c.size * 0.4, c.size * 0.7, -c.size * 0.5, 0, c.size * 0.3);
          ctx.fill();
        }

        ctx.restore();
      });

      confettiRef.current = confettiRef.current.filter((c) => c.life < c.maxLife);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick, { capture: true });
      window.removeEventListener('pointerdown', onPointerDown, { capture: true });
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleClearStickers = () => {
    stickersRef.current = [];
    setStickersState([]);
  };

  return (
    <>
      <canvas ref={canvasRef} className="doodle-trail-canvas" aria-hidden="true" />
      
      {/* Squeezable clicked funny icons stamped across the screen */}
      <div className="stamped-stickers-layer" aria-hidden="true">
        {stickersState.map((st) => {
          const item = FUNNY_CLICK_ICONS[st.iconIndex] || FUNNY_CLICK_ICONS[0];
          const IconComp = item.icon;
          return (
            <span
              key={st.id}
              className="stamped-screen-sticker"
              style={{
                left: `${st.x}px`,
                top: `${st.y}px`,
                transform: `rotate(${st.rotation}deg) scale(${st.scale})`,
                color: st.color,
                background: st.bgColor
              }}
              title={item.label}
            >
              <IconComp />
            </span>
          );
        })}
      </div>

      <div ref={cursorPencilRef} className="custom-paper-airplane-cursor" aria-hidden="true">
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" className="paper-airplane-svg">
          {/* Top / left wing */}
          <polygon
            points="34,18 2,6 12,18"
            fill="#ffffff"
            stroke="#2b2823"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Bottom / right wing with soft fold shading */}
          <polygon
            points="34,18 12,18 2,30"
            fill="#e2e8f0"
            stroke="#2b2823"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Crisp center crease running right into sharp nose tip */}
          <line
            x1="2"
            y1="18"
            x2="34"
            y2="18"
            stroke="#2b2823"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
};

export default DoodleCursor;
