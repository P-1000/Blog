import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="col-span-3">
      <Link to="/Home">
        <img
          src="../Images/logo-standard.png"
          alt="logo"
          className="h-6 lg:h-8 mt-[5px] hidden lg:block"
        />
        <img
          src="../Images/favicon.png"
          alt="logo"
          className="h-12 mt-[7px] block lg:hidden"
        />
      </Link>
    </div>
  );
};

export default Logo;
