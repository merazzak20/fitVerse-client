import React from "react";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const AddForum = () => {
  const [role] = useRole();
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const tags = form.tags.value.split(",").map((tag) => tag.trim());
    const forumInfo = {
      userRole: role,
      posterInfo: { name: user?.displayName, image: user?.photoURL },
      title,
      description,
      tags,
    };
    try {
      await axiosSecure.post("/forums", forumInfo);
      toast.success("Forum post successful.👍");
      form.reset();
    } catch (err) {
      toast.error(err.message);
    }
    console.log(forumInfo);
  };
  return (
    <div className="px-10">
      <h2 className="text-4xl text-center font-bold my-10">Add Forum</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Forum Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Forum Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            // value={formData.title}
            // onChange={handleInputChange}
            className="input input-bordered w-full rounded-none"
            placeholder="Enter forum title"
            required
          />
        </div>

        {/* Forum Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-2">
            Forum Description
          </label>
          <textarea
            id="description"
            name="description"
            // value={formData.description}
            // onChange={handleInputChange}
            className="textarea textarea-bordered w-full rounded-none"
            rows="4"
            placeholder="Enter forum description"
            required
          ></textarea>
        </div>

        {/* Forum Tags */}
        <div>
          <label htmlFor="tags" className="block font-medium mb-2">
            Tags (Comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            // value={formData.tags.join(", ")}
            // onChange={handleTagsChange}
            className="input input-bordered w-full rounded-none"
            placeholder="e.g., React, JavaScript, Web Development"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn bg-orange-500 btn-block px-6 py-2 rounded-none text-white"
          >
            Add Forum
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForum;
