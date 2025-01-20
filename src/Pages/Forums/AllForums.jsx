import React, { useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/shared/Loading";
import Container from "../../components/Container";
import toast from "react-hot-toast";
import { RiAdminLine } from "react-icons/ri";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllForums = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const forumPerPage = 4;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allForums", currentPage, forumPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/forums?page=${currentPage}&limit=${forumPerPage}`
      );
      return res.data;
    },
  });

  const totalForum = data?.totalForums || 0;
  const numOfPage = Math.ceil(totalForum / forumPerPage) || 1;
  // console.log(totalForum, numOfPage);
  const pages = [...Array(numOfPage).keys()];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

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
  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <Container>
        <div className="text-center">
          <SectionTitle heading={"All Forums"}></SectionTitle>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          {data?.forums?.map((forum) => (
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

        {/* Pagination */}
        <div className="text-center my-10">
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

export default AllForums;
