import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/shared/Loading";
import { FaCheck, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiEnvelope } from "react-icons/bi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import AdminFeedbackForm from "../../../components/Form/AdminFeedbackForm";

const ApplicantDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: singleApplicant, isLoading } = useQuery({
    queryKey: ["singleApplicant", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/new-trainers/${id}`);
      return res.data;
    },
  });
  if (isLoading) return <Loading></Loading>;
  const {
    name,
    email,
    experience,
    image,
    skills,
    availableDay,
    availableTime,
    socialIcons,
    biography,
  } = singleApplicant;
  const trainerInfo = {
    ...singleApplicant,
  };
  //   console.log(singleApplicant._id);
  const handleAccept = async () => {
    try {
      await axiosSecure.patch(`user/${email}`);
      await axiosSecure.post(`/trainers/${email}`, trainerInfo);
      await axiosSecure.delete(`/new-trainrs/${singleApplicant._id}`);
      navigate("/dashboard/applliedTrainer");
      toast.success("Successfuly Update.👍");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className=" mx-auto px-4">
      <div className="text-center my-10">
        <SectionTitle heading={`Details of ${name}`}></SectionTitle>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Trainer Info Section */}
        <div className="bg-white p-6 lg:col-span-7">
          <img
            src={image}
            alt={name}
            className="max-h-[400px] w-full mb-4 object-cover rounded-lg"
          />
          <h2 className="text-4xl font-bold mb-2">{name}</h2>
          <p className="text-orange-900 font-semibold text-base mb-2">
            <BiEnvelope className="inline-block mr-2" /> {email}
          </p>
          <p className="text-orange-600 font-semibold text-xl">
            {experience} years of experience
          </p>
          <p className="text-gray-700 my-4 text-justify">{biography}</p>
          <div>
            <h3 className="text-xl font-semibold mb-2">Expertise:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 text-2xl mt-6">
            <a
              href={socialIcons?.facebook}
              className="hover:text-orange-600 transition"
            >
              <FaFacebook />
            </a>
            <a
              href={socialIcons?.twitter}
              className="hover:text-orange-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href={socialIcons?.linkedIn}
              className="hover:text-orange-700 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Available Slots Section */}
        <div className="bg-white p-6 lg:col-span-5">
          {/* Available Days */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Available Days:</h2>
            <div className="grid grid-cols-2 gap-4">
              {availableDay?.map((day, index) => (
                <button
                  key={index}
                  className="py-2 px-4 bg-orange-900 text-white font-medium rounded-none hover:bg-orange-600 transition"
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Available Time Slots */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Available Time Slot:</h2>
            <div className="grid grid-cols-2 gap-4">
              {availableTime?.map((time, index) => (
                <button
                  key={index}
                  className="py-2 px-4 bg-orange-900 text-white font-medium rounded-none hover:bg-orange-600 transition"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className=" flex gap-7 justify-center mt-20">
            <button
              onClick={handleAccept}
              className="p-4 rounded-full bg-orange-500 text-white font-medium  hover:bg-orange-600 transition"
            >
              <FaCheck className="text-3xl " />
            </button>
            <button
              onClick={() => document.getElementById("my_modal_2").showModal()}
              className="p-4 rounded-full bg-orange-500 text-white font-medium  hover:bg-orange-600 transition"
            >
              <IoMdCloseCircleOutline className="text-3xl " />
            </button>
          </div>
        </div>
      </div>
      <div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <AdminFeedbackForm email={email} id={id}></AdminFeedbackForm>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ApplicantDetails;
