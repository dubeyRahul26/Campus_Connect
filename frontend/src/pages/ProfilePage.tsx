import { useState } from "react";
import {
  Mail,
  Briefcase,
  Edit,
  UserCheck,
  GraduationCap,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateProfile } from "../store/authSlice";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user.fullName);
  const [branch, setBranch] = useState(user.branch || "");
  const [saving, setSaving] = useState(false);

  const handleProfileSave = async () => {
    setSaving(true);
    try {
      await dispatch(
        updateProfile({
          fullName: name,
          branch,
        })
      ).unwrap();

      toast.success("Profile updated");
      setIsEditModalOpen(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="max-w-screen-md mx-auto px-4 py-10">
      <div className="bg-white rounded-xl border p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-3xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {name}
              <UserCheck className="w-5 h-5 text-green-600" />
            </h2>
            <p className="text-gray-600 capitalize">{user.role}</p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-teal-600" />
            {user.email}
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-teal-600" />
            Can apply to jobs
          </div>

          {user.branch && (
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-teal-600" />
              {user.branch}
            </div>
          )}
        </div>

        {/* Action */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>

            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProfileSave();
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Branch</label>
                <input
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
