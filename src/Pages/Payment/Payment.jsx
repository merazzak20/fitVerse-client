import React from "react";
import Container from "../../components/Container";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "./StripePaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const { user } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { slot, trainerName, selectedPackage, trainerId, classes } =
    location.state || {};
  console.log(slot, trainerName, selectedPackage);

  const { data: singlePackage, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/packages/${selectedPackage}`);
      return data;
    },
  });

  const paymentInfo = {
    slot,
    trainerName,
    trainerId,
    package: selectedPackage,
    classes,
    price: singlePackage?.price,
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
  };

  console.log(paymentInfo);

  return (
    <div className="my-14 md:px-7">
      <Helmet>
        <title>FitVerse | Payment</title>
      </Helmet>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Payment Details */}
          <div className="bg-white shadow-md p-6 rounded-lg">
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
                  ${paymentInfo.price}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center text-orange-500 mb-10">
              Payment Here
            </h2>
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                paymentInfo={paymentInfo}
                selectedPackage={selectedPackage}
              />
            </Elements>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
