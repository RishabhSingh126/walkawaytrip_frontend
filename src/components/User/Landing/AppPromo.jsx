import React from "react";

const AppPromo = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="relative overflow-hidden bg-[#4c49ed] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-xl min-h-[350px]">
        
        {/* Wavy Decorative Lines (Top Right) */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-80">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full text-orange-400/30"
            style={{ transform: "scale(1.2) translate(10%, -10%)" }}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M0,100 C150,150 250,50 400,100 M0,120 C150,170 250,70 400,120 M0,140 C150,190 250,90 400,140 M0,160 C150,210 250,110 400,160 M0,180 C150,230 250,130 400,180 M0,200 C150,250 250,150 400,200"
            />
          </svg>
        </div>

        {/* Squiggles / Leafy shape (Bottom Right) */}
        <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-yellow-400 opacity-90 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <path d="M50 0 Q60 25 90 30 Q65 40 70 70 Q45 55 20 70 Q35 40 10 30 Q40 25 50 0" />
          </svg>
        </div>

        {/* Left Content */}
        <div className="relative z-10 w-full md:w-3/5 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-[Unbounded]">
            Get 5% off your 1st <br className="hidden sm:block" /> app booking
          </h2>
          <p className="text-sm md:text-base text-white/90 max-w-sm font-medium">
            Booking's better on the app. Use promo code <br className="hidden sm:block" /> "TourBooking" to save!
          </p>
          
          <div className="pt-4 sm:pt-8 w-full max-w-md">
            <p className="text-xs md:text-sm font-medium text-white mb-3 sm:mb-4 uppercase tracking-wider">
              Get a magic link sent to your email
            </p>
            <div className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-lg">
              <input
                type="email"
                placeholder="Email"
                className="flex-grow bg-transparent px-4 py-3 text-gray-800 outline-none placeholder-gray-400 text-sm"
              />
              <button className="bg-[#4c49ed] text-white px-6 py-3 sm:py-2 font-semibold hover:bg-blue-700 transition-colors text-sm rounded-xl sm:rounded-none sm:rounded-r-xl">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Space for Design Consistency */}
        <div className="md:w-1/4"></div>
      </div>
    </div>
  );
};

export default AppPromo;
