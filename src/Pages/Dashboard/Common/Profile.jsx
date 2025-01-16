import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, loading } = useAuth();
  const role = "admin";
  //   const [role, isLoading] = useRole();
  //   if (isLoading && loading) return <Loading></Loading>

  console.log(user);
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-none w-full md:w-4/5 lg:w-3/5 mx-auto">
        <div className="flex flex-col items-center justify-center p-6">
          {/* Profile Image */}
          <a href="#" className="relative block mb-4">
            <img
              alt="profile"
              src={user?.photoURL}
              className="object-cover rounded-full h-32 w-32 border-4 border-white shadow-md"
            />
          </a>

          {/* Role Tag */}
          <p className="mb-2 px-4 py-2 text-xs text-white bg-orange-500 rounded-full">
            {role}
          </p>

          {/* User ID */}
          <p className="text-lg font-medium text-gray-800 mb-4">
            User ID: {user?._id}
          </p>

          {/* User Details */}
          <div className="w-full p-4 bg-gray-100 rounded-lg shadow-sm">
            <p className="mb-3">
              <span className="block text-gray-600 text-sm">Name</span>
              <span className="text-black font-semibold text-lg">
                {user?.displayName}
              </span>
            </p>

            <p className="mb-3">
              <span className="block text-gray-600 text-sm">Email</span>
              <span className="text-black font-semibold text-lg">
                {user?.email}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-4 w-full text-center">
            <button className="w-full bg-orange-500 px-6 py-3 rounded-lg text-white cursor-pointer hover:bg-orange-800 text-lg">
              Update Profile
            </button>
            <button className="w-full bg-orange-500 px-6 py-3 rounded-lg text-white cursor-pointer hover:bg-orange-800 text-lg">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
