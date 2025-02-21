import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import animation from "../../assets/lotties/register.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

// IMAGE HOSTING KEY
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// IMAGE HOSTING API
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    user,
    signInWithGoogle,
    setUser,
    updateUser,
    createUser,
    registerLoading,
    setRegisterLoading,
    googleLoading,
    setGoogleLoading,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = (data) => {
    setRegisterLoading(true);
    console.log(data);
    const name = data.name;
    const email = data.email;
    const password = data.confirmPassword;
    const imageFile = { image: selectedFile };

    // create user
    createUser(email, password).then(async (result) => {
      const registeredUser = result?.user;
      setUser(registeredUser);
      toast.success("Successfully Registered!");

      // sent image to imagebb for hosting
      const res = await axiosPublic.post(img_hosting_api, imageFile, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });

      //   get hosted image link from imgbb
      const image = res?.data.data.display_url;

      //   updating user
      updateUser({ displayName: name, photoURL: image });

      // user information to be added to database
      const userInfo = {
        name: name,
        email: email,
        image: image,
      };

      // user add to the database
      const response = await axiosPublic.post("/users", userInfo);
      if (response?.data.insertedId) {
        setRegisterLoading(false);
        navigate("/");
      }
    });
  };

  //   handle google login
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);
    if (file) {
      setSelectedFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  if (user?.email) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FF6767]/50 to-[#FF4C4C]/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-6xl w-full flex items-center gap-24">
        <div className="w-full hidden md:block">
          <Lottie animationData={animation} loop={true} />
        </div>
        <div className="w-full">
          <h2 className="text-3xl font-bold text-[#FF6767] mb-8 italia">
            Register
          </h2>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 montserrat">
                Profile Picture
              </label>
              <div className="flex items-center justify-center">
                <label
                  htmlFor="profilePicture"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Upload Image
                      </span>
                    )}
                  </div>
                  <input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} // Attach the onChange event
                    className="hidden"
                  />
                </label>
              </div>
              {!selectedFile && errors.profilePicture && (
                <p className="text-red-500 text-sm mt-1 montserrat">
                  Profile picture is required
                </p>
              )}
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 montserrat">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPerson className="text-gray-500" size={20} />
                </div>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6767] focus:border-transparent montserrat"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 montserrat">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                <p className="text-red-500 text-sm mt-1 montserrat">
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
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: {
                      hasUppercase: (value) =>
                        /[A-Z]/.test(value) ||
                        "At least one uppercase letter is required",
                      hasNumber: (value) =>
                        /[0-9]/.test(value) ||
                        "At least one number is required",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6767] focus:border-transparent montserrat"
                />
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
                <p className="text-red-500 text-sm mt-1 montserrat">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 montserrat">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLock className="text-gray-500" size={20} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6767] focus:border-transparent montserrat"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff className="text-gray-500" size={20} />
                  ) : (
                    <MdVisibility className="text-gray-500" size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 montserrat">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#FF6767] text-white py-2 rounded-lg font-semibold hover:bg-[#FF4C4C] transition duration-300 montserrat cursor-pointer"
            >
              {registerLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 montserrat">OR</span>
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

          {/* Login Link */}
          <p className="text-gray-600 mt-6 montserrat">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF6767] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
