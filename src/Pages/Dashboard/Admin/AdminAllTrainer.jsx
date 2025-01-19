import React from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";

const AdminAllTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: alltrainers = [], refetch } = useQuery({
    queryKey: ["alltrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers`);
      return res.data;
    },
  });
  const handleDelete = async (email) => {
    console.log(email);
    try {
      await axiosSecure.delete(`/trainers/${email}`);
      await axiosSecure.patch(`user/${email}`);
      refetch();
      toast.success("Successfully Remove.👍");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const modernDelete = (email) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.email);
              handleDelete(email);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.email)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  console.log(alltrainers);
  return (
    <div>
      <div className="text-center my-10">
        <SectionTitle heading={"All Trainers"}></SectionTitle>
      </div>
      <div className="overflow-x-auto bg-white p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Total Trainers: {alltrainers?.length}
        </h2>
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-orange-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center"></th>
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Experience</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-gray-700 text-sm text-center">
            {alltrainers?.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{item?.name}</td>
                <td className="py-3 px-6">{item?.experience}</td>
                <td className="py-3 px-6">
                  <button onClick={() => modernDelete(item.email)} className="">
                    <MdDeleteForever className="text-3xl text-orange-600"></MdDeleteForever>
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

export default AdminAllTrainer;
