import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [accountCreation, setAccountCreation] = useState(false);
  const [valid, setValid] = useState("");

  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Check length
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    // Check for at least one letter
    if (!/[a-zA-Z]/.test(password)) {
      return "Password must include at least one letter";
    }

    // Check for at least one number
    if (!/[0-9]/.test(password)) {
      return "Password must include at least one number";
    }

    // Check for at least one special symbol
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must include at least one symbol (!@#$%^&*...)";
    }

    return null; // No errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setValid("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMessage(passwordError);
      return;
    }

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
        return;
      }
      setValid("Account created, Check email for verification");
      setAccountCreation(true);
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
        <h2 className="text-3xl text-blue-400">Sign Up</h2>
        <p className="mt-5 w-full">
          {" "}
          Create an account for free, or{" "}
          <Link to="/login" className="text-blue-400 underline">
            {" "}
            Login
          </Link>
        </p>
        <br></br>
        <form onSubmit={handleSubmit}>
          <p>First Name*</p>
          <input
            className="block mb-1 mt-1 outline-1 outline-white/90 opacity-50 rounded p-1 w-full"
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <br></br>
          <p>Last Name*</p>
          <input
            className="block mb-1 mt-1 outline-1 outline-white/90 opacity-50 rounded p-1 w-full"
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <br></br>
          <p>Email*</p>
          <input
            className="block mb-1 mt-1 outline-1 outline-white/90 opacity-50 rounded p-1 w-full"
            type="text"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br></br>
          <p>Password*</p>
          <input
            className="block mb-1 mt-1 outline-1 outline-white/90 opacity-50 rounded p-1 w-full"
            type="password"
            placeholder="Password"
            required
            value={password}
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
          {valid && (
            <span
              className={accountCreation ? "text-green-400" : "text-red-400"}
            >
              {valid}
            </span>
          )}

          {message && <span className="text-red-400">{message}</span>}

          <br></br>
          <button className="bg-blue-500 p-2 rounded text-white/90 hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
            Create Account
          </button>
        </form>
      </div>
      <div className="hidden lg:flex absolute top-0 right-0 h-screen w-1/2 justify-center items-center">
        <img
          src="/art.gif"
          alt="Animation"
          className="mt-14 mr-20 w-200 h-226 object-cover rounded pointer-events-none"
        />
      </div>
    </motion.div>
  );
}

export default SignUp;
