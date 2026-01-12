import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "../../store/hooks";
import { updateApplicationStatus } from "../../store/applicationsSlice";
import AuthLoader from "../AuthLoader";

export default function ApplicantsModal({
  open,
  onClose,
  applicants,
  loading,
}: any) {
  const dispatch = useAppDispatch();

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl"
        >
          <h3 className="text-lg font-semibold mb-4">
            Job Applicants
          </h3>

          {loading ? (
            <AuthLoader />
          ) : applicants.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              No applicants yet.
            </p>
          ) : (
            <ul className="space-y-3 max-h-[60vh] overflow-auto">
              {applicants.map((app: any) => (
                <li
                  key={app._id}
                  className="border rounded-xl p-3 flex justify-between items-center gap-4"
                >
                  <div>
                    <p className="font-medium">
                      {app.studentId.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {app.studentId.email}
                    </p>
                    {app.studentId.branch && (
                      <p className="text-xs text-gray-500">
                        Branch: {app.studentId.branch}
                      </p>
                    )}
                  </div>

                  {/* STATUS SELECT (ADMIN) */}
                  <select
                    value={app.status}
                    onChange={(e) =>
                      dispatch(
                        updateApplicationStatus({
                          applicationId: app._id,
                          status: e.target.value,
                        })
                      )
                    }
                    className="border rounded-lg px-2 py-1 text-sm bg-gray-50"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                  </select>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
