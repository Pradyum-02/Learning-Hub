import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Soft flower petals that drift and rotate from top to bottom of the screen.
 */
export default function FallingPetals({ count = 14, className = "" }) {
  const petals = useMemo(() => {
    const colors = ["var(--color-blush-300)", "var(--color-blush-400)", "var(--color-rose-500)", "var(--color-lavender)"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 18,
      duration: 9 + Math.random() * 8,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      sway: 40 + Math.random() * 60,
      spin: Math.random() > 0.5 ? 360 : -360,
    }));
  }, [count]);

  return (
    <div className={`falling-petals ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            color: p.color,
          }}
          initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, p.sway, -p.sway * 0.6, 0],
            rotate: p.spin,
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C15 2 17 5 16 9C20 8 23 10 23 13C23 16 20 18 16 17C17 21 15 24 12 24C9 24 7 21 8 17C4 18 1 16 1 13C1 10 4 8 8 9C7 5 9 2 12 2Z" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
