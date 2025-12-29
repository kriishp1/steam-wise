import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-black/30 backdrop-blur-xl border-t border-white/10 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* API Credits Section */}
        <div className="mb-6 text-center">
          <h3 className="text-white font-semibold text-lg mb-3">Powered By</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="https://steamcommunity.com/dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-blue-400 transition-colors no-underline"
            >
              Steam API
            </a>
            <span className="text-white/40">•</span>
            <a
              href="https://isthereanydeal.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-blue-400 transition-colors no-underline"
            >
              IsThereAnyDeal API
            </a>
            <span className="text-white/40">•</span>
            <a
              href="https://rawg.io/apidocs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-blue-400 transition-colors no-underline"
            >
              RAWG API
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm">
            © 2025 Steamwise. All rights reserved.
          </div>

          <div className="flex gap-6 text-sm">
            <Link
              to="/about"
              className="text-white/60 hover:text-blue-400 transition-colors no-underline"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
