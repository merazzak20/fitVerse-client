import React from "react";
import Container from "../../components/Container";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { user } = useAuth();
  const location = useLocation();
  const asiosSecure = useAxiosSecure();
  const { slot, trainerName, selectedPackage } = location.state || {};
  console.log(slot, trainerName, selectedPackage);

  const { data: singlePackage, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await asiosSecure.get(`/packages/${selectedPackage}`);
      return data;
    },
  });
  const paymentInfo = {
    slot,
    trainerName,
    package: selectedPackage,
    price: singlePackage?.price,
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
  };
  console.log(paymentInfo);
  return (
    <div className="my-14">
      <Container>
        <div className="max-w-lg mx-auto bg-white shadow-md  p-6">
          <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
            Payment Details
          </h2>
          <div className="flex items-center mb-4">
            <img
              src={paymentInfo.customer.image}
              alt={paymentInfo.customer.name}
              className="w-16 h-16 rounded-full border-2 border-orange-500"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">
                {paymentInfo.customer.name}
              </h3>
              <p className="text-sm text-gray-600">
                {paymentInfo.customer.email}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="mb-3">
              <h4 className="font-semibold text-gray-700">Trainer Name</h4>
              <p>{paymentInfo.trainerName}</p>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold text-gray-700">Selected Slot</h4>
              <p>{paymentInfo.slot}</p>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold text-gray-700">Package</h4>
              <p>{paymentInfo.package}</p>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold text-gray-700">Price</h4>
              <p className="text-2xl font-bold text-orange-600">
                {paymentInfo.price}
              </p>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="btn bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              Proceed to Payment
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
