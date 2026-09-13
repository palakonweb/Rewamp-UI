export const animatedSearchPrompt = `Create an interactive hover-expandable search capsule component in React:
- Idle state: A compact, clean circular capsule (64px) with a minimalist search icon centered on a crisp white surface.
- Hover interaction: Activates strictly on hover (not automated), smoothly expanding via spring physics into a full 420px wide search bar.
- Contents:
  - Search icon smoothly shifts color/accent and gives visual feedback.
  - Reveals an interactive search input with placeholder "Search for something..." and a subtle "⌘K" keyboard badge.
  - Interactive typing with instant clear (✕) button when text is entered.
  - Retains expanded form while focused or when containing search text.
  - Smoothly collapses back to the compact circular pill when the mouse leaves.
- Styling: High-precision spring animations, layered ambient drop shadows, and clean modern typography.`;

export const animatedSearchCode = `import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

export default function AnimatedSearchDemo() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const isExpanded = isHovered || isFocused || query.length > 0;

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 bg-neutral-50/70 select-none">
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
        className="h-16 rounded-full bg-white border border-black/[0.08] flex items-center overflow-hidden cursor-pointer relative"
        style={{
          boxShadow: isExpanded
            ? "0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(236, 94, 39, 0.2)"
            : "0 10px 25px -8px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Left Search Icon */}
        <div className="relative w-5 h-5 flex-shrink-0 ml-[22px] flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              scale: isExpanded ? 1.08 : 1,
              color: isExpanded ? "#EC5E27" : "#4B5563",
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
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search for something..."
                className="w-full bg-transparent text-[15px] font-medium text-[#111827] placeholder:text-[#9CA3AF] outline-none border-none pr-2 cursor-text"
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
                  className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/50 hover:text-black/80 transition-colors cursor-pointer shrink-0 ml-1"
                  title="Clear search"
                >
                  <X size={13} strokeWidth={2.5} />
                </motion.button>
              ) : (
                <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-black/[0.04] text-[11px] font-semibold text-black/40 select-none shrink-0 tracking-wider">
                  <span>⌘</span>
                  <span>K</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Helpful subtle micro-copy */}
      <span className="text-[11.5px] font-medium text-black/35 tracking-wider uppercase mt-6 select-none">
        Hover to expand · Type to search
      </span>
    </div>
  );
}
`;
