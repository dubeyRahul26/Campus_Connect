import { Eye, Trash2 } from "lucide-react";

export default function AppliedJobsTable({
  applications,
  onWithdraw,
}: {
  applications: any[];
  onWithdraw: (app: any) => void;
}) {
  const statusStyle = (status: string) => {
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
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left">Company</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Applied On</th>
            <th className="px-6 py-4 text-right"></th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => {
            const job = app.jobId;
            if (!job) return null;

            return (
              <tr key={app._id} className="border-t">
                <td className="px-6 py-4 font-medium">
                  {job.companyName}
                </td>
                <td className="px-6 py-4">{job.role}</td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 flex justify-end gap-3">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Eye size={16} />
                  </a>

                  <button
                    onClick={() => onWithdraw(app)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
