import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sparkles from "./Sparkles";
import { wishes } from "../data/content";

export default function WishJarPage({ onContinue }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [floatingWishes, setFloatingWishes] = useState([]);
  const [burstKey, setBurstKey] = useState(0);

  const allRevealed = revealedCount >= wishes.length;

  const handleJarTap = () => {
    if (allRevealed) return;
    const wishText = wishes[revealedCount];
    const id = Date.now();
    setFloatingWishes((prev) => [
      ...prev,
      { id, text: wishText, drift: (Math.random() - 0.5) * 70 },
    ]);
    setBurstKey((k) => k + 1);
    setRevealedCount((c) => c + 1);

    // Clean up after the float animation completes
    setTimeout(() => {
      setFloatingWishes((prev) => prev.filter((w) => w.id !== id));
    }, 4200);
  };

  return (
    <section className="page-section wishjar-page">
      <Sparkles count={20} />

      <motion.div
        className="wishjar-header"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">Make a wish</p>
        <h2 className="wishjar-title">The Magical Wish Jar</h2>
        <p className="wishjar-subtitle">
          {allRevealed
            ? "Every wish has found its way to you 💫"
            : "Tap the jar to release a wish"}
        </p>
      </motion.div>

      <div className="wishjar-stage">
        {/* Floating wish notes */}
        <div className="wishjar-floats">
          <AnimatePresence>
            {floatingWishes.map((w) => (
              <motion.div
                key={w.id}
                className="floating-wish glass-panel"
                initial={{ y: 40, opacity: 0, scale: 0.8, x: 0 }}
                animate={{
                  y: -260,
                  opacity: [0, 1, 1, 0],
                  scale: 1,
                  x: w.drift,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, ease: "easeOut" }}
              >
                {w.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sparkle burst on tap */}
        <AnimatePresence>
          {burstKey > 0 && (
            <motion.div
              key={burstKey}
              className="jar-burst"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {[...Array(10)].map((_, i) => {
                const angle = (i / 10) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className="jar-burst__spark"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                    animate={{
                      x: Math.cos(angle) * 90,
                      y: Math.sin(angle) * 90 - 30,
                      opacity: 0,
                      scale: 1.2,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The jar */}
        <motion.button
          className="wish-jar"
          onClick={handleJarTap}
          aria-label="Tap the jar to release a wish"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          whileTap={{ scale: 0.96, rotate: [-1, 1, 0] }}
        >
          <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className="wish-jar__svg">
            <defs>
              <linearGradient id="jarGlass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                <stop offset="100%" stopColor="rgba(255,214,232,0.35)" />
              </linearGradient>
              <linearGradient id="jarGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff6e8" />
                <stop offset="100%" stopColor="#ffd6e8" />
              </linearGradient>
            </defs>
            {/* Jar lid */}
            <rect x="55" y="18" width="90" height="26" rx="8" fill="#f7799c" />
            <rect x="60" y="10" width="80" height="14" rx="6" fill="#ff9ec2" />
            {/* Jar body */}
            <path
              d="M40 44 H160 L172 200 C172 218 158 230 140 230 H60 C42 230 28 218 28 200 L40 44 Z"
              fill="url(#jarGlass)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
            />
            {/* Inner glow representing wishes inside */}
            <ellipse cx="100" cy="170" rx="55" ry="40" fill="url(#jarGlow)" opacity="0.5" />
            {/* Highlight */}
            <path d="M55 60 L48 190" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" />
          </svg>

          {/* Inner sparkles to suggest magic inside the jar */}
          <div className="wish-jar__inner-sparkles" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="jar-inner-sparkle"
                style={{ left: `${30 + (i * 8) % 40}%`, bottom: `${10 + (i * 12) % 60}%` }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1, 0.6] }}
                transition={{
                  duration: 1.6 + (i % 3) * 0.4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.button>

        <p className="wishjar-counter">
          {revealedCount} / {wishes.length} wishes released
        </p>
      </div>

      <AnimatePresence>
        {allRevealed && (
          <motion.button
            className="cta-button continue-btn"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            onClick={onContinue}
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
