import React from "react";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";

const OfferDetail = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="w-full relative overflow-hidden flex flex-col items-center">
          {/* Heading overlay */}
          <img
            src="/carrentallogo/Heading 1 → Life Is Adventure Make.svg"
            alt="Life Is Adventure"
            style={{
              width: "800px",
              height: "80px",
              top: "50px",
              left: "200px",
              zIndex: 10,
            }}
            className="absolute h-auto hidden lg:block"
          />
          {/* Fallback for smaller screens */}
          <img
            src="/carrentallogo/Heading 1 → Life Is Adventure Make.svg"
            alt="Life Is Adventure"
            className="w-[90%] h-auto lg:hidden pt-10"
          />

          <img
            src="/carrentallogo/Frame.svg"
            alt="Offer Detail"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full flex justify-center px-4 py-10">
          <img
            src="/carrentallogo/Spring.svg"
            alt="Spring Banner"
            className="w-full max-w-[1271px] h-auto object-contain opacity-100"
          />
        </div>
        <div className="flex items-baseline justify-between px-10">
          <h1 className="text-2xl font-bold tracking-tight">Explore all things to do in phuket</h1>
          <p className="text-[11px] font-bold text-gray-400 tracking-widest">THE 10 BEST Phuket tours & Excursions</p>
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-10 mt-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-start animate-fadeIn">
            {/* Left Sidebar - Frame (1).svg */}
            <div className="w-full lg:w-[240px] flex-shrink-0">
              <img
                src="/menuLogo/Frame (1).svg"
                alt="Filters"
                className="w-full h-auto shadow-sm rounded-lg"
              />
            </div>

            {/* Main Content - Frame (2).svg */}
            <div className="flex-grow">
              <img
                src="/menuLogo/Frame (2).svg"
                alt="Search Results"
                className="w-full h-auto shadow-sm rounded-lg"
              />
            </div>

            {/* Right Sidebar - Frame 744.svg */}
            <div className="w-full lg:w-[320px] flex-shrink-0">
              <img
                src="/menuLogo/Frame 744.svg"
                alt="Promotions"
                className="w-full h-auto shadow-sm rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>
      <ContactFooter />
      <Footer />
    </div>
  );
};

export default OfferDetail;
