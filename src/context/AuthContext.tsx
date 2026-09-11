
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:3000/api";

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Get the real logged-in user from the backend
  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load profile");
      }

      const data = await response.json();

      const loggedInUser = data.user || data;

      localStorage.setItem(
        "medicare-user",
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);

      return true;
    } catch (error) {
      console.error("Profile error:", error);

      localStorage.removeItem("medicare-token");
      localStorage.removeItem("medicare-logged-in");
      localStorage.removeItem("medicare-user");

      setUser(null);

      return false;
    }
  };

  // Check if a user was previously logged in
  useEffect(() => {
    const token = localStorage.getItem("medicare-token");

    if (token) {
      fetchProfile(token).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  // Login
  const login = async (token: string) => {
    localStorage.setItem("medicare-token", token);
    localStorage.setItem("medicare-logged-in", "true");

    return await fetchProfile(token);
  };

  // Logout
  const logout = async () => {
    const token = localStorage.getItem("medicare-token");

    try {
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("medicare-token");
    localStorage.removeItem("medicare-logged-in");
    localStorage.removeItem("medicare-user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

