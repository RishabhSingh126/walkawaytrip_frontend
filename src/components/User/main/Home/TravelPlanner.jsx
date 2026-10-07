import React from "react";
import apple from "@/assets/image/Home/Group.svg";
import bg from "@/assets/image/Home/app.png";

const TravelPlanner = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-12 w-full px-4 py-8">
      {/* AI App Promo Card */}
      <div className="bg-[#005fad] text-white flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:p-16 rounded-3xl w-full shadow-md text-left">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Your Local AI Travel Planner
          </h1>
          <p className="mt-4 text-xs sm:text-sm lg:text-base text-white/95 leading-relaxed font-semibold">
            For the ultimate personalised Bot experience, download the app. It's
            like having a travel agent in your pocket 24/7 – the perfect AI
            itinerary planner.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4 flex-wrap">
            <img
              src={apple}
              alt="Download on the App Store"
              className="h-10 sm:h-12 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png"
              alt="Get it on Google Play"
              className="h-10 sm:h-12 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src={bg}
            alt="Itinerary Preview"
            className="rounded-lg w-48 sm:w-64 md:w-80"
          />
        </div>
      </div>

      {/* WHY WALKAWAYTRIP SECTION */}
      <div className="text-left w-full mt-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">Why Walkawaytrip ?</h2>
        <div 
          className="relative w-full rounded-[2rem] overflow-hidden min-h-[420px] p-6 sm:p-8 md:p-12 flex items-center bg-cover bg-center shadow-lg"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&auto=format&fit=crop&q=80')` }}
        >
          {/* Airport window glass backdrop overlay */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/50" />
          
          {/* Subtle airport window grid overlay lines */}
          <div className="absolute inset-0 grid grid-cols-3 gap-0 opacity-10 pointer-events-none">
            <div className="border-r border-white h-full" />
            <div className="border-r border-white h-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full relative z-10 items-stretch">
            
            {/* Card 1: Trusted Advisor */}
            <div className="bg-white/95 backdrop-blur-xs rounded-2xl p-5 shadow-md flex flex-col justify-between text-left relative overflow-hidden min-h-[260px] border border-white/20 transition-transform hover:-translate-y-1 duration-300">
              <div>
                <h4 className="font-extrabold text-base text-[#f15a22] mb-2 leading-tight">Trusted Advisor</h4>
                <p className="text-[11px] text-gray-500 font-bold leading-normal">
                  Trusted Since 2021, Designed for Modern Journeys.
                </p>
              </div>
              <div className="mt-4 flex justify-between items-end">
                {/* Thumbs up SVG */}
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#f15a22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-95">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <div className="flex gap-0.5 text-[#f15a22] opacity-80 font-bold">
                  <span>✦</span>
                  <span className="text-[10px]">✦</span>
                </div>
              </div>
              {/* Orange colored line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#f15a22]/90" />
            </div>

            {/* Card 2: Customized Holidays */}
            <div className="bg-[#f15a22] text-white rounded-2xl p-5 shadow-md flex flex-col justify-between text-left relative overflow-hidden min-h-[260px] transition-transform hover:-translate-y-1 duration-300">
              <div>
                <h4 className="font-extrabold text-base text-white mb-2 leading-tight">Customized Holidays</h4>
                <p className="text-[11px] text-white/90 font-bold leading-normal">
                  Offers the ability to personalize your holidays according to your needs.
                </p>
              </div>
              <div className="mt-4 flex justify-between items-end">
                {/* Traveler SVG */}
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-95">
                  <path d="M12 2a5 5 0 0 0-5 5v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a5 5 0 0 0-5-5z" />
                  <path d="M19 17v-4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3z" />
                  <path d="M12 11v6" />
                </svg>
                <span className="text-lg">🎒</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20" />
            </div>

            {/* Card 3: Wide Varieties of Holidays */}
            <div className="bg-[#0f70e0] text-white rounded-2xl p-5 shadow-md flex flex-col justify-between text-left relative overflow-hidden min-h-[260px] transition-transform hover:-translate-y-1 duration-300">
              <div>
                <h4 className="font-extrabold text-base text-white mb-2 leading-tight">Wide Varieties of Holidays</h4>
                <p className="text-[11px] text-white/90 font-bold leading-normal">
                  From adventure trips to romantic honeymoon getaways, we have your back.
                </p>
              </div>
              <div className="mt-4 flex justify-between items-end">
                {/* Compass SVG */}
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-95">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
                </svg>
                <span className="text-lg">🌴</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20" />
            </div>

            {/* Card 4: Seamless Booking */}
            <div className="bg-white/95 backdrop-blur-xs rounded-2xl p-5 shadow-md flex flex-col justify-between text-left relative overflow-hidden min-h-[260px] border border-white/20 transition-transform hover:-translate-y-1 duration-300">
              <div>
                <h4 className="font-extrabold text-base text-[#0047ba] mb-2 leading-tight">Seamless Booking</h4>
                <p className="text-[11px] text-gray-500 font-bold leading-normal">
                  Book from a wide selection of travel plans with easy online payments.
                </p>
              </div>
              <div className="mt-4 flex justify-between items-end">
                {/* Airplane SVG */}
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0047ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-95">
                  <path d="M17.8 19.2L16 11l3.5-3.5a1 1 0 0 0-1.4-1.4L14.6 9.6l-8.2-1.8a1 1 0 0 0-1.2.7l-.3.6a1 1 0 0 0 .3 1.2L9.6 13l-4 4-2.2-.6a.5.5 0 0 0-.6.6l.3.6c.1.2.3.3.5.3l3-.3 3 3a.5.5 0 0 0 .9-.2l.6-2.2 4-4 2.8 4.4a1 1 0 0 0 1.2.3l.6-.3a1 1 0 0 0 .7-1.2z" />
                </svg>
                <span className="text-lg">💳</span>
              </div>
              {/* Blue colored line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#0047ba]/90" />
            </div>

            {/* Card 5: Convenient Holidays */}
            <div className="bg-[#fffbeb]/95 backdrop-blur-xs rounded-2xl p-5 shadow-md flex flex-col justify-between text-left relative overflow-hidden min-h-[260px] border border-yellow-100 transition-transform hover:-translate-y-1 duration-300">
              <div>
                <h4 className="font-extrabold text-base text-[#d29d00] mb-2 leading-tight">Convenient Holidays</h4>
                <p className="text-[11px] text-gray-500 font-bold leading-normal">
                  All-in-one travel plans featuring accommodations, flights, activities, meals, and more.
                </p>
              </div>
              <div className="mt-4 flex justify-between items-end">
                {/* Suitcase SVG */}
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d29d00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-95">
                  <rect x="3" y="9" width="18" height="12" rx="2" />
                  <path d="M16 9V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4" />
                </svg>
                <span className="text-lg">🧳</span>
              </div>
              {/* Yellow colored line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#d29d00]/90" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanner;
