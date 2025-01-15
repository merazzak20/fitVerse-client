import React from "react";
import Container from "../../components/Container";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/shared/Loading";
import { FaClock, FaRegClock } from "react-icons/fa";

const Booking = () => {
  const location = useLocation();
  const { slot, trainerId, trainerName } = location.state || {};
  const axiosPublic = useAxiosPublic();
  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/trainer-classes/${trainerId}`);
      return data;
    },
  });
  console.log(classes);

  if (isLoading) return <Loading></Loading>;
  console.log(slot, trainerId, trainerName);
  return (
    <div className="my-14">
      <Container>
        <div className="grid md:grid-cols-12 gap-3 mx-auto">
          <div className="col-span-9">
            <h1 className="text-3xl text-orange-500 font-bold">
              {trainerName}
            </h1>
            <div className="text-xl font-semibold flex justify-start items-center gap-2 mt-3">
              <FaRegClock></FaRegClock>
              <p className="">{slot}</p>
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-6 ">
              {classes.map((item) => (
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
      </Container>
    </div>
  );
};

export default Booking;
