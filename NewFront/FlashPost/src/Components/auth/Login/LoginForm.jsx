import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../../redux/userSlice";

import FormInput from "./FormInput";
import moengage from "@moengage/web-sdk";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginStart());

    try {
      const res = await toast.promise(
        axios.post("https://back-e0rl.onrender.com/api/auth/signin", {
          name,
          password,
        }),
        {
          loading: "Logging in...",
          success: "Login successful!",
          error: "Login failed.",
        }
      );

      localStorage.setItem("jwt", JSON.stringify(res.data.token));
      document.cookie = `token=${res.data.token}`;

      const token = localStorage.getItem("jwt");
      const tok = JSON.parse(token);
      const config = {
        headers: { Authorization: `Bearer ${tok}` },
      };

      axios
        .get("https://back-e0rl.onrender.com/api/auth/read", config)
        .then((res) => {
          moengage.initialize({ app_id: "PBW9V6VMZM36LC5735AYWUSI" });
          console.log(
            "User ID: " +
              res.data._id +
              " Name: " +
              res.data.name +
              " Email: " +
              res.data.email
          );
          moengage.add_unique_user_id(res.data._id).then(() => {
            console.log("User ID added");
            moengage.add_email(res.data.email);
            moengage.add_user_name(res.data.name);
          });

          moengage.track_event("login_bankai", {
            name: res.data.name,
            email: res.data.email,
            id: res.data._id,
          });

          dispatch(loginSuccess(res.data));
          toast.success("Success.");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });

      dispatch(loginSuccess(res.data));
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(loginFailure());
    }
  };

  useEffect(() => {}, []);

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
