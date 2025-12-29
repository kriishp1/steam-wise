import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-6 pb-20"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-bold text-white">About Steamwise</h1>
      <div className="text-lg text-white/90 max-w-4xl text-center space-y-6 px-6">
        <p className="text-xl text-blue-300 font-medium">
          Discover everything about your favorite games with Steamwise!
        </p>
        <p>
          Instantly get detailed information, reviews, and price history for any
          game. Plus, receive smart recommendations for similar games you'll
          love. Whether you're searching for your next adventure or just want to
          know more about a title, Steamwise is your go-to hub for game
          discovery and recommendations.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-blue-400 font-bold mb-2">Game Info</h3>
            <p className="text-sm">
              Get instant access to detailed information, reviews, and price
              history for any game on Steam.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-blue-400 font-bold mb-2">Recommendations</h3>
            <p className="text-sm">
              Discover new games you'll love with our intelligent recommendation
              engine based on genres and tags.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-blue-400 font-bold mb-2">APIs</h3>
            <p className="text-sm">
              Game info, deals, and recommendations are powered by Steam, ITAD,
              and RAWG APIs.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
