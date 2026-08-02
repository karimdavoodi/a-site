"use client";

import { useEffect, useRef } from "react";

export const StarPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    function star(
      cx: number,
      cy: number,
      r1: number,
      r2: number,
      rot: number,
    ) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const r = i % 2 === 0 ? r1 : r2;
        const a = rot + (i * Math.PI) / 8;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    function draw() {
      if (!cv || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.offsetWidth;
      const h = cv.offsetHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const s = 108;
      ctx.lineWidth = 1;
      for (let row = -1; row * s * 0.5 < h + s; row++) {
        const y = row * s * 0.5;
        const xoff = row % 2 === 0 ? 0 : s * 0.5;
        for (let col = -1; col * s < w + s; col++) {
          const x = col * s + xoff;
          const fade = 0.5 + 0.5 * (y / h);
          ctx.strokeStyle = `rgba(217, 178, 60, ${0.05 + 0.06 * fade})`;
          star(x, y, 40, 16.5, Math.PI / 16);
          ctx.strokeStyle = `rgba(230, 240, 233, ${0.028 * fade})`;
          star(x, y, 24, 10, Math.PI / 16 + Math.PI / 8);
        }
      }
    }

    draw();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
};
