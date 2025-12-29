import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    console.log("VITE_API_LOGIN_URL:", import.meta.env.VITE_API_LOGIN_URL);
    console.log("Full URL:", `${import.meta.env.VITE_API_LOGIN_URL}/login`);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_LOGIN_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Email or Password is incorrect");
        return;
      }

      // Save the token and the users data
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessage("Server not reachable");
    }
  };

  return (
    <motion.div
      className="h-screen flex justify-center lg:justify-start lg:pl-60 text-white overflow-hidden"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="bg-white/10 backdrop-blur-md mb-20 p-6 lg:p-8 w-full max-w-md lg:w-150 rounded-2xl shadow-xl self-center h-fit">
        <h2 className="text-3xl text-blue-400">Sign In</h2>
        <p className="mt-5 w-full">
          {" "}
          Login, or{" "}
          <Link to="/signup" className="text-blue-400 underline">
            {" "}
            Create an account
          </Link>
        </p>
        <br></br>
        <form onSubmit={handleSubmit}>
          <p>Email*</p>
          <input
            className="block mb-1 mt-1 outline-1 outline-white/90 opacity-50 rounded p-1 w-full"
            type="text"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p>Password*</p>
          <input
            className="block mb-1 mt-1 outline-1 outline-white/90 opacity-50 rounded p-1 w-full"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            <Link
              className="text-sm hover:text-blue-400 transition-colors duration-75 underline cursor-pointer"
              to="/forgot-password"
            >
              Forgot password
            </Link>
          </p>
          {message && <p className="text-red-400 text-sm mt-2">{message}</p>}
          <button className="bg-blue-500 p-2 rounded text-white/90 hover:bg-blue-600 transition-colors duration-200 cursor-pointer mt-4">
            Login
          </button>
        </form>
      </div>
      <div className="hidden lg:flex absolute top-0 right-0 h-screen w-1/2 justify-center items-center">
        <img
          src="/art1.gif"
          alt="Animation"
          className="mt-14 mr-20 w-220 h-226 object-cover rounded pointer-events-none"
        />
      </div>
    </motion.div>
  );
}

export default SignIn;
