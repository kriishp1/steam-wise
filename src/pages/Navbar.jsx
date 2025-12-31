import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-xl flex justify-between items-center px-6 py-4"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <motion.div
        className="font-medium text-white/90 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="left-px">
          <Link
            to="/homepage"
            className="text-white hover:text-blue-400 transition-colors duration-300"
            style={{ textDecoration: "none" }}
          >
            Steamwise
          </Link>
        </div>
      </motion.div>

      <div className="flex items-center justify-center gap-10 w-full">
        <motion.div
          className="font-medium text-white/90 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Link
            to="/homepage"
            className="text-white hover:text-blue-400 transition-colors duration-300"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
        </motion.div>

        <motion.div
          className="font-medium text-white/90 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Link
            to="/about"
            className="text-white hover:text-blue-400 transition-colors duration-300"
            style={{ textDecoration: "none" }}
          >
            About
          </Link>
        </motion.div>
      </div>

      <div className="flex whitespace-nowrap gap-5">
        <motion.button
          className=" font-medium text-white/90 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Link
            to="/signup"
            className="text-white hover:text-blue-400 transition-colors duration-300"
            style={{ textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </motion.button>

        <motion.div
          className=" font-medium text-white/90 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Link
            to="/login"
            className="text-white hover:text-blue-400 transition-colors duration-300"
            style={{ textDecoration: "none" }}
          >
            Sign In
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Navbar;
