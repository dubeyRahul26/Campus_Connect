import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchMyApplications,
  withdrawApplication,
} from "../store/applicationsSlice";

import AuthLoader from "../components/AuthLoader";
import AppliedJobsTable from "../components/dashboard/AppliedJobsTable";
import AppliedJobCard from "../components/dashboard/AppliedJobCard";
import WithdrawConfirmModal from "../components/dashboard/WithdrawConfirmModal";

import toast from "react-hot-toast";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function MyApplications() {
  const dispatch = useAppDispatch();
  const { user, checkingAuth } = useAppSelector((s) => s.auth);
  const { applications, loading } = useAppSelector(
    (s) => s.applications
  );

  const [withdrawApp, setWithdrawApp] = useState<any | null>(null);

  /* FETCH APPLICATIONS */
  useEffect(() => {
    if (user?.role === "student") {
      dispatch(fetchMyApplications());
    }
  }, [dispatch, user?.role]);

  /* WITHDRAW CONFIRM */
  const confirmWithdraw = async () => {
    if (!withdrawApp) return;

    await dispatch(withdrawApplication(withdrawApp._id));
    toast.success("Application withdrawn");
    setWithdrawApp(null);
  };

  /* AUTH STATES */
  if (checkingAuth) return <AuthLoader fullscreen />;
  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <AuthLoader />
      </div>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">
        My Applications
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Track jobs you have applied to
      </p>

      {/* EMPTY STATE */}
      {applications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center justify-center py-8 sm:py-12 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50"
          >
            <Briefcase className="h-6 w-6 text-teal-500" />
          </motion.div>

          <p className="text-sm sm:text-base font-medium text-gray-700">
            No job applications yet
          </p>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            When you apply, they’ll appear here.
          </p>
        </motion.div>
      ) : (
        <>
          {/* DESKTOP */}
          <div className="hidden md:block">
            <AppliedJobsTable
              applications={applications}
              onWithdraw={setWithdrawApp}
            />
          </div>

          {/* MOBILE */}
          <div className="md:hidden space-y-4">
            {applications.map((app) => (
              <AppliedJobCard
                key={app._id}
                application={app}
                onWithdraw={setWithdrawApp}
              />
            ))}
          </div>
        </>
      )}

      {/* WITHDRAW CONFIRM */}
      <WithdrawConfirmModal
        open={!!withdrawApp}
        onClose={() => setWithdrawApp(null)}
        onConfirm={confirmWithdraw}
      />
    </main>
  );
}
