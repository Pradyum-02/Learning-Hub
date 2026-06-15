import { motion } from "framer-motion";

/**
 * Small fixed progress indicator showing which of the 5 pages is active.
 */
export default function ProgressDots({ total, current }) {
  return (
    <div className="progress-dots" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <motion.span
          key={i}
          className="progress-dot"
          animate={{
            scale: i === current ? 1.3 : 1,
            opacity: i === current ? 1 : 0.4,
          }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </div>
  );
}
