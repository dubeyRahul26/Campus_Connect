import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../lib/axios";

/* =======================
   Types
======================= */

export interface User {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  role: "student" | "admin";
  branch?: string | null;
  appliedJobs?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  checkingAuth: boolean;
  error: string | null;
}

/* =======================
   Thunks
======================= */

// Sign In (cookie-based)
export const signin = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/signin", async (credentials, { rejectWithValue }) => {
  try {
    // Login (sets httpOnly cookie)
    await api.post("/auth/signin", credentials);

    // Restore user from cookie
    const me = await api.get<User>("/auth/me");

    return me.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid credentials"
      );
    }
    return rejectWithValue("Unexpected error");
  }
});

// Restore session (cookie-based)
export const checkAuth = createAsyncThunk<User, void, { rejectValue: null }>(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<User>("/auth/me");
      return res.data;
    } catch {
      return rejectWithValue(null);
    }
  }
);

// Logout
export const signout = createAsyncThunk("auth/signout", async () => {
  await api.post("/auth/signout");
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data: { fullName: string; branch: string }, { rejectWithValue }) => {
    try {
      const res = await api.put("/auth/profile", data);
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

/* =======================
   Slice
======================= */

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  checkingAuth: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ===== App Load ===== */
      .addCase(checkAuth.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.checkingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.checkingAuth = false;
      })

      /* ===== Sign In ===== */
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      /* ===== Logout ===== */
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      });
  },
});

export default authSlice.reducer;
