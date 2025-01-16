import React, { useState } from "react";
import Container from "../../components/Container";
import useAuth from "../../hooks/useAuth";

const BeATrainerPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email,
    age: "",
    profileImage: null,
    skills: [],
    availableDays: [],
    availableTime: "",
    otherInfo: "",
  });

  const skillsOptions = ["Yoga", "Cardio", "Weightlifting", "Zumba", "Pilates"];
  const daysOptions = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "skills") {
      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value),
      }));
    } else if (type === "checkbox" && name === "availableDays") {
      setFormData((prev) => ({
        ...prev,
        availableDays: checked
          ? [...prev.availableDays, value]
          : prev.availableDays.filter((day) => day !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Handle form submission logic here (e.g., send data to an API)
  };

  return (
    <div className="my-14">
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
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="input input-bordered w-full rounded-none"
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
              value={formData.email}
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
              value={formData.age}
              onChange={handleInputChange}
              className="input input-bordered w-full rounded-none"
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
              name="profileImage"
              accept="image/*"
              onChange={handleInputChange}
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

          {/* Available Days */}
          <div>
            <label className="block font-medium mb-2">Available Days</label>
            <div className="flex flex-wrap gap-4">
              {daysOptions.map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="availableDays"
                    value={day}
                    onChange={handleInputChange}
                    className="checkbox checkbox-accent rounded-none"
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Available Time */}
          <div>
            <label className="block font-medium mb-2" htmlFor="availableTime">
              Available Time in a Day
            </label>
            <input
              type="time"
              id="availableTime"
              name="availableTime"
              value={formData.availableTime}
              onChange={handleInputChange}
              className="input input-bordered w-full rounded-none"
              required
            />
          </div>

          {/* Other Info */}
          <div>
            <label className="block font-medium mb-2" htmlFor="otherInfo">
              Other Info
            </label>
            <textarea
              id="otherInfo"
              name="otherInfo"
              value={formData.otherInfo}
              onChange={handleInputChange}
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
