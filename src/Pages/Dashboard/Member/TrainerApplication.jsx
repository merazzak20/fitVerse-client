import React from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";

const TrainerApplication = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: newTrainer } = useQuery({
    queryKey: ["newTrainer", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/new-trainrs/${user?.email}`);
      return res.data;
    },
  });
  console.log(newTrainer);
  return (
    <div>
      <div className="text-center my-10">
        <SectionTitle heading={"Be A Trainer"}></SectionTitle>
      </div>
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Your Application is now {""}
        <span className="bg-orange-600 px-4 py-2 rounded-full text-white capitalize">
          {newTrainer?.status}
        </span>
        {newTrainer?.status === "rejected" && (
          <button>
            <FaEye className="inline-block ml-4 text-gray-300" />
          </button>
        )}
      </h2>
    </div>
  );
};

export default TrainerApplication;
