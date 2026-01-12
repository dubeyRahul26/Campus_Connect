import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MyApplications from "./pages/MyApplications";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import InterviewPrep from "./pages/InterviewPrep";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import StudentRoute from "./routes/StudentRoute";

import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";
import { fetchMyApplications } from "./store/applicationsSlice";

import AuthLoader from "./components/AuthLoader";
import { Toaster } from "react-hot-toast";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

function App() {
  const dispatch = useAppDispatch();
  const { user, checkingAuth } = useAppSelector((s) => s.auth);

  /* ---------- AUTH CHECK ---------- */
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  /* ---------- PREFETCH STUDENT DATA ---------- */
  useEffect(() => {
    if (!checkingAuth && user?.role === "student") {
      dispatch(fetchMyApplications());
    }
  }, [dispatch, checkingAuth, user?.role]);

  /* ---------- GLOBAL BLOCK ---------- */
  if (checkingAuth) {
    return <AuthLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-right" />

      <main className="flex-grow p-4 pt-20">
        <Routes>
          {/* ---------------- PUBLIC ---------------- */}
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* ---------------- STUDENT ONLY ---------------- */}
          <Route
            path="/dashboard"
            element={
              <StudentRoute>
                <Dashboard />
              </StudentRoute>
            }
          />

          <Route
            path="/applications"
            element={
              <StudentRoute>
                <MyApplications />
              </StudentRoute>
            }
          />

          <Route
            path="/resume-analyzer"
            element={
              <StudentRoute>
                <ResumeAnalyzer />
              </StudentRoute>
            }
          />

          {/* ---------------- SHARED (STUDENT + ADMIN) ---------------- */}
          <Route
            path="/interview-prep"
            element={
              <ProtectedRoute>
                <InterviewPrep />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* ---------------- ADMIN ONLY ---------------- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
