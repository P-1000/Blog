import axios from "axios";
import { toast } from "react-hot-toast";
// import { API_BASE_URL } from "../utils/globals";

const API_BASE_URL = "http://localhost:3000";

const AuthService = {
  register: async (formData) => {
    try {
      const promise = axios.post(`${API_BASE_URL}/auth/register`, formData);
      toast.promise(promise, {
        loading: "Creating account...",
        success: "Account created successfully!",
        error: (error) => `Registration failed: ${error}`,
      });
      const response = await promise;
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },
  login: async (name , password) => {
    const formData = {
      identifier: name,
      password,
    }
    try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },
};

export const { register, login } = AuthService;

export default AuthService;
