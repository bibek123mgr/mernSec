import React from "react";
import { Outlet, Navigate } from "react-router-dom";

interface UnProtectedRouteProps {
  isAuthenticated: boolean;
}

const UnProtectedRoute: React.FC<UnProtectedRouteProps> = ({
  isAuthenticated,
}) => {
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default UnProtectedRoute;
