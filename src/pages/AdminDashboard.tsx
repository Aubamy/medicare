
import { useEffect, useState } from "react";
import {
  Users,
  Package,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
}

const API_URL = "http://localhost:3000/api";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("medicare-token");

        if (!token) {
          throw new Error("You are not logged in");
        }

        const response = await fetch(`${API_URL}/admin/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load dashboard"
          );
        }

        setStats(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user?.role === "admin") {
      fetchDashboard();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  // Authentication loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2
          size={35}
          className="animate-spin text-green-600"
        />
      </div>
    );
  }

  // Admin protection
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Access Denied
          </h1>

          <p className="text-gray-500 mt-2">
            You do not have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back, {user.fullName}.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2
              size={35}
              className="animate-spin text-green-600"
            />
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Users */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total Users
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalUsers}
                  </h2>
                </div>

                <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
                  <Users size={26} />
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total Products
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalProducts}
                  </h2>
                </div>

                <div className="bg-green-100 text-green-600 p-4 rounded-xl">
                  <Package size={26} />
                </div>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total Orders
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalOrders}
                  </h2>
                </div>

                <div className="bg-purple-100 text-purple-600 p-4 rounded-xl">
                  <ShoppingBag size={26} />
                </div>
              </div>
            </div>

          </div>
        ) : null}

      </main>
    </div>
  );
};

export default AdminDashboard;
