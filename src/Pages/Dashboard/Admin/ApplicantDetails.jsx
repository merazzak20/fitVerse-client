import React from "react";
import { useParams } from "react-router-dom";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ApplicantDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: singleApplicant = [] } = useQuery({
    queryKey: ["singleApplicant", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/new-trainers/${id}`);
      return res.data;
    },
  });
  console.log(singleApplicant);
  return (
    <div>
      <div className="text-center my-10">
        <SectionTitle heading={"Details"}></SectionTitle>
      </div>
    </div>
  );
};

export default ApplicantDetails;
