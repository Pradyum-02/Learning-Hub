import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EntrancePage from "./components/EntrancePage";
import LetterPage from "./components/LetterPage";
import ReasonsPage from "./components/ReasonsPage";
import WishJarPage from "./components/WishJarPage";
import GardenPage from "./components/GardenPage";
import ProgressDots from "./components/ProgressDots";
import "./styles/global.css";
import "./styles/components.css";

const TOTAL_PAGES = 5;

const pageVariants = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -40, scale: 0.98 },
};

const pageTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

export default function App() {
  const [page, setPage] = useState(0);

  const goNext = useCallback(() => {
    setPage((p) => Math.min(p + 1, TOTAL_PAGES - 1));
  }, []);

  const replay = useCallback(() => {
    setPage(0);
  }, []);

  return (
    <div className="app-shell">
      <ProgressDots total={TOTAL_PAGES} current={page} />

      <AnimatePresence mode="wait">
        {page === 0 && (
          <motion.div
            key="entrance"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <EntrancePage onContinue={goNext} />
          </motion.div>
        )}

        {page === 1 && (
          <motion.div
            key="letter"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LetterPage onContinue={goNext} />
          </motion.div>
        )}

        {page === 2 && (
          <motion.div
            key="reasons"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ReasonsPage onContinue={goNext} />
          </motion.div>
        )}

        {page === 3 && (
          <motion.div
            key="wishjar"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <WishJarPage onContinue={goNext} />
          </motion.div>
        )}

        {page === 4 && (
          <motion.div
            key="garden"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <GardenPage onReplay={replay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
