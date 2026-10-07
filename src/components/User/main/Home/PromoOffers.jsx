import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Tag, ArrowRight, Plane, Hotel } from "lucide-react";

const offersData = [
  {
    category: "Flights",
    badge: "Limited Offer",
    title: "Flat 12% Off on Domestic Flights",
    description: "Plan your trip with ICICI Bank Credit Cards and save up to ₹2,500 on major domestic airlines.",
    code: "CTICICI",
    icon: <Plane className="text-[#f15a22]" size={20} />,
    bgColor: "from-orange-500/5 to-amber-500/5",
    borderColor: "border-orange-100",
    tab: "flights"
  },
  {
    category: "Hotels",
    badge: "Mega Sale",
    title: "Up to 30% Off on Premium Resorts",
    description: "Book luxury stays in Goa, Bali, or Udaipur using HDFC debit cards and enjoy complimentary meals.",
    code: "LUXSTAYS",
    icon: <Hotel className="text-[#005fad]" size={20} />,
    bgColor: "from-[#005fad]/5 to-blue-500/5",
    borderColor: "border-blue-100",
    tab: "stays"
  },
  {
    category: "Flights",
    badge: "International",
    title: "Save ₹10,000 on Flights to Europe",
    description: "Get flat discounts on international flights to London, Paris, Rome, or Amsterdam using SBI cards.",
    code: "CTGLOBAL",
    icon: <Plane className="text-[#f15a22]" size={20} />,
    bgColor: "from-orange-500/5 to-amber-500/5",
    borderColor: "border-orange-100",
    tab: "flights"
  },
  {
    category: "Hotels",
    badge: "Weekend Special",
    title: "Buy 2 Nights, Get 1 Night FREE",
    description: "Enjoy a weekend escape in selected boutique hotels. Valid on all credit card transactions.",
    code: "FREEWEEKEND",
    icon: <Hotel className="text-[#005fad]" size={20} />,
    bgColor: "from-[#005fad]/5 to-blue-500/5",
    borderColor: "border-blue-100",
    tab: "stays"
  },
  {
    category: "Flights",
    badge: "New User",
    title: "Zero Convenience Fee on First Flight",
    description: "Sign up today and get zero convenience fee on your first flight ticket booking.",
    code: "FIRSTFREE",
    icon: <Sparkles className="text-purple-600" size={20} />,
    bgColor: "from-purple-500/5 to-indigo-500/5",
    borderColor: "border-purple-100",
    tab: "flights"
  },
  {
    category: "Hotels",
    badge: "Homestays",
    title: "Flat 20% Off on Cozy Villas & Chalets",
    description: "Escape to private country houses and homestays. Promo code applicable on online payments.",
    code: "HOME20",
    icon: <Hotel className="text-emerald-600" size={20} />,
    bgColor: "from-emerald-500/5 to-teal-500/5",
    borderColor: "border-emerald-100",
    tab: "stays"
  }
];

const PromoOffers = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const filteredOffers = activeTab === "All"
    ? offersData
    : offersData.filter(o => o.category === activeTab);

  return (
    <section className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="text-left">
          <span className="text-[10px] font-black text-[#005fad] uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded border border-blue-100 inline-block mb-2">
            Super Deals
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight font-[Unbounded] text-left">
            Exclusive Offers & Bank Discounts
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1 self-start md:self-center font-bold text-xs">
          {["All", "Flights", "Hotels"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md transition cursor-pointer border-none ${
                activeTab === tab 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-800 bg-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer, idx) => (
          <div 
            key={idx}
            className={`border rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition bg-gradient-to-br bg-white ${offer.bgColor} ${offer.borderColor}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-2xs">
                  {offer.icon}
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400 bg-white border border-gray-150 px-2 py-0.5 rounded-full">
                  {offer.badge}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-gray-900 leading-snug mb-2 text-left font-[Unbounded]">
                {offer.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 text-left font-medium">
                {offer.description}
              </p>
            </div>

            <div className="border-t border-dashed border-gray-200/85 pt-4 flex items-center justify-between mt-2">
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                <Tag size={12} className="text-gray-400" />
                <span className="text-[11px] font-black text-gray-700 tracking-wider uppercase font-mono select-all">
                  {offer.code}
                </span>
              </div>

              <button
                onClick={() => {
                  navigate(offer.tab === "stays" ? "/hotel" : `/${offer.tab}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group px-4 py-2 bg-gray-900 text-white text-[11px] font-extrabold rounded-lg hover:bg-gray-800 transition flex items-center gap-1.5 cursor-pointer border-none shadow-xs"
              >
                <span>Book Now</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoOffers;
