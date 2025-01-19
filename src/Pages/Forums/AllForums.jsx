import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/shared/Loading";
import Container from "../../components/Container";
import toast from "react-hot-toast";
import { RiAdminLine } from "react-icons/ri";

const AllForums = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allForums = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allForums"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forums`);
      return res.data;
    },
  });
  if (isLoading) return <Loading></Loading>;

  const handleUpVote = async (id) => {
    try {
      await axiosSecure.patch(`/forums/${id}/upvote`);
      refetch();
      toast.success("👍");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDownVote = async (id) => {
    try {
      await axiosSecure.patch(`/forums/${id}/downvote`);
      refetch();
      toast.success("👎");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Container>
        <div className="text-center">
          <SectionTitle heading={"All Forums"}></SectionTitle>
        </div>
        <div className="grid grid-cols-2 gap-10">
          {allForums?.map((forum) => (
            <div
              className="border-orange-200 border p-4 rounded-md"
              key={forum._id}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={forum?.posterInfo.image}
                  alt={forum?.posterInfo.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {forum?.posterInfo.name}
                  </h2>
                  <p className="text-sm badge bg-orange-300 text-orange-900 font-semibold capitalize">
                    {forum?.userRole && forum?.userRole === "admin" ? (
                      <div className="flex items-center gap-1">
                        <RiAdminLine className="inline-block" />{" "}
                        {forum?.userRole}
                      </div>
                    ) : (
                      forum?.userRole
                    )}
                  </p>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-800 mt-6">
                {forum?.title}
              </h1>

              {/* Description */}
              <p className="text-gray-700 text-justify mt-4 leading-relaxed">
                {forum?.description}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {forum?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Votes */}
              <div className="mt-6 flex items-center space-x-6">
                <button
                  onClick={() => handleUpVote(forum?._id)}
                  className="flex items-center space-x-2 text-green-600 hover:text-green-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <span>{forum?.upVote}</span>
                </button>

                <button
                  onClick={() => handleDownVote(forum?._id)}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span>{forum?.downVote}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllForums;
