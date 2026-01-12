import { useState } from "react";
import { X } from "lucide-react";

export default function CreatePrepModal({
  onClose,
  onSave,
  initialData,
}: any) {
  const [form, setForm] = useState(
    initialData ?? {
      title: "",
      content: "",
      type: "Experience",
      company: "",
      role: "",
      tags: "",
    }
  );

  const submit = (e: any) => {
    e.preventDefault();
    onSave({
      ...form,
      tags: form.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {initialData
              ? "Edit Interview Prep"
              : "Share Interview Prep"}
          </h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-4">
          <input
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            placeholder="Title"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border"
          />

          <textarea
            value={form.content}
            onChange={(e) =>
              setForm({
                ...form,
                content: e.target.value,
              })
            }
            placeholder="Share your experience or tips..."
            rows={5}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border resize-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
              className="px-4 py-2 rounded-lg bg-gray-50 border"
            >
              <option>Experience</option>
              <option>Questions</option>
              <option>Tips</option>
            </select>

            <input
              value={form.company}
              onChange={(e) =>
                setForm({
                  ...form,
                  company: e.target.value,
                })
              }
              placeholder="Company (optional)"
              className="px-4 py-2 rounded-lg bg-gray-50 border"
            />
          </div>

          <input
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            placeholder="Role (optional)"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border"
          />

          <input
            value={form.tags}
            onChange={(e) =>
              setForm({
                ...form,
                tags: e.target.value,
              })
            }
            placeholder="Tags (comma separated)"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border"
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
