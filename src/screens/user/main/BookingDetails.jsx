import React from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";

const BookingDetails = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Top blue section */}
      <div
        style={{
          background: "linear-gradient(to bottom, #C8E9F0 0%, #E8F6FA 70%, #ffffff 100%)",
        }}
        className="pt-20 pb-12 px-4 sm:px-8 lg:px-16"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Back Link */}
          <Link
            to="/my-trips"
            className="flex items-center gap-2 text-gray-800 font-medium mb-6 mt-4 hover:text-[#0093CB] transition-colors w-fit"
          >
            <MdArrowBack size={20} />
            <span className="text-sm">Back to My Account</span>
          </Link>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tight mb-8">
            My Booking &amp; Trips
          </h1>

          {/* Timeline Center Section - moved higher up (pt-4) */}
          <div className="flex justify-center items-center pt-2 pb-6 px-4">
            <div className="w-full max-w-[760px] flex justify-center">
              <img
                src="/menuLogo/Frame 692.svg"
                alt="Empty Booking Timeline"
                className="w-full h-auto max-h-[280px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom white section */}
      <div className="bg-white">
        <ContactFooter />
        <Footer />
      </div>
    </div>
  );
};

export default BookingDetails;
