import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sun, Moon } from "lucide-react";

export default function AnimatedSearchDemo({
  mode = null, // 'light' | 'dark' | null (auto-detects)
  placeholder = "Search for something...",
  onSearch = null,
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const [detectedMode, setDetectedMode] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });
  const [overrideMode, setOverrideMode] = useState(null);

  useEffect(() => {
    if (mode) return;
    const checkTheme = () => {
      const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
      setDetectedMode(current);
      setOverrideMode(null);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, [mode]);

  const activeMode = overrideMode || mode || detectedMode;
  const isDark = activeMode === "dark";

  const isExpanded = isHovered || isFocused || query.length > 0;

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setQuery("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none ${className}`}>
      {/* Interactive Light / Dark Mode Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md mb-8 transition-colors">
        <button
          onClick={() => setOverrideMode("light")}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
            !isDark
              ? "bg-white text-neutral-900 shadow-xs"
              : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
          }`}
        >
          <Sun size={13} />
          <span>Light</span>
        </button>
        <button
          onClick={() => setOverrideMode("dark")}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
            isDark
              ? "bg-[#221F2B] text-white shadow-xs"
              : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
          }`}
        >
          <Moon size={13} />
          <span>Dark</span>
        </button>
      </div>

      {/* Expandable Search Capsule */}
      <div className="flex items-center justify-center">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleContainerClick}
          animate={{
            width: isExpanded ? 420 : 64,
          }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 26,
          }}
          className={`h-16 rounded-full flex items-center overflow-hidden cursor-pointer relative transition-colors duration-200 ${
            isDark
              ? "bg-[#1E1B28] border border-white/[0.12] text-white"
              : "bg-white border border-black/[0.08] text-[#111827]"
          }`}
          style={{
            boxShadow: isDark
              ? isExpanded
                ? "0 20px 44px -12px rgba(0, 0, 0, 0.7), 0 0 0 1.5px rgba(212, 203, 229, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.15)"
                : "0 12px 28px -8px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.12)"
              : isExpanded
                ? "0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 0 0 1.5px rgba(193, 180, 216, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.9)"
                : "0 10px 25px -8px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
          }}
        >
          {/* Left Search Icon */}
          <div className="relative w-5 h-5 flex-shrink-0 ml-[22px] flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: isExpanded ? 1.08 : 1,
                color: isDark
                  ? isExpanded
                    ? "#D4CBE5"
                    : "#8A8494"
                  : isExpanded
                    ? "#7C3AED"
                    : "#6B7280",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Search size={20} strokeWidth={2.2} />
            </motion.div>
          </div>

          {/* Expandable Search Input Container */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="ml-3.5 mr-5 flex-1 flex items-center min-w-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    onSearch?.(e.target.value);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={placeholder}
                  className={`w-full bg-transparent text-[15px] font-medium outline-none border-none pr-2 cursor-text ${
                    isDark
                      ? "text-white placeholder:text-neutral-500 caret-white"
                      : "text-[#111827] placeholder:text-[#9CA3AF] caret-neutral-900"
                  }`}
                />

                {/* Action: Clear button or ⌘K indicator */}
                {query.length > 0 ? (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClear}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-1 ${
                      isDark
                        ? "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
                        : "bg-black/5 hover:bg-black/10 text-black/50 hover:text-black/80"
                    }`}
                    title="Clear search"
                  >
                    <X size={13} strokeWidth={2.5} />
                  </motion.button>
                ) : (
                  <div
                    className={`flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-semibold select-none shrink-0 tracking-wider ${
                      isDark
                        ? "bg-white/[0.08] text-white/50 border border-white/[0.06]"
                        : "bg-black/[0.04] text-black/40 border border-black/[0.04]"
                    }`}
                  >
                    <span>⌘</span>
                    <span>K</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Centered Single-line Description */}
      <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Hover or click to expand search
      </p>
    </div>
  );
}
