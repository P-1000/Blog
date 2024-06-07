// Login.js
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import { Toaster } from "react-hot-toast";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 shadow-lg">
      <LoginForm />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;
