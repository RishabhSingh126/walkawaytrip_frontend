import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";

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

const CustomerSupport = () => {
  const [question, setQuestion] = useState("");
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSendQuestion = () => {
    if (!question.trim()) {
      toast.error("Please enter your question before sending.");
      return;
    }
    toast.success("Your question has been sent successfully!");
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20 pb-4 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        {/* Back Link */}
        <Link
          to="/main"
          className="flex items-center gap-2 text-gray-800 font-medium mb-5 hover:text-[#0093CB] transition-colors w-fit"
        >
          <MdArrowBack size={18} />
          <span className="text-sm">Back to Home</span>
        </Link>


      </main>

      {/* Banner Section - Frame 1055.svg */}
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        <div className="relative overflow-hidden bg-gray-50 border border-gray-100 rounded-2xl">
          <img
            src="/images/Frame 1055.svg"
            alt="Customer Support Banner"
            className="w-full h-auto block max-h-[400px] object-cover object-center"
          />
        </div>
      </div>

      {/* Spacing/Gap between sections */}
      <div className="h-[120px]" />

      {/* Main Content Section - Frame 1076.svg */}
      <div className="w-full px-5 sm:px-6 lg:px-10 max-w-[1460px] mx-auto">
        <div className="flex justify-center w-full">
          <img
            src="/images/Frame 1076.svg"
            alt="Customer Support Details"
            className="w-full max-w-[700px] h-auto block object-contain"
            style={{
              maxHeight: "750px",
              opacity: 1,
            }}
          />
        </div>
      </div>

      <div className="h-[120px]" />


      {/* Spacing/Gap of 50px before Questions section */}
      <div className="h-[40px]" />

      {/* Questions Section - Interactive FAQ Accordion */}
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-[1560px] mx-auto">
        {/* Large FAQ watermark + Subtitle */}
        <div className="relative text-center mb-12 select-none">
          <h1 className="absolute inset-0 flex items-center justify-center text-[50px] md:text-[100px] sm:text-[70px] md:text-[140px] md:text-[90px] md:text-[180px] font-black text-[#0093CB]/10 uppercase pointer-events-none tracking-wider -top-6 sm:-top-10">
            FAQ's
          </h1>
          <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight pt-6 sm:pt-8">
            Answering Your Queries Before You Get Started
          </h2>
        </div>

        <div className="space-y-2 max-w-[1400px] mx-auto">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-[14px] border transition-colors duration-200 overflow-hidden ${isOpen
                  ? "bg-[#EAF6FA] border-[#88CBE0]"
                  : "bg-white border-[#C6DDE4]"
                  }`}
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full text-left py-3 px-5 md:py-3.5 md:px-6 focus:outline-none cursor-pointer"
                >
                  <span
                    className={`block font-bold text-xs sm:text-sm md:text-base transition-colors ${isOpen ? "text-[#0093CB] mb-1.5" : "text-gray-700"
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

      <div className="h-[120px]" />


      {/* Spacing/Gap of 40px before Another Question section */}
      <div className="h-[20px]" />

      {/* Another Question, Asked here. Section */}
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-[1096px] mx-auto mb-16">
        {!isSubmitted ? (
          <>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-5 tracking-tight font-[Unbounded]">
              Another Question, Asked here.
            </h2>

            <div className="space-y-4">
              <textarea
                placeholder="Enter your Question"
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4.5 bg-white border border-[#2a99b5]/40 rounded-xl text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#0093CB] focus:ring-1 focus:ring-[#0093CB] transition-all text-sm shadow-sm"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSendQuestion}
                  className="px-10 py-2.5 bg-[#2a99b5] hover:bg-[#20839c] active:bg-[#1b6d82] text-white font-bold rounded-lg transition-colors duration-200 text-sm shadow-md cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-br from-[#0093CB]/5 to-indigo-50 border border-[#0093CB]/20 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden flex flex-col items-center gap-4 animate-fade-in-up">
            
            {/* Sparkles celebration micro-animations */}
            <div className="absolute top-2 left-6 text-yellow-400 animate-pulse text-2xl">✨</div>
            <div className="absolute top-8 right-12 text-yellow-400 animate-bounce text-xl">✨</div>
            <div className="absolute bottom-4 left-1/4 text-indigo-450 animate-pulse text-lg">✨</div>
            <div className="absolute bottom-6 right-1/4 text-teal-400 animate-bounce text-xl">✨</div>
            <div className="absolute top-1/2 left-8 text-pink-400 animate-bounce text-lg">✨</div>
            <div className="absolute top-1/3 right-8 text-purple-400 animate-pulse text-xl">✨</div>

            {/* Inline CSS styling for Diwali Rocket Launch & Blast */}
            <style>{`
              @keyframes rocketLaunch {
                0% {
                  transform: translateY(180px) rotate(-10deg) scale(0.6);
                  opacity: 0;
                }
                15% {
                  opacity: 1;
                }
                60% {
                  transform: translateY(-90px) rotate(-10deg) scale(1);
                  opacity: 1;
                }
                65%, 100% {
                  transform: translateY(-90px) scale(0);
                  opacity: 0;
                }
              }
              @keyframes rocketBlast {
                0%, 58% {
                  transform: scale(0);
                  opacity: 0;
                }
                64% {
                  transform: scale(0.3);
                  opacity: 0.8;
                }
                72% {
                  transform: scale(2.2);
                  opacity: 1;
                }
                85% {
                  transform: scale(1.6);
                  opacity: 0.5;
                }
                100% {
                  transform: scale(0);
                  opacity: 0;
                }
              }
            `}</style>

            {/* Custom Rocket Launch and Blast Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              {/* Rocket 1 (Left side) */}
              <div 
                className="absolute left-[15%] bottom-0 text-3xl"
                style={{
                  animation: "rocketLaunch 3.2s infinite ease-in"
                }}
              >
                🚀
              </div>
              <div 
                className="absolute left-[15%] text-4xl"
                style={{
                  top: "22%",
                  transform: "translateX(-15%)",
                  animation: "rocketBlast 3.2s infinite ease-out"
                }}
              >
                💥
              </div>

              {/* Rocket 2 (Right side) */}
              <div 
                className="absolute right-[15%] bottom-0 text-3xl"
                style={{
                  animation: "rocketLaunch 3.2s infinite ease-in 1.6s"
                }}
              >
                🚀
              </div>
              <div 
                className="absolute right-[15%] text-4xl"
                style={{
                  top: "22%",
                  transform: "translateX(15%)",
                  animation: "rocketBlast 3.2s infinite ease-out 1.6s"
                }}
              >
                💥
              </div>
            </div>

            {/* Colorful Confetti Pieces */}
            <div className="absolute top-1/4 left-16 w-3 h-3 bg-pink-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute top-10 left-1/3 w-2 h-4 bg-yellow-400 rotate-12 animate-bounce opacity-80"></div>
            <div className="absolute top-16 right-20 w-3 h-3 bg-green-400 rotate-45 animate-pulse opacity-75"></div>
            <div className="absolute top-1/3 right-1/3 w-4 h-2 bg-blue-400 -rotate-12 animate-ping opacity-80"></div>
            <div className="absolute bottom-12 left-20 w-3.5 h-3.5 bg-purple-500 rounded animate-bounce opacity-75"></div>
            <div className="absolute bottom-16 right-1/4 w-2 h-5 bg-teal-400 rotate-45 animate-pulse opacity-80"></div>
            <div className="absolute bottom-6 left-1/3 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-75"></div>

            {/* Glowing success tick */}
            <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md shadow-green-200 animate-scale-in z-10">
              <CheckCircle size={36} className="animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-[Unbounded]">
                Thank You for Asking a Question!
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold max-w-md mx-auto">
                We've successfully received your inquiry. Our support representatives or AI concierge will review your message and reach back shortly.
              </p>
            </div>

            <button
              onClick={() => {
                setQuestion("");
                setIsSubmitted(false);
              }}
              className="mt-2 bg-[#0093CB] hover:bg-[#007094] text-white font-bold text-xs py-2.5 px-6 rounded-lg shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              Ask Another Question
            </button>
          </div>
        )}
      </div>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default CustomerSupport;
