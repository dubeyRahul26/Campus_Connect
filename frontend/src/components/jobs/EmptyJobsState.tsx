import { Briefcase, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyJobsState({ isAdmin, onAdd }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[70vh] flex items-center justify-center px-4"
    >
      <div className="bg-white rounded-3xl shadow-sm p-10 text-center max-w-sm w-full">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="text-teal-600" />
        </div>

        <h2 className="text-xl font-semibold mb-2">
          No jobs yet
        </h2>

        <p className="text-gray-500 mb-6">
          {isAdmin ? "Create your first job posting" : "Check back later"}
        </p>

        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 mx-auto"
          >
            <Plus size={16} />
            Add Job
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
