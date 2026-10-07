import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/User/main/common/Navbar";
import { FaPlaneDeparture } from "react-icons/fa";
import { Menu, X, HelpCircle } from "lucide-react";
import GlobalHeroBanner from "@/components/User/main/Home/GlobalHeroBanner";
import Option from "@/components/User/main/Home/Option";
import PromoOffers from "@/components/User/main/Home/PromoOffers";
import TripListing from "@/components/User/main/Home/TripListing";
import TravelSection from "@/components/User/main/Home/TravelSection";
import HotelListing from "@/components/User/main/Home/HotelListing";
import AiTripPlanner from "@/components/User/main/Home/AiTripPlanner";

import Testimonials from "@/components/User/main/Home/Testimonials";
import TravelPlanner from "@/components/User/main/Home/TravelPlanner";
import TravelBrands from "@/components/User/main/Home/TravelBrands";
import ContactFooter from "@/components/User/Landing/ContactPage";
import Footer from "@/components/User/common/Footer";
import TravelChat from "@/components/User/main/Home/TravelChat";

const Main = () => {
  const [query, setQuery] = useState("");
  const suggestions = ["Best travel deals", "Flight discounts", "Hotel offers"];
  const bgRef = useRef(null);
  const navigate = useNavigate();

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
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="overflow-x-hidden w-full max-w-[100vw]">
      <GlobalHeroBanner onChatOpen={() => setIsChatOpen(true)} />
      {/* Bottom Option */}
      <div className="w-full bg-white bg-opacity-90 px-2 sm:px-4 mt-2 sm:mt-4">
        <Option onChatOpen={() => setIsChatOpen(true)} />
      </div>

      {/* Promo Offers Section */}
      <PromoOffers />

      {/* Top TripListing */}
      <TripListing />

      {/* Travel Section */}
      <TravelSection />

      {/* Hotel Listing */}
      <HotelListing />

      {/* AI Trip Planner */}
      <AiTripPlanner />

      {/* Travel Style Quiz Section */}


      {/* Testimonials */}
      <Testimonials />

      {/* Travel Brands */}
      <TravelBrands />


      {/* Travel Planner */}
      <TravelPlanner />

      {/* Contact Footer Section */}
      <ContactFooter />

      {/* Footer Section */}
      <Footer />

      {/* Travel AI Chat Full Page View */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[2000] bg-white flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-150 bg-gray-50">
            <span className="text-sm font-black text-gray-800 flex items-center gap-1.5">
              🤖 AI Travel Companion
            </span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-200 transition text-gray-600 font-extrabold cursor-pointer"
            >
              ✕ Close Chat
            </button>
          </div>
          <div className="flex-grow">
            <TravelChat initialQuery={query} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
