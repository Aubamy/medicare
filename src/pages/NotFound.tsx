import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">

        {/* 404 */}
        <h1 className="text-8xl sm:text-9xl font-bold text-green-600">
          404
        </h1>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-4 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or
          may have been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

        </div>

      </div>
    </div>
  );
};

export default NotFound;