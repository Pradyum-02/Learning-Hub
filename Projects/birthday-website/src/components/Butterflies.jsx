import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * A single butterfly that flutters along a wandering path.
 * Wings flap via a nested motion element for layered animation.
 */
function Butterfly({ style, pathDuration, delay, color, flip }) {
  return (
    <motion.div
      className="butterfly"
      style={{ ...style, color }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [0, 40, -30, 60, 0],
        y: [0, -30, 20, -50, 0],
        opacity: [0, 1, 1, 1, 0.9],
      }}
      transition={{
        duration: pathDuration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.svg
        viewBox="0 0 48 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: flip ? "scaleX(-1)" : "none" }}
        animate={{ scaleY: [1, 0.75, 1] }}
        transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
      >
        <g fill="currentColor">
          <path d="M24 20C24 20 6 4 2 12C-2 20 12 28 24 22Z" opacity="0.85" />
          <path d="M24 20C24 20 42 4 46 12C50 20 36 28 24 22Z" opacity="0.85" />
          <path d="M24 20C24 20 8 30 6 36C4 40 16 38 24 28Z" opacity="0.6" />
          <path d="M24 20C24 20 40 30 42 36C44 40 32 38 24 28Z" opacity="0.6" />
          <rect x="22.5" y="14" width="3" height="18" rx="1.5" opacity="0.95" />
        </g>
      </motion.svg>
    </motion.div>
  );
}

/**
 * Field of multiple butterflies positioned around the viewport.
 */
export default function Butterflies({ count = 4, className = "" }) {
  const butterflies = useMemo(() => {
    const colors = ["#f7799c", "#e6c9f0", "#ff9ec2", "#f3c98b"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: 10 + Math.random() * 70,
      left: 5 + Math.random() * 85,
      size: 32 + Math.random() * 24,
      duration: 10 + Math.random() * 6,
      delay: Math.random() * 5,
      color: colors[i % colors.length],
      flip: Math.random() > 0.5,
    }));
  }, [count]);

  return (
    <div className={`butterfly-field ${className}`} aria-hidden="true">
      {butterflies.map((b) => (
        <Butterfly
          key={b.id}
          style={{
            position: "absolute",
            top: `${b.top}%`,
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 0.83,
          }}
          pathDuration={b.duration}
          delay={b.delay}
          color={b.color}
          flip={b.flip}
        />
      ))}
    </div>
  );
}
