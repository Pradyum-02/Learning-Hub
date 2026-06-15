import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Types out a sequence of lines one character at a time.
 * Calls onComplete once the final line has finished typing.
 */
export default function Typewriter({
  lines = [],
  speed = 45,
  lineDelay = 600,
  onComplete,
  className = "",
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      onComplete?.();
      return;
    }

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, lines, speed, lineDelay, onComplete]);

  return (
    <div className={`typewriter ${className}`}>
      {displayedLines.map((line, i) => (
        <p key={`done-${i}`} className="typewriter-line">
          {line}
        </p>
      ))}
      {lineIndex < lines.length && (
        <p className="typewriter-line">
          {lines[lineIndex].slice(0, charIndex)}
          <AnimatePresence>
            <motion.span
              className="typewriter-cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "steps(1)" }}
            >
              |
            </motion.span>
          </AnimatePresence>
        </p>
      )}
    </div>
  );
}
