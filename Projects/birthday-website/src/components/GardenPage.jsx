import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Butterflies from "./Butterflies";
import Sparkles from "./Sparkles";
import { finalMessage, hiddenMessage, recipientName } from "../data/content";

export default function GardenPage({ onReplay }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="page-section garden-page">
      <Sparkles count={16} />
      <Butterflies count={4} />

      {/* Grown flowers / stems rising from the bottom */}
      <div className="garden-field" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className={`garden-stem garden-stem--${i + 1}`}
            initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="garden-stem__line" />
            <motion.span
              className="garden-stem__rose"
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 + 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor">
                  <circle cx="30" cy="30" r="8" />
                  <ellipse cx="30" cy="16" rx="10" ry="14" opacity="0.85" />
                  <ellipse cx="30" cy="44" rx="10" ry="14" opacity="0.85" />
                  <ellipse cx="16" cy="30" rx="14" ry="10" opacity="0.85" />
                  <ellipse cx="44" cy="30" rx="14" ry="10" opacity="0.85" />
                  <ellipse cx="18" cy="18" rx="9" ry="12" opacity="0.7" />
                  <ellipse cx="42" cy="18" rx="9" ry="12" opacity="0.7" />
                  <ellipse cx="18" cy="42" rx="9" ry="12" opacity="0.7" />
                  <ellipse cx="42" cy="42" rx="9" ry="12" opacity="0.7" />
                </g>
              </svg>
            </motion.span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="garden-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        <p className="eyebrow">From my heart to yours</p>

        <motion.p
          className="garden-message"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6 }}
        >
          {finalMessage.split("\n").map((line, i) => (
            <span key={i} className="garden-message__line">
              {line}
            </span>
          ))}
        </motion.p>

        {/* Glowing heart, tap to reveal hidden message */}
        <motion.button
          className="glow-heart-wrapper"
          onClick={() => setRevealed(true)}
          aria-label="Reveal hidden message"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          whileTap={{ scale: 0.92 }}
        >
          <motion.div
            className="glow-heart__halo"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="glow-heart"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M16 28.5C16 28.5 1 19.6 1 9.6C1 4.6 4.8 1 9.3 1C12.4 1 14.9 2.9 16 5.5C17.1 2.9 19.6 1 22.7 1C27.2 1 31 4.6 31 9.6C31 19.6 16 28.5 16 28.5Z" />
            </svg>
          </motion.div>
        </motion.button>

        {!revealed && (
          <motion.p
            className="gift-hint"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            tap the heart 💗
          </motion.p>
        )}

        <AnimatePresence>
          {revealed && (
            <motion.div
              className="hidden-message glass-panel"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>{hiddenMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="cta-button replay-btn"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.4 }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          onClick={onReplay}
        >
          Replay the Magic ✨
        </motion.button>

        <p className="garden-signoff">— Made with love, for {recipientName}</p>
      </motion.div>
    </section>
  );
}
