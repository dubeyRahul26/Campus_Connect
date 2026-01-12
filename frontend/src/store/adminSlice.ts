import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/axios";

export const fetchAdminStats = createAsyncThunk("admin/stats", async () => {
  const res = await api.get("/admin/stats");
  return res.data;
});

export interface AdminStats {
  totalJobs: number;
  openJobs: number;
  closedJobs: number;
  totalApplications: number;
  totalUsers: number;
  newUsersThisMonth: number;
  totalInterviewPrepPosts: number;
  jobsWithApplicants: {
    _id: string;
    companyName: string;
    role: string;
    applicantsCount: number;
  }[];
}

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: null as AdminStats | null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchAdminStats.fulfilled, (s, a) => {
        s.stats = a.payload;
        s.loading = false;
      })
      .addCase(fetchAdminStats.rejected, (s) => {
        s.loading = false;
      });
  },
});

export default adminSlice.reducer;
