import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-6 pt-30"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <h1 className="flex text-4xl font-bold text-blue-400">
        Welcome to SteamSale
      </h1>
      

      <p className="flex text-lg text-white/90 max-w-2xl text-center">
        Never miss a Steam sale again. SteamSale's AI-powered prediction engine
        analyzes thousands of games and historical pricing patterns to tell you
        when your wishlist items will drop in price. Save money, save time, and
        always buy at the perfect moment.
      </p>

      <button className="outline-1 pl-2 pr-2 rounded-sm font-bold text-white hover:text-blue-400  transition-colors duration-300 cursor-pointer">
        <Link to="/signup">
          Find deals
        </Link>
      </button>

      <h1 className="flex text-2xl font-bold text-blue-400  mb-7">
        Why to use SteamSale?
      </h1>

      <div className="grid md:grid-cols-4 gap-20">
        <div className="bg-black/50 outline-2 rounded-sm flex flex-col justify-center items-center pt-2 pb-10">
          <h3 className="text-white font-bold mb-2">Find Deals</h3>
          <img src="money_resized.png"></img>
          <p className="mt-5 text-white/90 text-center w-60 px-4">Know when sales will happen before they're announced. Buy at the lowest price, every time.</p>
        </div>

        <div className="bg-black/50 outline-2 rounded-sm flex flex-col justify-center items-center pt-2 pb-10">
          <h3 className="text-white font-bold mb-2">AI Trained</h3>
          <img src="brain_resized.png"></img>
          <p className="mt-5 text-white/90 text-center w-60 px-4">Advanced machine learning analyzes historical pricing patterns to forecast future discounts with precision.</p>
        </div>

        <div className="bg-black/50 outline-2 rounded-sm flex flex-col justify-center items-center pt-2 pb-10">
          <h3 className="text-white font-bold mb-2">Perfect Timing</h3>
          <img src="time_resized.png"></img>
          <p className="mt-5 text-white/90 text-center w-60 px-4">Know the optimal moment to purchase. Buy when prices hit their lowest predicted point.</p>
        </div>

        <div className="bg-black/50 outline-2 rounded-sm flex flex-col justify-center items-center pt-2 pb-10">
          <h3 className="text-white font-bold mb-2">Completely Free</h3>
          <img src="free_resized.png"></img>
          <p className="mt-5 text-white/90 text-center w-60 px-4">No subscriptions, no hidden fees, no credit card required. Access powerful AI predictions at zero cost.</p>
        </div>
      </div>
    </motion.div>
  );
}

export default Homepage;
