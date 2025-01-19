import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/Container";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import BeATrainer from "./BeATrainer";
import { Helmet } from "react-helmet-async";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: trainer } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/trainers/${id}`);
      return data;
    },
  });
  console.log(trainer);
  const handleBooking = (slot) => {
    console.log(slot);
    navigate("/booking", {
      state: { slot, trainerId: trainer?._id, trainerName: trainer?.name },
    });
  };
  return (
    <div className="my-14">
      <Helmet>
        <title>FitVerse | Trainer Details</title>
      </Helmet>
      <Container>
        {/* Layout with Two Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Trainer Info Section */}
          <div className="bg-white p-6">
            <img
              src={trainer?.image}
              alt={trainer?.name}
              className="mx-auto mb-4"
            />
            <h2 className="text-4xl font-bold  mb-2">{trainer?.name}</h2>
            <p className=" text-orange-600 font-semibold text-xl ">
              {trainer?.experience} years of experience
            </p>
            <p className="text-gray-700  mb-4">{trainer?.biography}</p>
            <div className="">
              <h3 className="text-xl font-semibold mb-2">
                Expertise:
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  {trainer?.skills?.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </h3>
            </div>
            <div className="flex gap-2 text-2xl mt-6">
              <a href={trainer?.socialIcons.facebook}>
                <FaFacebook></FaFacebook>
              </a>
              <a href={trainer?.socialIcons.twitter}>
                <FaTwitter></FaTwitter>
              </a>
              <a href={trainer?.socialIcons.linkedIn}>
                <FaLinkedin></FaLinkedin>
              </a>
            </div>
          </div>

          {/* Available Slots Section */}
          <div className="bg-white p-6 md:pt-20">
            <h2 className="text-2xl font-bold mb-4">Available Slots:</h2>
            <div className="grid grid-cols-2 gap-4">
              {trainer?.availableTime?.map((time, index) => (
                <button
                  onClick={() => handleBooking(time)}
                  key={index}
                  className="py-2 px-4 bg-orange-500 text-white font-medium rounded-none hover:bg-orange-600 transition"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <BeATrainer></BeATrainer>
    </div>
  );
};

export default TrainerDetails;
