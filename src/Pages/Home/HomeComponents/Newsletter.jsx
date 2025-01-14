import React from "react";
import Container from "../../../components/Container";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();
  const handleSubscriber = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const subscriber = { name, email };
    console.log(subscriber);
    try {
      await axiosPublic.post(`subscribes/${email}`, subscriber);
      toast.success("Subscribe Successful👍");
      form.reset();
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="bg-zinc-800 py-10">
      <Container>
        <div className=" mx-auto text-center flex items-center justify-evenly">
          <div className="w-full">
            <h2 className="text-white text-2xl font-semibold mb-4">
              Subscribe to our Newsletter
            </h2>
            <p className="text-gray-400 mb-6">
              Stay updated with the latest news and offers.
            </p>
          </div>
          <form onSubmit={handleSubscriber} className="space-y-4 w-full">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-none border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 "
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-none border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 "
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-none bg-orange-500 text-white font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 "
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Newsletter;
