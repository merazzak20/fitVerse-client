import React, { useState } from "react";
import Container from "../../components/Container";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import { uploadImage } from "../../API/utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BeATrainerPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    availableTime: [],
    availableTime: [],
    skills: [],
  });

  const skillsOptions = ["Yoga", "Cardio", "Weightlifting", "Zumba", "Pilates"];

  const dayOptions = [
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
  ];
  const timeOptions = [
    { value: "06:00 AM - 08:00 AM", label: "06:00 AM - 08:00 AM" },
    { value: "12:00 PM - 02:00 PM", label: "12:00 PM - 02:00 PM" },
    { value: "06:00 PM - 08:00 PM", label: "06:00 PM - 08:00 PM" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "skills") {
      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTimeChange = (selectedOptions) => {
    setFormData({
      ...formData,
      availableTime: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handleDayChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      availableDay: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = user?.email;
    const image = form.image.files[0];

    const photoURL = await uploadImage(image);
    const facebook = form.fb.value;
    const twitter = form.twitter.value;
    const linkedIn = form.linkedIn.value;
    const biography = form.biography.value;

    const skills = Array.from(form.skills)
      .filter((checkbox) => checkbox.checked) // Filter only checked ones
      .map((checkbox) => checkbox.value);

    const availableTime = formData.availableTime || [];

    const newTrainer = {
      name,
      email,
      image: photoURL,
      skills,
      availableDay: formData.availableDay,
      availableTime,
      socialIcons: { facebook, twitter, linkedIn },
      biography,
      status: "pending",
    };
    console.log(newTrainer);
    try {
      await axiosSecure.post(`/new-trainrs/${email}`, newTrainer);
      toast.success("Request Successful.👌");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="my-14">
      <Helmet>
        <title>FitVerse | Be A Trainer</title>
      </Helmet>
      <Container>
        <h2 className="text-3xl font-bold text-center mb-6">
          Apply to Be a Trainer
        </h2>
        <form
          className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              defaultValue={user?.displayName}
              className="input input-bordered w-full rounded-none"
              placeholder="Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed rounded-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium mb-2" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="input input-bordered w-full rounded-none"
              placeholder="Age"
              min="18"
              required
            />
          </div>

          {/* Profile Image */}
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

          {/* Skills */}
          <div>
            <label className="block font-medium mb-2">Skills</label>
            <div className="flex flex-wrap gap-4">
              {skillsOptions.map((skill) => (
                <label key={skill} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    onChange={handleInputChange}
                    className="checkbox checkbox-warning rounded-none"
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Available Day */}
          <div>
            <label className="block font-medium mb-2">Available Days</label>
            <Select
              id="availableDay"
              name="availableDay"
              isMulti
              options={dayOptions}
              onChange={handleDayChange}
              value={dayOptions.find(
                (option) => option.value === formData.availableDay
              )}
              className="w-full rounded-none"
              placeholder="Select available Days"
            />
          </div>

          {/* Available Time */}
          <div>
            <label className="block font-medium mb-2">
              Available Time in a Day
            </label>
            <Select
              id="availableTime"
              name="availableTime"
              isMulti
              options={timeOptions}
              onChange={handleTimeChange}
              value={timeOptions.find(
                (option) => option.value === formData.availableTime
              )}
              className="w-full rounded-none"
              placeholder="Select available time"
            />
          </div>

          {/* Facebook */}
          <div>
            <label className="block font-medium mb-2">Facebook Link</label>
            <input
              type="url"
              id="fb"
              name="fb"
              className="input input-bordered w-full rounded-none"
              placeholder="Facebook link"
              required
            />
          </div>
          {/* Twitter */}
          <div>
            <label className="block font-medium mb-2">Twitter Link</label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              className="input input-bordered w-full rounded-none"
              placeholder="Twitter link"
              required
            />
          </div>
          {/* LinkedIn */}
          <div>
            <label className="block font-medium mb-2">LinkedIn Link</label>
            <input
              type="url"
              id="linkedIn"
              name="linkedIn"
              className="input input-bordered w-full rounded-none"
              placeholder="Twitter link"
              required
            />
          </div>

          {/* Biography */}
          <div>
            <label className="block font-medium mb-2" htmlFor="otherInfo">
              Biography
            </label>
            <textarea
              id="biography"
              name="biography"
              className="textarea textarea-bordered w-full rounded-none"
              rows="4"
              placeholder="Additional details about yourself..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-orange-500 btn-block px-6 py-2 rounded-none"
            >
              Apply Now
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default BeATrainerPage;
