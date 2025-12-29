import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

function DashboardNav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } else {
      console.log("No user found in localStorage");
    }
  }, []);

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
            to="/dashboard"
            className="text-white hover:text-blue-400 transition-colors duration-300"
            style={{ textDecoration: "none" }}
          >
            SteamSale
          </Link>
        </div>
      </motion.div>

      <div className="flex whitespace-nowrap gap-5">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              className="font-medium text-white no-underline hover:text-blue-400 transition-colors duration-300"
              style={{ textDecoration: "none" }}
            >
              {user ? (
                <span
                  className="text-white no-underline"
                  style={{ textDecoration: "none" }}
                >
                  {user.first} {user.last}
                </span>
              ) : (
                <Link
                  to="/signup"
                  className="text-white no-underline"
                  style={{ textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleClick}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DashboardNav;
