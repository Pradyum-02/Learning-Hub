import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Renders a field of softly floating heart shapes that drift upward.
 * Purely decorative — pointer-events disabled.
 */
export default function FloatingHearts({ count = 12, className = "" }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 26,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: 0.25 + Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 60,
    }));
  }, [count]);

  return (
    <div className={`floating-hearts ${className}`} aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
          }}
          initial={{ y: "110vh", x: 0, rotate: 0 }}
          animate={{
            y: "-15vh",
            x: [0, h.drift, 0],
            rotate: [0, 12, -8, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 32 29" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 28.5C16 28.5 1 19.6 1 9.6C1 4.6 4.8 1 9.3 1C12.4 1 14.9 2.9 16 5.5C17.1 2.9 19.6 1 22.7 1C27.2 1 31 4.6 31 9.6C31 19.6 16 28.5 16 28.5Z" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
