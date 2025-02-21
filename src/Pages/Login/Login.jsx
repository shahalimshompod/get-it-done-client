/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import animation from "../../assets/lotties/login.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    user,
    setUser,
    signInWithGoogle,
    loginUser,
    loginLoading,
    setLoginLoading,
    googleLoading,
    setGoogleLoading,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(loginLoading);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    setLoginLoading(true);
    console.log(data);
    const email = data.email;
    const password = data.password;

    loginUser(email, password)
      .then((result) => {
        const user = result?.user;
        setUser(user);
        console.log(user);
        toast.success("Successfully Logged in!");
        navigate("/");
        setLoginLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // google sign in
  const googleLogin = () => {
    setGoogleLoading(true);
    signInWithGoogle()
      .then(async (result) => {
        const newUser = result?.user;
        if (newUser) {
          setUser(newUser);
          toast.success("Successfully Logged in!");
          navigate("/");

          // collect user data
          const userInfo = {
            name: newUser?.displayName,
            email: newUser?.email,
            image: newUser?.photoURL,
          };

          // sent user data to database
          const response = await axiosPublic.post("/users", userInfo);
          if (response?.data.insertedId) {
            navigate("/");
            setGoogleLoading(false);
          }
          // TODO- STORE THE USER TO DATABASE
        }
      })
      .catch((err) => console.error("error sign in with google -->", err));
  };

  if (user?.email) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FF6767]/50 to-[#FF4C4C]/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-5xl w-full flex items-center">
        {/* form */}
        <div className="w-full">
          <h2 className="text-3xl font-bold text-[#FF6767] mb-8 italia">
            Login
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 montserrat">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className="text-gray-500" size={20} />
                </div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6767] focus:border-transparent montserrat"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 montserrat">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLock className="text-gray-500" size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password type
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6767] focus:border-transparent montserrat"
                />
                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <MdVisibilityOff className="text-gray-500" size={20} />
                  ) : (
                    <MdVisibility className="text-gray-500" size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#FF6767] text-white py-2 rounded-lg font-semibold hover:bg-[#FF4C4C] transition duration-300 montserrat cursor-pointer"
            >
              {loginLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Continue with Google Button */}
          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition duration-300 montserrat cursor-pointer"
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <>
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-gray-600 mt-6 flex items-center gap-2 montserrat">
            <p>Don't have an account?</p>
            <Link to="/register" className="text-[#FF6767] hover:underline">
              Register
            </Link>
          </div>
        </div>
        <div className="w-full hidden md:block">
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;
