/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <p className="text-2xl text-white mt-4">Oops! Page Not Found</p>
        <p className="text-lg text-white mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-50 transition duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;