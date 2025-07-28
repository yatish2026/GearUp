import React from "react";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";

const NavbarOwner = () => {
  const { user } = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 bg-black text-yellow-400 border-b border-borderColor relative transition-all">
      <Link to={"/"}>
        <img
          src={assets.logo}
          alt="logo"
          style={{ width: "4cm", height: "4cm" }}
        />
      </Link>
      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
