import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FallingPetals from "./FallingPetals";
import Butterflies from "./Butterflies";
import Typewriter from "./Typewriter";
import { letterLines } from "../data/content";

export default function LetterPage({ onContinue }) {
  const [ribbonUntied, setRibbonUntied] = useState(false);
  const [opened, setOpened] = useState(false);
  const [letterOut, setLetterOut] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  const handleEnvelopeTap = () => {
    if (ribbonUntied) return;
    setRibbonUntied(true);
    setTimeout(() => setOpened(true), 700);
    setTimeout(() => setLetterOut(true), 1500);
  };

  return (
    <section className="page-section letter-page">
      <FallingPetals count={16} />
      <Butterflies count={3} />

      {/* Decorative blooming flowers around the envelope */}
      <div className="bloom-field" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`bloom bloom--${i + 1}`}
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={
              ribbonUntied
                ? { scale: 1, opacity: 1, rotate: 0 }
                : { scale: 0, opacity: 0, rotate: -20 }
            }
            transition={{
              duration: 0.9,
              delay: 0.15 * i,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <g fill="currentColor">
                <ellipse cx="30" cy="14" rx="10" ry="14" />
                <ellipse cx="30" cy="46" rx="10" ry="14" />
                <ellipse cx="14" cy="30" rx="14" ry="10" />
                <ellipse cx="46" cy="30" rx="14" ry="10" />
                <circle cx="30" cy="30" r="9" fill="#fff6e8" />
              </g>
            </svg>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="letter-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="eyebrow letter-eyebrow">A letter, just for you</p>

        <div className="envelope-stage">
          {/* Envelope - shrinks away once the letter slides out */}
          <motion.button
            className="envelope"
            onClick={handleEnvelopeTap}
            aria-label="Open the envelope"
            whileTap={{ scale: 0.97 }}
            animate={
              letterOut
                ? { opacity: 0, scale: 0.85, y: 30 }
                : opened
                ? { y: 8 }
                : { y: [0, -6, 0] }
            }
            transition={
              letterOut
                ? { duration: 0.5 }
                : opened
                ? { duration: 0.4 }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ pointerEvents: letterOut ? "none" : "auto" }}
          >
            <div className="envelope__body">
              <motion.div
                className="envelope__flap"
                animate={
                  opened
                    ? { rotateX: 180, zIndex: 0 }
                    : { rotateX: 0, zIndex: 3 }
                }
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
              />
              <div className="envelope__pocket" />

              {/* Ribbon, ties to a bow, unties on tap */}
              <div className="envelope__ribbon">
                <motion.span
                  className="ribbon-strip ribbon-strip--v"
                  animate={
                    ribbonUntied
                      ? { scaleY: 0, opacity: 0 }
                      : { scaleY: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.5 }}
                />
                <motion.span
                  className="ribbon-strip ribbon-strip--h"
                  animate={
                    ribbonUntied
                      ? { scaleX: 0, opacity: 0 }
                      : { scaleX: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                <motion.div
                  className="ribbon-bow"
                  animate={
                    ribbonUntied
                      ? { scale: 0, rotate: 90, opacity: 0 }
                      : { scale: 1, rotate: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.45, delay: 0.15 }}
                >
                  <span className="ribbon-bow__loop ribbon-bow__loop--left" />
                  <span className="ribbon-bow__loop ribbon-bow__loop--right" />
                  <span className="ribbon-bow__knot" />
                </motion.div>
              </div>
            </div>
          </motion.button>

          {!ribbonUntied && (
            <motion.p
              className="gift-hint"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              tap to untie the ribbon ✨
            </motion.p>
          )}

          {/* The letter, slides up and takes over the stage */}
          <AnimatePresence>
            {letterOut && (
              <motion.div
                className="letter-paper glass-panel"
                initial={{ y: 60, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="letter-paper__inner">
                  <Typewriter
                    lines={letterLines}
                    speed={18}
                    lineDelay={120}
                    className="letter-text"
                    onComplete={() => setTypingDone(true)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {typingDone && (
            <motion.button
              className="cta-button continue-btn"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
              onClick={onContinue}
            >
              Continue
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
