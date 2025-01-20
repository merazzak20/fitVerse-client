import React from "react";
import Container from "../../components/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/shared/SectionTitle";

const Classes = () => {
  const axiosPublic = useAxiosPublic();
  const { data: classes = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/classes");
      return data;
    },
  });
  console.log(classes);

  return (
    <div className="my-14">
      <Container>
        <div className="text-center">
          <SectionTitle heading={"All classes"}></SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {classes?.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-md rounded-none"
            >
              <figure>
                <img
                  className="hover:scale-110 
                transition h-60 w-full object-cover"
                  src={item?.image}
                  alt="image"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item?.name}
                  <div className="badge bg-orange-500 text-white">
                    {item?.booking_count}
                  </div>
                </h2>
                <p>{item?.details}</p>
                {/* <p>{item?.trainerId}</p> */}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Classes;
