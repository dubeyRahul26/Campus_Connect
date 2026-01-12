import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/axios";

/* ================= FETCH ================= */
export const fetchJobApplicants = createAsyncThunk(
  "jobApplicants/fetch",
  async (jobId: string) => {
    const res = await api.get(`/jobs/${jobId}/applicants`);
    return res.data;
  }
);

interface JobApplicantsState {
  applicants: any[];
  loading: boolean;
}

const initialState: JobApplicantsState = {
  applicants: [],
  loading: false,
};

const jobApplicantsSlice = createSlice({
  name: "jobApplicants",
  initialState,
  reducers: {
    clearApplicants: (state) => {
      state.applicants = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobApplicants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(fetchJobApplicants.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearApplicants } = jobApplicantsSlice.actions;
export default jobApplicantsSlice.reducer;
