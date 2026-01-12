import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/axios";

/* ================= APPLY ================= */
export const applyToJob = createAsyncThunk(
  "applications/apply",
  async (jobId: string) => {
    const res = await api.post("/applications", { jobId });
    return res.data;
  }
);

/* ================= FETCH ================= */
export const fetchMyApplications = createAsyncThunk(
  "applications/me",
  async () => {
    const res = await api.get("/applications/me");
    return res.data;
  }
);

/* ================= WITHDRAW ================= */
export const withdrawApplication = createAsyncThunk(
  "applications/withdraw",
  async (applicationId: string) => {
    const res = await api.delete(`/applications/${applicationId}`);
    return res.data;
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "applications/updateStatus",
  async ({
    applicationId,
    status,
  }: {
    applicationId: string;
    status: string;
  }) => {
    const res = await api.put(`/applications/${applicationId}/status`, {
      status,
    });
    return res.data;
  }
);

interface ApplicationsState {
  applications: any[];
  appliedJobIds: string[];
  loading: boolean;
}

const initialState: ApplicationsState = {
  applications: [],
  appliedJobIds: [],
  loading: false,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* -------- FETCH -------- */
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false;

        const validApps = action.payload.filter(
          (app: any) => app.jobId && app.jobId._id
        );

        state.applications = validApps;
        state.appliedJobIds = validApps.map((app: any) => app.jobId._id);
      })
      .addCase(fetchMyApplications.rejected, (state) => {
        state.loading = false;
      })

      /* -------- APPLY -------- */
      .addCase(applyToJob.fulfilled, (state, action) => {
        const jobId = action.payload.jobId;

        if (!state.appliedJobIds.includes(jobId)) {
          state.appliedJobIds.push(jobId);
        }

        state.applications.unshift(action.payload);
      })
      /* -------- WITHDRAW APPLICATION -------- */
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        const { applicationId, jobId } = action.payload;

        state.applications = state.applications.filter(
          (app) => app._id !== applicationId
        );

        state.appliedJobIds = state.appliedJobIds.filter((id) => id !== jobId);
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const index = state.applications.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
      });
  },
});

export default applicationsSlice.reducer;
