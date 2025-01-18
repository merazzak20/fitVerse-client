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
  const { data: adminFeedback } = useQuery({
    queryKey: ["adminFeedback", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-feedbacks/${user?.email}`);
      return res.data;
    },
  });
  console.log(newTrainer);
  console.log(adminFeedback);
  return (
    <div>
      <div className="text-center my-10">
        <SectionTitle heading={"Be A Trainer"}></SectionTitle>
      </div>
      {newTrainer && newTrainer?.status ? (
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Your Application is now {""}
          <span className="bg-orange-600 px-4 py-2 rounded-full text-white capitalize">
            {newTrainer?.status}
          </span>
        </h2>
      ) : adminFeedback && adminFeedback?.status ? (
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Your Application is {""}
          <span className="bg-orange-600 px-4 py-2 rounded-full text-white capitalize">
            {adminFeedback?.status}
          </span>
          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            <FaEye className="inline-block ml-4 text-orange-900" />
          </button>
        </h2>
      ) : (
        "You have no Application"
      )}
      <div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <p className="font-semibold text-xl text-orange-700 mb-2">
              Admin's Feedback
            </p>
            <p>{adminFeedback?.feedback}</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default TrainerApplication;
