import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { RxAvatar } from "react-icons/rx";
import { json, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/userContext";

export default function MouseOverPopover(props) {
  const { authUser, isLoading } = useContext(AuthContext);
  const { name } = props;
  console.log(name);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) return <div>Loading...</div>;
    if (!authUser) navigate("/login");
  }, [authUser]);
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className="p-0 -mt-[6px]">
          <Button {...bindTrigger(popupState)}>
            <RxAvatar className="text-4xl" />
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography>
              <div className="flex flex-col  text-center ">
                <button
                  onClick={() => {
                    navigate(`/Profile/@${authUser?.name}`);
                    popupState.close();
                  }}
                  className="text-sm text-center  font-semibold text-primary hover:bg-slate-300 mt-2  p-1 px-4"
                >
                  Profile
                </button>
                <button className="text-sm text-center  font-semibold text-primary hover:bg-slate-300 p-1  px-4">
                  My Blogs
                </button>
                <button className="text-sm font-semibold text-primary hover:bg-slate-300 p-1  px-4">
                  Settings
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    navigate("/login");
                    popupState.close();
                  }}
                  className="text-sm font-semibold text-primary hover:bg-slate-300 p-1 pb-2 px-4"
                >
                  Logout
                </button>
              </div>
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
