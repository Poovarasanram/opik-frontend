// src/components/auth/ProtectedRoute.tsx
import { ReactNode } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "@tanstack/react-router";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
