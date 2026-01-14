import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { JSX } from "react";

export default function StudentRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, checkingAuth } = useAppSelector((s) => s.auth);

  if (checkingAuth) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "student") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
