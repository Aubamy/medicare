import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  ArrowLeft,
  Pencil,
  Save,
  X,
  Loader2,
  Lock,
  KeyRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setMessage("");
    setError("");

    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setMessage("");
    setError("");

    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    setMessage("");
    setError("");

    try {
      setLoading(true);

      const response = await api.put(
        "/auth/edit-profile",
        {
          fullName: formData.fullName,
          phone: formData.phone,
        }
      );

      const updatedUser = response.data.data.user;

      updateUser(updatedUser);

      setMessage(
        response.data.message ||
          "Profile updated successfully."
      );

      setIsEditing(false);
    } catch (error: any) {
      if (error.response?.data?.message) {
        const backendMessage = error.response.data.message;

        setError(
          Array.isArray(backendMessage)
            ? backendMessage.join(", ")
            : backendMessage
        );
      } else {
        setError(
          error.message || "Failed to update profile"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordMessage("");
    setPasswordError("");

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await api.put(
        "/auth/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        }
      );

      setPasswordMessage(
        response.data.message ||
          "Password changed successfully."
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      if (error.response?.data?.message) {
        const backendMessage = error.response.data.message;

        setPasswordError(
          Array.isArray(backendMessage)
            ? backendMessage.join(", ")
            : backendMessage
        );
      } else {
        setPasswordError(
          error.message || "Failed to change password"
        );
      }
    } finally {
      setPasswordLoading(false);
    }
  };

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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <h2 className="text-xl font-bold text-gray-800">
                Account Information
              </h2>

              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-xl transition"
                >
                  <Pencil size={18} />
                  Edit Profile
                </button>
              )}

            </div>

            {/* Success Message */}
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
                {error}
              </div>
            )}

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

                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="font-semibold text-gray-800">
                    {user?.fullName || "Not available"}
                  </p>
                )}

              </div>

              {/* Email */}
              <div className="border border-gray-100 rounded-xl p-5">

                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-100 text-gray-500 p-2 rounded-lg">
                    <Mail size={20} />
                  </div>

                  <span className="text-sm text-gray-500">
                    Email Address
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 pr-10 text-gray-500 cursor-not-allowed outline-none"
                  />

                  <Lock
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Email address cannot be changed.
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

                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="font-semibold text-gray-800">
                    {user?.phone || "Not available"}
                  </p>
                )}

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

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 rounded-xl transition"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-red-400 hover:text-red-500 text-gray-700 font-medium py-3 rounded-xl transition"
                >
                  <X size={18} />
                  Cancel
                </button>

              </div>
            )}

            {/* Change Password */}
            <div className="mt-10 pt-8 border-t">

              <div className="flex items-center gap-3 mb-5">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                  <KeyRound size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Change Password
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update your password to keep your account secure.
                  </p>
                </div>
              </div>

              {/* Password Success */}
              {passwordMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-5 text-sm">
                  {passwordMessage}
                </div>
              )}

              {/* Password Error */}
              {passwordError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm">
                  {passwordError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5">

                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>

                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your current password"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your new password"
                    minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm your new password"
                    minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

              </div>

              <button
                onClick={handleChangePassword}
                disabled={passwordLoading}
                className="w-full sm:w-auto mt-5 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium px-6 py-3 rounded-xl transition"
              >
                {passwordLoading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Changing Password...
                  </>
                ) : (
                  <>
                    <KeyRound size={18} />
                    Change Password
                  </>
                )}
              </button>

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