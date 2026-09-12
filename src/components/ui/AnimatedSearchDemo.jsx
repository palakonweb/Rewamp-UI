import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FULL_TEXT = "Hello";
const TYPE_INTERVAL_MS = 100;
const PAUSE_BEFORE_SELECT_MS = 600;
const SELECT_DURATION_MS = 700;
const PAUSE_BEFORE_COLLAPSE_MS = 900;
const PAUSE_BEFORE_EXPAND_MS = 500;

function SearchIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="7" stroke="#374151" strokeWidth="2" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="#374151" strokeWidth="2" />
      <circle cx="12" cy="8" r="1.1" fill="#374151" />
      <rect x="11" y="10.5" width="2" height="6" rx="1" fill="#374151" />
    </svg>
  );
}

export default function AnimatedSearchDemo() {
  const [phase, setPhase] = useState("idle");
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 450);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const clearTimers = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    switch (phase) {
      case "idle":
        timeoutRef.current = setTimeout(() => setPhase("expanding"), PAUSE_BEFORE_EXPAND_MS);
        break;

      case "expanding":
        timeoutRef.current = setTimeout(() => setPhase("typing"), 500);
        break;

      case "typing": {
        let i = 0;
        intervalRef.current = setInterval(() => {
          i += 1;
          setTypedText(FULL_TEXT.slice(0, i));
          if (i >= FULL_TEXT.length) {
            clearInterval(intervalRef.current);
            timeoutRef.current = setTimeout(() => setPhase("morphing"), 200);
          }
        }, TYPE_INTERVAL_MS);
        break;
      }

      case "morphing":
        setTypedText("Hello!");
        timeoutRef.current = setTimeout(() => setPhase("selecting"), PAUSE_BEFORE_SELECT_MS);
        break;

      case "selecting":
        timeoutRef.current = setTimeout(() => setPhase("clearing"), SELECT_DURATION_MS);
        break;

      case "clearing":
        setTypedText("");
        timeoutRef.current = setTimeout(() => setPhase("placeholder"), 300);
        break;

      case "placeholder":
        timeoutRef.current = setTimeout(() => setPhase("collapsing"), PAUSE_BEFORE_COLLAPSE_MS);
        break;

      case "collapsing":
        timeoutRef.current = setTimeout(() => setPhase("idle"), 500);
        break;

      default:
        break;
    }

    return clearTimers;
  }, [phase]);

  const isExpanded = phase !== "idle" && phase !== "collapsing";
  const isTyping = phase === "typing";
  const isSelecting = phase === "selecting";
  const showPlaceholder = phase === "placeholder";
  const showInfoIcon = phase === "morphing" || phase === "selecting" || phase === "clearing";

  return (
    <div className="w-full flex items-center justify-center py-16 bg-neutral-50">
      <motion.div
        animate={{ width: isExpanded ? 420 : 64 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="h-16 rounded-full bg-white shadow-lg flex items-center overflow-hidden relative"
        style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15), 0 4px 10px -4px rgba(0,0,0,0.08)" }}
      >
        <div className="relative w-5 h-5 flex-shrink-0 ml-[22px]">
          <AnimatePresence initial={false}>
            {!showInfoIcon ? (
              <motion.div
                key="search"
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <SearchIcon className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="info"
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <InfoIcon className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="ml-3 mr-6 flex-1 whitespace-nowrap overflow-hidden relative h-6 flex items-center"
            >
              <AnimatePresence mode="wait">
                {showPlaceholder ? (
                  <motion.span
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#9CA3AF] text-base"
                  >
                    Search for something...
                  </motion.span>
                ) : (
                  <span key="typed" className="relative inline-flex items-center text-base font-medium">
                    <motion.span
                      className="absolute -inset-y-0.5 -inset-x-1 rounded bg-blue-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isSelecting ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                    />
                    <span className="relative text-[#111827]">
                      {typedText}
                      {isTyping && (
                        <span
                          className="inline-block w-[1px] h-4 bg-[#111827] ml-0.5 align-middle"
                          style={{ opacity: showCursor ? 1 : 0 }}
                        />
                      )}
                    </span>
                  </span>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
