import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/User/main/common/Navbar";
import { FaPlaneDeparture } from "react-icons/fa";
import { Menu, X, HelpCircle } from "lucide-react";

const GlobalHeroBanner = ({ onChatOpen }) => {
  const [query, setQuery] = useState("");
  const bgRef = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { backgroundPositionY: "60%" },
        {
          backgroundPositionY: "100%",
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    }
  }, []);

  return (
    <div
      ref={bgRef}
      className="relative w-full bg-cover pb-0 md:pb-0"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1558015245-cfeabcaa793a?w=3000&auto=format&fit=crop&q=100')`,
        backgroundPosition: "center 0%",
        backgroundSize: "135% auto",
      }}
    >
      {/* Navbar Section */}
      <Navbar transparent={true} />

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center pt-24 md:pt-36 pb-2 md:pb-4 text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-extrabold font-[Unbounded] text-white">
          Hi, I'm Bot, your personal <br /> travel agent
        </h1>
      </div>

      {/* Search Box — in-flow, not absolute */}
      <div className="relative mx-auto bg-white shadow-2xl p-5 sm:p-6 rounded-[20px] w-11/12 sm:w-10/12 md:w-3/4 lg:max-w-[860px] w-full">
        <div className="flex items-center mb-5 gap-3">
          <div className="bg-[#f0f0f0] rounded-lg p-2 flex-shrink-0">
            <FaPlaneDeparture className="text-xl text-gray-700" />
          </div>
          <h2 className="text-lg font-bold text-gray-700">Traval Bot</h2>
          <div className="ml-auto flex-shrink-0">
            <button
              onClick={() => {
                if (onChatOpen) onChatOpen();
              }}
              className="bg-[#005fad] text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm font-bold shadow-sm transition-all"
            >
              Ask Anything
            </button>
          </div>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Ask Anythig"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pb-2 text-gray-400 text-sm border-b border-gray-100 focus:outline-none placeholder:text-gray-300"
          />
        </div>

        <div className="flex flex-wrap gap-2.5 items-center">
          {[
            "Inspire me where to go",
            "Solo Trip",
            "create a new trip",
            "find family hotel in paries",
            "find family hotel in paries",
            "Inspire me where to go",
          ].map((text, index) => (
            <button
              key={index}
              onClick={() => setQuery(text)}
              className="px-4 py-2 text-[12px] bg-[#f2f2f2] rounded text-gray-600 hover:bg-gray-200 transition-colors font-medium"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Navbar */}
      <div className="w-full mt-10 md:mt-16 border-b-4 border-[#ffe600]">
        <nav className="bg-[#003580] text-white shadow-xl relative z-20">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 py-4">
            
            {/* Left Spacer / Mobile Menu Toggle */}
            <div className="lg:flex-1 flex justify-start items-center">
              <button
                className="lg:hidden flex-shrink-0 p-1 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Navigation Links — Perfectly Centered */}
            <div className="hidden lg:flex flex-none justify-center px-4">
              <ul className="flex items-center gap-4 lg:gap-5 xl:gap-7 text-[13.5px] font-bold tracking-wide">
                <li 
                  onClick={() => navigate("/flights")}
                  className="cursor-pointer whitespace-nowrap hover:text-[#ffe600] transition-colors pb-1 border-b-[3px] border-transparent hover:border-[#ffe600]"
                >
                  Flights
                </li>
                <li 
                  onClick={() => navigate("/hotel")}
                  className="cursor-pointer whitespace-nowrap hover:text-[#ffe600] transition-colors pb-1 border-b-[3px] border-transparent hover:border-[#ffe600]"
                >
                  Hotels
                </li>
                <li 
                  onClick={() => navigate("/flights")}
                  className="cursor-pointer whitespace-nowrap hover:text-[#ffe600] transition-colors pb-1 border-b-[3px] border-transparent hover:border-[#ffe600]"
                >
                  Flight + Hotel
                </li>
                <li 
                  onClick={() => navigate("/cars")}
                  className="cursor-pointer whitespace-nowrap hover:text-[#ffe600] transition-colors pb-1 border-b-[3px] border-transparent hover:border-[#ffe600]"
                >
                  Car rental
                </li>
                <li 
                  onClick={() => navigate("/hotel")}
                  className="cursor-pointer whitespace-nowrap hover:text-[#ffe600] transition-colors pb-1 border-b-[3px] border-transparent hover:border-[#ffe600]"
                >
                  Holiday rentals
                </li>
                <li 
                  onClick={() => navigate("/trains")}
                  className="cursor-pointer whitespace-nowrap hover:text-[#ffe600] transition-colors pb-1 border-b-[3px] border-transparent hover:border-[#ffe600]"
                >
                  Trains
                </li>
                <li 
                  onClick={() => navigate("/cruises")}
                  className="cursor-pointer whitespace-nowrap hover:text-[#ffe600] transition-colors pb-1 border-b-[3px] border-transparent hover:border-[#ffe600]"
                >
                  Cruises
                </li>
              </ul>
            </div>

            {/* Manage Booking & Help - Right Aligned */}
            <div className="flex-1 flex justify-end items-center gap-3 lg:gap-5 flex-wrap pr-2">
              <button 
                onClick={() => navigate("/my-trips")}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center gap-2 text-[13px] font-bold transition-all border border-white/20 shadow-sm"
              >
                <span role="img" aria-label="briefcase" className="text-base">👜</span>
                <span className="hidden sm:inline">Manage booking</span>
              </button>

              <div className="hidden lg:flex items-center gap-4 text-[13px] font-bold">
                <div 
                  onClick={() => navigate("/customer-support")}
                  className="flex items-center gap-1.5 cursor-pointer hover:text-[#ffe600] transition-colors"
                >
                  <HelpCircle size={18} />
                  <span>Can we help?</span>
                </div>
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#ffe600] transition-colors">
                  <span role="img" aria-label="India flag" className="text-base">🇮🇳</span>
                  <span>EN (₹)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden flex flex-col gap-1 px-4 pb-3 bg-gray-800 text-white text-sm">
              <div 
                onClick={() => { setIsOpen(false); navigate("/flights"); }} 
                className="block py-2 border-b border-gray-700 cursor-pointer"
              >
                Flights
              </div>
              <div 
                onClick={() => { setIsOpen(false); navigate("/hotel"); }} 
                className="block py-2 border-b border-gray-700 cursor-pointer"
              >
                Hotels
              </div>
              <div 
                onClick={() => { setIsOpen(false); navigate("/flights"); }} 
                className="block py-2 border-b border-gray-700 cursor-pointer"
              >
                Flight + Hotel
              </div>
              <div 
                onClick={() => { setIsOpen(false); navigate("/cars"); }} 
                className="block py-2 border-b border-gray-700 cursor-pointer"
              >
                Car rental
              </div>
               <div 
                onClick={() => { setIsOpen(false); navigate("/hotel"); }} 
                className="block py-2 border-b border-gray-700 cursor-pointer"
              >
                Holiday rentals
              </div>
              <div 
                onClick={() => { setIsOpen(false); navigate("/trains"); }} 
                className="block py-2 border-b border-gray-700 cursor-pointer"
              >
                Trains
              </div>
              <div 
                onClick={() => { setIsOpen(false); navigate("/cruises"); }} 
                className="block py-2 cursor-pointer"
              >
                Cruises
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default GlobalHeroBanner;
