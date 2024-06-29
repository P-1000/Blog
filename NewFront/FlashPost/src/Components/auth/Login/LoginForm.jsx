import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../../redux/userSlice";
import apiService from "../../../services/authService";
import { AuthContext } from "../../../context/UserContext";
import FormInput from "./FormInput";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, setAuthUser, setToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginStart());
    try {
      const res = await toast.promise(apiService.login(name, password), {
        loading: "Logging in...",
        success: "Login successful!",
        error: "Login failed.",
      });

      console.log("Response:", res);

      if (res.token && res.user) {
        console.log("User:", res.user);
        localStorage.setItem("jwt", JSON.stringify(res.token));
        localStorage.setItem("user", JSON.stringify(res.user));
        setToken(res.token);
        setAuthUser(res.user);
        navigate("/home");
        dispatch(loginSuccess(res));
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response ? error.response.data.message : "Login failed."
      );
      dispatch(loginFailure());
    }
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput
              label="Username"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
            />
            <FormInput
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
              <div>
                <div className="mx-24 my-2">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
