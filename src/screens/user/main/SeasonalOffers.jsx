import React from "react";
import Navbar from "@/components/User/main/common/Navbar";
import ContactFooter from "@/components/user/landing/ContactPage";
import Footer from "@/components/user/common/Footer";
import { Link } from "react-router-dom";

const SeasonalOffers = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section
        className="relative w-full overflow-hidden bg-sky-50"
        style={{ marginTop: "94px", minHeight: "400px", height: "calc(100vh - 64px)" }}
      >
        {/* Frame 743.svg — full sky + clouds background */}
        <img
          src="/carrentallogo/Frame 743.svg"
          alt="sky background"
          className="absolute bottom-0 top-0 left-0 w-full h-full z-[1] object-cover" />

        {/* Foreground elements wrapper to maintain positioning */}
        <div className="absolute inset-0 max-w-[1440px] mx-auto w-full pointer-events-none">
          {/* "make the right" cursive text — top-left */}
          <img
            src="/carrentallogo/make the right.svg"
            alt="make the right move"
            className="absolute z-[10] top-[70px] left-[20px] w-[200px] sm:w-[280px] md:w-[340px] h-auto pointer-events-auto"
          />

          {/* Large "move." watermark — mid-left, base at section bottom */}
          <div
            className="absolute z-[5] select-none pointer-events-none font-black leading-none text-[45px] md:text-[90px] sm:text-[60px] md:text-[120px] md:text-[90px] md:text-[180px] text-sky-200/40 bottom-[120px] sm:bottom-[180px] md:bottom-[250px] left-[10px]"
            style={{
              letterSpacing: "-0.04em",
            }}
          >
            move.
          </div>

          {/* Eiffel Tower — repositioned and scaled responsively */}
          <img
            src="/carrentallogo/—Pngtree—sketch the eiffel tower_6550477 1.svg"
            alt="Eiffel Tower"
            className="absolute z-[8] bottom-[65px] right-[20px] sm:right-[100px] md:right-[160px] h-[240px] sm:h-[370px] md:h-[450px] w-auto pointer-events-auto"
          />

          {/* Pisa / Landmark — shifted left to overlap Eiffel's right side, scaled responsively */}
          <img
            src="/carrentallogo/pngegg 1 (1).svg"
            alt="World Landmark"
            className="absolute z-[9] bottom-[52px] right-[40px] sm:right-[120px] md:right-[180px] h-[210px] sm:h-[320px] md:h-[420px] w-auto pointer-events-auto"
          />

          {/* Plane with dashed arc — top-left */}
          <svg
            className="absolute z-[11] top-[16px] left-[52px] w-[50px] sm:w-[80px] pointer-events-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 56 Q28 4 74 6"
              stroke="#0093CB"
              strokeWidth="1.8"
              strokeDasharray="5 4"
              fill="none"
            />
            <g transform="translate(70,4) rotate(-15)">
              <path d="M0 0 L13 -4 L10 4 Z" fill="#0093CB" />
            </g>
          </svg>
        </div>
      </section>

      {/* ── Wrap Section ── */}
      <section className="w-full px-4 sm:px-8 lg:px-10 max-w-7xl mx-auto mt-10">
        <Link to="/offer-detail" className="block hover:opacity-95 transition-opacity">
          <img
            src="/carrentallogo/wrap.svg"
            alt="Wrap Decor"
            className="w-full h-auto cursor-pointer rounded-xl sm:rounded-2xl shadow-sm"
          />
        </Link>
      </section>



      {/* ── Cards Section ── */}
      <section className="w-full px-3 sm:px-8 lg:px-10 max-w-6xl mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 justify-items-center">
          {[1, 2, 3].map((item) => (
            <Link
              key={item}
              to="/offer-detail"
              className="border border-gray-200 bg-white relative z-[10] hover:z-[20] hover:scale-105 transition-transform duration-300 cursor-pointer block w-full max-w-[280px] aspect-[28/22] rounded-lg overflow-hidden shadow-sm hover:shadow-md"
            >
              <img
                src="/carrentallogo/card.svg"
                alt="Seasonal Offer Card"
                className="w-full h-full object-contain p-2"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Text Content Section ── */}
      <section className="w-full px-4 sm:px-8 lg:px-20 max-w-full my-10 md:my-20 flex flex-col items-center md:items-start gap-6">
        <img
          src="/carrentallogo/title-body.svg"
          alt="Seasonal Offers Title"
          className="w-full max-w-[300px] sm:max-w-[400px] h-auto object-contain opacity-100"
        />
        <img
          src="/carrentallogo/text.svg"
          alt="Seasonal Offers Background"
          className="w-full max-w-[2060px] h-auto object-contain rounded-2xl opacity-100 shadow-sm"
        />
      </section>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default SeasonalOffers;
