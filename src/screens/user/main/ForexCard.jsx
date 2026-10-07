import React from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";

const ForexCard = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div>
        {/* Navbar */}
        <Navbar transparent={false} />

        {/* Content Section */}
        <main className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/travel-tools" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#0093CB] transition-colors"
            >
              <MdArrowBack size={15} />
              Back to Travel Tools
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 font-[Unbounded] tracking-tight mb-4">
              Prepaid Forex Card Guide
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed">
              Find complete visual guides, key benefits, and essential buying checklists below to pick the best travel card for your next journey.
            </p>
          </div>

          <div className="space-y-16">
            
            {/* Section 1: Benefits */}
            <section className="space-y-6">
              <div className="border-l-4 border-[#0093CB] pl-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 font-[Unbounded] tracking-tight">
                  Benefits of a Prepaid Forex Card
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                  Understand why travel cards are safer and more economical than carrying cash or standard credit cards abroad.
                </p>
              </div>

              {/* Benefits Image Card */}
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white p-2 sm:p-4 hover:scale-[1.005]">
                <img 
                  src="https://www.axis.bank.in/images/default-source/blogsimages/7-benefits-of-a-prepaid-forex-card-link-5.png" 
                  alt="Benefits of a Prepaid Forex Card"
                  className="w-full h-auto block object-contain rounded-2xl mx-auto max-h-[850px] shadow-2xs select-none"
                  loading="eager"
                />
              </div>
            </section>

            {/* Section 2: Buying Checklist */}
            <section className="space-y-6">
              <div className="border-l-4 border-[#0093CB] pl-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 font-[Unbounded] tracking-tight">
                  What to look for when buying a Forex Card
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                  Review this helpful checklist covering exchange rates, hidden charges, and reloading terms before choosing a card.
                </p>
              </div>

              {/* Checklist Image Card */}
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white p-2 sm:p-4 hover:scale-[1.005]">
                <img 
                  src="https://cdn.bookmyforex.com/blog/uploads/2026/04/what-to-look-for-when-buying-a-forex-card.png" 
                  alt="What to look for when buying a Forex Card"
                  className="w-full h-auto block object-contain rounded-2xl mx-auto max-h-[850px] shadow-2xs select-none"
                  loading="eager"
                />
              </div>
            </section>

          </div>
        </main>
      </div>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default ForexCard;
