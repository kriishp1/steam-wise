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
      <h1 className="text-4xl font-bold text-blue-400">About SteamSale</h1>
      <div className="text-lg text-white/90 max-w-4xl text-center space-y-6 px-6">
        <p className="text-xl text-blue-300 font-medium">
          Never miss the perfect gaming deal again.
        </p>
        
        <p>
          SteamSale is an intelligent game deal tracker that uses advanced AI to predict when your favorite Steam games will go on sale. We analyze thousands of games, historical pricing data, seasonal patterns, and market trends to give you accurate predictions about upcoming discounts.
        </p>
        
        <p>
          Built by gamers, for gamers, we understand the frustration of buying a game at full price only to see it discounted days later. Our platform sends you alerts before sales happen, so you can plan your purchases and maximize your gaming budget.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-blue-400 font-bold mb-2">AI Predictions</h3>
            <p className="text-sm">Advanced algorithms analyze pricing patterns to predict future sales with high accuracy.</p>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-blue-400 font-bold mb-2">Smart Alerts</h3>
            <p className="text-sm">Get notified before sales start, not after they end. Set custom price targets for maximum savings.</p>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-blue-400 font-bold mb-2">Save Money</h3>
            <p className="text-sm">Our users save an average of 60% on their game purchases by timing their buys perfectly.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;