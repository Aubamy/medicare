
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  Loader2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import api from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.data) {
        setSuccess(
          "Account created successfully! You can now login to your account."
        );

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        const message = error.response.data.message;

        setError(
          Array.isArray(message)
            ? message.join(", ")
            : message
        );
      } else {
        setError(
          error.message || "Something went wrong"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link
          to="/"
          className="flex justify-center items-center gap-2 mb-8"
        >
          <div className="bg-green-600 text-white p-2 rounded-lg">
            <HeartPulse size={25} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Medi<span className="text-green-600">Care</span>
          </h1>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition mb-5"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create an Account
          </h2>

          <p className="text-gray-500 text-center mt-2 mb-7">
            Join MediCare and manage your health with ease.
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-lg mb-5 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle
                  size={22}
                  className="text-green-600 mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-semibold mb-1">
                    Registration Successful
                  </p>

                  <p>{success}</p>
                </div>
              </div>
            </div>
          )}

          {!success && (
            <>
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08012345678"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

              </form>

              {/* Login */}
              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </>
          )}

          {/* Login after successful registration */}
          {success && (
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                Go to Login
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Register;
