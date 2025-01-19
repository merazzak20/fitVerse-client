import React from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/shared/Loading";
import { MdDeleteForever } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";

const ManageSlots = () => {
  const { user } = useAuth();
  console.log(user?.email);
  const axiosSecure = useAxiosSecure();
  const { data: trainerSlots, isLoading } = useQuery({
    queryKey: ["trainerSlots"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainer/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) return <Loading></Loading>;
  const { availableTime } = trainerSlots;

  const handleDelete = async (slot) => {
    console.log(slot);
    try {
      await axiosSecure.patch(`/trainer/${user?.email}/slot`, { slot });
      toast.success("Successfully Remove.👍");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const modernDelete = (slot) => {
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
              toast.dismiss(t.slot);
              handleDelete(slot);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.slot)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  console.log(trainerSlots);
  return (
    <div>
      <div className="text-center my-10">
        <SectionTitle heading={"Manage Slots"}></SectionTitle>
      </div>
      <div className="overflow-x-auto bg-white p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Total Slots: {availableTime?.length}
        </h2>
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-orange-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">#</th>
              <th className="py-3 px-6 text-center">Time</th>
              <th className="py-3 px-6 text-center">Info</th>
              <th className="py-3 px-6 text-center">Delete</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-gray-700 text-sm text-center">
            {availableTime?.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{item}</td>

                <td className="py-3 px-6">
                  <button className="">
                    <IoMdEye className="text-3xl text-orange-600" />
                  </button>
                </td>
                <td className="py-3 px-6">
                  <button onClick={() => modernDelete(item)} className="">
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

export default ManageSlots;
