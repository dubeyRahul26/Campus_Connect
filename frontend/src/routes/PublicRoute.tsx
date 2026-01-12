import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { JSX } from "react";
import AuthLoader from "../components/AuthLoader";

interface Props {
  children: JSX.Element;
}

export default function PublicRoute({ children }: Props) {
  const { isAuthenticated, checkingAuth } = useAppSelector(
    (state) => state.auth
  );

  // Wait for auth check
  if (checkingAuth) {
    return <AuthLoader />;
  }

  // Already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
