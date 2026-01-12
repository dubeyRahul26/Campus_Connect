import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function ApplyConfirmModal({
  job,
  open,
  onCancel,
  onConfirm,
}: any) {
  if (!open || !job) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center px-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold mb-2">
            Apply to {job.role}?
          </h3>

          <p className="text-sm text-gray-600 mb-6">
            You’ll be redirected to an external application form.
          </p>

          <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="px-4 py-2 text-sm rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300 hover:text-gray-800">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg"
            >
              Continue & Apply
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
