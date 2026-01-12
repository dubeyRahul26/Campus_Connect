import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function JobsHeader({ isAdmin, onAdd }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Jobs
        </h1>
        <p className="text-gray-500 text-sm">
          Browse and manage job openings
        </p>
      </div>

      {isAdmin && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} />
          Add Job
        </motion.button>
      )}
    </motion.div>
  );
}
