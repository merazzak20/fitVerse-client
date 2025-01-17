import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/shared/SectionTitle";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { data: paymentInfos = [] } = useQuery({
    queryKey: ["paymentInfos"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });
  console.log(paymentInfos);
  return (
    <div>
      <div className="text-center my-10">
        <SectionTitle heading={"Payment History"}></SectionTitle>
      </div>
      <div className="overflow-x-auto bg-white p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Total Transaction: {paymentInfos?.length}
        </h2>
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-orange-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center"></th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Transaction ID</th>
              <th className="py-3 px-6 text-center">Package</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-gray-700 text-sm text-center">
            {paymentInfos?.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{item?.email}</td>
                <td className="py-3 px-6">{item?.transactionId}</td>
                <td className="py-3 px-6">{item?.package}</td>
                <td className="py-3 px-6">{item?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
