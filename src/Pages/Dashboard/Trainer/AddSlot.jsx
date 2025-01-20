import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/shared/Loading";
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import toast from "react-hot-toast";

const AddSlot = () => {
  const [formData, setFormData] = useState({
    availableTime: [],
    availableDay: [],
    skills: [],
  });
  const { user } = useAuth();
  console.log(user?.email);
  const axiosSecure = useAxiosSecure();
  const { data: singleTrainer, isLoading } = useQuery({
    queryKey: ["singleTrainer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainer/${user?.email}`);
      return res.data;
    },
  });

  console.log(singleTrainer);

  useEffect(() => {
    if (singleTrainer) {
      setFormData({
        availableTime: singleTrainer.availableTime || [],
        availableDay:
          singleTrainer.availableDay.map((day) => ({
            value: day,
            label: day,
          })) || [],
        skills: singleTrainer.skills || [],
      });
    }
  }, [singleTrainer]);

  if (isLoading || !singleTrainer) return <Loading></Loading>;
  const skillsOptions = ["Yoga", "Cardio", "Weightlifting", "Zumba", "Pilates"];

  const timeOptions = [
    { value: "06:00 AM - 08:00 AM", label: "06:00 AM - 08:00 AM" },
    { value: "12:00 PM - 02:00 PM", label: "12:00 PM - 02:00 PM" },
    { value: "06:00 PM - 08:00 PM", label: "06:00 PM - 08:00 PM" },
  ];
  const handleTimeChange = (selectedOptions) => {
    setFormData({
      ...formData,
      availableTime: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timeArray = formData.availableTime;
    try {
      for (const time of timeArray) {
        await axiosSecure.patch(`/trainer/${user?.email}/time`, { time });
      }
      toast.success("Successfully Add.👍");
    } catch (err) {
      toast.error(err.message);
    }
    console.log(formData.availableTime);
  };

  return (
    <div>
      <Helmet>
        <title>FitVerse | Add Slot</title>
      </Helmet>
      <div>
        <h2 className="text-3xl font-bold text-center mb-6">Add Slot</h2>
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
              defaultValue={singleTrainer?.name}
              readOnly
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
              value={singleTrainer?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed rounded-none"
            />
          </div>

          {/* years of Experience  */}
          <div>
            <label className="block font-medium mb-2" htmlFor="age">
              Experience
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              defaultValue={singleTrainer?.experience}
              readOnly
              className="input input-bordered w-full rounded-none"
              placeholder="Experience"
              min="1"
              required
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
                    checked={formData?.skills.includes(skill)}
                    // onChange={handleSkillChange}
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
              //   options={dayOptions}
              //   onChange={handleDayChange}
              value={formData.availableDay}
              isDisabled={true}
              className="w-full rounded-none"
              placeholder="Select available Days"
              components={{
                DropdownIndicator: () => null, // Removes the dropdown arrow
                IndicatorSeparator: () => null, // Removes the separator line
              }}
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

          {/* Biography */}
          <div>
            <label className="block font-medium mb-2" htmlFor="otherInfo">
              Biography
            </label>
            <textarea
              id="biography"
              name="biography"
              value={singleTrainer?.biography}
              readOnly
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSlot;
