import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * A field of twinkling sparkle particles (small four-point stars and dots).
 */
export default function Sparkles({ count = 24, className = "" }) {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 4 + Math.random() * 10,
      duration: 1.8 + Math.random() * 2.4,
      delay: Math.random() * 4,
      isStar: Math.random() > 0.5,
    }));
  }, [count]);

  return (
    <div className={`sparkle-field ${className}`} aria-hidden="true">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
          }}
          initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.3],
            rotate: s.isStar ? [0, 90] : 0,
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.isStar ? (
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" />
            </svg>
          )}
        </motion.span>
      ))}
    </div>
  );
}
