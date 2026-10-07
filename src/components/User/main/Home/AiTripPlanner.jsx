import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "@/assets/image/Home/Background.png";
import { Send } from "lucide-react";

const TripPlanner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f8f9fa] py-16 md:py-24 w-screen relative left-1/2 right-1/2 -mx-[50vw]">
      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* Decorative Paper Plane (Top Left) */}
        <div className="absolute -top-10 -left-10 hidden lg:block opacity-60">
          <svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50C10 50 40 10 80 30C120 50 140 20 140 20M140 20L130 30M140 20L135 10" stroke="#005fad" strokeWidth="2" strokeDasharray="5 5" />
            <path d="M130 15L145 20L135 30L138 22L130 15Z" fill="#005fad" />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#005fad] leading-[1.1] font-[Unbounded]">
              Simplify your travels with our AI trip planner.
            </h1>

            <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-lg">
              Meet your ultimate AI travel companion, your one-stop guide to a
              flawless vacation. Curious about your next getaway? Just ask our AI
              bot! Whether it’s discovering hidden gems, booking flights, road
              trips, or finding the perfect stays, we've got you covered. Our
              intelligent trip planner redefines how you organize your travel,
              eliminating the hassle of switching between countless apps and tabs.
              Chat with our AI for personalized recommendations.
            </p>

            <button
              className="group w-full md:w-auto bg-[#005fad] text-white px-10 py-4 rounded-xl shadow-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg cursor-pointer"
              onClick={() => navigate('/ai-trip-planner')}
            >
              Plan a new trip
              <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative group">
              <img
                src={bg}
                alt="Scenic view representing travel planning"
                className="rounded-2xl w-full max-w-[500px] aspect-square object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              />
              {/* Optional reflection effect if bg allows */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
