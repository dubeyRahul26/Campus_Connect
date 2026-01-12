import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/axios";

/* =======================
   Types
======================= */

export interface PrepPost {
  _id: string;
  title: string;
  content: string;
  type: string;
  company?: string;
  role?: string;
  tags: string[];
  upvotes: string[];
  createdAt: string;
  isHidden: boolean;
  createdBy?: {
    _id: string;
    fullName: string;
  };
}

export interface PrepFilters {
  search?: string;
  type?: string;
  company?: string;
  role?: string;
  tag?: string;
  sort?: "latest" | "top";
}

interface PrepState {
  posts: PrepPost[];
  loading: boolean;
}

/* =======================
   Thunks
======================= */

// Fetch posts
export const fetchPrepPosts = createAsyncThunk<
  PrepPost[],
  PrepFilters | undefined
>("prep/fetch", async (params) => {
  const res = await api.get("/interview-prep", { params });
  return res.data;
});

// Create post
export const createPrepPost = createAsyncThunk<
  PrepPost,
  Partial<PrepPost>
>("prep/create", async (data) => {
  const res = await api.post("/interview-prep", data);
  return res.data;
});

// Upvote post
export const upvotePost = createAsyncThunk<
  PrepPost,
  string
>("prep/upvote", async (id) => {
  const res = await api.post(`/interview-prep/${id}/upvote`);
  return res.data;
});

/* =======================
   Slice
======================= */

const initialState: PrepState = {
  posts: [],
  loading: false,
};

const prepSlice = createSlice({
  name: "prep",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ===== Fetch ===== */
      .addCase(fetchPrepPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrepPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPrepPosts.rejected, (state) => {
        state.loading = false;
      })

      /* ===== Create ===== */
      .addCase(createPrepPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })

      /* ===== Upvote ===== */
      .addCase(upvotePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export default prepSlice.reducer;
