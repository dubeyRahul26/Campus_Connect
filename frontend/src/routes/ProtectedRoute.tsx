import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import AuthLoader from "../components/AuthLoader";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: Props) {
  const { isAuthenticated, checkingAuth, user } = useAppSelector(
    (state) => state.auth
  );

  // Block route until auth check completes
  if (checkingAuth) {
    return <AuthLoader />;
  }

  // Not logged in → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route but user is not admin
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
