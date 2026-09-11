
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-6"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="bg-green-600 px-6 sm:px-10 py-10 text-white">

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              {/* Avatar */}
              <div className="w-20 h-20 bg-white text-green-600 rounded-full flex items-center justify-center">
                <User size={40} />
              </div>

              <div>
                <p className="text-green-100 text-sm mb-1">
                  Welcome back
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold">
                  {user?.fullName || "User"}
                </h1>

                <p className="text-green-100 mt-1">
                  {user?.email || "No email available"}
                </p>
              </div>

            </div>
          </div>

          {/* Account Information */}
          <div className="p-6 sm:p-10">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Account Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Full Name */}
              <div className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <User size={20} />
                  </div>

                  <span className="text-sm text-gray-500">
                    Full Name
                  </span>
                </div>

                <p className="font-semibold text-gray-800">
                  {user?.fullName || "Not available"}
                </p>
              </div>

              {/* Email */}
              <div className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <Mail size={20} />
                  </div>

                  <span className="text-sm text-gray-500">
                    Email Address
                  </span>
                </div>

                <p className="font-semibold text-gray-800 break-all">
                  {user?.email || "Not available"}
                </p>
              </div>

              {/* Phone */}
              <div className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <Phone size={20} />
                  </div>

                  <span className="text-sm text-gray-500">
                    Phone Number
                  </span>
                </div>

                <p className="font-semibold text-gray-800">
                  {user?.phone || "Not available"}
                </p>
              </div>

              {/* Account Type */}
              <div className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <ShieldCheck size={20} />
                  </div>

                  <span className="text-sm text-gray-500">
                    Account Type
                  </span>
                </div>

                <p className="font-semibold text-gray-800 capitalize">
                  {user?.role || "Customer"}
                </p>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="mt-10 pt-8 border-t">

              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Quick Actions
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">

                <Link
                  to="/products"
                  className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition"
                >
                  Browse Products
                </Link>

                <Link
                  to="/cart"
                  className="flex-1 text-center border border-gray-200 hover:border-green-600 hover:text-green-600 text-gray-700 font-medium py-3 rounded-xl transition"
                >
                  View Cart
                </Link>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
