import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../api/axios";

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
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in user from backend
  const fetchProfile = async (token: string) => {
    try {
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const loggedInUser = response.data.data;

      localStorage.setItem(
        "medicare-user",
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);

      return true;
    } catch (error) {
      localStorage.removeItem("medicare-token");
      localStorage.removeItem("medicare-logged-in");
      localStorage.removeItem("medicare-user");

      setUser(null);

      return false;
    }
  };

  // Check previously logged-in user
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

  // Update user information
  const updateUser = (updatedUser: Partial<User>) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      const newUser = {
        ...currentUser,
        ...updatedUser,
      };

      localStorage.setItem(
        "medicare-user",
        JSON.stringify(newUser)
      );

      return newUser;
    });
  };

  // Logout
  const logout = async () => {
    const token = localStorage.getItem("medicare-token");

    try {
      if (token) {
        await api.post(
          "/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      // Continue clearing local authentication
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
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};