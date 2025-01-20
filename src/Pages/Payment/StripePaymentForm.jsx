import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const StripePaymentForm = ({
  paymentInfo: bookingInfo,
  selectedPackage,
  classes,
}) => {
  const { price } = bookingInfo;
  console.log(bookingInfo);
  console.log(classes);
  const totalPrice = Math.round(price * 1);
  //   console.log(typeof totalPrice);
  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setErr(error.message);
      console.log(error);
    } else {
      setErr("");
      console.log("payment method", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    } else {
      console.log("paymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        // save information in DB
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          package: selectedPackage,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data.insertedId);
        await axiosSecure.post(`/bookings/${user?.email}`, bookingInfo);
        if (classes) {
          for (const clas of classes) {
            await axiosSecure.patch(`classes/${clas._id}`);
          }
        }
        if (res.data?.insertedId) {
          toast.success("Payment Successful. 👍");
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-orange-500 mt-5 btn-sm rounded-none text-white"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>

        {err && <p className="text-red-500">{err}</p>}

        {transactionId && (
          <p className="text-blue-500">
            Payment Successful. Transaction Id -{" "}
            <span className="font-semibold">{transactionId}</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default StripePaymentForm;
