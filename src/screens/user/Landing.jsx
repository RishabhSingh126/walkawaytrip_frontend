// Images
import bgpage from "@/assets/image/Landing/Section.png";

import React, { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa";

import Features from "@/components/user/landing/Features";
import Trending from "@/components/user/landing/Trending";
import Popular from "@/components/user/landing/Popular";
import BentoGrid from "@/components/user/landing/BentoGrid";
import TopTrending from "@/components/user/landing/TopTrending";
import CustomerReviews from "@/components/user/landing/Reviews";
import TravelArticles from "@/components/user/landing/TravelArticles";
import AppPromo from "@/components/user/landing/AppPromo";
import ContactFooter from "@/components/user/landing/ContactPage";
import Footer from "@/components/user/common/Footer";
import Navbar from "@/components/user/common/Navbar";

const suggestions = [
  "Inspire me where to go",
  "Solo Trip",
  "Create a new trip",
  "Find family hotel in Paris",
];

export default function Landing() {
  const [query, setQuery] = useState("");

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgpage})` }}
      >
        {/* Navbar Section */}
        <Navbar />

        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center pt-24 md:pt-36 pb-10 md:pb-16 text-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[84px] font-bold font-[Unbounded] bg-gradient-to-b from-[#FFFFFF] to-[#289AB5] bg-clip-text text-transparent leading-tight md:leading-snug">
            Your world of joy
          </h1>

          <p className="text-sm sm:text-base md:text-lg mt-3 text-white max-w-lg">
            From local escapes to far-flung adventures, find what makes you
            happy anytime, anywhere
          </p>
        </div>

        {/* Search Box */}
        <div className="relative mx-auto mb-0 bg-white shadow-lg p-4 sm:p-6 rounded-lg w-11/12 sm:w-10/12 md:w-3/4 lg:w-1/2 -bottom-1">
          <div className="flex items-center justify-between mb-4 gap-2">
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-lg mr-3 p-2 shadow-sm">
                <FaPlaneDeparture className="text-xl text-[#005fad]" />
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 whitespace-nowrap">Travel Bot</h2>
            </div>
            <div className="flex-shrink-0">
              <button className="bg-[#005fad] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap shadow-md">
                Ask Anything
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Ask Anything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            {suggestions.map((text, index) => (
              <button
                key={index}
                onClick={() => setQuery(text)}
                className="p-2 text-xs sm:text-sm bg-[#f2f2f2] rounded-md hover:bg-white hover:shadow-md transition text-left"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Features />

      {/* Trending Section */}
      <Trending />

      {/* Popular Tours Section */}
      <Popular />

      {/* Popular things to do */}
      <BentoGrid />

      {/* TopTrending Section */}
      <TopTrending />

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* App Promo Section */}
      <AppPromo />

      {/* Travel Articles Section */}
      <TravelArticles />

      {/* Contact Footer Section */}
      <ContactFooter />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
