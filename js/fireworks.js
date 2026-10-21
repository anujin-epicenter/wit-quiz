/**
 * Canvas Fireworks & Particle FX Engine
 * High-performance, Retina-ready, zero-dependency pyrotechnics.
 */

class FireworksEngine {
  constructor(canvasId = 'fireworks-canvas') {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.rockets = [];
    this.isRunning = false;
    this.celebrationInterval = null;
    this.dpr = 1;

    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);

    if (this.canvas) {
      this.init();
    } else {
      window.addEventListener('DOMContentLoaded', () => this.init());
    }
  }

  init() {
    this.canvas = document.getElementById(this.canvasId);
    if (!this.canvas) {
      console.warn('Fireworks canvas not found:', this.canvasId);
      return;
    }
    this.ctx = this.canvas.getContext('2d');
    window.addEventListener('resize', this.resize);
    this.resize();
    console.log('🎆 FireworksEngine initialized successfully!');
  }

  resize() {
    if (!this.canvas) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
  }

  /**
   * Explodes a single firework burst at specific coordinates
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} count - Number of particles
   */
  burst(x, y, count = 75) {
    if (!this.canvas || !this.ctx) this.init();
    if (!this.ctx) return;

    // Default to screen center if x or y is invalid
    const targetX = (typeof x === 'number' && !isNaN(x) && x > 0) ? x : this.width / 2;
    const targetY = (typeof y === 'number' && !isNaN(y) && y > 0) ? y : this.height / 2;

    const baseHue = Math.floor(Math.random() * 360);
    const hues = [
      baseHue,
      (baseHue + 35) % 360,
      (baseHue + 70) % 360,
      (baseHue + 180) % 360
    ];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 6.5 + 2.0;
      const hue = hues[Math.floor(Math.random() * hues.length)];

      this.particles.push({
        x: targetX,
        y: targetY,
        px: targetX,
        py: targetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.12,
        friction: 0.96,
        alpha: 1.0,
        decay: Math.random() * 0.02 + 0.012,
        size: Math.random() * 3.5 + 2.0,
        color: `hsl(${hue}, 100%, ${Math.random() * 25 + 60}%)`,
        sparkle: Math.random() > 0.35
      });
    }

    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(this.loop);
    }
  }

  /**
   * Launch a rocket from the bottom of the screen to (targetX, targetY)
   */
  launchRocket(targetX, targetY) {
    if (!this.ctx) return;
    const startX = targetX + (Math.random() - 0.5) * 80;
    const startY = this.height + 15;
    const speed = Math.random() * 3.5 + 12;
    const angle = Math.atan2(targetY - startY, targetX - startX);

    this.rockets.push({
      x: startX,
      y: startY,
      px: startX,
      py: startY,
      targetY: targetY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: `hsl(${Math.random() * 360}, 100%, 75%)`
    });

    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(this.loop);
    }
  }

  /**
   * Grand celebratory fireworks storm across the screen
   * @param {number} durationMs - Duration in milliseconds
   */
  startCelebration(durationMs = 5000) {
    this.stopCelebration();

    // Instant central bursts for immediate visual punch
    const midX = this.width / 2;
    const midY = this.height * 0.35;
    this.burst(midX, midY, 90);
    this.burst(midX - 180, midY + 40, 75);
    this.burst(midX + 180, midY + 40, 75);

    const startTime = Date.now();
    this.celebrationInterval = setInterval(() => {
      if (Date.now() - startTime > durationMs) {
        this.stopCelebration();
        return;
      }
      const x = Math.random() * (this.width * 0.8) + (this.width * 0.1);
      const y = Math.random() * (this.height * 0.45) + (this.height * 0.12);
      this.launchRocket(x, y);
    }, 280);
  }

  stopCelebration() {
    if (this.celebrationInterval) {
      clearInterval(this.celebrationInterval);
      this.celebrationInterval = null;
    }
  }

  clear() {
    this.particles = [];
    this.rockets = [];
    this.stopCelebration();
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.isRunning = false;
  }

  loop() {
    if (!this.isRunning || !this.ctx) return;

    // Reset transform & clear frame cleanly (high resolution DPR safe)
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Apply DPR scale for crisp high-density graphics
    this.ctx.scale(this.dpr, this.dpr);

    // 1. Update & Render Rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.px = r.x;
      r.py = r.y;
      r.x += r.vx;
      r.y += r.vy;

      // Rocket flame trail
      this.ctx.beginPath();
      this.ctx.moveTo(r.px, r.py);
      this.ctx.lineTo(r.x, r.y);
      this.ctx.strokeStyle = r.color;
      this.ctx.lineWidth = 3.5;
      this.ctx.lineCap = 'round';
      this.ctx.stroke();

      // Explode when rocket reaches destination
      if (r.y <= r.targetY || r.vy >= 0) {
        this.burst(r.x, r.y, Math.floor(Math.random() * 25 + 65));
        this.rockets.splice(i, 1);
      }
    }

    // 2. Update & Render Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.px = p.x;
      p.py = p.y;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);

      // Trailing stream line
      this.ctx.beginPath();
      this.ctx.moveTo(p.px, p.py);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.strokeStyle = p.color;
      this.ctx.lineWidth = Math.max(1, p.size * p.alpha);
      this.ctx.lineCap = 'round';
      this.ctx.stroke();

      // Glowing particle head
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, Math.max(0.8, (p.size * p.alpha) / 1.5), 0, Math.PI * 2);
      this.ctx.fillStyle = p.sparkle && Math.random() > 0.5 ? '#ffffff' : p.color;
      this.ctx.fill();

      this.ctx.restore();
    }

    // If all particles and rockets are finished, halt animation loop to save CPU
    if (this.particles.length === 0 && this.rockets.length === 0 && !this.celebrationInterval) {
      this.isRunning = false;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    requestAnimationFrame(this.loop);
  }
}

// Make globally available on both window.fireworks and window.FireworksEngine
window.FireworksEngine = FireworksEngine;
window.fireworks = new FireworksEngine('fireworks-canvas');
