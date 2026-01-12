import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";

export interface Job {
  _id: string;
  companyName: string;
  role: string;
  salary?: string;
  deadline: string;
  jobType: string;
  url: string;
  status: "Open" | "Closed";
  createdBy: { _id: string; fullName: string };
}

interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

/* IMPORTANT: loading starts as TRUE */
const initialState: JobsState = {
  jobs: [],
  loading: true,
  error: null,
};

/* ---------------- FETCH JOBS ---------------- */
export const fetchJobs = createAsyncThunk(
  "jobs/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<Job[]>("/jobs");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to load jobs");
    }
  }
);

/* ---------------- CREATE JOB ---------------- */
export const createJob = createAsyncThunk(
  "jobs/create",
  async (data: Partial<Job>, { rejectWithValue }) => {
    try {
      const res = await api.post<Job>("/jobs", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to create job");
    }
  }
);

/* ---------------- UPDATE JOB ---------------- */
export const updateJob = createAsyncThunk(
  "jobs/update",
  async (
    { id, data }: { id: string; data: Partial<Job> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put<Job>(`/jobs/${id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update job");
    }
  }
);

/* ---------------- DELETE JOB ---------------- */
export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/jobs/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete job");
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* -------- FETCH -------- */
      .addCase(fetchJobs.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchJobs.fulfilled, (s, a) => {
        s.jobs = a.payload;
        s.loading = false;
      })
      .addCase(fetchJobs.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      /* -------- CREATE -------- */
      .addCase(createJob.fulfilled, (s, a) => {
        s.jobs.unshift(a.payload);
      })

      /* -------- UPDATE -------- */
      .addCase(updateJob.fulfilled, (s, a) => {
        const index = s.jobs.findIndex(
          (j) => j._id === a.payload._id
        );
        if (index !== -1) {
          s.jobs[index] = a.payload;
        }
      })

      /* -------- DELETE -------- */
      .addCase(deleteJob.fulfilled, (s, a) => {
        s.jobs = s.jobs.filter((j) => j._id !== a.payload);
      });
  },
});

export default jobsSlice.reducer;
