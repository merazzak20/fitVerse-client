import React from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllSubscriber = () => {
  const axiosSecure = useAxiosSecure();
  const { data: subscribers = [] } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/subscribers`);
      return res.data;
    },
  });
  console.log(subscribers);
  return (
    <div>
      <div className="text-center my-10">
        <SectionTitle heading={"All Subscribers"}></SectionTitle>
      </div>
      <div className="overflow-x-auto bg-white p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Total Subscribers: {subscribers?.length}
        </h2>
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-orange-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">#</th>
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Email</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-gray-700 text-sm text-center">
            {subscribers?.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{item?.name}</td>
                <td className="py-3 px-6">{item?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSubscriber;
