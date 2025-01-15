import React from "react";
import Container from "../../../components/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Package = () => {
  const asiosSecure = useAxiosSecure();
  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await asiosSecure.get("/packages");
      return data;
    },
  });
  console.log(packages);
  return (
    <div>
      <Container>
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
              <h3 className="text-xl font-semibold  ">{pack?.price}</h3>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Package;
