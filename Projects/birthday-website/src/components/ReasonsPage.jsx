import { useState } from "react";
import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";
import { reasons } from "../data/content";

function ReasonCard({ reason, index }) {
  const [flipped, setFlipped] = useState(false);

  // Each card gets a unique, gentle float pattern
  const floatDuration = 4 + (index % 5) * 0.6;
  const floatDelay = (index % 4) * 0.3;
  const floatOffset = 6 + (index % 3) * 3;

  return (
    <motion.div
      className="reason-card-wrapper"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
    >
      <motion.div
        className="reason-card-float"
        animate={{ y: [0, -floatOffset, 0] }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.button
          className="reason-card"
          onClick={() => setFlipped((f) => !f)}
          aria-label={`Reason ${index + 1}: ${reason.title}`}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="reason-card__face reason-card__face--front glass-panel">
            <span className="reason-card__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <svg
              className="reason-card__heart-icon"
              viewBox="0 0 32 29"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M16 28.5C16 28.5 1 19.6 1 9.6C1 4.6 4.8 1 9.3 1C12.4 1 14.9 2.9 16 5.5C17.1 2.9 19.6 1 22.7 1C27.2 1 31 4.6 31 9.6C31 19.6 16 28.5 16 28.5Z" />
            </svg>
            <h3 className="reason-card__title">{reason.title}</h3>
            <span className="reason-card__tap-hint">tap to reveal</span>
          </div>
          <div className="reason-card__face reason-card__face--back glass-panel">
            <p className="reason-card__message">{reason.message}</p>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function ReasonsPage({ onContinue }) {
  return (
    <section className="page-section reasons-page">
      <FloatingHearts count={8} />
      <Sparkles count={18} />

      <motion.div
        className="reasons-header"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">Just a few of so many</p>
        <h2 className="reasons-title">Reasons You're Amazing</h2>
        <p className="reasons-subtitle">Tap each heart to read one ✨</p>
      </motion.div>

      <div className="reasons-grid">
        {reasons.map((reason, i) => (
          <ReasonCard key={i} reason={reason} index={i} />
        ))}
      </div>

      <motion.button
        className="cta-button continue-btn"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.03 }}
        onClick={onContinue}
      >
        Continue
      </motion.button>
    </section>
  );
}
