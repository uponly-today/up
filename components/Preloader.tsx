"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MARK_PATH } from "./Logo";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Ease the counter to 100 over ~2s, never stalling.
    let raf = 0;
    const start = performance.now();
    const DURATION = 2000;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Lock scroll while loading.
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] },
          }}
        >
          <div className="bg-aura pointer-events-none absolute inset-0" />

          <motion.svg
            width={108}
            height={108}
            viewBox="0 0 500 500"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.path
              d={MARK_PATH}
              transform="translate(412,81.5)"
              fill="transparent"
              stroke="#FCFCFC"
              strokeWidth={6}
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.9, ease: "easeInOut" }}
            />
            <motion.path
              d={MARK_PATH}
              transform="translate(412,81.5)"
              fill="#FCFCFC"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 92 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.svg>

          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3">
            <div className="font-display text-sm tracking-[0.4em] text-fog">
              UPONLY
            </div>
            <div className="h-px w-40 overflow-hidden bg-line">
              <motion.div
                className="h-full bg-up"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="font-display text-xs tabular-nums text-fog">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
