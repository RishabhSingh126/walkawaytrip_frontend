import React from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";
import { Heart } from "lucide-react";

const MyTrips = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #C8E9F0 0%, #D8F0F5 30%, #EBF7FA 60%, #F5FBFD 85%, #ffffff 100%)",
      }}
    >
      <Navbar />

      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-12 max-w-[1240px] mx-auto">
        {/* Back Link */}
        <Link to="/main" className="flex items-center gap-2 text-gray-800 font-medium mb-5 hover:text-[#0093CB] transition-colors">
          <MdArrowBack size={18} />
          <span className="text-xs">Back to My Account</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Bookings */}
          <div className="flex-grow space-y-5">

            {/* Title & Wishlist — inside left column */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tight">My Booking &amp; Trips</h1>
              <Link
                to="/wishlist"
                className="bg-white text-[#0093CB] font-semibold px-6 py-1 rounded-[6px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-xs"
              >
                Wishlist
              </Link>
            </div>

            {/* Your Hotels Section */}
            <section>
              {/* Header row: label only */}
              <h2 className="text-[9px] font-bold text-gray-500 tracking-wider mb-3">Your Hotels</h2>

              {/* Hotel Card */}
              <div
                className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-all duration-300 p-3"
                style={{ maxWidth: "880px" }}
              >
                {/* Image Section */}
                <div className="w-full md:w-48 h-36 md:h-auto flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Lakeside Motel"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-grow flex flex-col p-1 md:pl-5 md:py-0.5">
                  <div className="flex flex-col md:flex-row justify-between items-stretch h-full gap-3">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-base font-bold text-[#1A1A1A] mb-0.5 leading-tight">Lakeside Motel Warefront</h3>
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="flex text-[#FF8A00] text-[9px]">
                            {"★★★★★".split("").map((star, i) => (
                              <span key={i} className={i === 4 ? "text-gray-200" : ""}>{star}</span>
                            ))}
                          </div>
                          <span className="text-[#717171] text-[10px] font-semibold">4.5 (1200 Reviews)</span>
                        </div>
                      </div>

                      <div className="space-y-0.5 mt-2 md:mt-0">
                        <p className="text-[#FF5C5C] text-[10px] font-semibold">Non refundable</p>
                        <p className="text-[#717171] text-[10px] font-medium">Check in: Sunday, March 18, 2022</p>
                        <p className="text-[#717171] text-[10px] font-medium">Check out: Tuesday, March 20, 2022</p>
                        <p className="text-[#717171] text-[10px] font-bold mt-0.5">2 night stay</p>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto md:min-w-[140px] mt-3 md:mt-0 border-t md:border-t-0 border-gray-100 pt-2.5 md:pt-0">
                      <div className="text-left md:text-right">
                        <p className="text-[#717171] text-[8px] font-bold mb-0.5">1 room 2 days</p>
                        <div className="flex items-center gap-1.5 md:justify-end">
                          <span className="text-[#FF5C5C] line-through text-[11px] font-bold opacity-60 leading-none">$150</span>
                          <span className="text-base font-bold text-[#1A1A1A] leading-none">$130</span>
                        </div>
                        <p className="text-[#717171] text-[8px] font-bold mt-0.5">Includes taxes and fees</p>
                      </div>

                      <Link
                        to="/booking-details"
                        className="border-[1.5px] border-[#0093CB] text-[#0093CB] px-4 py-1 rounded-md font-bold text-[9px] tracking-wide hover:bg-[#0093CB] hover:text-white transition-all shadow-sm w-auto text-center inline-flex items-center justify-center"
                      >
                        View trip details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* Your Destination Section */}
            <section className="mt-6">
              <h2 className="text-[9px] font-bold text-gray-500 tracking-wider mb-3">Your Destination</h2>

              <div className="flex flex-col gap-4">
                {[1, 2].map((id) => (
                  <div
                    key={id}
                    className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row p-3 gap-5 hover:shadow-md transition-all duration-300"
                    style={{ maxWidth: "880px" }}
                  >
                    {/* Image Section */}
                    <div className="relative w-full md:w-[250px] h-44 md:h-40 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/97/93/6e/caption.jpg?w=1200&h=-1&s=1"
                        alt="Phi Phi Islands"
                        className="w-full h-full object-cover"
                      />
                      {/* Discount Badge */}
                      <span className="absolute top-2.5 left-2.5 bg-[#2B9CB6] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        20 % OFF
                      </span>
                      {/* Wishlist Button */}
                      <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-transform border border-gray-100">
                        <Heart size={12} className="text-gray-400 fill-transparent" />
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="flex-grow flex flex-col justify-between p-1">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold tracking-wider">Paris, France</span>
                        <h3 className="text-sm md:text-base font-bold text-[#1A1A1A] mt-0.5 leading-snug">
                          Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <div className="flex text-[#FF8A00] text-[9px]">
                            {"★★★★★".split("").map((star, i) => (
                              <span key={i} className={i === 4 ? "text-gray-200" : ""}>{star}</span>
                            ))}
                          </div>
                          <span className="text-[#1A1A1A] text-[10px] font-semibold">4.8</span>
                          <span className="text-gray-400 text-[10px] font-medium">(269)</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed max-w-[480px]">
                          The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-3 md:mt-0">
                        <span className="text-[10px] text-[#0093CB] font-bold cursor-pointer hover:underline">Best Price Guarantee</span>
                        <span className="text-[10px] text-[#0093CB] font-bold cursor-pointer hover:underline">Free Cancellation</span>
                      </div>
                    </div>

                    {/* Right Column: Pricing & CTA */}
                    <div className="w-full md:w-44 flex flex-row md:flex-col justify-between items-center md:items-end pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 gap-2 md:gap-0 md:min-h-[148px]">
                      <span className="text-[10px] font-bold text-gray-800">2 Days 1 Nights</span>

                      <div className="flex flex-col items-center md:items-end my-1 md:my-0">
                        <span className="text-gray-400 line-through text-[10px] font-bold">$1200</span>
                        <div className="flex items-baseline gap-0.5 mt-0.5">
                          <span className="text-[9px] text-gray-500 font-medium">From</span>
                          <span className="text-lg font-black text-[#1A1A1A]">$114</span>
                        </div>
                      </div>

                      <button className="border-[1.5px] border-[#0093CB] text-[#0093CB] px-4 py-1.5 rounded-lg font-bold text-[9px] tracking-wide hover:bg-[#0093CB] hover:text-white transition-all shadow-sm w-auto md:w-full text-center">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Advertisement Banner */}
          <div className="w-full lg:w-[350px] flex-shrink-0 lg:self-start lg:mt-[24px]">
            {/* Wrapper */}
            <div className="relative group" style={{ paddingTop: "50px" }}>

              {/* Eiffel Tower */}
              <img
                src="/carrentallogo/—Pngtree—sketch the eiffel tower_6550477 1 copy.svg"
                alt="Eiffel Tower"
                className="absolute right-3 pointer-events-none z-20 hidden lg:block"
                style={{ height: "1450px", width: "auto", maxWidth: "100%", opacity: 0.88, bottom: "-550px" }}
              />

              {/* Card */}
              <div
                className="relative rounded-2xl overflow-hidden flex flex-col h-[380px] shadow-lg"
                style={{ background: "rgba(11, 92, 102, 0.50)" }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B5C66]/60 via-[#0B5C66]/20 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 px-5 py-8 flex flex-col items-start justify-between h-full">
                  {/* Top text */}
                  <div>
                    <h2 className="text-white text-xl font-black leading-[1.15] tracking-tight drop-shadow-md max-w-[65%]">
                      Plan your next Destination and explore your Favorite Place
                    </h2>
                  </div>

                  {/* Explore button */}
                  <button className="bg-white/25 backdrop-blur-md text-white border border-white/40 px-6 py-2 rounded-xl font-bold text-[10px] tracking-widest hover:bg-white hover:text-[#0B5C66] transition-all duration-500 shadow-md">
                    EXPLORE
                  </button>
                </div>

                {/* Decorative glow circle */}
                <div className="absolute bottom-[-15px] left-[-15px] w-28 h-28 bg-[#F0C55F] rounded-full opacity-20 blur-3xl transition-opacity pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ContactFooter />
      <Footer />
    </div>
  );
};

export default MyTrips;
