import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// User Registration
export const registerUser = async (userData) => {
  console.log("-----   userdata   -----", userData);

  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  console.log("-- regis -->", response.data);

  return response.data;
};

// User Login
export const loginUser = async (userData) => {
  console.log("-----   userdata   -----", userData);

  const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
  console.log("-- login -->", response.data);

  return response.data;
};
