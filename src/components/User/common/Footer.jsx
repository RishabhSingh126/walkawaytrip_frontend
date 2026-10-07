import React from "react";
import { Link } from "react-router-dom";
import footerBg from "@/assets/image/Landing/Footer.png";

const Footer = () => {
  return (
    <footer
      className="relative text-gray-100 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* White Gradient Overlay at Top for Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-transparent"></div>

      <div className="relative text-center py-20 px-4 z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#007cc2] max-w-4xl mx-auto leading-tight font-[Unbounded]">
          Found what you’re looking for? <br className="hidden md:block" /> Explore more and stay updated with us
        </h2>
        <Link to="/main">
          <button className="mt-6 px-6 py-1.5 bg-[#2a99b5] text-white font-medium rounded-none hover:bg-white hover:text-[#2a99b5] border border-[#2a99b5] transition-all duration-300 shadow-lg text-[10px] uppercase tracking-widest cursor-pointer">
            Explore more places
          </button>
        </Link>
      </div>

      {/* Social Media Icons */}
      <div className="relative flex justify-center space-x-6 py-6 border-b border-gray-400">
        {["facebook", "instagram", "linkedin", "x", "pinterest", "google"].map((icon) => (
          <a
            href="#"
            key={icon}
            aria-label={`Follow us on ${icon}`}
            className="text-gray-300 hover:text-white text-2xl transition duration-300"
          >
            <i className={`fab fa-${icon}`}></i>
          </a>
        ))}
      </div>

      {/* Footer Links */}
      <div className="relative grid grid-cols-2 md:grid-cols-5 gap-4 text-center py-6 text-sm border-b border-gray-400">
        {[
          { name: "Manage booking", path: "/my-trips" },
          { name: "Customer Support", path: "/customer-support" },
          { name: "Chat with AI", path: "/ai-chatbot" },
          { name: "Privacy", path: "#" },
          { name: "Terms", path: "#" }
        ].map((link) => (
          <Link to={link.path} key={link.name} className="text-gray-300 hover:text-white transition duration-200">
            {link.name}
          </Link>
        ))}
      </div>

      {/* Bottom Footer */}
      <div className="relative flex flex-col md:flex-row justify-between items-center px-6 py-4 text-xs">
        <p className="text-center md:text-left text-gray-300">
          © {new Date().getFullYear()} Befog. All Rights Reserved. Unauthorized use or duplication is prohibited.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-semibold hover:underline transition duration-200 mt-3 md:mt-0 text-white"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
