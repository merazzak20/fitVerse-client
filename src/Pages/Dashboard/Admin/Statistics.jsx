import React, { useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { FaUsers, FaWallet } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data;
    },
  });
  const totalPrice = useMemo(
    () => bookings.reduce((total, item) => total + parseFloat(item.price), 0),
    [bookings]
  );

  //   transactions
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  //   Subscribers
  const { data: allsubscribers = [] } = useQuery({
    queryKey: ["allsubscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/subscribers`);
      return res.data;
    },
  });

  //   Pie Chart
  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

  const data = [
    { name: "Paid Users", value: bookings?.length },
    { name: "Newsletter Subscribers", value: allsubscribers?.length },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="px-12 pt-10">
      <h2 className="text-2xl lg:text-4xl font-bold">
        Welcome {user.displayName}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Stats Section */}
        <div className="stats shadow gap-6 min-h-auto">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaWallet className="text-4xl text-orange-500" />
            </div>
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value">${totalPrice}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-4xl text-orange-500"></FaUsers>
            </div>
            <div className="stat-title">Paid Users</div>
            <div className="stat-value">{bookings?.length}</div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex justify-center items-center">
          <PieChart width={200} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>

      {/* Transaction History */}
      <div className="overflow-x-auto bg-white p-6 mt-5">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Latest Transaction
        </h2>
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-orange-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">#</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Transaction ID</th>
              <th className="py-3 px-6 text-center">Amount</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-gray-700 text-sm text-center">
            {transactions?.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{item?.email}</td>
                <td className="py-3 px-6">{item?.transactionId}</td>
                <td className="py-3 px-6">{item?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
