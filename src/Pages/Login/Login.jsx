import React from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { saveUser } from "../../API/utils";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import image from "../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  //   sign user
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    try {
      const data = await signIn(email, password);
      console.log(data);
      navigate("/");
      toast.success("Successfully Logged In");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Login with Google
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      // save to database
      await saveUser(data.user);
      console.log(data);
      navigate("/");
      toast.success("Successfully Logged In");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <Helmet>
        <title>FitVerse | Login</title>
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
                <span className="text-orange-500">Login</span> Here!
              </h2>
            </div>
          </div>

          {/* Right side with form */}
          <div className="w-full md:w-1/2 h-[600px] bg-gray-100 p-10 flex flex-col items-center justify-center">
            <div className="w-full">
              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input w-full rounded-none"
                    required
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
                    className="input  rounded-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="bg-orange-500 w-full rounded-none py-3 text-white"
                  >
                    Login
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
                  <Link className="text-red-500" to="/register">
                    Register
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
