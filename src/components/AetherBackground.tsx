"use client";

import { useEffect, useRef } from "react";

interface Pointer {
  x: number;
  y: number;
  isDown: boolean;
  radius: number;
  vx: number;
  vy: number;
  lastX: number;
  lastY: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  velocity: number;
  force: number;
  life: number;
}

export default function AetherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let globalTime = 0;
    let targetScrollY = 0;
    let currentScrollY = 0;
    let scrollVelocity = 0;

    const pointers = new Map<number | string, Pointer>();
    const shockwaves: Shockwave[] = [];
    const particles: NodeParticle[] = [];
    
    // Konfigurasi Grid & Density Responsif (GPU-Friendly)
    const densityFactor = Math.min(width * height / 10000, 140);
    const connectionRadius = 160;

    pointers.set("mouse", { x: -2000, y: -2000, isDown: false, radius: 240, vx: 0, vy: 0, lastX: 0, lastY: 0 });

    class NodeParticle {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      radius: number;
      phase: number;
      speedFactor: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.ox = this.x;
        this.oy = this.y;
        this.vx = 0;
        this.vy = 0;
        this.radius = Math.random() * 1.2 + 0.6;
        this.phase = Math.random() * Math.PI * 2;
        this.speedFactor = Math.random() * 0.4 + 0.6;
      }

      update() {
        // 1. FR-03: Autonomous Ambient Drift (Pola Perilaku Otonom)
        const driftX = Math.sin(globalTime * 0.0008 + this.phase) * 0.15;
        const driftY = Math.cos(globalTime * 0.0006 + this.phase) * 0.15;
        this.vx += driftX * this.speedFactor;
        this.vy += driftY * this.speedFactor;

        // 2. FR-05: Scroll-Driven Flow Integration
        this.vy -= scrollVelocity * 0.08 * this.speedFactor;

        // 3. FR-02: Interactive Environment Response (Kursor, Gesture & Drag)
        pointers.forEach((pointer) => {
          const dx = pointer.x - this.x;
          const dy = pointer.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < pointer.radius) {
            const force = (pointer.radius - dist) / pointer.radius;
            const angle = Math.atan2(dy, dx);
            
            // Efek Pemindahan Cairan (Fluid Displacement / Repulsion Field)
            let acceleration = force * 2.5;
            
            // Jika terjadi pergerakan Drag cepat, berikan efek tarikan magnetis searah kecepatan kursor
            if (pointer.isDown) {
              this.vx += pointer.vx * force * 0.3;
              this.vy += pointer.vy * force * 0.3;
              acceleration *= -0.5; // Balikkan menjadi daya tarik kursor
            }

            this.vx -= Math.cos(angle) * acceleration;
            this.vy -= Math.sin(angle) * acceleration;
          }
        });

        // 4. FR-02: Click / Tap Pulse Dynamics
        shockwaves.forEach((wave) => {
          const dx = this.x - wave.x;
          const dy = this.y - wave.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (Math.abs(dist - wave.radius) < 30) {
            const angle = Math.atan2(dy, dx);
            const waveForce = (1 - wave.radius / wave.maxRadius) * wave.force;
            this.vx += Math.cos(angle) * waveForce;
            this.vy += Math.sin(angle) * waveForce;
          }
        });

        // 5. Spring Restoration Mechanics (Pemulihan Posisi Alami)
        this.vx += (this.ox - this.x) * 0.0008;
        this.vy += (this.oy - this.y) * 0.0008;

        // Friksi Atmosfer
        this.vx *= 0.93;
        this.vy *= 0.93;

        this.x += this.vx;
        this.y += this.vy;

        // Toroidal Boundary Teleportation
        if (this.x < -40) { this.x = width + 40; this.ox = this.x; }
        if (this.x > width + 40) { this.x = -40; this.ox = this.x; }
        if (this.y < -40) { this.y = height + 40; this.oy = this.y; }
        if (this.y > height + 40) { this.y = -40; this.oy = this.y; }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Analogous Color Harmony Accent (10% - Softer Indigo-Blue)
        c.fillStyle = `rgba(147, 197, 253, ${0.3 + Math.sin(globalTime * 0.002 + this.phase) * 0.15})`;
        c.fill();
      }
    }

    const setupEnvironment = () => {
      particles.length = 0;
      for (let i = 0; i < densityFactor; i++) {
        particles.push(new NodeParticle());
      }
    };

    const renderLoop = () => {
      globalTime++;

      // FR-07 & FR-08: Primary Background Allocation (60% - Ultra Deep Calm Slate)
      ctx.fillStyle = "#070a13";
      ctx.fillRect(0, 0, width, height);

      // Sinkronisasi & Peredaman Scroll Velocity
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;
      scrollVelocity = targetScrollY - currentScrollY;

      // Update & Render Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.velocity;
        sw.life -= 0.02;
        
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45, 212, 191, ${sw.life * 0.25})`; // Soft Teal Ambient Light
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (sw.life <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      // Update Partikel
      particles.forEach((p) => p.update());

      // FR-06: Ambient Motion Layer - Spatial Neural Network Mesh
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionRadius * connectionRadius) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / connectionRadius) * 0.14;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Pergeseran Gradasi Halus Berdasarkan Aliran Ruang
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // Render Struktur Partikel Teratas
      particles.forEach((p) => p.draw(ctx));

      // Hitung delta kecepatan pointer untuk geseran drag berikutnya
      pointers.forEach((pointer) => {
        pointer.vx = pointer.x - pointer.lastX;
        pointer.vy = pointer.y - pointer.lastY;
        pointer.lastX = pointer.x;
        pointer.lastY = pointer.y;
      });

      requestAnimationFrame(renderLoop);
    };

    // --- Manajemen Event Interaktivitas Real-Time --- //
    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const p = pointers.get("mouse");
      if (p) {
        p.x = e.clientX;
        p.y = e.clientY;
        p.isDown = e.buttons > 0;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const p = pointers.get("mouse");
      if (p) p.isDown = true;
      shockwaves.push({ x: e.clientX, y: e.clientY, radius: 0, maxRadius: 380, velocity: 6, force: 4, life: 1.0 });
    };

    const onMouseUp = () => {
      const p = pointers.get("mouse");
      if (p) p.isDown = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      Array.from(e.touches).forEach((t) => {
        pointers.set(t.identifier, { x: t.clientX, y: t.clientY, isDown: true, radius: 180, vx: 0, vy: 0, lastX: t.clientX, lastY: t.clientY });
        shockwaves.push({ x: t.clientX, y: t.clientY, radius: 0, maxRadius: 280, velocity: 5, force: 3, life: 1.0 });
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      Array.from(e.touches).forEach((t) => {
        const p = pointers.get(t.identifier);
        if (p) {
          p.x = t.clientX;
          p.y = t.clientY;
        }
      });
    };

    const onTouchEnd = (e: TouchEvent) => {
      Array.from(e.changedTouches).forEach((t) => pointers.delete(t.identifier));
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      setupEnvironment();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    setupEnvironment();
    renderLoop();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-auto select-none" style={{ zIndex: 0 }} />;
}

