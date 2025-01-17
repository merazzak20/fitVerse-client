import React, { useEffect } from "react";
import Container from "../../../components/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/Loading";

const Package = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: packages = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["packagess"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/packages");
      return data;
    },
  });
  if (isLoading) return <Loading></Loading>;

  // if (isError) return refetch();
  console.log(packages);
  return (
    <div>
      <Container>
        <h2 className="text-3xl font-bold">Our Packages - </h2>
        <div className="grid md:grid-cols-3 gap-4 ">
          {packages?.map((pack) => (
            <div key={pack?._id} className=" p-6 shadow-lg ">
              <h2 className="text-xl font-semibold text-orange-400 my-4">
                {pack?.name}
              </h2>
              {pack?.features.map((fet, idx) => (
                <ul key={idx} className="my-1 ">
                  <li>
                    <strong>- </strong>
                    {fet}
                  </li>
                </ul>
              ))}
              <h3 className="text-xl font-semibold  ">${pack?.price}</h3>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Package;
