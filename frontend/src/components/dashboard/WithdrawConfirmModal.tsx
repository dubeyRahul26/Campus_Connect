import { motion } from "framer-motion";

export default function WithdrawConfirmModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div  onClick={onClose} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // stop bubbling
      >
        <h3 className="text-lg font-semibold mb-2">
          Withdraw Application?
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          This will remove the job from your dashboard.  
          <span className="block mt-1 text-xs text-gray-500">
            Note: This does not cancel the application submitted on the company website.
          </span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300 hover:text-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Withdraw
          </button>
        </div>
      </motion.div>
    </div>
  );
}
