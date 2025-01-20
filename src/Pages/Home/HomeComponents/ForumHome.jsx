import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import { RiAdminLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ForumHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: forumsHome = [], isLoading } = useQuery({
    queryKey: ["forumsHome"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forums-home`);
      return res.data;
    },
  });
  if (isLoading) return;
  return (
    <div className="my-14">
      <Container>
        <div className="text-center">
          <SectionTitle heading={"Forums"}></SectionTitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {forumsHome?.map((forum) => (
            <Link key={forum?._id} to={"/allForums"}>
              <div className="border-orange-200 border p-4 rounded-md">
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
                  {forum?.description.slice(0, 80)}...
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
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ForumHome;
