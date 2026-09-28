import { useEffect } from "react";
import { matrixWords } from "./birthdayConfig";

export default function useMatrixRain(canvasRef) {
  useEffect(() => {
    const a = canvasRef.current;
    if (!a) return;
    const s = a.getContext("2d");
    const n = matrixWords;
    let r = 0,
      o = 0,
      h = 0,
      c = 16,
      g = [];
    const m = Math.min(window.devicePixelRatio || 1, 2);
    const j = () => {
      r = a.width = window.innerWidth * m;
      o = a.height = window.innerHeight * m;
      a.style.width = window.innerWidth + "px";
      a.style.height = window.innerHeight + "px";
      c = Math.max(14, Math.floor(16 * m));
      h = Math.floor(r / c);
      g = Array.from({ length: h }, () => ({
        y: Math.random() * -o,
        speed: 0.6 + Math.random() * 1.6,
        word: n[Math.floor(Math.random() * n.length)],
        idx: 0,
        alpha: 0.3 + Math.random() * 0.6,
      }));
    };
    j();
    window.addEventListener("resize", j);
    let t = 0;
    const x = () => {
      s.fillStyle = "rgba(5,5,5,0.18)";
      s.fillRect(0, 0, r, o);
      s.font = `${c}px monospace`;
      for (let p = 0; p < h; p++) {
        const i = g[p];
        const R = i.word[i.idx % i.word.length];
        s.fillStyle = `rgba(255,79,163,${i.alpha})`;
        s.shadowColor = "#ff4fa3";
        s.shadowBlur = 8;
        s.fillText(R, p * c, i.y);
        s.shadowBlur = 0;
        i.y += i.speed * c * 0.25;
        i.idx++;
        if (i.y > o + 50) {
          i.y = -20;
          i.speed = 0.6 + Math.random() * 1.6;
          i.word = n[Math.floor(Math.random() * n.length)];
          i.alpha = 0.25 + Math.random() * 0.7;
        }
      }
      t = requestAnimationFrame(x);
    };
    x();
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("resize", j);
    };
  }, [canvasRef]);
}
