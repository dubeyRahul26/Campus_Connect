import { Eye, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AppliedJobCard({
  application,
  onWithdraw,
}: {
  application: any;
  onWithdraw: (app: any) => void;
}) {
  const { jobId, createdAt, status } = application;

  const statusStyle = () => {
    switch (status) {
      case "Shortlisted":
        return "bg-blue-100 text-blue-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Offer":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl shadow-sm p-5"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">
          {jobId.role}
        </h3>

        {/* STATUS */}
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle()}`}
        >
          {status}
        </span>
      </div>

      <p className="text-gray-600">
        {jobId.companyName}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Applied on {new Date(createdAt).toLocaleDateString()}
      </p>

      <div className="flex justify-end gap-4 mt-4">
        <a
          href={jobId.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600"
        >
          <Eye size={16} />
        </a>

        <button
          onClick={() => onWithdraw(application)}
          className="text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}

