import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/shared/Loading";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllTrainer = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: trainers, isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/trainers");
      return data;
    },
  });
  const handleDetails = (id) => {
    navigate(`/allTrainer/${id}`);
  };
  if (isLoading) return <Loading></Loading>;

  const {
    name,
    profileImage,
    yearsOfExperience,
    socialIcons: { facebook, twitter, linkedin } = {},
    availableSlots,
  } = trainers;
  console.log(facebook);
  console.log(trainers);
  return (
    <div>
      <Container>
        <div className="text-center">
          <SectionTitle heading={"All Trainers"}></SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {trainers.map((trainer) => (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url(${trainer?.profileImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className=" relative  inset-x-0 min-h-[300px] flex items-center justify-start pr-10"
              key={trainer._id}
            >
              <p className="text-zinc-50 bg-orange-900 px-2 absolute top-0 py-1">
                {trainer?.yearsOfExperience} years of experience
              </p>
              <div className="absolute bottom-10 left-3 flex justify-between items-start gap-5 ">
                <div>
                  <h2 className="text-3xl font-bold text-zinc-50 ">
                    {trainer?.name}
                  </h2>

                  <div className="flex gap-2 text-zinc-50 text-2xl mt-2">
                    <a href={trainer?.socialIcons.facebook}>
                      <FaFacebook></FaFacebook>
                    </a>
                    <a href={trainer?.socialIcons.twitter}>
                      <FaTwitter></FaTwitter>
                    </a>
                    <a href={trainer?.socialIcons.linkedin}>
                      <FaLinkedin></FaLinkedin>
                    </a>
                  </div>
                  <button
                    onClick={() => handleDetails(trainer?._id)}
                    className="btn btn-sm bg-orange-500 text-white border-none rounded-none mt-2"
                  >
                    More Info
                  </button>
                </div>

                <div className=" mt-3">
                  <h2 className="text-white text-xl font-bold">
                    Available Slots:
                  </h2>
                  <div>
                    {trainer?.availableSlots?.map((slot, idx) => (
                      <p className="text-white" key={idx}>
                        {slot}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllTrainer;
