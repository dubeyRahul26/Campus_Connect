import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatsCard({
  title,
  value,
  icon,
  color,
  description, 
}: {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
  description?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        relative
        group
        bg-white
        rounded-xl sm:rounded-2xl
        border border-gray-100
        px-4 py-4 sm:p-5
        flex items-center gap-3 sm:gap-4
      "
    >
      {/* ICON */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`
          w-10 h-10 sm:w-12 sm:h-12
          rounded-full
          flex items-center justify-center
          ${color}
        `}
      >
        {icon}
      </motion.div>

      {/* TEXT */}
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-500 truncate">
          {title}
        </p>
        <p className="text-lg sm:text-2xl font-bold text-gray-800">
          {value}
        </p>
      </div>

      {/* HOVER TOOLTIP */}
      {description && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="
              pointer-events-none
              absolute
              bottom-full
              left-1/2
              -translate-x-1/2
              mb-3
              hidden group-hover:block
              w-56
              rounded-lg
              bg-gray-900
              text-white
              text-xs
              px-3 py-2
              shadow-lg
              z-50
            "
          >
            {description}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
