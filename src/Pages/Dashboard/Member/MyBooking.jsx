import React from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { FaRegClock } from "react-icons/fa";
import FeedbackForm from "../../../components/Form/FeedbackForm";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  const { data: mybooking } = useQuery({
    queryKey: ["mybooking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      return res.data;
    },
  });

  const reviewInfo = {
    name: user?.name,
  };
  return (
    <div className="w-11/12 mx-auto">
      <div className="text-center my-10">
        <SectionTitle heading={"Booking"}></SectionTitle>
      </div>

      {mybooking ? (
        <div className="grid lg:grid-cols-12 gap-3 mx-auto">
          <div className="col-span-6 px-3 md:mt-10">
            <div>
              <h1 className="text-3xl text-orange-500 font-bold">
                {mybooking?.trainerName}
              </h1>
              <div className="badge bg-orange-500 text-white p-2">
                {mybooking?.package}
              </div>
              <div className="text-xl font-semibold flex justify-start items-center gap-2 mt-3">
                <FaRegClock></FaRegClock>
                <p className="">{mybooking?.slot}</p>
              </div>
              <button
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
                className="btn bg-orange-500 rounded-none border-none btn-sm mt-4 text-white"
              >
                Feedback
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 md:mt-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 ">
              {mybooking?.classes.map((item) => (
                <div
                  key={item._id}
                  className="card bg-base-100 shadow-md rounded-none"
                >
                  <figure>
                    <img
                      className="hover:scale-110 
                transition h-60 w-full object-cover"
                      src={item?.trainerClasses?.image}
                      alt="image"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item?.trainerClasses?.name}</h2>
                    <p>{item?.trainerClasses?.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto text-center">
          <h2 className="text-xl font-semibold">You have no booking</h2>
          <button
            onClick={() => navigate("/allTrainer")}
            className="btn bg-orange-500 rounded-none border-none text-white mt-4"
          >
            Go for Booking
          </button>
        </div>
      )}

      <div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <FeedbackForm user={user}></FeedbackForm>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default MyBooking;
