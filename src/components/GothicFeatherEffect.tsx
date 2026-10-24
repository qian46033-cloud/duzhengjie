import React, { useEffect, useRef } from 'react';

interface FeatherParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  sway: number;
  swaySpeed: number;
  swayAmp: number;
  opacity: number;
  fadeRate: number;
  colorType: 'silver' | 'obsidian' | 'crimson' | 'ghost';
  curve: number; // bend of the feather
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

export const GothicFeatherEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const feathers: FeatherParticle[] = [];
    const ripples: ClickRipple[] = [];

    const createFeather = (
      x: number,
      y: number,
      baseVx = 0,
      baseVy = 0,
      customSize?: number
    ): FeatherParticle => {
      const colorRoll = Math.random();
      let colorType: FeatherParticle['colorType'] = 'silver';
      if (colorRoll < 0.45) colorType = 'obsidian';
      else if (colorRoll < 0.75) colorType = 'silver';
      else if (colorRoll < 0.9) colorType = 'crimson';
      else colorType = 'ghost';

      return {
        x,
        y,
        vx: baseVx + (Math.random() - 0.5) * 2.2,
        vy: baseVy + (Math.random() * -1.5 - 0.5), // slight upward pop then floats down
        size: customSize || Math.random() * 14 + 14, // 14px to 28px
        rotation: (Math.random() - 0.5) * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.04 + 0.02,
        swayAmp: Math.random() * 1.5 + 0.8,
        opacity: Math.random() * 0.35 + 0.65,
        fadeRate: Math.random() * 0.008 + 0.007,
        curve: (Math.random() - 0.5) * 0.4,
        colorType,
      };
    };

    // Draw realistic stylized gothic feather
    const drawFeather = (f: FeatherParticle) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation + Math.sin(f.sway) * 0.25);
      ctx.globalAlpha = Math.max(0, f.opacity);

      const length = f.size;
      const width = f.size * 0.35;

      // Color pallette based on type
      let spineColor = '#71717a';
      let vaneFill = 'rgba(212, 212, 216, 0.45)';
      let glowColor = 'rgba(255, 255, 255, 0.1)';

      if (f.colorType === 'obsidian') {
        spineColor = '#27272a';
        vaneFill = 'rgba(24, 24, 27, 0.75)';
        glowColor = 'rgba(39, 39, 42, 0.4)';
      } else if (f.colorType === 'crimson') {
        spineColor = '#9f1239';
        vaneFill = 'rgba(159, 18, 57, 0.55)';
        glowColor = 'rgba(244, 63, 94, 0.25)';
      } else if (f.colorType === 'ghost') {
        spineColor = '#a1a1aa';
        vaneFill = 'rgba(244, 244, 245, 0.65)';
        glowColor = 'rgba(255, 255, 255, 0.3)';
      }

      // Outer delicate glow
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 6;

      // Draw Vane (Left & Right Plumage)
      ctx.beginPath();
      // Start at quill base
      ctx.moveTo(0, length * 0.5);
      // Left curve
      ctx.bezierCurveTo(
        -width,
        length * 0.2,
        -width * 0.9,
        -length * 0.3,
        0,
        -length * 0.5
      );
      // Right curve
      ctx.bezierCurveTo(
        width * 0.9,
        -length * 0.3,
        width,
        length * 0.2,
        0,
        length * 0.5
      );
      ctx.closePath();

      ctx.fillStyle = vaneFill;
      ctx.fill();

      // Draw inner feather barbs/texture slits
      ctx.strokeStyle = spineColor;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = -0.3; i < 0.4; i += 0.15) {
        const yPos = length * i;
        ctx.moveTo(0, yPos);
        ctx.lineTo(-width * 0.7 * (1 - Math.abs(i) * 1.5), yPos - length * 0.1);
        ctx.moveTo(0, yPos);
        ctx.lineTo(width * 0.7 * (1 - Math.abs(i) * 1.5), yPos - length * 0.1);
      }
      ctx.stroke();

      // Central Quill / Shaft (Rachis)
      ctx.beginPath();
      ctx.moveTo(0, length * 0.6); // slight quill stem sticking out
      ctx.quadraticCurveTo(f.curve * 10, 0, 0, -length * 0.52);
      ctx.strokeStyle = spineColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Tiny shiny tip
      ctx.beginPath();
      ctx.arc(0, length * 0.6, 1, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    };

    // Spawn burst on click/tap
    const spawnClickBurst = (x: number, y: number) => {
      // 1. Feather burst (6 to 9 feathers)
      const count = Math.floor(Math.random() * 4) + 6;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 2.5 + 1.2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed * 0.8;
        feathers.push(createFeather(x, y, vx, vy));
      }

      // 2. Gothic mystic ripple ring
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius: Math.random() * 25 + 35,
        opacity: 0.7,
        color: Math.random() > 0.4 ? 'rgba(244, 63, 94, ' : 'rgba(212, 212, 216, ',
      });
    };

    // Track movement for glide / drag trail
    let lastMoveX = 0;
    let lastMoveY = 0;
    let lastMoveTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastMoveX;
      const dy = e.clientY - lastMoveY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Trigger if user glided at least 32px or every 70ms while moving
      if (dist > 32 || (dist > 10 && now - lastMoveTime > 75)) {
        lastMoveX = e.clientX;
        lastMoveY = e.clientY;
        lastMoveTime = now;

        // Spawn 1 or 2 graceful trail feathers
        const trailFeather = createFeather(
          e.clientX + (Math.random() - 0.5) * 12,
          e.clientY + (Math.random() - 0.5) * 12,
          dx * 0.08,
          dy * 0.08,
          Math.random() * 10 + 12
        );
        feathers.push(trailFeather);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      spawnClickBurst(e.clientX, e.clientY);
      lastMoveX = e.clientX;
      lastMoveY = e.clientY;
      lastMoveTime = Date.now();
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.12 + 0.6;
        r.opacity -= 0.035;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${r.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Tiny center cross star
        ctx.beginPath();
        const starSize = Math.max(1, 4 * (1 - r.radius / r.maxRadius));
        ctx.moveTo(r.x - starSize, r.y);
        ctx.lineTo(r.x + starSize, r.y);
        ctx.moveTo(r.x, r.y - starSize);
        ctx.lineTo(r.x, r.y + starSize);
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.8})`;
        ctx.stroke();

        ctx.restore();
      }

      // Render & update feathers
      for (let i = feathers.length - 1; i >= 0; i--) {
        const f = feathers[i];

        // Feather Physics
        f.sway += f.swaySpeed;
        f.rotation += f.rotationSpeed;
        f.vx *= 0.96; // air drag
        f.vy += 0.035; // gentle gravity
        if (f.vy > 1.8) f.vy = 1.8; // terminal velocity

        // Sinusoidal floating drift
        f.x += f.vx + Math.sin(f.sway) * f.swayAmp;
        f.y += f.vy;

        f.opacity -= f.fadeRate;

        if (f.opacity <= 0 || f.y > height + 50) {
          feathers.splice(i, 1);
          continue;
        }

        drawFeather(f);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden"
    />
  );
};
