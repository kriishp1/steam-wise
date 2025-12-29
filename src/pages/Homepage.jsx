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
      <h1 className="flex text-4xl font-bold text-white">
        Welcome to Steamwise
      </h1>

      <p className="flex text-lg text-white max-w-2xl text-center">
        Discover everything about your favorite games with Steamwise! Instantly
        get detailed information, reviews, and price history for any game. Plus,
        receive smart recommendations for similar games you'll love. Whether
        you're searching for your next adventure or just want to know more about
        a title, Steamwise is your go-to hub for game discovery and
        recommendations.
      </p>

      <button className="outline-1 pl-3 pr-3 rounded-2 font-bold text-white hover:text-blue-400  transition-colors duration-300 cursor-pointer">
        <Link
          to="/signup"
          className="no-underline"
          style={{ textDecoration: "none" }}
        >
          Find deals
        </Link>
      </button>

      <h1
        className="flex text-2xl font-bold text-blue-400 mb-7"
        style={{ color: "#60a5fa" }}
      >
        Why to use Steamwise?
      </h1>

      <div className="grid md:grid-cols-4 gap-20 ">
        <div className="bg-black/50 outline-2 rounded-lg flex flex-col justify-center items-center pt-4 pb-6 px-6 py-4 w-64 min-h-[320px]">
          <h3 className="text-white font-bold mb-2">Game Info</h3>
          <img src="game.png" alt="Game Info" />
          <p className="mt-5 text-white/90 text-center w-60 px-4">
            Get instant access to detailed information, reviews, and price
            history for any game on Steam.
          </p>
        </div>

        <div className="bg-black/50 outline-2 rounded-lg flex flex-col justify-center items-center pt-4 pb-6 w-64 min-h-[320px]">
          <h3 className="text-white font-bold mb-2">Recommendations</h3>
          <img src="recommend_resized.png" alt="Recommendations" />
          <p className="mt-5 text-white/90 text-center w-60 px-4">
            Discover new games you'll love with our intelligent recommendation
            engine based on genres and tags.
          </p>
        </div>

        <div className="bg-black/50 outline-2 rounded-lg flex flex-col justify-center items-center pt-4 pb-6 w-64 min-h-[320px]">
          <h3 className="text-white font-bold mb-2">APIs</h3>
          <img src="api_resized.png" alt="APIs & Credits" />
          <p className="mt-5 text-white/90 text-center w-60 px-4">
            Game info, deals, and recommendations are powered by{" "}
            <a
              href="https://steamcommunity.com/dev"
              className="underline text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Steam
            </a>
            {", "}
            <a
              href="https://isthereanydeal.com/"
              className="underline text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              ITAD
            </a>
            {", and "}
            <a
              href="https://rawg.io/apidocs"
              className="underline text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              RAWG
            </a>{" "}
            APIs.
          </p>
        </div>

        <div className="bg-black/50 outline-2 rounded-lg flex flex-col justify-center items-center pt-4 pb-6 w-64 min-h-[320px]">
          <h3 className="text-white font-bold mb-2">Free & Easy</h3>
          <img src="free_resized.png" alt="Free" />
          <p className="mt-5 text-white/90 text-center w-60 px-4">
            Enjoy all features at no cost. No subscriptions, no hidden fees,
            just pure game discovery.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Homepage;
