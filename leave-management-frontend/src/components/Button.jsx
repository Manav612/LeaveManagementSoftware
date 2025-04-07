import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, onClick, className, type = "button" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 bg-[#006A71] text-white rounded-lg shadow-md hover:bg-[#48A6A7] transition ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default Button;
