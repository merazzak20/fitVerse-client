import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Select from "react-select";
import { uploadImage } from "../../../API/utils";
import toast from "react-hot-toast";

const AddClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    availableTrainers: [], // This should match the `react-select` value structure (array of objects).
  });

  const { data: trainerop } = useQuery({
    queryKey: ["trainerop"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });

  // Map trainers to `react-select` options format
  const trainerOptions = trainerop?.map((trainer) => ({
    value: trainer._id,
    label: trainer.name,
  }));

  const handleTrainerChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      availableTrainers: selectedOptions || [], // Save the entire selected objects
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.className.value;
    const image = form.image.files[0];
    const photoURL = await uploadImage(image);
    const details = form.details.value;
    const classInfo = {
      name,
      image: photoURL,
      details,
      trainerId: formData.availableTrainers,
      booking_count: 0,
    };

    try {
      await axiosSecure.post("/classes", classInfo);
      form.reset();
      toast.success("Successfuly Add.👍");
    } catch (err) {
      toast.error(err.message);
    }
    console.log(classInfo);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Class</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Class Name */}
        <div>
          <label
            htmlFor="className"
            className="block text-lg font-medium text-gray-700"
          >
            Class Name
          </label>
          <input
            type="text"
            id="className"
            name="className"
            placeholder="Enter class name"
            className="w-full px-4 py-2 border border-gray-300 rounded-none focus:outline-none"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-2" htmlFor="profileImage">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            name="image"
            accept="image/*"
            className="file-input file-input-bordered w-full rounded-none"
          />
        </div>

        {/* Details */}
        <div>
          <label
            htmlFor="details"
            className="block text-lg font-medium text-gray-700"
          >
            Details
          </label>
          <textarea
            id="details"
            name="details"
            placeholder="Enter class details"
            className="w-full px-4 py-2 border border-gray-300 rounded-none focus:outline-none"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Trainers */}
        <div>
          <label className="block font-medium mb-2">Available Trainers</label>
          <Select
            id="trainers"
            name="trainers"
            isMulti
            options={trainerOptions}
            onChange={handleTrainerChange}
            value={formData.availableTrainers} // Pass the selected trainers as value
            className="w-full rounded-none"
            placeholder="Select available Trainers"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-orange-500 rounded-none hover:bg-orange-700 focus:outline-none "
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClasses;
