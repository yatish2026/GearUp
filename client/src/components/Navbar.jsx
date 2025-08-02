import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuLinks } from "../assets/menuLink";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!searchTerm.trim()) {
        toast.error("Enter a search term");
        return;
      }

      try {
        // Navigate to search results page
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        setSearchTerm(""); // clear input
        setOpen(false);
      } catch (error) {
        toast.error("Search failed");
      }
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-borderColor relative transition-all
        bg-black text-[#FFD700]`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="logo"
          style={{ width: "4cm", height: "4cm" }}
        />
      </Link>

      {/* Nav Menu */}
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 transform max-sm:transition-transform z-50
        ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
        bg-black text-[#FFD700]`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path} onClick={() => setOpen(false)} className="hover:text-white transition">
            {link.name}
          </Link>
        ))}

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-400 text-white"
            placeholder="Search products"
          />
          <img
            src={assets.search_icon}
            alt="search"
            className="cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        {/* Role switch & login/logout */}
        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button onClick={() => (isOwner ? navigate("/owner") : changeRole())} className="cursor-pointer hover:text-white transition">
            {isOwner ? "Dashboard" : "List cars"}
          </button>
          <button
            onClick={() => {
              if (user) logout();
              else setShowLogin(true);
              setOpen(false);
            }}
            className="cursor-pointer px-8 py-2 bg-[#FFD700] hover:bg-[#e6c200] transition-all text-black font-semibold rounded-lg"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="sm:hidden cursor-pointer" aria-label="Menu" onClick={() => setOpen(!open)}>
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.div>
  );
};

export default Navbar;
