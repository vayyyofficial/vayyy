import React, { useEffect, useRef, useState } from 'react';

/**
 * Visual Effects & Animations
 * Consolidates LoadingScreen with Matrix rain, interactive ParticlesBackground,
 * and TypewriterText into one optimized component file.
 */

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({});
  const [progressWidth, setProgressWidth] = useState('0%');
  const [isFading, setIsFading] = useState(false);

  // Stable reference to prevent useEffect retriggering on App re-renders
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const hasCompletedRef = useRef(false);

  const completeLoading = React.useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 450);
  }, []);

  useEffect(() => {
    // 1. Matrix Rain Canvas Animation (with error protection)
    const canvas = canvasRef.current;
    let matrixInterval: number | null = null;

    if (canvas) {
      try {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const fontSize = 14;
          const columns = Math.floor(canvas.width / fontSize);
          const drops: number[] = Array.from(
            { length: columns },
            () => Math.random() * -(canvas.height / fontSize)
          );

          matrixInterval = window.setInterval(() => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(241, 196, 15, 0.8)';
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((dropY, colIndex) => {
              const char = Math.random() > 0.5 ? '1' : '0';
              ctx.fillText(char, colIndex * fontSize, dropY * fontSize);
              if (dropY * fontSize > canvas.height) {
                drops[colIndex] = 0;
              }
              drops[colIndex] += 0.3;
            });
          }, 40);
        }
      } catch {
        // Fallback gracefully if canvas context fails
      }
    }

    // 2. Terminal Boot Sequence Lines
    const lineDelays = [
      { id: 'll-1', delay: 150 },
      { id: 'll-2', delay: 400 },
      { id: 'll-3', delay: 700 },
      { id: 'll-4', delay: 1000 },
      { id: 'll-5', delay: 1350 }
    ];

    const timeouts: number[] = [];

    lineDelays.forEach(({ id, delay }) => {
      const tid = window.setTimeout(() => {
        setVisibleLines((prev) => ({ ...prev, [id]: true }));
      }, delay);
      timeouts.push(tid);
    });

    // 3. Progress bar animation
    const progressTimer = window.setTimeout(() => {
      setProgressWidth('100%');
    }, 250);
    timeouts.push(progressTimer);

    // 4. Normal Boot completion trigger at 2.2 seconds
    const finishTimer = window.setTimeout(() => {
      completeLoading();
    }, 2200);
    timeouts.push(finishTimer);

    // 5. Guaranteed safety fallback timer at 3.0 seconds (ensures completion under any circumstances)
    const safetyTimer = window.setTimeout(() => {
      completeLoading();
    }, 3000);
    timeouts.push(safetyTimer);

    // 6. Interactive bypass: Click or keypress allows instant skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        completeLoading();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (matrixInterval) clearInterval(matrixInterval);
      timeouts.forEach((tid) => clearTimeout(tid));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [completeLoading]);

  return (
    <div
      id="loading-screen"
      className={isFading ? 'hidden' : ''}
      aria-label="Loading portfolio"
      role="status"
      onClick={completeLoading}
      title="Click or press any key to enter immediately"
      style={{ cursor: 'pointer' }}
    >
      <canvas id="loader-canvas" ref={canvasRef} />
      <div className="loader-logo">
        Vayyy<span>.Dev</span>
      </div>
      <div className="loader-tagline">Booting system...</div>
      <div className="loader-terminal">
        <div className={`loader-line ok ${visibleLines['ll-1'] ? 'visible' : ''}`} id="ll-1">
          <span className="dot" />
          <span className="txt">Initializing runtime environment</span>
        </div>
        <div className={`loader-line ok ${visibleLines['ll-2'] ? 'visible' : ''}`} id="ll-2">
          <span className="dot" />
          <span className="txt">Loading portfolio modules</span>
        </div>
        <div className={`loader-line warn ${visibleLines['ll-3'] ? 'visible' : ''}`} id="ll-3">
          <span className="dot" />
          <span className="txt">Connecting particle engine</span>
        </div>
        <div className={`loader-line ok ${visibleLines['ll-4'] ? 'visible' : ''}`} id="ll-4">
          <span className="dot" />
          <span className="txt">Rendering UI components</span>
        </div>
        <div className={`loader-line ok ${visibleLines['ll-5'] ? 'visible' : ''}`} id="ll-5">
          <span className="dot" />
          <span className="txt">System ready — Welcome, Visitor</span>
        </div>
      </div>
      <div className="loader-progress-wrap">
        <div className="loader-progress-bar" id="loader-bar" style={{ width: progressWidth }} />
      </div>
      <div
        style={{
          fontSize: '0.72rem',
          color: '#555',
          fontFamily: 'monospace',
          letterSpacing: '1px',
          marginTop: '6px',
          userSelect: 'none'
        }}
      >
        [ Click or press Esc / Enter to skip ]
      </div>
    </div>
  );
};

/**
 * Interactive Particle Canvas Background
 */
export const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generate 35 particles
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 1.5 + 1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Mouse repulse interaction
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120 && mdist > 0) {
          const force = (120 - mdist) / 120;
          p.x += (mdx / mdist) * force * 1.5;
          p.y += (mdy / mdist) * force * 1.5;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="particles-js" aria-hidden="true">
      <canvas ref={canvasRef} style={{ display: 'block', pointerEvents: 'none' }} />
    </div>
  );
};

/**
 * Typewriter Text Component
 * Robust character-by-character typing with instant HTML tag skipping and blinking cursor
 */
export const TypewriterText: React.FC<{
  text: string;
  speed?: number;
  className?: string;
  cursorId?: string;
}> = ({ text, speed = 25, className = '', cursorId }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let charIndex = 0;
    let currentDisplayed = '';
    let timeoutId: number;

    const typeNext = () => {
      if (charIndex >= text.length) return;

      // Skip HTML tags instantly
      if (text[charIndex] === '<') {
        const closeTag = text.indexOf('>', charIndex);
        if (closeTag !== -1) {
          currentDisplayed += text.substring(charIndex, closeTag + 1);
          charIndex = closeTag + 1;
          setDisplayed(currentDisplayed);
          typeNext();
          return;
        }
      }

      currentDisplayed += text[charIndex];
      setDisplayed(currentDisplayed);
      charIndex++;
      timeoutId = window.setTimeout(typeNext, speed);
    };

    setDisplayed('');
    typeNext();

    return () => clearTimeout(timeoutId);
  }, [text, speed]);

  return (
    <span className={className}>
      <span dangerouslySetInnerHTML={{ __html: displayed }} />
      <span className="bio-cursor" id={cursorId}>
        |
      </span>
    </span>
  );
};
