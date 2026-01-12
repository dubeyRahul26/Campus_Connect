import { Pencil, Trash2, Eye, Users } from "lucide-react";
import { motion } from "framer-motion";

interface JobsTableProps {
  jobs: any[];
  isAdmin: boolean;
  appliedJobIds: string[];
  onEdit: (job: any) => void;
  onDelete: (id: string) => void;
  onApply: (job: any) => void;
  onViewApplicants: (job: any) => void;
}

export default function JobsTable({
  jobs,
  isAdmin,
  appliedJobIds,
  onEdit,
  onDelete,
  onApply,
  onViewApplicants,
}: JobsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {["Company", "Role", "Salary", "Status", "Deadline", ""].map((h) => (
              <th
                key={h}
                className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => {
            const isOpen = job.status === "Open";
            const applied = appliedJobIds.includes(job._id);

            return (
              <motion.tr
                key={job._id}
                whileHover={{ backgroundColor: "#f9fafb" }}
                className="border-t"
              >
                <td className="px-6 py-4 font-medium">
                  {job.companyName}
                </td>

                <td className="px-6 py-4">{job.role}</td>
                <td className="px-6 py-4">{job.salary}</td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(job.deadline).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex justify-end items-center gap-4">
                  {/* STUDENT ACTION */}
                  {!isAdmin && (
                    applied ? (
                      <span className="text-xs font-medium text-green-600">
                        Applied ✓
                      </span>
                    ) : isOpen ? (
                      <button
                        onClick={() => onApply(job)}
                        className="text-sm font-medium text-teal-600 hover:underline"
                      >
                        Apply
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-gray-400 cursor-not-allowed">
                        Closed
                      </span>
                    )
                  )}

                  {/* ADMIN ACTIONS */}
                  {isAdmin && (
                    <>
                      {/* VIEW APPLICANTS */}
                      <button
                        onClick={() => onViewApplicants(job)}
                        className="hover:text-teal-600"
                        title="View Applicants"
                      >
                        <Users size={16} />
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() => onEdit(job)}
                        className="hover:text-green-600"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => onDelete(job._id)}
                        className="hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}

                  {/* VIEW JOB */}
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                  >
                    <Eye size={16} />
                  </a>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
