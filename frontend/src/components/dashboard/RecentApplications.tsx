export default function RecentApplications({
  applications,
}: {
  applications: any[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-semibold mb-4">Recent Applications</h3>

      {applications.length === 0 ? (
        <p className="text-sm text-gray-500">
          No applications yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {applications.slice(0, 5).map((app) => (
            <li
              key={app._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">
                  {app.jobId.role}
                </p>
                <p className="text-xs text-gray-500">
                  {app.jobId.companyName}
                </p>
              </div>

              <span className="text-xs text-gray-500">
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
