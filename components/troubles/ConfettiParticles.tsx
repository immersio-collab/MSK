"use client";

import React, { useEffect, useRef } from "react";

interface ConfettiParticlesProps {
  className?: string;
  count?: number;
}

export const ConfettiParticles: React.FC<ConfettiParticlesProps> = ({
  className = "",
  count = 35,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Palette fermée uniquement — l'ancien jeu contenait un sage et un
    // terracotta, deux familles bannies de la charte (passés en rgba ils
    // échappaient au garde-fou Tailwind).
    const colors = [
      "rgba(223, 91, 133, 0.25)", // msk-coral-500
      "rgba(106, 174, 224, 0.25)", // msk-blue-500
      "rgba(249, 210, 119, 0.3)", // msk-sun-300
      "rgba(241, 164, 188, 0.25)", // msk-coral-300
      "rgba(155, 203, 236, 0.25)", // msk-blue-300
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedY: number;
      speedX: number;
      angle: number;
      spin: number;
      shape: "circle" | "square" | "triangle";
    }

    const particles: Particle[] = [];

    const createParticle = (initY = false): Particle => {
      const size = Math.random() * 8 + 4;
      const shapes: Array<Particle["shape"]> = ["circle", "square", "triangle"];
      return {
        x: Math.random() * width,
        y: initY ? Math.random() * height : -10,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.8 + 0.4, // Gentle downward drift
        speedX: Math.random() * 0.6 - 0.3, // Slight sway
        angle: Math.random() * 360,
        spin: Math.random() * 0.5 - 0.25,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    };

    // Populate initial particles
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }

    const drawParticle = (p: Particle) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      if (p.shape === "circle") {
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      } else if (p.shape === "square") {
        ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else if (p.shape === "triangle") {
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);
        ctx.closePath();
      }
      ctx.fill();
      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin;

        // Add a gentle wave motion using sine wave
        p.x += Math.sin(p.y / 30) * 0.2;

        drawParticle(p);

        // Recycle particles when they exit the bottom or sides
        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          particles[idx] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(update);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
