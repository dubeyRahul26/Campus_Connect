import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Briefcase,
  FolderOpen,
  Lock,
  Users,
  UserPlus,
  MessageSquareText,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAdminStats } from "../store/adminSlice";
import AuthLoader from "../components/AuthLoader";
import StatsCard from "../components/dashboard/StatsCard";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (loading || !stats) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <AuthLoader />
      </div>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-5 sm:py-8 space-y-8">
      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg sm:text-2xl font-bold text-gray-800"
      >
        Admin Dashboard
      </motion.h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatsCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon={<Briefcase className="w-5 h-5 text-slate-700" />}
          color="bg-slate-100"
          description="Total number of jobs created on the platform (open + closed)"
        />

        <StatsCard
          title="Open Jobs"
          value={stats.openJobs}
          icon={<FolderOpen className="w-5 h-5 text-blue-600" />}
          color="bg-blue-100"
          description="Jobs that are currently open and accepting applications"
        />

        <StatsCard
          title="Closed Jobs"
          value={stats.closedJobs}
          icon={<Lock className="w-5 h-5 text-gray-600" />}
          color="bg-gray-100"
          description="Jobs that are no longer accepting applications"
        />

        <StatsCard
          title="Applications"
          value={stats.totalApplications}
          icon={<Users className="w-5 h-5 text-green-600" />}
          color="bg-green-100"
          description="Total number of job applications submitted by students"
        />

        <StatsCard
          title="Interview Prep Posts"
          value={stats.totalInterviewPrepPosts}
          icon={
            <MessageSquareText className="w-5 h-5 text-teal-600" />
          }
          color="bg-teal-100"
          description="Visible interview preparation posts shared by students (hidden posts excluded)"
        />

        <StatsCard
          title="Users"
          value={stats.totalUsers}
          icon={<Users className="w-5 h-5 text-purple-600" />}
          color="bg-purple-100"
          description="Total number of registered student users on the platform"
        />
      </div>

      {/* SMALL INSIGHT */}
      {stats.newUsersThisMonth > 0 && (
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <UserPlus className="w-4 h-4 text-green-600" />
          <span>
            <span className="font-semibold text-gray-800">
              {stats.newUsersThisMonth}
            </span>{" "}
            new users joined this month
          </span>
        </div>
      )}

      {/* CHART + LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TOP JOBS BAR CHART */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 px-4 py-4 sm:px-6"
        >
          <h2 className="mb-3 text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            Top Jobs by Applications
          </h2>

          <div className="h-44 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.jobsWithApplicants}>
                <XAxis
                  dataKey="companyName"
                  stroke="#9CA3AF"
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={60}
                  className="hidden sm:block"
                />
                <XAxis dataKey="companyName" hide xAxisId="mobile" />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="#9CA3AF"
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  formatter={(value) => [
                    `${value}`,
                    "Applications",
                  ]}
                  labelFormatter={(label) =>
                    `Company: ${label}`
                  }
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E5E7EB",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="applicantsCount"
                  fill="#3B82F6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* MOST APPLIED JOBS LIST */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 px-4 py-4 sm:px-6"
        >
          <h2 className="mb-3 text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-600" />
            Most Applied Jobs
          </h2>

          <ul className="divide-y text-xs sm:text-sm">
            {stats.jobsWithApplicants.map((job: any) => (
              <li
                key={job._id}
                className="flex items-center justify-between py-2"
              >
                <span className="truncate text-gray-700">
                  {job.companyName} — {job.role}
                </span>
                <span className="ml-3 font-medium text-blue-600">
                  {job.applicantsCount}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </main>
  );
}
