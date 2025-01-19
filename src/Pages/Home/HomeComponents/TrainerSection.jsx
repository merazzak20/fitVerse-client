import React from "react";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/shared/Loading";

const TrainerSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trainers, isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/trainers-section");
      return data;
    },
  });
  if (isLoading) return;
  return (
    <div className="my-14">
      <Container>
        <div className="text-center">
          <SectionTitle heading={"Trainers"}></SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {trainers.map((trainer) => (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.7)), url(${trainer?.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className=" top-0 p-5 relative  inset-x-0 min-h-[300px] flex items-center justify-start "
              key={trainer._id}
            >
              <div className="absolute bottom-10">
                <h2 className="text-3xl font-bold text-zinc-50 ">
                  {trainer?.name}
                </h2>
                <p className="text-zinc-50 bg-orange-900 px-2 py-1">
                  {trainer?.experience} years of experience
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TrainerSection;
