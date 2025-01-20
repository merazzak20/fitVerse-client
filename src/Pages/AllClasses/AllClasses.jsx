import React, { useState } from "react";
import Container from "../../components/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/shared/SectionTitle";
import Loading from "../../components/shared/Loading";

const Classes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6;
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["packages", currentPage, classesPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/classes?page=${currentPage}&limit=${classesPerPage}`
      );
      return data;
    },
  });
  if (isLoading) return <Loading></Loading>;
  console.log(data);

  const totalClass = data?.totalClasses || 0;
  const numOfPage = Math.ceil(totalClass / classesPerPage) || 1;
  console.log(totalClass, numOfPage);
  const pages = [...Array(numOfPage).keys()];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-14">
      <Container>
        <div className="text-center">
          <SectionTitle heading={"All classes"}></SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {data?.classes?.map((item) => (
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
        <div className=" text-center my-9">
          {pages.map((page) => (
            <button
              className={`btn btn-sm rounded-none mx-1 ${
                currentPage === page + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handlePageChange(page + 1)}
              key={page}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Classes;
