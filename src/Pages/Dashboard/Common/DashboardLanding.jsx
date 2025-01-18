import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/shared/Loading";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Statistics from "../Admin/Statistics";

const DashboardLanding = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <Loading></Loading>;
  if (role === "member") {
    return <Navigate to="/dashboard/myBooking"></Navigate>;
  }
  if (role === "trainer") {
    return <Navigate to="/dashboard/manageSlots"></Navigate>;
  }
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === "admin" && <Statistics />}
    </div>
  );
};

export default DashboardLanding;
