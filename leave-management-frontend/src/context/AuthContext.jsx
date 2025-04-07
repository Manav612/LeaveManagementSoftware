// import React, { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const register = async (name, email, password, role, department) => {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
//       { name, email, password, role, department }
//     );
//     console.log("--- register  --", data);

//     localStorage.setItem("token", data.token);
//     setUser(data);
//     navigate("/dashboard");
//   };

//   const login = async (email, password) => {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
//       { email, password }
//     );
//     console.log("--- login  --", data);

//     localStorage.setItem("token", data.token);
//     setUser(data);
//     navigate("/dashboard");
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Auto-fetch user data if token exists
  useEffect(() => {
    if (token) {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        localStorage.removeItem("user"); // Clear corrupted data
      }
    }
  }, [token]);

  // Login Function
  const login = async (userData) => {
    console.log("====   data  login  ====", userData);

    setLoading(true);
    try {
      const data = await loginUser(userData);
      setUser(data);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register Function
  const register = async (userData) => {
    console.log("====   data  register  ====", userData);

    setLoading(true);
    try {
      const data = await registerUser(userData);
      setUser(data);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = () => useContext(AuthContext);
