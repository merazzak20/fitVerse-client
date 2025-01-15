import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: trainer, isLoading } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/trainers/${id}`);
      return data;
    },
  });
  console.log(trainer);
  return <div></div>;
};

export default TrainerDetails;
