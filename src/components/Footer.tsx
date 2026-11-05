import React, { useState, useEffect, useRef } from 'react';
import { LuSun, LuCloudRain, LuSunset, LuMoon } from 'react-icons/lu';
import './Footer.css';

interface FooterProps {
  onCalmToggle?: (calm: boolean) => void;
  isCalm?: boolean;
  onWeatherChange?: (weather: 'sunny' | 'rainy' | 'sunset' | 'midnight') => void;
  currentWeather?: 'sunny' | 'rainy' | 'sunset' | 'midnight';
}

const Footer: React.FC<FooterProps> = ({
  onCalmToggle,
  isCalm = false,
  onWeatherChange,
  currentWeather = 'sunny'
}) => {
  const [petCount, setPetCount] = useState(0);
  const [waveCount, setWaveCount] = useState(0);
  const [isDogHappy, setIsDogHappy] = useState(false);
  const [isPostmanWaving, setIsPostmanWaving] = useState(false);
  const [dogBubble, setDogBubble] = useState<string | null>(null);
  const [postmanBubble, setPostmanBubble] = useState<string | null>(null);
  const sceneWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automatically center the walking scene on mobile so the postman, dog, and rainbow are front and center
    const centerScene = () => {
      const el = sceneWrapperRef.current;
      if (!el) return;
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      }
    };

    centerScene();
    window.addEventListener('resize', centerScene);
    return () => window.removeEventListener('resize', centerScene);
  }, []);

  // 1. Pet the dog: Dog hops with joy, wags tail rapidly, heart/bark bubble pops above him
  const handlePetDog = () => {
    setPetCount((prev) => prev + 1);
    setIsDogHappy(true);
    setTimeout(() => setIsDogHappy(false), 2000);

    const dogQuotes = ['woof!', '♥', 'wag wag~', 'happy pup!', 'aroo!', 'good boy!'];
    const chosen = dogQuotes[Math.floor(Math.random() * dogQuotes.length)];
    setDogBubble(chosen);
    setTimeout(() => setDogBubble(null), 3200);
  };

  // 2. Wave at postman: Postman raises arm and waves back cheerfully, greeting bubble pops above him
  const handleWavePostman = () => {
    setWaveCount((prev) => prev + 1);
    setIsPostmanWaving(true);
    setTimeout(() => setIsPostmanWaving(false), 2200);

    const postmanQuotes = [
      'hello friend!',
      'special delivery!',
      'lovely day today!',
      'whistling tunes~',
      'greetings!'
    ];
    const chosen = postmanQuotes[Math.floor(Math.random() * postmanQuotes.length)];
    setPostmanBubble(chosen);
    setTimeout(() => setPostmanBubble(null), 3200);
  };

  // 3. Cycle weather mode from footer button
  const handleCycleWeather = () => {
    if (!onWeatherChange) return;
    const weatherOrder: ('sunny' | 'rainy' | 'sunset' | 'midnight')[] = [
      'sunny',
      'rainy',
      'sunset',
      'midnight'
    ];
    const currentIndex = weatherOrder.indexOf(currentWeather);
    const nextWeather = weatherOrder[(currentIndex + 1) % weatherOrder.length];
    onWeatherChange(nextWeather);
  };

  // Concise weather display without "live from Chennai"
  const weatherDisplayNames: Record<string, string> = {
    sunny: 'sunny ☀️',
    rainy: 'rainy 🌧️',
    sunset: 'sunset 🌅',
    midnight: 'midnight 🌙'
  };

  return (
    <footer className="footer-notebook" aria-label="Interactive Sketchbook Footer">
      {/* Hand-Drawn Animated Landscape Strip */}
      <div className="landscape-scene-wrapper" ref={sceneWrapperRef}>
        <svg
          className="landscape-svg"
          viewBox="0 0 1000 185"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Flying Bird */}
          <path
            className="scene-bird"
            d="M 90 62 Q 97 55 104 62 Q 111 55 118 62"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Floating Clouds */}
          <g className="scene-cloud scene-cloud-1">
            <path
              d="M 230 60 C 220 54 220 40 234 38 C 242 28 260 28 268 38 C 278 38 284 48 278 58 C 274 64 240 64 230 60 Z"
              fill="#dbeafe"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </g>

          <g className="scene-cloud scene-cloud-2">
            <path
              d="M 520 45 C 512 40 512 28 524 26 C 530 18 546 18 554 26 C 562 26 568 35 562 43 C 558 48 530 48 520 45 Z"
              fill="#dbeafe"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </g>

          {/* 1. Daytime Smiling Sun with Radiating Sketch Rays */}
          <g className="scene-sun-group">
            <g className="scene-sun-rays">
              <line x1="770" y1="46" x2="770" y2="36" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="770" y1="78" x2="770" y2="88" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="754" y1="62" x2="744" y2="62" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="786" y1="62" x2="796" y2="62" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="758" y1="50" x2="750" y2="42" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="782" y1="74" x2="790" y2="82" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="782" y1="50" x2="790" y2="42" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="758" y1="74" x2="750" y2="82" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
            </g>
            <circle cx="770" cy="62" r="16" fill="#fef08a" stroke="var(--ink)" strokeWidth="2.4" />
            {/* Friendly smiling face on sun */}
            <circle cx="765" cy="59" r="1.8" fill="var(--ink)" />
            <circle cx="775" cy="59" r="1.8" fill="var(--ink)" />
            <path d="M 765 65 Q 770 69 775 65" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* 2. Nighttime Crescent Moon & Twinkling Stars (Active in Midnight Theme) */}
          <g className="scene-moon-group">
            {/* Twinkling Starlight Constellations */}
            <g className="twinkle-star star-1">
              <polygon points="726,38 728,32 730,38 736,40 730,42 728,48 726,42 720,40" fill="#bae6fd" />
            </g>
            <g className="twinkle-star star-2">
              <polygon points="816,52 818,46 820,52 826,54 820,56 818,62 816,56 810,54" fill="#fef08a" />
            </g>
            <g className="twinkle-star star-3">
              <polygon points="660,34 661.5,29 663,34 668,35.5 663,37 661.5,42 660,37 655,35.5" fill="#fbcfe8" />
            </g>
            <g className="twinkle-star star-4">
              <polygon points="360,42 361.5,37 363,42 368,43.5 363,45 361.5,50 360,45 355,43.5" fill="#bae6fd" />
            </g>
            <g className="twinkle-star star-5">
              <polygon points="120,42 121.5,37 123,42 128,43.5 123,45 121.5,50 120,45 115,43.5" fill="#fef08a" />
            </g>

            {/* Soft Moon Halo */}
            <circle cx="770" cy="62" r="24" fill="#fef08a" opacity="0.15" className="moon-halo-pulse" />

            {/* Hand-Drawn Smiling Crescent Moon */}
            <path
              d="M 778 44 C 762 44 752 56 756 74 C 760 84 772 88 782 84 C 768 80 762 70 766 58 C 768 50 774 46 778 44 Z"
              fill="#fef08a"
              stroke="#f8fafc"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Sleepy Peaceful Curved Eye */}
            <path d="M 763 65 Q 767 69 771 65" fill="none" stroke="#0f141f" strokeWidth="1.8" strokeLinecap="round" />
            {/* Cute Nightcap on Crescent Moon */}
            <path d="M 776 44 C 768 34 750 36 742 40" fill="none" stroke="#f8fafc" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="740" cy="41" r="3.5" fill="#f472b6" stroke="#f8fafc" strokeWidth="1.4" />
          </g>

          {/* Cottage House with Chimney Smoke and Picket Fence */}
          <g className="scene-cottage-group">
            {/* Animated Chimney Smoke Puffs */}
            <circle className="smoke-puff smoke-puff-1" cx="210" cy="74" r="4" fill="var(--muted)" />
            <circle className="smoke-puff smoke-puff-2" cx="206" cy="62" r="6" fill="var(--muted)" />
            <circle className="smoke-puff smoke-puff-3" cx="200" cy="48" r="8" fill="var(--muted)" />

            {/* Chimney */}
            <rect x="202" y="80" width="12" height="26" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.4" />

            {/* Roof */}
            <polygon
              points="140,118 180,82 225,118"
              fill="var(--panel)"
              stroke="var(--ink)"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />

            {/* House Body */}
            <rect x="148" y="118" width="70" height="36" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.4" />

            {/* Door */}
            <rect x="156" y="132" width="16" height="22" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
            <circle cx="168" cy="143" r="1.4" fill="var(--ink)" />

            {/* 4-Pane Window (Cozy light glows at night) */}
            <rect x="186" y="125" width="18" height="18" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
            <line x1="195" y1="125" x2="195" y2="143" stroke="var(--ink)" strokeWidth="1.6" />
            <line x1="186" y1="134" x2="204" y2="134" stroke="var(--ink)" strokeWidth="1.6" />

            {/* Picket Fence */}
            <path d="M 226 138 L 260 138 M 226 146 L 260 146" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
            <path d="M 230 132 L 230 154 M 238 132 L 238 154 M 246 132 L 246 154 M 254 132 L 254 154" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
          </g>

          {/* Street Lamp Post with Night Light Beam */}
          <g className="scene-lamp-group">
            {/* Night light cone cast on the ground */}
            <polygon className="lamp-light-cone" points="290,103 252,154 328,154" fill="#fef08a" opacity="0" pointerEvents="none" />
            <path d="M 276 154 L 276 106 C 276 94 290 94 290 100" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="290" cy="103" r="6" fill="#fef08a" stroke="var(--ink)" strokeWidth="1.8" />
            <circle className="lamp-glow-pulse" cx="290" cy="103" r="12" fill="#fef08a" opacity="0.3" />
          </g>

          {/* Green Tree with Falling Leaf */}
          <g className="scene-tree-group">
            <path d="M 314 154 L 314 122" stroke="var(--ink)" strokeWidth="3.4" strokeLinecap="round" />
            <path
              d="M 296 122 C 286 108 302 92 314 96 C 324 86 340 98 336 112 C 344 124 330 134 314 130 Z"
              fill="#bbf7d0"
              stroke="var(--ink)"
              strokeWidth="2.4"
            />
            {/* Drifting Leaf */}
            <path
              className="scene-drifting-leaf"
              d="M 334 120 Q 340 126 335 132 Q 330 126 334 120"
              fill="#fed7aa"
              stroke="var(--ink)"
              strokeWidth="1.2"
            />
          </g>

          {/* Fluttering Pink Butterfly */}
          <g className="scene-butterfly" transform="translate(390, 122)">
            <path className="wing-left" d="M 0 0 C -6 -7 -9 1 0 3 Z" fill="#fbcfe8" stroke="var(--ink)" strokeWidth="1.4" />
            <path className="wing-right" d="M 0 0 C 6 -7 9 1 0 3 Z" fill="#fbcfe8" stroke="var(--ink)" strokeWidth="1.4" />
            <line x1="0" y1="-2" x2="0" y2="4" stroke="var(--ink)" strokeWidth="1.2" />
          </g>

          {/* Ground Flowers & Little Mushroom */}
          <g className="scene-flora">
            {/* Pink Wildflower */}
            <line x1="430" y1="154" x2="430" y2="144" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="430" cy="142" r="3.2" fill="#f472b6" stroke="var(--ink)" strokeWidth="1.4" />

            {/* Yellow Wildflower */}
            <line x1="448" y1="154" x2="448" y2="146" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="448" cy="144" r="3.2" fill="#fef08a" stroke="var(--ink)" strokeWidth="1.4" />

            {/* Little Mushroom */}
            <path d="M 480 154 L 480 148" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 473 148 Q 480 140 487 148 Z" fill="#fca5a5" stroke="var(--ink)" strokeWidth="1.8" />
          </g>

          {/* Pastel Rainbow Arch */}
          <g className="scene-rainbow">
            <path d="M 525 154 A 65 65 0 0 1 655 154" fill="none" stroke="#fbcfe8" strokeWidth="5.5" opacity="0.85" strokeLinecap="round" />
            <path d="M 532 154 A 58 58 0 0 1 648 154" fill="none" stroke="#fed7aa" strokeWidth="5.5" opacity="0.85" strokeLinecap="round" />
            <path d="M 539 154 A 51 51 0 0 1 641 154" fill="none" stroke="#fef08a" strokeWidth="5.5" opacity="0.85" strokeLinecap="round" />
            <path d="M 546 154 A 44 44 0 0 1 634 154" fill="none" stroke="#bae6fd" strokeWidth="5.5" opacity="0.85" strokeLinecap="round" />
          </g>

          {/* Walking Companions Patrol: Postman & Dog walk left to right & vice versa */}
          <g className="scene-patrol-walker">
            {/* Visual Actors Group: Flips direction when changing walking direction */}
            <g className="scene-patrol-actors">
              {/* The Walking Postman */}
              <g
                className={`scene-postman ${isPostmanWaving ? 'waving' : ''}`}
                onClick={handleWavePostman}
                role="button"
                tabIndex={0}
                aria-label="Postman, click to wave"
              >
                {/* Whistling Music Notes */}
                <text x="488" y="98" className="scene-music-note note-1" fill="#f472b6" fontSize="12" fontWeight="bold">♪</text>
                <text x="502" y="90" className="scene-music-note note-2" fill="#f59e0b" fontSize="10" fontWeight="bold">♫</text>

                {/* Red Cap */}
                <path d="M 494 108 Q 503 103 514 108 L 518 111 L 492 111 Z" fill="#ef4444" stroke="var(--ink)" strokeWidth="1.8" />

                {/* Postman Head */}
                <circle cx="504" cy="114" r="7.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
                {/* Smiling Eyes & Smile */}
                <circle cx="502" cy="113" r="1.2" fill="var(--ink)" />
                <circle cx="507" cy="113" r="1.2" fill="var(--ink)" />
                <path d="M 502 117 Q 505 119 508 117" fill="none" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" />

                {/* Blue Uniform Shirt */}
                <rect x="496" y="122" width="16" height="17" rx="2" fill="#60a5fa" stroke="var(--ink)" strokeWidth="2" />

                {/* Walking Legs */}
                <line x1="500" y1="139" x2="497" y2="154" className="leg-left" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
                <line x1="508" y1="139" x2="512" y2="154" className="leg-right" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
                {/* Boots */}
                <path d="M 494 154 L 499 154" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                <path d="M 510 154 L 515 154" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />

                {/* Arm 1: Holding Letter Envelope */}
                <path d="M 496 126 L 485 130" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
                {/* Mail Envelope with Heart Stamp */}
                <rect x="477" y="125" width="10" height="8" rx="1" fill="#ffffff" stroke="var(--ink)" strokeWidth="1.4" />
                <line x1="477" y1="125" x2="482" y2="129" stroke="var(--ink)" strokeWidth="1.2" />
                <line x1="487" y1="125" x2="482" y2="129" stroke="var(--ink)" strokeWidth="1.2" />
                <circle cx="482" cy="129" r="0.8" fill="#ef4444" />

                {/* Arm 2: Carrying Brown Parcel Box OR Waving */}
                <g className="postman-waving-arm">
                  <path d="M 512 126 L 518 132" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
                  {/* Cardboard Box under arm */}
                  <rect x="514" y="129" width="12" height="11" rx="1" fill="#fed7aa" stroke="var(--ink)" strokeWidth="1.6" />
                  <line x1="520" y1="129" x2="520" y2="140" stroke="var(--ink)" strokeWidth="1.2" />
                </g>
              </g>

              {/* The Cute Trotting Dog */}
              <g
                className={`scene-dog ${isDogHappy ? 'happy-dog' : ''}`}
                onClick={handlePetDog}
                role="button"
                tabIndex={0}
                aria-label="Dog, click to pet"
              >
                {/* Wagging Tail */}
                <path className="dog-tail" d="M 526 136 C 520 130 521 122 525 119" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />

                {/* Dog Body */}
                <rect x="526" y="132" width="22" height="14" rx="3" fill="#fef3c7" stroke="var(--ink)" strokeWidth="2.2" />

                {/* Dog Head with Pointy Ears */}
                <circle cx="552" cy="130" r="6" fill="#fef3c7" stroke="var(--ink)" strokeWidth="2" />
                <path d="M 548 126 L 550 120 L 554 125 Z" fill="#fef3c7" stroke="var(--ink)" strokeWidth="1.8" />
                {/* Eye & Nose */}
                <circle cx="554" cy="129" r="1.1" fill="var(--ink)" />
                <polygon points="557,130 559,130 558,132" fill="var(--ink)" />

                {/* Collar */}
                <line x1="547" y1="133" x2="549" y2="136" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />

                {/* Trotting Legs */}
                <line x1="530" y1="146" x2="528" y2="154" className="dog-leg-back" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="535" y1="146" x2="537" y2="154" className="dog-leg-back2" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="542" y1="146" x2="540" y2="154" className="dog-leg-front" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="546" y1="146" x2="548" y2="154" className="dog-leg-front2" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            </g>

            {/* Speech Bubbles Group: Moves with walker, but NEVER gets mirrored/flipped! */}
            <g className="scene-patrol-bubbles" aria-hidden="true">
              <g className="patrol-bubble-track postman-track" transform="translate(504, 86)">
                {postmanBubble && (
                  <g key={`postman-${waveCount}`} className="bubble-content-pop">
                    <rect x="-73" y="-24" width="146" height="24" rx="6" className="patrol-bubble-rect" />
                    <polygon points="-5,-1 0,7 5,-1" className="patrol-bubble-arrow" />
                    <text x="0" y="-7.5" textAnchor="middle" className="patrol-bubble-text">
                      {postmanBubble}
                    </text>
                  </g>
                )}
              </g>

              <g className="patrol-bubble-track dog-track" transform="translate(550, 102)">
                {dogBubble && (
                  <g key={`dog-${petCount}`} className="bubble-content-pop">
                    <rect x="-48" y="-22" width="96" height="22" rx="6" className="patrol-bubble-rect" />
                    <polygon points="-4,-1 0,6 4,-1" className="patrol-bubble-arrow" />
                    <text x="0" y="-6.5" textAnchor="middle" className="patrol-bubble-text">
                      {dogBubble}
                    </text>
                  </g>
                )}
              </g>
            </g>
          </g>

          {/* Wooden Signpost ("post ->") */}
          <g className="scene-signpost">
            <line x1="628" y1="154" x2="628" y2="124" stroke="var(--ink)" strokeWidth="2.8" strokeLinecap="round" />
            {/* Arrow sign pointing right */}
            <polygon
              points="614,124 646,124 656,132 646,140 614,140"
              fill="#fef3c7"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <text x="620" y="135" fontFamily="var(--font-code)" fontSize="9" fontWeight="bold" fill="var(--ink)">
              post
            </text>
          </g>

          {/* Mailbox on Post & Green Bush */}
          <g className="scene-mailbox-group">
            <line x1="680" y1="154" x2="680" y2="134" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
            {/* Mailbox Body */}
            <path
              d="M 672 134 C 672 124 688 124 688 134 L 688 144 L 672 144 Z"
              fill="#fda4af"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Red Flag on Mailbox */}
            <path d="M 688 134 L 696 134 L 696 142 L 688 142" fill="#ef4444" stroke="var(--ink)" strokeWidth="1.4" />

            {/* Green Bush */}
            <path
              d="M 700 154 C 696 144 708 136 718 140 C 726 132 738 140 735 150 C 740 154 732 156 700 154 Z"
              fill="#bbf7d0"
              stroke="var(--ink)"
              strokeWidth="2.2"
            />
          </g>

          {/* Ground Curve with Grass Tufts */}
          <path
            className="scene-ground"
            d="M 50 154 Q 280 150 500 154 T 950 152"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Little Grass Tufts sprouting along the ground */}
          <g className="scene-grass-tufts">
            <path d="M 80 154 L 78 147 M 80 154 L 83 148" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 170 154 L 168 147 M 170 154 L 173 148" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 370 154 L 368 147 M 370 154 L 373 148" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 460 154 L 458 147 M 460 154 L 463 148" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 580 154 L 578 147 M 580 154 L 583 148" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 660 154 L 658 147 M 660 154 L 663 148" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 760 154 L 758 147 M 760 154 L 763 148" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 880 153 L 878 146 M 880 153 L 883 147" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Dashed Road Center Line */}
          <path
            className="scene-road-dashes"
            d="M 50 166 Q 280 163 500 166 T 950 164"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="2.2"
            strokeDasharray="9 7"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      </div>

      <div className="landscape-scroll-hint">↔ scroll to stroll the street</div>

      {/* 4 Interactive 3D Tactile Paper Lift Buttons */}
      <div className="footer-button-deck" role="toolbar" aria-label="Interactive Controls">
        <button
          className="lift-btn"
          type="button"
          onClick={handlePetDog}
          aria-label="Pet the dog"
        >
          pet the dog {petCount > 0 ? `(${petCount})` : ''}
        </button>

        <button
          className="lift-btn"
          type="button"
          onClick={handleWavePostman}
          aria-label="Wave at the postman"
        >
          wave at the postman {waveCount > 0 ? `(${waveCount})` : ''}
        </button>

        <button
          className="lift-btn"
          type="button"
          onClick={handleCycleWeather}
          aria-label={`Current weather: ${currentWeather}. Click to change weather theme.`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <span>weather: {currentWeather}</span>
          {currentWeather === 'sunny' && <LuSun style={{ color: '#eab308' }} />}
          {currentWeather === 'rainy' && <LuCloudRain style={{ color: '#38bdf8' }} />}
          {currentWeather === 'sunset' && <LuSunset style={{ color: '#f97316' }} />}
          {currentWeather === 'midnight' && <LuMoon style={{ color: '#a855f7' }} />}
        </button>

        {onCalmToggle && (
          <button
            className="lift-btn"
            type="button"
            aria-pressed={isCalm}
            onClick={() => onCalmToggle(!isCalm)}
          >
            calm mode: {isCalm ? 'on' : 'off'}
          </button>
        )}
      </div>

      {/* Handcrafted Footer Credits matching reference */}
      <div className="footer-credits-section">
        <p className="footer-copyright-text">
          made by hand, with a little code · &copy; {new Date().getFullYear()} Vaaheesan S
        </p>
        <p className="footer-sub-quote">
          Just one more adjustment... (the tea went cold hours ago, but the optimization continues).
        </p>
      </div>
    </footer>
  );
};

export default Footer;
