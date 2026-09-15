
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  LogOut,
  HeartPulse,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Customers",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Testimonials",
      path: "/admin/testimonials",
      icon: MessageSquare,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <div className="bg-green-600 text-white p-2 rounded-lg">
            <HeartPulse size={22} />
          </div>

          <h1 className="text-xl font-bold ml-3">
            Medi<span className="text-green-600">Care</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                  }`
                }
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Admin Info + Logout */}
        <div className="border-t border-gray-100 p-4">
          <div className="px-3 mb-4">
            <p className="text-sm font-semibold text-gray-800">
              {user?.fullName}
            </p>

            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>

            <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Administrator
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <HeartPulse size={20} />
            </div>

            <span className="font-bold">
              Medi<span className="text-green-600">Care</span>
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="text-red-500"
          >
            <LogOut size={21} />
          </button>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
