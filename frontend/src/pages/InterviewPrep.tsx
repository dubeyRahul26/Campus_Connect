import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, Edit2, Trash2, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchPrepPosts,
  createPrepPost,
  upvotePost,
  type PrepFilters,
  type PrepPost,
} from "../store/interviewPrepSlice";

import api from "../lib/axios";
import AuthLoader from "../components/AuthLoader";
import CreatePrepModal from "../components/interviewPrep/CreatePrepModal";
import PrepFiltersComponent from "../components/interviewPrep/PrepFilters";
import DeletePrepConfirmModal from "../components/interviewPrep/DeletePrepConfirmModal";

export default function InterviewPrep() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((s) => s.prep);
  const { user } = useAppSelector((s) => s.auth);

  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PrepPost | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  /* =======================
     Expanded Content
  ======================= */

  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* =======================
     Filters (TYPED)
  ======================= */

  const [draftFilters, setDraftFilters] = useState<PrepFilters>({
    search: "",
    type: "",
    company: "",
    role: "",
    tag: "",
    sort: "latest",
  });

  const [appliedFilters, setAppliedFilters] =
    useState<PrepFilters>(draftFilters);

  useEffect(() => {
    dispatch(fetchPrepPosts(appliedFilters));
  }, [dispatch, appliedFilters]);

  /* =======================
     Tag Click
  ======================= */

  const handleTagClick = (tag: string) => {
    const next: PrepFilters = {
      search: "",
      type: "",
      company: "",
      role: "",
      tag,
      sort: appliedFilters.sort,
    };
    setDraftFilters(next);
    setAppliedFilters(next);
  };

  /* =======================
     Actions
  ======================= */

  const confirmDelete = async () => {
    if (!deleteId) return;

    await api.delete(`/interview-prep/${deleteId}`);
    toast.success("Post deleted");
    setDeleteId(null);
    dispatch(fetchPrepPosts(appliedFilters));
  };

  const handleUpdate = async (data: Partial<PrepPost>) => {
    if (!editingPost) return;

    await api.put(`/interview-prep/${editingPost._id}`, data);
    toast.success("Post updated");
    setEditingPost(null);
    dispatch(fetchPrepPosts(appliedFilters));
  };

  const handleAdminHide = async (id: string) => {
    await api.post(`/interview-prep/${id}/hide`);
    toast.success("Post visibility updated");
    dispatch(fetchPrepPosts(appliedFilters));
  };

  /* =======================
     Loading
  ======================= */

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <AuthLoader />
      </div>
    );
  }

  /* =======================
     Render
  ======================= */

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Interview Prep</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg"
        >
          Share Experience
        </button>
      </div>

      {/* SORT */}
      <div className="flex justify-end mb-3">
        <select
          value={draftFilters.sort}
          onChange={(e) =>
            setDraftFilters({
              ...draftFilters,
              sort: e.target.value as "latest" | "top",
            })
          }
          className="px-3 py-2 border rounded-lg bg-white text-sm"
        >
          <option value="latest">Latest</option>
          <option value="top">Most Upvoted</option>
        </select>
      </div>

      {/* FILTERS */}
      <PrepFiltersComponent
        filters={draftFilters}
        setFilters={setDraftFilters}
        onApply={() => setAppliedFilters(draftFilters)}
        onClear={() => {
          const empty: PrepFilters = {
            search: "",
            type: "",
            company: "",
            role: "",
            tag: "",
            sort: "latest",
          };
          setDraftFilters(empty);
          setAppliedFilters(empty);
        }}
      />

      {/* POSTS */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No posts found.
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const upvoted = post.upvotes.includes(user?._id ?? "");
            const isOwner = post.createdBy?._id === user?._id;
            const isAdmin = user?.role === "admin";
            const expanded = expandedPosts.has(post._id);

            return (
              <motion.div
                layout
                key={post._id}
                className={`bg-white rounded-2xl shadow p-5 ${
                  post.isHidden ? "opacity-50" : ""
                }`}
              >
                {/* TITLE */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-xs text-gray-500">
                      {post.type} · {post.createdBy?.fullName} ·{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {(isOwner || isAdmin) && (
                    <div className="flex gap-2">
                      {isOwner && (
                        <>
                          <button onClick={() => setEditingPost(post)}>
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => setDeleteId(post._id)}>
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                      {isAdmin && (
                        <button onClick={() => handleAdminHide(post._id)}>
                          <EyeOff size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <motion.div
                  layout
                  className="my-3 cursor-pointer"
                  onClick={() => toggleExpand(post._id)}
                >
                  <p
                    className={`text-gray-700 text-sm whitespace-pre-line ${
                      expanded ? "" : "line-clamp-4"
                    }`}
                  >
                    {post.content}
                  </p>

                  {post.content.length > 250 && (
                    <span className="mt-1 block text-xs text-teal-600">
                      {expanded ? "Show less" : "Read more"}
                    </span>
                  )}
                </motion.div>

                {/* TAGS */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}

                {/* FOOTER */}
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {post.company || "—"} · {post.role || "—"}
                  </p>

                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => dispatch(upvotePost(post._id))}
                    className={`flex items-center gap-1 ${
                      upvoted
                        ? "text-teal-600"
                        : "text-gray-400 hover:text-teal-600"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={upvoted ? "on" : "off"}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <ThumbsUp
                          size={18}
                          fill={upvoted ? "currentColor" : "none"}
                        />
                      </motion.span>
                    </AnimatePresence>

                    <span className="text-sm font-medium">
                      {post.upvotes.length}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* CREATE */}
      {open && (
        <CreatePrepModal
          onClose={() => setOpen(false)}
          onSave={(data: Partial<PrepPost>) => {
            dispatch(createPrepPost(data));
            toast.success("Post created");
            setOpen(false);
          }}
        />
      )}

      {/* EDIT */}
      {editingPost && (
        <CreatePrepModal
          initialData={{
            ...editingPost,
            tags: editingPost.tags.join(", "),
          }}
          onClose={() => setEditingPost(null)}
          onSave={handleUpdate}
        />
      )}

      {/* DELETE */}
      <DeletePrepConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
