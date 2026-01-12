import { useState, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function JobForm({ job, onSave, onCancel }: any) {
  const dateRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    companyName: job?.companyName || "",
    role: job?.role || "",
    salary: job?.salary || "",
    jobType: job?.jobType || "Tech",
    status: job?.status || "Open",
    deadline: job?.deadline?.slice(0, 10) || "",
    url: job?.url || "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onSave(form);
    toast.success(job ? "Job updated successfully" : "Job added successfully");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
    mx-auto w-full
    max-w-xl md:max-w-2xl lg:max-w-3xl
    space-y-3 sm:space-y-4 md:space-y-6
  "
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
        {job ? "Edit Job" : "Add Job"}
      </h2>

      {/* Main Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-5">
        {[
          { name: "companyName", label: "Company Name" },
          { name: "role", label: "Job Role" },
          { name: "salary", label: "Salary" },
          { name: "url", label: "Job URL" },
        ].map(({ name, label }) => (
          <div key={name} className="space-y-0.5">
            <label className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-600">
              {label}
            </label>
            <input
              name={name}
              value={(form as any)[name]}
              onChange={handleChange}
              className="
            w-full bg-gray-50
            px-3 md:px-4
            py-1.5 sm:py-2 md:py-3
            rounded-md sm:rounded-lg md:rounded-xl
            border border-gray-200
            focus:outline-none focus:ring-2 focus:ring-teal-500
          "
              required
            />
          </div>
        ))}
      </div>

      {/* Job */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-5">
        <div className="space-y-0.5">
          <label className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-600">
            Job Type
          </label>
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="
          w-full bg-gray-50
          px-3 md:px-4
          py-1.5 sm:py-2 md:py-3
          rounded-md sm:rounded-lg md:rounded-xl
          border border-gray-200
        "
          >
            {[
              "Tech",
              "Sales",
              "Marketing",
              "HR",
              "Finance",
              "Operations",
              "Other",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="space-y-0.5">
          <label className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-600">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
          w-full bg-gray-50
          px-3 md:px-4
          py-1.5 sm:py-2 md:py-3
          rounded-md sm:rounded-lg md:rounded-xl
          border border-gray-200
        "
          >
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>

        <div className="space-y-0.5 sm:col-span-2 lg:col-span-1">
          <label className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-600">
            Deadline
          </label>
          <input
            ref={dateRef}
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => dateRef.current?.showPicker()}
            className="
          w-full bg-gray-50
          px-3 md:px-4
          py-1.5 sm:py-2 md:py-3
          rounded-md sm:rounded-lg md:rounded-xl
          border border-gray-200
          focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer
        "
            required
          />
          <p className="hidden sm:block text-xs text-gray-400">
            Device-based date format
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-3 sm:pt-4 md:pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="
        px-3 sm:px-4 md:px-6
        py-1.5 sm:py-2
        rounded-md sm:rounded-lg md:rounded-xl
        bg-gray-200 text-gray-600
        hover:bg-gray-300 transition
      "
        >
          Cancel
        </button>
        <button
          type="submit"
          className="
        px-3 sm:px-4 md:px-6
        py-1.5 sm:py-2
        rounded-md sm:rounded-lg md:rounded-xl
        bg-teal-600 text-white
        hover:bg-teal-700 transition
      "
        >
          Save
        </button>
      </div>
    </motion.form>
  );
}
