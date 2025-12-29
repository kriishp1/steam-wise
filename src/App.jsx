import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import DashboardNav from "./pages/DashboardNav";
import Footer from "./pages/Footer";

function AppComponent() {
  const location = useLocation("");
  const hiddenNavbarRoutes = ["/dashboard"];
  const showNavbar = !hiddenNavbarRoutes.includes(location.pathname);

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {showNavbar && <Navbar />}

      <div className="flex flex-col min-h-screen justify-between">
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardNav></DashboardNav>
                  <Dashboard></Dashboard>
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppComponent></AppComponent>
      <Footer />
    </Router>
  );
}

export default App;
