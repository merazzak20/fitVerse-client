import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/shared/Loading";
import { FaRegClock } from "react-icons/fa";
import Package from "./BookingComponents/Package";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Booking = () => {
  const [selectedPackage, setSelectedPackage] = useState("Standard");
  const location = useLocation();
  const navigate = useNavigate();
  const { slot, trainerId, trainerName } = location.state || {};
  const axiosSecure = useAxiosSecure();
  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes", trainerId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/trainer-classes/${trainerId}`);
      return data;
    },
  });
  console.log(classes);

  if (isLoading) return <Loading></Loading>;
  console.log(slot, trainerId, trainerName);
  const handleJoin = (e) => {
    e.preventDefault();
    const form = e.target;
    if (selectedPackage) {
      navigate("/payment", {
        state: { slot, trainerName, selectedPackage },
      });
      form.reset();
    }
    console.log(selectedPackage);
  };
  return (
    <div className="my-14">
      <Helmet>
        <title>FitVerse | Package</title>
      </Helmet>
      <Container>
        <div className="grid lg:grid-cols-12 gap-3 mx-auto">
          <div className="col-span-9 px-3">
            <div className="flex items-center justify-evenly">
              <div>
                <h1 className="text-3xl text-orange-500 font-bold">
                  {trainerName}
                </h1>
                <div className="text-xl font-semibold flex justify-start items-center gap-2 mt-3">
                  <FaRegClock></FaRegClock>
                  <p className="">{slot}</p>
                </div>
              </div>
              <div className="my-10 mt-16 mx-auto text-center">
                <form onSubmit={handleJoin} className="flex">
                  <select
                    required
                    name="package"
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="select select-bordered rounded-none w-full max-w-xs mx-5"
                  >
                    <option disabled>Choose your package</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                  <button className="btn rounded-none border-none bg-orange-500">
                    Join Now!
                  </button>
                </form>
              </div>
            </div>
            <div className="my-8">
              <Package></Package>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 md:mt-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 ">
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
