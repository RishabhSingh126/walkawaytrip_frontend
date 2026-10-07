import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";

const FAQ_ITEMS = [
  {
    question: "What is the onboarding experience usually like?",
    answer: "We try to make the experience as smooth for our customers as possible. This means we will NOT ask you to fill out giant FAQ forms or create any other training material. You would simply need to forward some past customer interaction (past chats/past emails) to us and we will do the rest. We will train our live customer chat simulator on your process, which would further train people."
  },
  {
    question: "What is your platform, and how does it work?",
    answer: "Our platform is an all-in-one Online Travel Agency (OTA) that helps you search, customize, and book flights, hotels, car rentals, and activities worldwide. We use smart algorithms and partnerships to aggregate the best prices and lay them out in a clean, user-friendly interface."
  },
  {
    question: "How is this OTA different from other travel booking websites?",
    answer: "Unlike traditional booking engines, we focus on personalization and a seamless user experience. We offer advanced AI assistance for travel planning, locked-in exchange rates via ForeX cards, and simplified visa guidance all in one place, with no hidden fees."
  },
  {
    question: "Does your platform only offer flight and hotel bookings, or are there other travel services as well?",
    answer: "In addition to flights and hotels, we provide comprehensive travel services including car rentals, local tour excursions, custom activities, real-time travel insurance applications, and detailed visa/passport guidance tools."
  },
  {
    question: "Do I need to create an account to make a booking?",
    answer: "No, you can search and proceed with bookings as a guest. However, creating a free account allows you to save your preferences, access exclusive member discounts, view booking history, track upcoming plans, and build your travel wishlist."
  },
  {
    question: "Is there a mobile app available for this platform?",
    answer: "Yes, our web application is fully optimized for mobile devices. We also have native iOS and Android apps available for download, allowing you to access your itineraries, boarding passes, and customer support offline while traveling."
  },
  {
    question: "Can I book flights and hotels together in a package?",
    answer: "Absolutely! You can bundle flights and hotels together to access special package pricing, which often saves you up to 20% compared to booking them separately. Simply choose the package option during your search."
  },
  {
    question: "Is 24/7 customer support available?",
    answer: "Yes, we provide round-the-clock support. You can reach us via our live AI chatbot, email us at support@walkawaytrip.com, or call our emergency hotline directly for immediate assistance with any booking queries or travel emergencies."
  }
];

const Gallery = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
        {/* Back Link */}
        <Link
          to="/main"
          className="flex items-center gap-2 text-gray-800 font-medium mb-8 hover:text-[#0093CB] transition-colors w-fit"
        >
          <MdArrowBack size={18} />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Gallery Content Row - overlapping layout on desktop */}
        <div className="relative w-full min-h-[380px] lg:min-h-[480px] mt-4 lg:mt-8">
          {/* Left Side: Frame 1118.svg (Logo / Subtitle / Upload Button) */}
          <div className="w-full lg:w-[70%] lg:absolute lg:left-0 lg:top-[60px] z-10">
            <img
              src="/images/Frame 1118.svg"
              alt="Gallery Text Header"
              className="w-full h-auto object-contain block"
              style={{ opacity: 1 }}
            />
          </div>

          {/* Right Side: Group 21.svg (Staggered Photo Cards overlapping on top) */}
          <div className="w-full lg:w-[50%] lg:absolute lg:right-0 lg:top-0 z-20 mt-8 lg:mt-0">
            <img
              src="/images/Group 21.svg"
              alt="Gallery Visual Grid"
              className="w-full h-auto object-contain block"
              style={{ opacity: 1 }}
            />
          </div>
        </div>

        {/* Gallery Showcase Grid Section */}
        <div className="mt-[-10px] lg:mt-[-30px] w-full">
          <img
            src="/images/Gallery-07.svg"
            alt="Gallery Showcase Grid"
            className="w-full h-auto object-contain block rounded-xl"
            style={{ opacity: 1 }}
          />
        </div>

        {/* Handpicked Hotels & Resorts Section */}
        <div className="mt-16 lg:mt-24 w-full overflow-x-auto pb-6 scrollbar-hide">
          {/* Desktop Layout (Scaled Down by 0.65 to fit standard viewports without scrollbar) */}
          <div className="relative max-w-[1144px] w-full h-[389px] hidden lg:block mx-auto">
            {/* 1st picture (vertical landscape) */}
            <img
              src="/images/Photo rectangle.svg"
              alt="Misty Mountains Vertical"
              className="absolute object-cover block shadow-sm"
              style={{ width: "310px", height: "389px", top: "0px", left: "0px", opacity: 1 }}
            />

            {/* Header Text Block */}
            <div className="absolute" style={{ left: "330px", top: "26px", width: "220px" }}>
              <h2 className="text-2xl font-bold text-gray-950 tracking-tight leading-tight">
                Handpicked <br /> Hotels & Resorts
              </h2>
              <p className="text-gray-600 mt-2 text-xs max-w-[270px]">
                Experience comfort and elegance with our curated collection of top-rated accommodations.
              </p>
            </div>

            {/* Book Hotels Button */}
            <button
              className="absolute border border-[#0093CB] text-[#0093CB] font-semibold px-4.5 py-2.5 rounded-none text-[10px] hover:bg-[#0093CB] hover:text-white transition-all shadow-sm flex-shrink-0"
              style={{ right: "0px", top: "26px" }}
            >
              Book Hotels
            </button>

            {/* Left landscape card */}
            <img
              src="/images/Photo rectangle (1).svg"
              alt="Wooden Cabin Resort"
              className="absolute object-cover block shadow-sm"
              style={{ width: "196px", height: "132px", top: "234px", left: "254px", opacity: 1 }}
            />

            {/* Right landscape card */}
            <img
              src="/images/Photo rectangle.svg"
              alt="Misty Fields Landscape"
              className="absolute object-cover block shadow-sm"
              style={{ width: "196px", height: "132px", top: "234px", left: "467px", opacity: 1 }}
            />

            {/* Staggered Image 1 */}
            <img
              src="/images/Photo rectangle.svg"
              alt="Staggered Photo 1"
              className="absolute object-cover block shadow-sm border border-gray-100"
              style={{ width: "208px", height: "208px", top: "0px", left: "564px", opacity: 1 }}
            />

            {/* Staggered Image 2 */}
            <img
              src="/images/Photo rectangle.svg"
              alt="Staggered Photo 2"
              className="absolute object-cover block shadow-sm border border-gray-100"
              style={{ width: "208px", height: "208px", top: "91px", left: "743px", opacity: 1 }}
            />

            {/* Staggered Image 3 */}
            <img
              src="/images/Photo rectangle.svg"
              alt="Staggered Photo 3"
              className="absolute object-cover block shadow-sm border border-gray-100"
              style={{ width: "208px", height: "208px", top: "181px", left: "936px", opacity: 1 }}
            />
          </div>

          {/* Mobile/Tablet Layout (Responsive Fallback) */}
          <div className="lg:hidden flex flex-col gap-6 w-full">
            {/* Header Block */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight leading-tight">
                  Handpicked Hotels & Resorts
                </h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Experience comfort and elegance with our curated collection of top-rated accommodations.
                </p>
              </div>
              <button className="border border-[#0093CB] text-[#0093CB] font-semibold px-4 py-2 rounded-none text-xs hover:bg-[#0093CB] hover:text-white transition-all shadow-sm flex-shrink-0">
                Book Hotels
              </button>
            </div>

            {/* Vertical Image */}
            <img
              src="/images/Photo rectangle.svg"
              alt="Misty Mountains Vertical"
              className="w-full h-auto object-contain block shadow-sm"
              style={{ opacity: 1 }}
            />

            {/* Landscape Images */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <img
                src="/images/Photo rectangle (1).svg"
                alt="Cabin Resort"
                className="w-full h-auto object-contain block shadow-sm"
                style={{ opacity: 1 }}
              />
              <img
                src="/images/Photo rectangle.svg"
                alt="Misty Fields"
                className="w-full h-auto object-contain block shadow-sm"
                style={{ opacity: 1 }}
              />
            </div>

            {/* Staggered Images (displayed as 3 horizontal cards) */}
            <div className="grid grid-cols-3 gap-3 w-full">
              <img
                src="/images/Photo rectangle.svg"
                alt="Staggered 1"
                className="w-full h-auto object-contain block shadow-sm"
                style={{ opacity: 1 }}
              />
              <img
                src="/images/Photo rectangle.svg"
                alt="Staggered 2"
                className="w-full h-auto object-contain block shadow-sm"
                style={{ opacity: 1 }}
              />
              <img
                src="/images/Photo rectangle.svg"
                alt="Staggered 3"
                className="w-full h-auto object-contain block shadow-sm"
                style={{ opacity: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Gallery Showcase Grid Section (Gallery-12.svg) */}
        <div className="mt-16 lg:mt-16 w-full">
          <img
            src="/images/Gallery-12.svg"
            alt="Gallery Showcase Grid Secondary"
            className="w-full h-auto object-contain block"
            style={{ opacity: 1 }}
          />
        </div>

        {/* Gallery Promo FAQ Section */}
        <div className="mt-16 lg:mt-24 w-full flex flex-col lg:flex-row items-stretch gap-8">
          
          {/* Left Column: FAQ Accordion */}
          <div className="flex-grow lg:w-[60%] flex flex-col justify-center">
            {/* Large FAQ watermark + Subtitle */}
            <div className="relative text-center mb-8 select-none">
              <h1 className="absolute inset-0 flex items-center justify-center text-[50px] md:text-[100px] sm:text-[70px] md:text-[140px] md:text-[80px] md:text-[160px] font-black text-[#0093CB]/10 uppercase pointer-events-none tracking-wider -top-6 sm:-top-10">
                FAQ's
              </h1>
              <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight pt-6 sm:pt-8">
                Answering Your Queries Before You Get Started
              </h2>
            </div>

            <div className="space-y-2 w-full">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-[14px] border transition-colors duration-200 overflow-hidden ${
                      isOpen
                        ? "bg-[#EAF6FA] border-[#88CBE0]"
                        : "bg-white border-[#C6DDE4]"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full text-left py-3 px-5 md:py-3.5 md:px-6 focus:outline-none cursor-pointer"
                    >
                      <span
                        className={`block font-bold text-xs sm:text-sm md:text-base transition-colors ${
                          isOpen ? "text-[#0093CB] mb-1.5" : "text-gray-700"
                        }`}
                      >
                        {faq.question}
                      </span>
                      {isOpen && (
                        <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm leading-relaxed font-semibold mt-1">
                          {faq.answer}
                        </p>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Original Image (Cropped to show right side graphic) */}
          <div className="w-full lg:w-[40%] rounded-[20px] overflow-hidden min-h-[300px] lg:min-h-[450px] relative">
            <img
              src="/images/Frame 1124.svg"
              alt="Promo Graphic"
              className="absolute inset-0 w-full h-full object-cover object-right"
              style={{ opacity: 1 }}
            />
          </div>

        </div>

        {/* Text Banner Section (textPart.svg) */}
        <div className="mt-12 lg:mt-20 w-full flex justify-center">
          <img
            src="/images/textPart.svg"
            alt="Book your next adventure today and turn your travel dreams into reality!"
            className="w-full max-w-[820px] h-auto object-contain block"
            style={{ opacity: 1 }}
          />
        </div>
      </main>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default Gallery;
