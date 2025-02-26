import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FF4C4C]/80">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white italia">404</h1>
        <p className="text-2xl text-white mt-4 montserrat">
          Oops! Page Not Found
        </p>
        <p className="text-lg text-white mt-2 italia">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <button className="cursor-pointer mt-8 px-6 py-3 bg-white text-[#FF4C4C] font-semibold rounded-lg shadow-lg hover:bg-purple-50 transition duration-300 montserrat">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
