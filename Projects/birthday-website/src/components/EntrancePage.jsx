import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";
import Typewriter from "./Typewriter";
import ConfettiBurst from "./ConfettiBurst";
import { entranceLines } from "../data/content";

export default function EntrancePage({ onContinue }) {
  const [typingDone, setTypingDone] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2200);
    setTimeout(() => onContinue?.(), 2400);
  };

  return (
    <section className="page-section entrance-page">
      <FloatingHearts count={14} />
      <Sparkles count={26} />

      <motion.div
        className="entrance-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="entrance-text">
          <Typewriter
            lines={entranceLines}
            speed={42}
            lineDelay={550}
            onComplete={() => setTypingDone(true)}
          />
        </div>

        <div className="gift-wrapper">
          <AnimatePresence>
            {showConfetti && <ConfettiBurst pieceCount={70} />}
          </AnimatePresence>

          <motion.button
            className={`gift-box ${opened ? "gift-box--open" : ""}`}
            onClick={handleOpen}
            aria-label="Open your gift"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              typingDone
                ? {
                    opacity: 1,
                    scale: opened ? 1.08 : 1,
                    y: opened ? -6 : [0, -10, 0],
                  }
                : { opacity: 0, scale: 0.6 }
            }
            transition={
              opened
                ? { duration: 0.5, ease: "easeOut" }
                : {
                    opacity: { duration: 0.6 },
                    scale: { duration: 0.6 },
                    y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            whileTap={{ scale: 0.95 }}
          >
            <div className="gift-box__shadow" />
            <motion.div
              className="gift-box__lid"
              animate={
                opened
                  ? { y: -70, rotate: -18, opacity: 0 }
                  : { y: 0, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="gift-box__bow" />
            </motion.div>
            <div className="gift-box__body">
              <span className="gift-box__ribbon-v" />
              <span className="gift-box__ribbon-h" />
            </div>
            <AnimatePresence>
              {opened && (
                <motion.div
                  className="gift-box__glow"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 2.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.button>

          {typingDone && !opened && (
            <motion.p
              className="gift-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              tap to open ✨
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
