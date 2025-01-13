import React from "react";
import image from "../../assets/register.jpg";
import Container from "../../components/Container";
import Button from "../../components/shared/Button/Button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { updateUserProfile, signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Successfully Logged In");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <Helmet>
        <title>FitVerse | Register</title>
      </Helmet>
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center my-10  ">
          {/* Left side with image */}
          <div
            className="relative bg-cover bg-center w-full md:w-1/2 h-[600px]"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`,
            }}
          >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-6xl font-bold">
                {" "}
                <span className="text-orange-500">Register</span> Here!
              </h2>
            </div>
          </div>

          {/* Right side with form */}
          <div className="w-full md:w-1/2 h-[600px] bg-gray-100 p-10">
            <form className="space-y-6">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered rounded-none"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered rounded-none"
                  required
                />
              </div>

              {/* Image */}
              <div className="form-control">
                {/* <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label> */}
                <input
                  required
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  className="input input-bordered rounded-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-orange-500 w-full rounded-none py-3 text-white"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mt-10 flex flex-col items-center justify-center">
              <div className="mx-auto -mt-5">
                <button
                  onClick={handleGoogleSignIn}
                  className="flex justify-arround items-center gap-4 bg-gray-100 btn"
                >
                  <FcGoogle />
                  <span className="font-semibold">Login with Google</span>
                </button>
              </div>

              <p className="text-center ">
                Already have an account? Please{" "}
                <Link className="text-red-500" to="/signIn">
                  Login
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
