import { useEffect } from "react";

export default function useParticles(canvasRef) {
  useEffect(() => {
    const a = canvasRef.current;
    if (!a) return;
    const s = a.getContext("2d");
    let n = 0,
      r = 0,
      o = [];
    const h = () => {
      const t = Math.random() < 0.5;
      return {
        x: Math.random() * n,
        y: Math.random() * r,
        r: t ? 6 + Math.random() * 10 : 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.6,
        a: 0.4 + Math.random() * 0.5,
        heart: t,
        tw: Math.random() * Math.PI * 2,
      };
    };
    const c = () => {
      n = a.width = window.innerWidth;
      r = a.height = window.innerHeight;
      const t = Math.min(70, Math.floor(n / 22));
      o = Array.from({ length: t }, h);
    };
    c();
    window.addEventListener("resize", c);
    const g = (t, x, p, i) => {
      s.save();
      s.translate(t, x);
      s.scale(p / 16, p / 16);
      s.globalAlpha = i;
      s.fillStyle = "#ff4fa3";
      s.shadowColor = "#ff4fa3";
      s.shadowBlur = 12;
      s.beginPath();
      s.moveTo(0, 4);
      s.bezierCurveTo(0, -3, -9, -3, -9, 3);
      s.bezierCurveTo(-9, 9, 0, 13, 0, 16);
      s.bezierCurveTo(0, 13, 9, 9, 9, 3);
      s.bezierCurveTo(9, -3, 0, -3, 0, 4);
      s.fill();
      s.restore();
    };
    let m = 0;
    const j = () => {
      s.clearRect(0, 0, n, r);
      for (const t of o) {
        t.tw += 0.03;
        t.x += t.vx;
        t.y += t.vy;
        const x = t.a * (0.6 + 0.4 * Math.sin(t.tw));
        if (t.heart) {
          g(t.x, t.y, t.r, x);
        } else {
          s.save();
          s.globalAlpha = x;
          s.fillStyle = "#ffd6ea";
          s.shadowColor = "#fff";
          s.shadowBlur = 8;
          s.beginPath();
          s.arc(t.x, t.y, t.r, 0, Math.PI * 2);
          s.fill();
          s.restore();
        }
        if (t.y < -20 || t.x < -20 || t.x > n + 20) {
          Object.assign(t, h(), { y: r + 10, x: Math.random() * n });
        }
      }
      m = requestAnimationFrame(j);
    };
    j();
    return () => {
      cancelAnimationFrame(m);
      window.removeEventListener("resize", c);
    };
  }, [canvasRef]);
}
