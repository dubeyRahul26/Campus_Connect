import { Pencil, Trash2, Eye, Users } from "lucide-react";
import { motion } from "framer-motion";

interface JobCardProps {
  job: any;
  isAdmin: boolean;
  applied: boolean;
  onEdit: (job: any) => void;
  onDelete: (id: string) => void;
  onApply: (job: any) => void;
  onViewApplicants?: (job: any) => void; 
}

export default function JobCard({
  job,
  isAdmin,
  applied,
  onEdit,
  onDelete,
  onApply,
  onViewApplicants,
}: JobCardProps) {
  const isOpen = job.status === "Open";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl shadow-sm p-5"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{job.role}</h3>

        {/* Status */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            isOpen
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {job.status}
        </span>
      </div>

      <p className="text-gray-600">{job.companyName}</p>
      <p className="text-gray-500 text-sm">{job.salary}</p>

      <div className="flex justify-between items-center mt-4">
        {/* STUDENT APPLY */}
        {!isAdmin && (
          applied ? (
            <span className="text-xs font-medium text-green-600">
              Applied ✓
            </span>
          ) : isOpen ? (
            <button
              onClick={() => onApply(job)}
              className="text-sm font-medium text-teal-600"
            >
              Apply
            </button>
          ) : (
            <span className="text-xs font-medium text-gray-400">
              Closed
            </span>
          )
        )}

        {/* ACTION ICONS */}
        <div className="flex gap-4">
          {isAdmin && (
            <>
              {/* VIEW APPLICANTS */}
              <button
                onClick={() => onViewApplicants?.(job)}
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
        </div>
      </div>
    </motion.div>
  );
}
