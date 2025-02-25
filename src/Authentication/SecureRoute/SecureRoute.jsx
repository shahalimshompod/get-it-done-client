/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import { Navigate, useLocation } from "react-router-dom";

const SecureRoute = ({ children }) => {
  const { user, userLoading } = useContext(AuthContext);
  const location = useLocation();

  if (userLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl 2xl:text-3xl font-black italia mb-4">
            Getit<span className="text-[#FF6767]">done</span>
          </p>
          <p className="montserrat font-semibold text-xl text-[#FF6767]">
            Loading...
          </p>
        </div>
        <div>
          <progress className="progress progress-error w-56"></progress>
        </div>
      </div>
    );
  }

  // checking if user exist
  if (user) {
    return children;
  }

  return (
    <div>
      <Navigate state={location.pathname} to="/login"></Navigate>
    </div>
  );
};

export default SecureRoute;
