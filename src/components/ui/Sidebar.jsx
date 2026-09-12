import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  LayoutGrid,
  PieChart,
  Settings,
  User,
  FileText,
  Calendar,
  Search,
} from "lucide-react";

const GROUP_A = [{ id: "dashboard", icon: LayoutGrid, label: "Dashboard" }];

const GROUP_B = [
  { id: "analytics", icon: PieChart, label: "Analytics" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const GROUP_C = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "documents", icon: FileText, label: "Documents" },
];

const GROUP_D = [{ id: "calendar", icon: Calendar, label: "Calendar" }];

function IconCell({ item, activeItem, setActiveItem, hovered, setHovered }) {
  const Icon = item.icon;
  const isActive = activeItem === item.id;
  const isHovered = hovered === item.id;

  return (
    <div
      className="relative w-full h-16 flex items-center justify-center"
      onMouseEnter={() => setHovered(item.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <button
        type="button"
        onClick={() => setActiveItem(item.id)}
        className="relative w-11 h-11 flex items-center justify-center rounded-xl"
      >
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 rounded-xl bg-white border border-gray-100 shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        )}
        <motion.div
          className={`relative z-10 flex items-center justify-center rounded-lg transition-colors duration-200 ease-out w-full h-full ${
            !isActive ? "hover:bg-gray-50" : ""
          }`}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Icon size={20} className="text-gray-800" strokeWidth={1.8} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15, delay: 0.25 }}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2.5 py-1.5 shadow-lg z-20 pointer-events-none"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({ onWindowAction }) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [hovered, setHovered] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const cellProps = { activeItem, setActiveItem, hovered, setHovered };

  return (
    <div className={isDark ? "dark" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[68px] h-full min-h-[560px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* Row 1: window chrome */}
        <div className="flex items-center gap-1.5 px-4 pt-4 pb-3">
          {[
            { color: "#FB5D57", label: "close" },
            { color: "#FDBC40", label: "minimize" },
            { color: "#33C748", label: "zoom" },
          ].map((dot) => (
            <button
              key={dot.label}
              type="button"
              onClick={() => onWindowAction?.(dot.label)}
              className="w-2.5 h-2.5 rounded-full transition-transform duration-150 hover:scale-110"
              style={{ backgroundColor: dot.color }}
            />
          ))}
        </div>

        {/* Row 2: theme toggle */}
        <div className="border-b border-gray-100 px-3 pb-3">
          <button
            type="button"
            onClick={() => setIsDark((d) => !d)}
            className="w-full h-11 flex items-center justify-center rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200 ease-out relative overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={18} className="text-gray-800" strokeWidth={1.8} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={18} className="text-gray-800" strokeWidth={1.8} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Group A */}
        <div className="border-b border-gray-100 py-1">
          {GROUP_A.map((item) => (
            <IconCell key={item.id} item={item} {...cellProps} />
          ))}
        </div>

        {/* Group B */}
        <div className="border-b border-gray-100 py-1">
          {GROUP_B.map((item) => (
            <IconCell key={item.id} item={item} {...cellProps} />
          ))}
        </div>

        {/* Group C */}
        <div className="border-b border-gray-100 py-1">
          {GROUP_C.map((item) => (
            <IconCell key={item.id} item={item} {...cellProps} />
          ))}
        </div>

        <div className="flex-1" />

        {/* Group D */}
        <div className="pt-1">
          {GROUP_D.map((item) => (
            <IconCell key={item.id} item={item} {...cellProps} />
          ))}
        </div>

        <div className="px-3 pb-4 pt-1">
          <button
            type="button"
            onClick={() => setActiveItem("search")}
            onMouseEnter={() => setHovered("search")}
            onMouseLeave={() => setHovered(null)}
            className="relative w-full h-11 flex items-center justify-center rounded-xl border border-gray-200 transition-all duration-200 ease-out hover:border-gray-300"
          >
            <motion.div
              animate={{ scale: hovered === "search" ? 1.1 : 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Search size={20} className="text-gray-800" strokeWidth={1.8} />
            </motion.div>

            <AnimatePresence>
              {hovered === "search" && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15, delay: 0.25 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2.5 py-1.5 shadow-lg z-20 pointer-events-none"
                >
                  Search
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
