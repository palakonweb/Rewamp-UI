import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

const smooth = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };
const fade = { duration: 0.2, ease: [0.22, 1, 0.36, 1] };

export default function BookACallButton({ onBook }) {
  const [phase, setPhase] = useState("idle"); // 'idle' | 'hover' | 'active'
  const showCircles = phase !== "idle";
  const isActive = phase === "active";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12">
      <motion.button
        type="button"
        onMouseEnter={() => setPhase((p) => (p === "active" ? p : "hover"))}
        onMouseLeave={() => setPhase("idle")}
        onClick={() => {
          setPhase("active");
          onBook?.();
        }}
        style={{
          width: 200,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 100%)",
          boxShadow:
            "0 1px 1px rgba(255,255,255,0.9) inset, 0 -6px 10px rgba(255,255,255,0.5) inset, 0 8px 20px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
        }}
        className={`relative h-14 rounded-full backdrop-blur-xl backdrop-saturate-150 border border-white/70 flex items-center overflow-hidden select-none cursor-pointer ${
          isActive ? "justify-start pl-2 pr-5" : "justify-center"
        }`}
      >
        <AnimatePresence>
          {phase === "idle" && (
            <motion.span
              key="idle-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={fade}
              className="absolute text-gray-900 text-sm font-semibold tracking-wide"
            >
              BOOK A CALL
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCircles && (
            <motion.div
              key="circles"
              layout="position"
              transition={smooth}
              className="flex items-center"
              animate={{ gap: isActive ? 0 : 8 }}
            >
              <motion.span
                layout="position"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={smooth}
                className="relative w-9 h-9 flex-shrink-0 rounded-full overflow-hidden bg-gray-400 grayscale flex items-center justify-center ring-2 ring-white/80 shadow-sm z-0"
              >
                <User size={18} className="text-white" strokeWidth={1.8} />
              </motion.span>

              <AnimatePresence initial={false}>
                {!isActive && (
                  <motion.span
                    key="plus"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={fade}
                    className="text-gray-700 text-sm font-medium overflow-hidden"
                  >
                    +
                  </motion.span>
                )}
              </AnimatePresence>

              <motion.span
                layout="position"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={smooth}
                className={`relative w-9 h-9 flex-shrink-0 rounded-full bg-white flex items-center justify-center text-black text-[10px] font-bold tracking-wide shadow-sm z-10 ${
                  isActive ? "-ml-4 ring-2 ring-white/80" : ""
                }`}
              >
                YOU
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isActive && (
            <motion.span
              key="lets-talk"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ ...fade, delay: 0.05 }}
              className="ml-3 text-gray-900 text-sm font-semibold whitespace-nowrap"
            >
              Let&apos;s talk!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Hover or click to book a call
      </p>
    </div>
  );
}
