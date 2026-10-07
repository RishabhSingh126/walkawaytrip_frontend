import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";
import bgimg from "@/assets/image/Home/imgOption.jpeg";
import MainSearchBar from "./MainSearchBar";

const Option = ({ hideHero = false }) => {
  const navigate = useNavigate();

  return (
    <div id="search-bar-section" className="relative w-full scroll-mt-24">
      {/* Hero Section */}
      <div className={`block relative overflow-visible rounded-xl shadow-md max-w-[1400px] mx-auto ${hideHero ? 'h-32 mb-16 bg-[#003580]' : 'mb-8 md:mb-24'}`}>
        {!hideHero && (
          <img src={bgimg} alt="bgimg" className="w-full min-h-[220px] object-cover rounded-xl" />
        )}
        <MainSearchBar hideHero={hideHero} />
      </div>

      {/* Book Your Upcoming Plan Section (Ultra-Compact height layout) */}
      <div className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100/60 py-5 sm:py-6 px-4 sm:px-12 border border-gray-200/50 shadow-md text-center max-w-[1300px] mx-auto">
        
        {/* Watermark Transparent Travel Background Picture */}
        <img
          src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=1000&auto=format&fit=crop&q=80"
          alt="Transparent Travel Watermark"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.20] pointer-events-none"
        />

        {/* Content Container (No extra background card!) */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          
          {/* Subtle floating travel icon elements */}
          <div className="flex items-center gap-2 mb-3 bg-orange-600/10 px-3.5 py-1 rounded-full border border-orange-200/40 text-orange-600 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
            <Compass size={12} className="text-orange-500 animate-pulse" />
            <span>Design Your Dream Vacation</span>
          </div>

          {/* Big Headline with Unique Classic Typography */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-[Unbounded] font-extrabold text-gray-900 tracking-tight mb-2 select-none filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
            Book Your <span className="text-[#005fad] relative">Upcoming Plan</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[11px] sm:text-sm text-gray-600 font-bold max-w-lg leading-relaxed mb-4 filter drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            Flights, hotels, customized holidays, and attraction tickets. Get instant confirmations, flexible cancellation options, and premium 24/7 AI-guided support.
          </p>

          {/* Glowing CTA Button */}
          <button
            onClick={() => navigate("/booking")}
            className="group px-7 py-2.5 sm:px-9 sm:py-3 bg-[#f15a22] text-white font-extrabold text-[11px] sm:text-xs rounded-full shadow-md shadow-orange-500/25 hover:shadow-orange-500/45 hover:scale-[1.02] active:scale-98 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-white/10"
          >
            <span>Book Now</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Floating mini stats/badges at bottom (Inline row style to save height) */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 mt-4.5 border-t border-gray-300/40 pt-2.5 w-full max-w-xl text-gray-500 text-[10px] sm:text-[11px] font-bold filter drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            <span className="flex items-center gap-1">🔒 100% Secure Payment</span>
            <span className="flex items-center gap-1">🤖 24/7 AI Assistance</span>
            <span className="flex items-center gap-1">✈️ 50K+ Happy Travelers</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Option;
