"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  const fetchUser = useCallback(async (silent = false) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axiosInstance.get("/auth/me");
      const userData = res.data.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching user:", err.response?.status || err.message);
      }
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    } finally {
      if (!silent) {
        setLoading(false);
        setInitialized(true);
      }
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setLoading(false);

          const res = await axiosInstance.get("/auth/me");
          const userData = res.data.data;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } catch {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        } finally {
          setInitialized(true);
        }
      } else {
        setInitialized(true);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (formData) => {
    const res = await axiosInstance.post("/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    const { token, ...userData } = res.data.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return res.data;
  };

  const login = async (formData) => {
    const res = await axiosInstance.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    const { token, ...userData } = res.data.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    const pendingBooking = sessionStorage.getItem("pendingBooking");
    if (pendingBooking) {
      try {
        const { flight } = JSON.parse(pendingBooking);
        sessionStorage.removeItem("pendingBooking");

        const bookingRes = await axiosInstance.post("/bookings/draft", {
          offer: flight,
        });

        const bookingId = bookingRes?.data?.data?._id;
        if (bookingId) {
          router.push(`/booking/${bookingId}`);
          return res.data;
        }
      } catch (bookingErr) {
        console.error("Error creating booking after login:", bookingErr);
      }
    }

    const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
    if (redirectUrl) {
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirectUrl);
    } else {
      router.push("/");
    }

    return res.data;
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading || !initialized,
        login,
        register,
        logout,
        fetchUser,
        isAuthenticated: !!user,
        initialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
