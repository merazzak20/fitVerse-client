import React from "react";
import useRole from "../hooks/useRole";
import Loading from "../components/shared/Loading";
import { Navigate } from "react-router-dom";

const TrainerRouter = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <Loading></Loading>;
  if (role === "trainer") return children;
  return <Navigate to="/dashboard" replace={true}></Navigate>;
};

export default TrainerRouter;
