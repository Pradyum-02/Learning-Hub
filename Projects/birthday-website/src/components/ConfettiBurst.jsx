import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * A radial burst of confetti pieces, used when the gift box opens.
 * Renders once and animates out — parent controls mount/unmount via AnimatePresence.
 */
export default function ConfettiBurst({ pieceCount = 60 }) {
  const pieces = useMemo(() => {
    const colors = ["#f7799c", "#ffb6c9", "#ffd6e8", "#e6c9f0", "#f3c98b", "#ffffff"];
    return Array.from({ length: pieceCount }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 260;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 80,
        rotate: Math.random() * 720 - 360,
        size: 6 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.15,
        shape: Math.random() > 0.5 ? "circle" : "rect",
      };
    });
  }, [pieceCount]);

  return (
    <div className="confetti-burst" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="confetti-piece"
          style={{
            width: p.size,
            height: p.shape === "circle" ? p.size : p.size * 1.6,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "3px",
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{
            x: p.x,
            y: p.y + 320,
            opacity: 0,
            rotate: p.rotate,
            scale: 1,
          }}
          transition={{
            duration: 1.6 + Math.random() * 0.6,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
