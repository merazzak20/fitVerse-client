import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const FeedbackForm = ({ user }) => {
  const axiosSecure = useAxiosSecure();
  const handleFeedback = async (e) => {
    e.preventDefault();
    const form = e.target;
    const feedback = form.feedback.value;
    const rating = form["rating-2"].value; // Get the selected rating value
    console.log("Feedback:", feedback);
    console.log("Rating:", rating);
    const feedbackInfo = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      star_rating: rating,
      feedback,
    };

    await axiosSecure.post(`/reviews`, feedbackInfo);
    toast.success("Thanks for yor valuable feedback.❤️");
    form.reset();
  };
  return (
    <div>
      <form onSubmit={handleFeedback}>
        <label className="form-control">
          <div className="label">
            <span className="label-text text-xl mb-2 font-semibold">
              Your Valuable Feedback
            </span>
          </div>
          <textarea
            name="feedback"
            className="textarea textarea-bordered rounded-none h-24"
            placeholder="Feedback"
          ></textarea>
        </label>
        <div className="flex justify-between items-center">
          <div className="rating mt-3">
            <input
              type="radio"
              name="rating-2"
              value="1"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              value="2"
              className="mask mask-star-2 bg-orange-400"
              defaultChecked
            />
            <input
              type="radio"
              name="rating-2"
              value="3"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              value="4"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              value="5"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
          <div>
            <button className="btn bg-orange-500 rounded-none border-none btn-sm mt-4 text-white">
              Feedback
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
