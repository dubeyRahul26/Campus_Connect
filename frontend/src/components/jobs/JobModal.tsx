import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JobForm from "./JobForm";

export default function JobModal({ open, job, onClose, onSave }: any) {
  return (
    <AnimatePresence>
      {(open || job) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95 }}
            className="bg-white w-full max-w-lg rounded-2xl p-6 relative shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X />
            </button>

            <JobForm job={job} onSave={onSave} onCancel={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
