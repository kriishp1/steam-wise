import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3002/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || data.error || "Email is incorrect");
        return;
      }

      // Always show the message from the server (whether success or not)
      setSuccess(data.success || false);
      setMessage(
        data.message || "Email has been sent to reset password, Check Spam"
      );
      setEmail("");
    } catch (error) {
      setMessage("Server not reachable");
    }
  };

  return (
    <motion.div
      className="h-screen flex justify-center lg:justify-start lg:pl-180 text-white overflow-hidden"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="bg-white/10 backdrop-blur-md mb-20 p-6 lg:p-8 w-full max-w-md lg:w-150 rounded-2xl shadow-xl self-center h-fit">
        <h2 className="text-3xl text-blue-400">Forgot Password</h2>
        <p className="mt-5 w-full">
          {" "}
          Enter email to set new password, or go{" "}
          <Link to="/homepage" className="text-blue-400 underline">
            {" "}
            home
          </Link>
        </p>
        <br></br>
        <form onSubmit={handleSubmit}>
          <p>Email*</p>
          <input
            className="block mb-1 mt-1 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded p-3 w-full focus:bg-white/30 focus:border-blue-400 focus:outline-none"
            type="email"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {message && <p className="text-red-400 text-sm mt-2">{message}</p>}
          <button className="bg-blue-500 p-2 rounded text-white/90 hover:bg-blue-600 transition-colors duration-200 cursor-pointer mt-4">
            Reset Password
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ForgotPassword;
