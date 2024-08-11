import React from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` },
  };
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser) {
    navigate("/home");
  }



  return (
    <>
      <div>
        <Login />
      </div>
    </>
  );
}

export default Auth;
