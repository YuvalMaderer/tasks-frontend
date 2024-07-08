import api from "@/services/api.service";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  const [token, setToken] = useLocalStorage("token", null);

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/auth/loggedInUser");
        setLoggedInUser(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (error.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [token]);

  function logout() {
    setToken(null);
    setLoggedInUser(null);
  }

  async function login(userData) {
    try {
      const response = await api.post("/auth/login", userData);
      setToken(response.data.token);
      return response.data; // Return data for further processing
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }

  async function register(userData) {
    try {
      await api.post("/auth/register", userData);
    } catch (error) {
      console.error("Error registering:", error);
      throw error; // Re-throw the error if needed
    }
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
