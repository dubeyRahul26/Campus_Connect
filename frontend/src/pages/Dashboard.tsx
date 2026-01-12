import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMyApplications } from "../store/applicationsSlice";
import AuthLoader from "../components/AuthLoader";

import StatsCard from "../components/dashboard/StatsCard";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import RecentApplications from "../components/dashboard/RecentApplications";

import {
  Briefcase,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { applications, loading } = useAppSelector(
    (s) => s.applications
  );
  const { user, checkingAuth } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (user?.role === "student") {
      dispatch(fetchMyApplications());
    }
  }, [dispatch, user?.role]);

  if (checkingAuth) return <AuthLoader fullscreen />;
  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <AuthLoader />
      </div>
    );
  }

  /* ---- DERIVED STATS ---- */
  const total = applications.length;
  const shortlisted = applications.filter(
    (a) => a.status === "Shortlisted"
  ).length;
  const rejected = applications.filter(
    (a) => a.status === "Rejected"
  ).length;
  const offer = applications.filter(
    (a) => a.status === "Offer"
  ).length;

  const pieData = [
    { name: "Applied", value: total },
    { name: "Shortlisted", value: shortlisted },
    { name: "Rejected", value: rejected },
    { name: "Offer", value: offer },
  ].filter((d) => d.value > 0);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">
        Dashboard
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Overview of your job applications
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Applications"
          value={total}
          icon={<Briefcase className="w-5 h-5" />}
          color="bg-gray-100 text-gray-700"
          description="Total number of jobs you have applied to so far"
        />

        <StatsCard
          title="Shortlisted"
          value={shortlisted}
          icon={<CheckCircle className="w-5 h-5" />}
          color="bg-blue-100 text-blue-700"
          description="Applications where you have been shortlisted"
        />

        <StatsCard
          title="Rejected"
          value={rejected}
          icon={<XCircle className="w-5 h-5" />}
          color="bg-red-100 text-red-700"
          description="Applications that were rejected"
        />

        <StatsCard
          title="Offers"
          value={offer}
          icon={<Star className="w-5 h-5" />}
          color="bg-green-100 text-green-700"
          description="Offers you have received from companies"
        />
      </div>

      {/* CHART + RECENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatusPieChart data={pieData} />
        </div>
        <RecentApplications applications={applications} />
      </div>
    </main>
  );
}
