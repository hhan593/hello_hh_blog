// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isLoggedIn } from "../utils/auth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
