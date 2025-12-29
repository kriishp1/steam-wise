import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import React from "react";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const validatePassword = (newPassword) => {
    // Check length
    if (newPassword < 6) {
      return "Password must be at least 6 characters";
    }

    // Check for at least one letter
    if (!/[a-zA-Z]/.test(newPassword)) {
      return "Password must include at least one letter";
    }

    // Check for at least one number
    if (!/[0-9]/.test(newPassword)) {
      return "Password must include at least one number";
    }

    // Check for at least one special symbol
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      return "Password must include at least one symbol (!@#$%^&*...)";
    }

    return null; // No errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setMessage(passwordError);
      return;
    }

    try {
      if (newPassword.length < 6) {
        setMessage("Password must be at least 6 characters");
        return;
      }

      if (newPassword != confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_RESET_PASSWORD_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error);
        return;
      }
      setSuccess(true);
      setMessage("Password reset successful!");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Server not reachable");
    }
  };

  if (!token) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl">
          <h2 className="text-2xl text-red-400">Invalid Reset Link</h2>
          <p className="mt-4">This link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="h-screen flex justify-center lg:justify-start lg:pl-180 text-white overflow-hidden"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="bg-white/10 backdrop-blur-md mb-20 p-6 lg:p-8 w-full max-w-md lg:w-150 rounded-2xl shadow-xl self-center h-fit">
        <h2 className="text-3xl text-blue-400">Forgot Password</h2>
        <p className="mt-5 w-full mb-3">Enter new password</p>
        <form onSubmit={handleSubmit}>
          <p>Password*</p>
          <input
            className="block mb-1 mt-1 outline-1 outline-white/90 opacity-50 rounded p-1 w-full"
            type="password"
            placeholder="Password"
            required
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <p>Confim Password*</p>
          <input
            className="block mb-1 mt-1 outline-1 outline-white/90 opacity-50 rounded p-1 w-full"
            type="password"
            placeholder="Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <p className="text-sm">
            6+ Characters, include letters, numbers, & symbols
          </p>

          {message && <p className="text-yellow-400 text-sm mt-2">{message}</p>}
          <button className="bg-blue-500 p-2 rounded text-white/90 hover:bg-blue-600 transition-colors duration-200 cursor-pointer mt-4">
            Reset Password
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ResetPassword;
