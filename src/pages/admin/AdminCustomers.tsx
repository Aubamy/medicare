import { useEffect, useState } from "react";
import {
  Users,
  Loader2,
  RefreshCw,
  Mail,
  Phone,
} from "lucide-react";

import api from "../../api/axios";

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/users");

      setCustomers(response.data.data || []);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Failed to load customers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-6 md:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Customers
          </h1>

          <p className="text-gray-500 mt-1">
            Manage registered customers.
          </p>
        </div>

        <button
          onClick={fetchCustomers}
          disabled={loading}
          className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 px-4 py-3 rounded-xl font-semibold transition"
        >
          <RefreshCw
            size={19}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 mb-6">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2
            size={35}
            className="animate-spin text-green-600"
          />
        </div>
      ) : customers.length === 0 ? (

        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">

          <Users
            size={50}
            className="mx-auto text-gray-300"
          />

          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            No customers yet
          </h2>

          <p className="text-gray-500 mt-2">
            Registered customers will appear here.
          </p>

        </div>

      ) : (

        /* Customers Table */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b border-gray-100">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Contact
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Role
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Joined
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {customers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Customer */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-700 font-bold text-lg">
                            {customer.fullName
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {customer.fullName}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            ID: #{customer.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5">

                      <div className="space-y-2">

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={16} />
                          <span>
                            {customer.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone size={16} />
                          <span>
                            {customer.phone}
                          </span>
                        </div>

                      </div>

                    </td>

                    {/* Role */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          customer.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {customer.role}
                      </span>

                    </td>

                    {/* Joined */}
                    <td className="px-6 py-5 text-sm text-gray-500">

                      {new Date(
                        customer.createdAt
                      ).toLocaleDateString()}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminCustomers;