import React from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AppliedTrainer = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { data: allApplicant = [] } = useQuery({
    queryKey: ["allApplicant"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/new-trainers`);
      return res.data;
    },
  });
  const handleDetails = (id) => {
    navigate(`/dashboard/applliedTrainer/${id}`);
  };
  return (
    <div>
      <div className="text-center my-10">
        <SectionTitle heading={"All Applicants"}></SectionTitle>
      </div>
      <div className="overflow-x-auto bg-white p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Total Applicants: {allApplicant?.length}
        </h2>
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-orange-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">#</th>
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-gray-700 text-sm text-center">
            {allApplicant?.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{item?.name}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDetails(item?._id)}
                    className="btn btn-sm bg-orange-500 text-white rounded-none border-none"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTrainer;
