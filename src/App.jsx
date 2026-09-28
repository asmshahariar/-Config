import { useEffect, useRef, useState } from "react";
import { messages, memories, birthdayText as T } from "./birthdayConfig";
import useMatrixRain from "./useMatrixRain";
import useParticles from "./useParticles";

export default function App() {
  const [screen, setScreen] = useState("hero");
  const [msgIdx, setMsgIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (screen !== "message") {
      setMsgIdx(0);
      setCharIdx(0);
      return;
    }
    if (msgIdx >= messages.length) return;
    const a = messages[msgIdx];
    if (charIdx < a.length) {
      const n = setTimeout(() => setCharIdx((r) => r + 1), 35);
      return () => clearTimeout(n);
    }
    const s = setTimeout(() => {
      setMsgIdx((n) => n + 1);
      setCharIdx(0);
    }, 450);
    return () => clearTimeout(s);
  }, [screen, msgIdx, charIdx]);

  const [memIdx, setMemIdx] = useState(2);
  useEffect(() => {
    if (screen !== "memories") return;
    const a = setInterval(() => setMemIdx((s) => (s + 1) % memories.length), 2800);
    return () => clearInterval(a);
  }, [screen]);

  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const matrixRef = useRef(null);
  const particlesRef = useRef(null);

  useMatrixRain(matrixRef);
  useParticles(particlesRef);

  const toggleMusic = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
        setPlaying(true);
      } catch {}
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const go = (a) => {
    setScreen(a);
    window.scrollTo(0, 0);
    if (a === "message" && !playing) {
      toggleMusic();
    }
  };

  return (
    <div className="bday-root">
      <canvas ref={matrixRef} id="matrix" />
      <canvas ref={particlesRef} id="particles" />
      <audio ref={audioRef} loop src="/songs/song.mp3" />
      <button
        className={`music-btn ${playing ? "playing" : ""}`}
        onClick={toggleMusic}
        aria-label="Toggle music"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>

      {screen === "hero" && (
        <section className="screen hero">
          <div className="badge top-left">
            Happy Birthday <span>✨</span>
          </div>
          <div className="hero-content">
            <p className="eyebrow">♡ A DAY TO REMEMBER ♡</p>
            <h1 className="title-script glow">Happy Birthday</h1>
            <p className="subtitle">
              To Someone Who Used To Make Every Moment Beautiful <span>✨</span>
            </p>
            <div className="divider">
              <span></span>
              <i>♡</i>
              <span></span>
            </div>
            <button className="neon-btn" onClick={() => go("message")}>
              Click To Start Surprise <span className="arrow">→</span>
            </button>
          </div>
          <div className="couple-silhouette" aria-hidden="true"></div>
          <div className="gift-silhouette" aria-hidden="true"></div>
          <div className="scroll-indicator">
            <div className="mouse">
              <span></span>
            </div>
          </div>
        </section>
      )}

      {screen === "message" && (
        <section className="screen message">
          <button className="back-btn" onClick={() => go("hero")}>
            ‹ Go Back <i>✨</i>
          </button>
          <div className="screen-head">
            <h2 className="title-script smaller glow">A Message For You</h2>
            <div className="fancy-divider">
              <span></span>
              <i>♡</i>
              <span></span>
            </div>
            <p className="subtle">Straight From The Past</p>
          </div>
          <div className="glass-card message-card">
            <div className="msg-left">
              <div className="envelope">
                <div className="env-flap"></div>
                <div className="env-letter">
                  <p className="small">For</p>
                  <p className="letter-name">Jollad</p>
                  <div className="heart-seal">♥</div>
                </div>
              </div>
            </div>
            <div className="msg-right">
              {messages.slice(0, msgIdx).map((a, s) => (
                <p key={s}>{a}</p>
              ))}
              {msgIdx < messages.length && (
                <p>
                  {messages[msgIdx].slice(0, charIdx)}
                  <span className="caret">|</span>
                </p>
              )}
            </div>
          </div>
          <button className="pill-btn" onClick={() => go("gif")}>
            Wishing You The Best
          </button>
        </section>
      )}

      {screen === "gif" && (
        <section className="screen gif-screen">
          <button className="back-btn" onClick={() => go("message")}>
            ‹ Go Back <i>💖</i>
          </button>
          <div className="gif-frame">
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHVjZzg2aWp0bjcwNWV6cjVpZzl6OW95cHE4NHN5c3k4eHQ1cmJxbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t8xgPfC5oNIRMrNooe/giphy.gif"
              alt="Happy Birthday"
            />
            <span className="gif-tag">GIF</span>
          </div>
          <div className="wish-card">
            <span className="wc-heart">✨</span>
            <p>
              Wishing you a day filled with peace,
              <br />
              happiness and all the good things ✨
            </p>
          </div>
          <div className="loading-row" onClick={() => go("memories")}>
            <p className="loading-text">Next Loading...</p>
            <div className="loading-bar">
              <div className="loading-fill"></div>
              <span className="lh" style={{ left: "25%" }}>💖</span>
              <span className="lh" style={{ left: "50%" }}>💖</span>
              <span className="lh" style={{ left: "75%" }}>💖</span>
              <span className="lh" style={{ left: "95%" }}>💖</span>
            </div>
          </div>
          <button className="pill-btn" onClick={() => go("memories")} style={{ marginTop: '20px' }}>
            Click for Next
          </button>
        </section>
      )}

      {screen === "memories" && (
        <section className="screen memories">
          <button className="back-btn" onClick={() => go("gif")}>
            ‹ Go Back <i>✨</i>
          </button>
          <div className="screen-head">
            <p className="eyebrow-script">Past Memories</p>
            <h2 className="title-serif">Memories</h2>
            <p className="swipe">( Swipe for more → )</p>
          </div>
          <button
            className="nav-arrow left"
            onClick={() => setMemIdx((a) => (a - 1 + memories.length) % memories.length)}
          >
            ‹
          </button>
          <button
            className="nav-arrow right"
            onClick={() => setMemIdx((a) => (a + 1) % memories.length)}
          >
            ›
          </button>
          <div className="carousel">
            {memories.map((a, s) => {
              const n = s - memIdx;
              const r = Math.abs(n);
              const o = n * 165;
              const h = n * -22;
              const c = r === 0 ? 1.1 : r === 1 ? 0.85 : 0.68;
              const g = -r * 120;
              const m = r > 2 ? 0 : 1;
              return (
                <div
                  key={s}
                  className={`mem-card ${r === 0 ? "active" : ""}`}
                  style={{
                    transform: `translate(-50%,-50%) translate3d(${o}px,0,${g}px) rotateY(${h}deg) scale(${c})`,
                    opacity: m,
                    zIndex: 10 - r,
                  }}
                  onClick={() => setMemIdx(s)}
                >
                  <img src={a.img} alt={a.title} loading="lazy" />
                  <div className="label">
                    <h4>{a.title}</h4>
                    <p>{a.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="dots">
            {memories.map((a, s) => (
              <span
                key={s}
                className={s === memIdx ? "active" : ""}
                onClick={() => setMemIdx(s)}
              ></span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
