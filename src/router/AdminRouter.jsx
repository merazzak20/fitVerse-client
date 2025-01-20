import React from "react";
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import Loading from "../components/shared/Loading";

const AdminRouter = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <Loading></Loading>;
  if (role === "admin") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

export default AdminRouter;
