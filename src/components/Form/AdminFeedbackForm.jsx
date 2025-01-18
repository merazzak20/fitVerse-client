import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminFeedbackForm = ({ email, id }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const feedback = form.feedback.value;
    const feedInfo = {
      email,
      feedback,
      requstId: id,
      status: "rejected",
    };
    try {
      await axiosSecure.delete(`/new-trainrs/${id}`);
      await axiosSecure.post(`/admin-feedbacks`, feedInfo);
      toast.success("Delete Successful. ❤️");
      form.reset();
      navigate("/dashboard/applliedTrainer");
      console.log(feedInfo);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="form-control">
          <div className="label">
            <span className="label-text text-xl mb-2 font-semibold">
              Admin's Valuable Feedback
            </span>
          </div>
          <textarea
            name="feedback"
            className="textarea textarea-bordered rounded-none h-24"
            placeholder="Feedback"
          ></textarea>
        </label>
        <div className="flex justify-between items-center">
          <div>
            <button className="btn bg-orange-500 rounded-none border-none btn-sm mt-4 text-white">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminFeedbackForm;
