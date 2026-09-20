import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

const smooth = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };
const fade = { duration: 0.2, ease: [0.22, 1, 0.36, 1] };

export default function BookACallButton({ onBook }) {
  const [phase, setPhase] = useState("idle"); // 'idle' | 'hover' | 'active'
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

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
          background: isDark
            ? "linear-gradient(180deg, rgba(24, 24, 28, 0.95) 0%, rgba(10, 10, 14, 0.98) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.35) 100%)",
          boxShadow: isDark
            ? "0 1px 1px rgba(255, 255, 255, 0.15) inset, 0 -6px 12px rgba(0, 0, 0, 0.6) inset, 0 12px 28px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)"
            : "0 1px 1px rgba(255, 255, 255, 0.9) inset, 0 -6px 10px rgba(255, 255, 255, 0.5) inset, 0 8px 20px rgba(0, 0, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.06)",
        }}
        className={`relative h-14 rounded-full backdrop-blur-xl border transition-colors duration-200 flex items-center overflow-hidden select-none cursor-pointer ${
          isDark ? "border-white/15" : "border-white/70"
        } ${isActive ? "justify-start pl-2 pr-5" : "justify-center"}`}
      >
        <AnimatePresence>
          {phase === "idle" && (
            <motion.span
              key="idle-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={fade}
              className={`absolute text-sm font-semibold tracking-wide ${
                isDark ? "text-white" : "text-gray-900"
              }`}
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
                className={`relative w-9 h-9 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center shadow-sm z-0 ${
                  isDark
                    ? "bg-neutral-800 ring-2 ring-white/20"
                    : "bg-gray-400 grayscale ring-2 ring-white/80"
                }`}
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
                    className={`text-sm font-medium overflow-hidden ${
                      isDark ? "text-white/70" : "text-gray-700"
                    }`}
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
                className={`relative w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wide shadow-sm z-10 ${
                  isDark
                    ? "bg-white text-black"
                    : "bg-white text-black"
                } ${
                  isActive
                    ? isDark
                      ? "-ml-4 ring-2 ring-white/30"
                      : "-ml-4 ring-2 ring-white/80"
                    : ""
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
              className={`ml-3 text-sm font-semibold whitespace-nowrap ${
                isDark ? "text-white" : "text-gray-900"
              }`}
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
