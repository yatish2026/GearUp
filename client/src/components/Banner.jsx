import React, { useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

const Banner = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleListCarClick = () => {
    if (!user) {
      setShowLoginPopup(true);
    } else {
      navigate("/owner/add-car");
    }
  };

  const handleLogin = () => {
    setShowLoginPopup(false);
    navigate("/login");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558fE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
      >
        <div className="text-white">
          <h2 className="text-3xl font-medium">Do You Own a Luxury Car?</h2>
          <p className="mt-2">Monetize your vehicle efforting by listing it on GearUp.</p>
          <p className="max-w-130">
            We take care of insurance, driver verification and secure payments -
            so you can earn passive income, stress-free.
          </p>
          <motion.button
            onClick={handleListCarClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer"
          >
            List your car
          </motion.button>
        </div>
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          src={assets.banner_car_image}
          alt="car"
          className="max-h-45 mt-10"
        />
      </motion.div>
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Login Required</h3>
            <p className="mb-6">Please login to add your car.</p>
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-primary text-white rounded-lg"
            >
              Login
            </button>
            <button
              onClick={() => setShowLoginPopup(false)}
              className="ml-4 px-6 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
