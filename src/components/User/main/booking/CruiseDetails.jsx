import React, { useState } from "react";
import { 
  Ship, Users, Check, Star, ShieldCheck, HelpCircle, 
  MapPin, Sparkles, Building, Info, Heart, Compass, Clock 
} from "lucide-react";
import toast from "react-hot-toast";

// Excursion Database based on Port name
const EXCURSIONS_DATABASE = {
  "Nassau, Bahamas": [
    { id: "exc_nas_1", name: "Atlantis Aquaventure Waterpark", desc: "Experience high-speed waterslides, a mile-long river ride, and 14 lagoons.", price: 9500, rating: 4.8 },
    { id: "exc_nas_2", name: "Pearl Island Beach Escape with Lunch", desc: "Unwind on white-sand beaches, kayak, and enjoy a traditional Bahamian lunch.", price: 4200, rating: 4.5 }
  ],
  "Perfect Day at CocoCay, Bahamas": [
    { id: "exc_coc_1", name: "Thrill Waterpark Day Pass", desc: "Plunge down Daredevil's Peak, the tallest waterslide in North America.", price: 8500, rating: 4.9 },
    { id: "exc_coc_2", name: "Coco Beach Club Pass", desc: "Access the private club, infinity pool, upscale dining, and beachside service.", price: 16000, rating: 4.7 }
  ],
  "Roatan, Honduras": [
    { id: "exc_roa_1", name: "Mayan Eden Eco-Park & Monkey Sanctuary", desc: "Interact with capuchin monkeys, sloths, and tour butterfly gardens.", price: 3800, rating: 4.6 },
    { id: "exc_roa_2", name: "West End Reef Snorkeling by Boat", desc: "Snorkel the world's second-largest barrier reef with guided marine biologists.", price: 5200, rating: 4.7 }
  ],
  "Costa Maya, Mexico": [
    { id: "exc_cos_1", name: "Chacchoben Mayan Ruins Guided Tour", desc: "Walk through ancient temples and climb ceremonial steps in the jungle.", price: 4800, rating: 4.5 },
    { id: "exc_cos_2", name: "Maya Chan Beach Resort All-Inclusive Day", desc: "All-inclusive beach resort day with open bar, buffet, and private palapa.", price: 7500, rating: 4.8 }
  ],
  "Cozumel, Mexico": [
    { id: "exc_coz_1", name: "Playa Mia Grand Beach Park & Buffet", desc: "Splash parks, pools, sailing, and a buffet with authentic local flavors.", price: 4500, rating: 4.4 },
    { id: "exc_coz_2", name: "Underwater Jeep & Snorkel Adventure", desc: "Drive a customized Jeep to a marine park and snorkel the crystal-clear waters.", price: 6900, rating: 4.6 }
  ],
  "Juneau, Alaska": [
    { id: "exc_jun_1", name: "Mendenhall Glacier Guided Walk", desc: "Trek the rainforest to the glacier face and see cascading Nugget Falls.", price: 5500, rating: 4.8 },
    { id: "exc_jun_2", name: "Whale Watching & Wildlife Cruise", desc: "Board a custom vessel to spot humpback whales, sea lions, and eagles.", price: 7200, rating: 4.9 }
  ],
  "Skagway, Alaska": [
    { id: "exc_ska_1", name: "White Pass Scenic Railway Journey", desc: "Ride the vintage railcar along steep cliffs up to the Canadian border.", price: 8900, rating: 4.9 }
  ],
  "Victoria, British Columbia": [
    { id: "exc_vic_1", name: "Butchart Gardens Evening Tour", desc: "Stroll 55 acres of magnificent floral displays illuminated at twilight.", price: 4800, rating: 4.7 }
  ],
  "Halong Bay, Vietnam": [
    { id: "exc_hal_1", name: "Guided Kayaking in Luon Cave", desc: "Paddle through beautiful limestone tunnels into a closed lake sanctuary.", price: 2800, rating: 4.9 },
    { id: "exc_hal_2", name: "Hiking Titop Island Summit", desc: "Climb 400 stone steps for a 360-degree sunset view of the entire bay.", price: 1500, rating: 4.8 }
  ]
};

export default function CruiseDetails({
  cruise,
  guestsCount,
  setGuestsCount,
  selectedRoom,
  setSelectedRoom,
  cruiseDrinkPackage,
  setCruiseDrinkPackage,
  cruiseWifiPackage,
  setCruiseWifiPackage,
  cruiseExcursionPackage,
  setCruiseExcursionPackage,
  selectedCruiseExcursions,
  setSelectedCruiseExcursions,
  cruisePayOption,
  setCruisePayOption,
  cruiseNights,
  setCruiseNights,
  selectedSpaTreatments,
  setSelectedSpaTreatments,
  setView,
  getCruiseCalculatedTotal
}) {
  const [activeSubTab, setActiveSubTab] = useState("overview"); // overview | itinerary | cabins | deckplans | inclusions | dining | wellness | activities | policies
  const [expandedExcursionPort, setExpandedExcursionPort] = useState(null);

  if (!cruise) return null;

  const totalGuests = (guestsCount.adults || 2) + (guestsCount.children || 0);

  // Cabin options detailed description
  const cabinInfo = [
    {
      name: "Interior Stateroom",
      desc: "Perfect budget option. Cozy stateroom featuring twin beds that convert to royal king, a private vanity area, and virtual window showing live view.",
      size: "160 sq. ft."
    },
    {
      name: "Ocean View Balcony",
      desc: "Step out onto your private balcony overlooking the pristine ocean. Separate sitting area, luxurious bedding, and floor-to-ceiling glass doors.",
      size: "210 sq. ft. + 50 sq. ft. balcony"
    },
    {
      name: "Sky Loft Suite",
      desc: "Split-level loft suite with panoramic double-height ocean views. Dining area, private balcony with jacuzzi, dedicated concierge service, and suite lounge access.",
      size: "740 sq. ft. + 120 sq. ft. balcony"
    },
    {
      name: "Grand Suite - 1 Bedroom",
      desc: "A spacious one-bedroom suite with marble bathroom, tub, large balcony with loungers, and full suite privileges including VIP theater access.",
      size: "385 sq. ft. + 105 sq. ft. balcony"
    },
    {
      name: "Owner's Suite - 1 Bedroom",
      desc: "Expansive suite with premium dining, full bar setup, dining table, master bath with double vanity, and complete VIP cruise experience.",
      size: "540 sq. ft. + 150 sq. ft. balcony"
    },
    {
      name: "Grand Suite - 2 Bedroom",
      desc: "Perfect for families. Two bedrooms, two bathrooms, a living area with double sofa bed, and private wrap-around balcony.",
      size: "580 sq. ft. + 210 sq. ft. balcony"
    },
    // Hera Cruises cabins
    {
      name: "Junior Suite with Balcony",
      desc: "Vietnamese Indochine style, glass walls with panoramic bay views, private balcony, luxury handmade wooden details, and deep copper en-suite bathtub.",
      size: "320 sq. ft."
    },
    {
      name: "Executive Suite",
      desc: "Double-height panoramic view ceilings. Direct access to the sundeck and spa neighborhood, premium organic bedding, and dedicated private butler service.",
      size: "460 sq. ft."
    },
    {
      name: "Presidential Suite",
      desc: "The ultimate luxury at Halong Bay. Expansive private deck, private jacuzzi, separate living & dining lounge, personalized organic menus, and unlimited spa therapies.",
      size: "820 sq. ft."
    }
  ];

  // Excursion toggle helper
  const handleExcursionToggle = (exc) => {
    const exists = selectedCruiseExcursions.some(e => e.id === exc.id);
    if (exists) {
      setSelectedCruiseExcursions(prev => prev.filter(e => e.id !== exc.id));
      toast.success(`Removed ${exc.name}`);
    } else {
      setSelectedCruiseExcursions(prev => [...prev, exc]);
      toast.success(`Added ${exc.name} to itinerary`);
    }
  };

  // Switch display itinerary based on selected nights for Hera Cruises
  const displayItinerary = cruise.line === "Hera Cruises" 
    ? (cruiseNights === 1 
        ? [
            cruise.itinerary[0], 
            { day: 2, port: "Halong Bay, Vietnam", activities: "Morning Tai Chi session on the deck. Cooking class making fresh spring rolls and disembarkation at Tuan Chau harbor." }
          ] 
        : cruise.itinerary) 
    : cruise.itinerary;

  return (
    <div className="mx-auto w-full max-w-6xl flex flex-col gap-6 text-left animate-fade-in">
      
      {/* Back button navigation */}
      <button
        type="button"
        onClick={() => setView("results")}
        className="text-xs font-bold text-gray-500 hover:text-[#003580] flex items-center gap-1.5 w-fit cursor-pointer border-none bg-transparent"
      >
        &larr; Back to Cruise Listings
      </button>

      {/* Header Banner */}
      <div className="flex justify-between items-start gap-4 flex-wrap border-b border-gray-150 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
              {cruise.line} International
            </span>
            <span className="text-gray-400 text-xs font-semibold">🚢 {cruise.ship}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">{cruise.name}</h2>
          <p className="text-xs text-gray-500 font-bold mt-1.5 flex items-center gap-3">
            <span className="text-yellow-500 font-extrabold flex items-center gap-0.5">
              ★ {cruise.rating}
            </span>
            <span>({cruise.reviewsCount.toLocaleString()} reviews)</span>
            <span>·</span>
            <span>⏱️ {cruiseNights} Nights / {cruiseNights + 1} Days</span>
          </p>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="bg-emerald-50 text-emerald-700 text-xs font-black uppercase px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm w-fit self-end">
            Best Price Guarantee
          </span>
          <span className="text-[10px] text-gray-455 font-bold">100% Rate Drop Protection Enabled</span>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-150 relative group">
          <img src={cruise.image} alt={cruise.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-1 rounded">Ship Exterior</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
          <div className="h-32 sm:h-[152px] rounded-xl overflow-hidden border border-gray-150 relative group">
            <img src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=400&auto=format&fit=crop&q=80" alt="stateroom" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>
            <div className="absolute bottom-3 left-3 text-white text-[9px] font-extrabold">Deluxe Staterooms</div>
          </div>
          <div className="h-32 sm:h-[152px] rounded-xl overflow-hidden border border-gray-150 relative group">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80" alt="island" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>
            <div className="absolute bottom-3 left-3 text-white text-[9px] font-extrabold">Voyage Exploration</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Content on Left, Calculator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (70%) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sub Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto bg-white rounded-t-xl px-4 pt-2 shadow-xs scrollbar-hide gap-1">
            {[
              { id: "overview", label: "Overview & Stats" },
              { id: "itinerary", label: "Interactive Itinerary" },
              { id: "cabins", label: "Cabins & Suites" },
              { id: "deckplans", label: "Deck Plans" },
              { id: "inclusions", label: "What's Included" },
              { id: "dining", label: "Dining & Drinks" },
              { id: "wellness", label: "Wellness & Spa" },
              { id: "activities", label: "Activities" },
              { id: "policies", label: "Policies & FAQs" }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id)}
                className={`pb-3 px-4 text-xs font-black tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeSubTab === tab.id
                    ? "border-[#003580] text-[#003580]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB: OVERVIEW */}
          {activeSubTab === "overview" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="space-y-3">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2">
                  Ship Profile & Overview
                </h3>
                <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                  Cruising aboard the magnificent <strong>{cruise.ship}</strong> represents the pinnacle of modern luxury at sea. {cruise.line === "Hera Cruises" ? "Featuring high-quality wooden furnishings, Indochine-inspired décor, and aesthetic elements representing the five natural elements, the ship focuses on boutique wellness and personalized care." : "Operated by Royal Caribbean International, this ship offers groundbreaking neighborhoods, unique architectural marvels, and top-tier dining. From the high-energy Thrill Waterpark to the peaceful adults-only Solarium retreat, there is something crafted for every vacationer style."}
                </p>
              </div>

              {/* Ship Stats Grid */}
              <div>
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-3">Ship Statistics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                  {[
                    { label: "Gross Tonnage", value: cruise.line === "Hera Cruises" ? "2,200 tons" : "250,800 tons", icon: "⚖️" },
                    { label: "Overall Length", value: cruise.line === "Hera Cruises" ? "180 feet" : "1,198 feet", icon: "📐" },
                    { label: "Passenger Capacity", value: cruise.line === "Hera Cruises" ? "24 guests" : "5,610 guests", icon: "👥" },
                    { label: "Total Decks", value: cruise.line === "Hera Cruises" ? "4 Decks" : "20 Decks", icon: "🏢" },
                    { label: "Crew Members", value: cruise.line === "Hera Cruises" ? "18 professionals" : "2,350 professionals", icon: "👮" },
                    { label: "Build Year", value: cruise.line === "Hera Cruises" ? "2023 / Refitted 2025" : "2024 / Refitted 2026", icon: "🏗️" },
                    { label: "Cruising Speed", value: cruise.line === "Hera Cruises" ? "12 knots" : "22 knots (25 mph)", icon: "⚡" },
                    { label: "Registry Port", value: cruise.line === "Hera Cruises" ? "Halong, Vietnam" : "Nassau, Bahamas", icon: "🇻🇳" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 p-3 rounded-xl">
                      <span className="text-base block mb-0.5">{stat.icon}</span>
                      <span className="block text-[10px] font-black text-gray-800">{stat.label}</span>
                      <span className="block text-[10px] text-gray-500 font-bold mt-0.5">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-3">Onboard Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 font-semibold">
                  {(cruise.highlights || [
                    "Thrill Waterpark (largest waterslide in North America)",
                    "AquaDome aqua shows and dining venues",
                    "Surfside family-friendly neighborhood",
                    "Solarium adults-only retreat and luxury pool",
                    "Broadway shows in the Royal Theater"
                  ]).map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Onboard Neighborhoods */}
              {cruise.neighborhoods && cruise.neighborhoods.length > 0 && (
                <div className="border-t border-gray-100 pt-4 text-left">
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-3">Onboard Neighborhoods & Zones</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cruise.neighborhoods.map((zone, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-start gap-3">
                        <span className="text-2xl mt-0.5">{zone.icon}</span>
                        <div>
                          <h5 className="font-extrabold text-xs text-gray-850">{zone.name}</h5>
                          <p className="text-[10px] text-gray-500 font-semibold leading-relaxed mt-1">{zone.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: ITINERARY (Interactive with Shore Excursions) */}
          {activeSubTab === "itinerary" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-4 animate-fade-in">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-1">
                  Interactive Day-by-Day Voyage
                </h3>
                <p className="text-xs text-gray-400 font-semibold mb-4">
                  Click on <strong>“View Shore Excursions”</strong> to add custom local activities to your reservation.
                </p>

                {/* Itinerary Duration Switcher (Hera Cruises / General Choice) */}
                {cruise.line === "Hera Cruises" && (
                  <div className="flex gap-2 mb-4 bg-gray-50 p-1 rounded-lg border border-gray-100 w-fit">
                    <button
                      type="button"
                      onClick={() => {
                        setCruiseNights(1);
                        toast.success("Switched to 2 Days / 1 Night Voyage");
                      }}
                      className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition cursor-pointer border-none ${
                        cruiseNights === 1 ? "bg-[#003580] text-white shadow-xs" : "bg-transparent text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      2 Days / 1 Night
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCruiseNights(2);
                        toast.success("Switched to 3 Days / 2 Nights Voyage");
                      }}
                      className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition cursor-pointer border-none ${
                        cruiseNights === 2 ? "bg-[#003580] text-white shadow-xs" : "bg-transparent text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      3 Days / 2 Nights
                    </button>
                  </div>
                )}
              </div>

              <div className="relative border-l-2 border-blue-100 pl-5 ml-3.5 space-y-8">
                {displayItinerary.map((dayItem, idx) => {
                  const portExcursions = EXCURSIONS_DATABASE[dayItem.port] || [];
                  const isExpanded = expandedExcursionPort === dayItem.port;

                  return (
                    <div key={idx} className="relative">
                      {/* Anchor Timeline Dot */}
                      <div className="absolute -left-[27px] top-1.5 w-3 h-3 bg-blue-600 border-2 border-white rounded-full shadow-sm" />
                      
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <span className="bg-blue-50 text-[#003580] text-[9px] font-black uppercase px-2 py-0.5 rounded border border-blue-150">
                          Day {dayItem.day}
                        </span>
                        <h4 className="font-extrabold text-xs text-gray-800">{dayItem.port}</h4>
                      </div>

                      <p className="text-[11px] text-gray-500 font-semibold mt-1.5 leading-relaxed">
                        {dayItem.activities}
                      </p>

                      {/* Excursions Action Toggle */}
                      {portExcursions.length > 0 && (
                        <div className="mt-3.5">
                          <button
                            type="button"
                            onClick={() => setExpandedExcursionPort(isExpanded ? null : dayItem.port)}
                            className="bg-gray-100 hover:bg-gray-200 text-[#003580] text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            🌴 {isExpanded ? "Hide Excursions" : `View Shore Excursions (${portExcursions.length})`}
                          </button>

                          {/* Expanded excursions cards */}
                          {isExpanded && (
                            <div className="mt-3 space-y-2.5 bg-blue-50/20 border border-blue-100 rounded-xl p-3.5 animate-fade-in">
                              <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                                Select Shore Excursions for {dayItem.port}
                              </span>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {portExcursions.map(exc => {
                                  const isSelected = selectedCruiseExcursions.some(e => e.id === exc.id);
                                  return (
                                    <div key={exc.id} className="bg-white border border-gray-250/70 p-3 rounded-lg flex flex-col justify-between hover:shadow-xs transition">
                                      <div className="text-left">
                                        <div className="flex justify-between items-start gap-1">
                                          <h5 className="font-extrabold text-xs text-gray-850">{exc.name}</h5>
                                          <span className="text-[10px] text-yellow-500 font-black shrink-0">★ {exc.rating}</span>
                                        </div>
                                        <p className="text-[9px] text-gray-500 font-semibold mt-1 line-clamp-2 leading-relaxed">
                                          {exc.desc}
                                        </p>
                                      </div>

                                      <div className="flex justify-between items-center border-t border-gray-100 pt-2 mt-2">
                                        <span className="text-[10px] font-black text-gray-900">₹{exc.price.toLocaleString()}</span>
                                        <button
                                          type="button"
                                          onClick={() => handleExcursionToggle(exc)}
                                          className={`text-[9px] font-black px-2.5 py-1 rounded cursor-pointer transition ${
                                            isSelected 
                                              ? "bg-emerald-600 text-white" 
                                              : "bg-[#003580] hover:bg-blue-900 text-white"
                                          }`}
                                        >
                                          {isSelected ? "Added ✓" : "Add to Cruise"}
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: CABINS */}
          {activeSubTab === "cabins" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-4 animate-fade-in text-left">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-1">
                  Stateroom Categories & Suites
                </h3>
                <p className="text-xs text-gray-400 font-semibold">
                  Choose a room level. The Fare Calculator sidebar will update instantly based on selection.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {cruise.rooms.map((roomOpt, index) => {
                  const isSelected = selectedRoom?.name === roomOpt.name;
                  const roomDesc = cabinInfo.find(c => c.name === roomOpt.name) || { desc: roomOpt.includes, size: "Standard size" };

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedRoom(roomOpt)}
                      className={`border p-4.5 rounded-xl cursor-pointer flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/20 ring-1 ring-blue-500 shadow-xs"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-blue-600" : "border-gray-300"}`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                          </div>
                          <h4 className="font-extrabold text-sm text-gray-850">{roomOpt.name}</h4>
                          <span className="bg-gray-100 text-gray-500 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wide">
                            {roomDesc.size}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-semibold leading-relaxed mt-2 pl-6">
                          {roomDesc.desc}
                        </p>
                        <span className="text-[10px] text-gray-400 font-bold mt-1.5 block pl-6">
                          Capacity Limit: Max {roomOpt.maxGuests} guests per stateroom.
                        </span>
                      </div>
                      
                      <div className="text-left sm:text-right shrink-0 pl-6 sm:pl-0">
                        <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Per guest rate</span>
                        <span className="text-lg font-black text-gray-950 font-[Unbounded]">₹{roomOpt.price.toLocaleString()}</span>
                        <span className="text-[9px] text-gray-400 block font-semibold">Taxes excluded</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: DECK PLANS */}
          {activeSubTab === "deckplans" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-4 animate-fade-in text-left">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-1">
                  Onboard Deck Plans
                </h3>
                <p className="text-xs text-gray-400 font-semibold mb-4">
                  Explore the ship's deck-by-deck layout to discover key attractions, restaurants, and stateroom categories.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {(cruise.deckPlans || [
                  { deck: 4, name: "Lotus deck", highlights: "tai chi deck, bar, viewing bridge" },
                  { deck: 3, name: " Lily dining room", highlights: "restaurant, piano bar" }
                ]).map((d, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 p-4.5 rounded-xl flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-600/10 border border-blue-150 flex items-center justify-center font-black text-blue-800 text-lg shrink-0">
                      L{d.deck}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-gray-800 uppercase tracking-wide">{d.name}</h4>
                      <p className="text-[11px] text-gray-500 font-semibold leading-relaxed mt-1 capitalize">
                        <strong>Key Areas:</strong> {d.highlights}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: WHAT'S INCLUDED (Fare Inclusions vs Exclusions) */}
          {activeSubTab === "inclusions" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in text-left text-xs">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-1">
                  Fare Inclusions & Exclusions
                </h3>
                <p className="text-xs text-gray-400 font-semibold mb-4">
                  Review what is fully covered by your cruise fare and what services are available as premium add-ons.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* What's Included */}
                <div className="bg-emerald-50/20 border border-emerald-100 rounded-xl p-4.5 space-y-3">
                  <h4 className="font-extrabold text-xs text-emerald-850 flex items-center gap-1.5 uppercase tracking-wider">
                    <Check size={14} className="text-emerald-600" /> Complimentary (Included)
                  </h4>
                  <ul className="space-y-2 text-gray-650 font-semibold list-none pl-0">
                    {(cruise.fareInclusions?.included || [
                      "Vietnamese Fusion organic dining",
                      "Access to all lounges and public sundecks",
                      "Daily guided morning Tai Chi deck exercises"
                    ]).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Not Included */}
                <div className="bg-red-50/10 border border-red-100 rounded-xl p-4.5 space-y-3">
                  <h4 className="font-extrabold text-xs text-red-850 flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="text-red-500 font-black text-lg leading-none mt-[-2px]">&times;</span> Optional Upgrades (Excluded)
                  </h4>
                  <ul className="space-y-2 text-gray-650 font-semibold list-none pl-0">
                    {(cruise.fareInclusions?.excluded || [
                      "Deluxe beverage packages",
                      "Specialty dining covers",
                      "VOOM satellite Wi-Fi access"
                    ]).map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold mt-0.5">&times;</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DINING */}
          {activeSubTab === "dining" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-4">
                  Complimentary & Specialty Dining
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: cruise.line === "Hera Cruises" ? "Lily Restaurant" : "Windjammer Marketplace", type: "Complimentary Buffet", desc: cruise.line === "Hera Cruises" ? "Intimate organic dining experience serving traditional Vietnamese breakfast bowls and healthy local cuisine." : "Interactive serving stations representing international street food, custom paninis, dessert bars and vegetarian selections.", hours: "6:30 AM - 10:00 PM" },
                    { name: cruise.line === "Hera Cruises" ? "Hera Lotus Deck Dining" : "Chops Grille Steakhouse", type: "Specialty Dining (Cover Charge)", desc: cruise.line === "Hera Cruises" ? "Sunset barbecue dining under the open skies, featuring local crab, prawns, and fish prepared live by Vietnamese chefs." : "Royal Caribbean's hallmark steakhouse. Hand-cut prime steaks, fresh lobsters and signature key lime pies.", hours: "5:30 PM - 9:30 PM" },
                    { name: "Izumi Sushi & Hibachi", type: "Specialty Dining (A La Carte)", desc: "Fresh sushi rolls, sashimi platters, and theatrical teppanyaki cooking tables hosted by master chefs.", hours: "12:00 PM - 9:30 PM" },
                    { name: "The Main Dining Room", type: "Complimentary Multi-Course", desc: "A world-class multi-deck restaurant serving custom rotating menus daily, with complete vegan and gluten-free choices.", hours: "5:30 PM - 9:00 PM" }
                  ].map((dine, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-left">
                      <div className="flex justify-between items-baseline gap-1">
                        <h4 className="font-extrabold text-xs sm:text-sm text-gray-805">{dine.name}</h4>
                        <span className="text-[8px] bg-blue-50 border border-blue-100 text-[#003580] px-1.5 py-0.5 rounded font-black uppercase shrink-0">{dine.type}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-semibold leading-relaxed mt-2">
                        {dine.desc}
                      </p>
                      <span className="block text-[9px] text-gray-400 font-extrabold mt-2">⏱️ Service Hours: {dine.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hera Cruises custom dinner menu display */}
              {cruise.line === "Hera Cruises" && (
                <div className="border-t border-gray-100 pt-4 text-left">
                  <h4 className="text-xs font-black text-gray-850 uppercase tracking-wider mb-3">Hera Signature Organic Dinner Menu</h4>
                  <div className="bg-amber-50/20 border border-amber-100 p-4 rounded-xl space-y-3 text-xs">
                    <div>
                      <span className="font-extrabold text-[#003580] block">Course 1: Lotus Stem & Green Papaya Salad</span>
                      <span className="text-gray-500 font-semibold mt-0.5 block">Crisp salad with organic garden herbs, fresh Halong shore prawns, and a honey-chili dressing.</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-[#003580] block">Course 2: Pan-Seared Seabass in Claypot</span>
                      <span className="text-gray-500 font-semibold mt-0.5 block">Wild catch seabass glazed with local fish sauce caramel, crushed black pepper, and dill.</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-[#003580] block">Course 3: Halong Squid Cakes (Cha Muc)</span>
                      <span className="text-gray-500 font-semibold mt-0.5 block">Traditional hand-pounded local squid cakes with crisp shallots and hot ginger dipping oil.</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-2 text-left">Drink Packages Onboard</h4>
                <p className="text-xs text-gray-600 font-semibold leading-relaxed text-left">
                  You can purchase beverages individually on board, or pre-book the **Deluxe Beverage Package** via our Fare Calculator sidebar for unlimited premium cocktails, beers, wines, fresh juices, and specialty coffees.
                </p>
              </div>
            </div>
          )}

          {/* TAB: WELLNESS & SPA (Hera Wellness Style) */}
          {activeSubTab === "wellness" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in text-left">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-2">
                  Wellness Center & Spa Packages
                </h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Our onboard boutique wellness center blends ancestral therapies with organic oils. Pre-book your spa treatments below to confirm your schedule.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "spa_1", name: "Vietnamese Aromatherapy Massage", price: 2500, duration: "60 mins", desc: "Traditional slow strokes using organic lotus oil to ease spinal tension and restore deep alignment." },
                  { id: "spa_2", name: "Therapeutic Hot Stone Session", price: 3800, duration: "75 mins", desc: "Warm volcanic stones placed along acupuncture pathways to release stress and muscle fatigue." },
                  { id: "spa_3", name: "Herbal Steam & Sauna Treatment", price: 1500, duration: "45 mins", desc: "Organic ginger, lemongrass, and eucalyptus steam infusion to detoxify skin and clear breathing." },
                  { id: "spa_4", name: "Morning Tai Chi Deck Private Lesson", price: 2000, duration: "60 mins", desc: "One-on-one personal training at sunrise learning physical flow sequences and breathing techniques." }
                ].map(spa => {
                  const isSelected = selectedSpaTreatments.some(s => s.id === spa.id);
                  return (
                    <div key={spa.id} className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col justify-between hover:shadow-xs transition">
                      <div>
                        <div className="flex justify-between items-baseline gap-1">
                          <h4 className="font-extrabold text-xs sm:text-sm text-gray-805">{spa.name}</h4>
                          <span className="text-[8px] bg-emerald-50 border border-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black uppercase shrink-0">⏱️ {spa.duration}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-semibold leading-relaxed mt-2">
                          {spa.desc}
                        </p>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-100 pt-2 mt-3">
                        <span className="text-[10px] font-black text-gray-900">₹{spa.price.toLocaleString()}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const exists = selectedSpaTreatments.some(s => s.id === spa.id);
                            if (exists) {
                              setSelectedSpaTreatments(prev => prev.filter(s => s.id !== spa.id));
                              toast.success(`Removed ${spa.name}`);
                            } else {
                              setSelectedSpaTreatments(prev => [...prev, spa]);
                              toast.success(`Added ${spa.name} to wellness schedule`);
                            }
                          }}
                          className={`text-[9px] font-black px-2.5 py-1 rounded cursor-pointer transition ${
                            isSelected 
                              ? "bg-emerald-600 text-white" 
                              : "bg-[#003580] hover:bg-blue-900 text-white"
                          }`}
                        >
                          {isSelected ? "Added ✓" : "Pre-Book"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: ACTIVITIES */}
          {activeSubTab === "activities" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in text-left">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-4">
                  Onboard Entertainment & Day Recreation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: cruise.line === "Hera Cruises" ? "Sunset Live Flute Recitals" : "Perfect Day Water Slide trilogy", desc: cruise.line === "Hera Cruises" ? "Relax on the sundeck with live classical flute and piano performances as the sun sets behind karst peaks." : "Climb the steps to slide down vertical water slides and tube drops, including record-breaking loops.", cat: cruise.line === "Hera Cruises" ? "Performance" : "Water Park" },
                    { title: cruise.line === "Hera Cruises" ? "Traditional Tea Ceremonies" : "Royal Theater Broadway Stage Acts", desc: cruise.line === "Hera Cruises" ? "Learn the ancient art of brewing Vietnamese herbal teas and understanding local tea-drinking history." : "Experience full-length theatrical productions of classic Broadway musicals and aerial acrobat shows.", cat: cruise.line === "Hera Cruises" ? "Culture" : "Theater" },
                    { title: cruise.line === "Hera Cruises" ? "Squid Fishing at Night" : "Vitality Spa & Solarium Pool", desc: cruise.line === "Hera Cruises" ? "Join the crew on the back deck at night under large spotlight rods to try hand-line squid fishing." : "Indoor heated pools, thermal suites, therapeutic hot stone massages, and organic body wrap programs.", cat: cruise.line === "Hera Cruises" ? "Sporting" : "Wellness" },
                    { title: "Casino Royale Vegas-style Gaming", desc: "Hundreds of modern slot machines, table games, blackjack tourneys, and complimentary lessons for beginners.", cat: "Casino" }
                  ].map((act, i) => (
                    <div key={i} className="border border-gray-150 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] bg-orange-50 border border-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-black uppercase tracking-wider w-fit block">{act.cat}</span>
                        <h4 className="font-extrabold text-xs sm:text-sm text-gray-850 mt-2">{act.title}</h4>
                        <p className="text-[10px] text-gray-500 font-semibold leading-relaxed mt-1.5">
                          {act.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: POLICIES */}
          {activeSubTab === "policies" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in text-left text-xs">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-3">
                  Cruise Baggage & Boarding Policies
                </h3>
                <ul className="list-disc pl-4 space-y-1.5 text-gray-600 font-semibold">
                  <li><strong>Luggage Allowance:</strong> Up to two bags (max 23kg each) per guest. Luggage must be checked-in at the terminal curb.</li>
                  <li><strong>Embarkation Timing:</strong> Ensure check-in at the departure terminal exactly during your chosen arrival window (usually between 11:30 AM and 3:00 PM). Gates close 90 minutes before sailing.</li>
                  <li><strong>Required Travel Documents:</strong> Valid Passport (with at least 6 months validity remaining) and appropriate Schengen/US/Vietnam visas based on itineraries.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-3">
                  Cancellation Fee Schedules
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-gray-700">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-900 font-extrabold text-[9px] uppercase tracking-wider">
                        <th className="py-2 px-3 text-left">Time of Cancellation Request</th>
                        <th className="py-2 px-3 text-right">Fee Retained (Percent of Fare)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-semibold">
                      <tr>
                        <td className="py-2 px-3 text-left">90 days or more prior to departure</td>
                        <td className="py-2 px-3 text-right text-gray-800 font-bold">100% refund of cruise fare</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-left">89 to 57 days prior to departure</td>
                        <td className="py-2 px-3 text-right text-gray-800 font-bold">Deposit amount retained</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-left">56 to 30 days prior to departure</td>
                        <td className="py-2 px-3 text-right text-gray-800 font-bold">50% of total cruise fare</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-left">Less than 30 days prior to departure</td>
                        <td className="py-2 px-3 text-right text-red-500 font-bold">100% of total cruise fare</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (30%) - Fare Calculator Sidebar */}
        <div className="lg:col-span-4 sticky top-4 space-y-6">
          <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm text-left flex flex-col gap-5">
            <div>
              <h3 className="font-black text-sm text-gray-900 mb-1">Fare Calculator</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                {cruise.line} Reservation
              </p>
            </div>

            {/* Guest configuration selector */}
            <div className="border border-gray-200 rounded-lg p-2.5 flex items-center gap-2.5 bg-gray-50/20">
              <Users className="text-gray-400 shrink-0" size={18} />
              <div className="flex-grow">
                <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Guests count</label>
                <select
                  value={guestsCount.adults}
                  onChange={(e) => setGuestsCount(prev => ({ ...prev, adults: parseInt(e.target.value) || 2 }))}
                  className="w-full bg-transparent text-xs font-bold text-gray-800 outline-none border-none cursor-pointer"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                </select>
              </div>
            </div>

            {/* Enhancement packages checkboxes */}
            <div className="space-y-3.5 border-t border-gray-100 pt-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Enhance Your Voyage</h4>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cruiseDrinkPackage}
                  onChange={(e) => setCruiseDrinkPackage(e.target.checked)}
                  className="mt-0.5 accent-[#003580]"
                />
                <div>
                  <span className="text-xs font-extrabold text-gray-800 block leading-tight">Deluxe Beverage Package</span>
                  <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">+ ₹4,500 / day / guest</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cruiseWifiPackage}
                  onChange={(e) => setCruiseWifiPackage(e.target.checked)}
                  className="mt-0.5 accent-[#003580]"
                />
                <div>
                  <span className="text-xs font-extrabold text-gray-800 block leading-tight">VOOM High-Speed Wi-Fi</span>
                  <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">+ ₹1,200 / day / guest</span>
                </div>
              </label>
            </div>

            {/* Selected excursions cost display */}
            {selectedCruiseExcursions.length > 0 && (
              <div className="border-t border-gray-100 pt-3.5 text-xs">
                <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">Shore Excursions Added</span>
                <div className="flex flex-col gap-1.5">
                  {selectedCruiseExcursions.map(exc => (
                    <div key={exc.id} className="flex justify-between items-center text-[10px] font-bold text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100">
                      <span className="truncate max-w-[150px]">🌴 {exc.name}</span>
                      <span className="shrink-0 text-gray-900">₹{exc.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected spa wellness treatments cost display */}
            {selectedSpaTreatments.length > 0 && (
              <div className="border-t border-gray-100 pt-3.5 text-xs">
                <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">Spa Treatments Added</span>
                <div className="flex flex-col gap-1.5">
                  {selectedSpaTreatments.map(spa => (
                    <div key={spa.id} className="flex justify-between items-center text-[10px] font-bold text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100">
                      <span className="truncate max-w-[150px]">💆 {spa.name}</span>
                      <span className="shrink-0 text-gray-900">₹{spa.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CruiseDirect style Payment Options radio buttons */}
            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Payment Options</h4>
              
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="payOption"
                  checked={cruisePayOption === "full"}
                  onChange={() => setCruisePayOption("full")}
                  className="mt-0.5 accent-[#003580]"
                />
                <div>
                  <span className="text-xs font-extrabold text-gray-800 block leading-tight">Pay in Full today</span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Save an extra 5% instantly!</span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="payOption"
                  checked={cruisePayOption === "deposit"}
                  onChange={() => setCruisePayOption("deposit")}
                  className="mt-0.5 accent-[#003580]"
                />
                <div>
                  <span className="text-xs font-extrabold text-gray-800 block leading-tight">Flexible 20% Deposit</span>
                  <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">Pay 20% now, balance auto-billed 60 days before sailing.</span>
                </div>
              </label>
            </div>

            {/* Total breakdown bill */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-gray-500">
                <span>Cabin base rate ({selectedRoom?.name || "Stateroom"}):</span>
                <span className="font-bold text-gray-800">
                  ₹{selectedRoom ? Math.round((selectedRoom.price / (cruise.nights || 7)) * cruiseNights).toLocaleString() : 0} &times; {totalGuests}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-gray-500">
                <span>Taxes & Port Fees:</span>
                <span className="font-bold text-gray-800">
                  ₹8,500 &times; {totalGuests}
                </span>
              </div>
              
              {/* Premium packages add-ons sum */}
              {((cruiseDrinkPackage ? 4500 * cruiseNights * totalGuests : 0) + 
                (cruiseWifiPackage ? 1200 * cruiseNights * totalGuests : 0)) > 0 && (
                <div className="flex justify-between font-semibold text-gray-500">
                  <span>Enhancement Packages:</span>
                  <span className="font-bold text-gray-800">
                    ₹{((cruiseDrinkPackage ? 4500 * cruiseNights * totalGuests : 0) + 
                       (cruiseWifiPackage ? 1200 * cruiseNights * totalGuests : 0)).toLocaleString()}
                  </span>
                </div>
              )}

              {/* Excursions cost sum */}
              {selectedCruiseExcursions.length > 0 && (
                <div className="flex justify-between font-semibold text-gray-500">
                  <span>Shore Excursions Total:</span>
                  <span className="font-bold text-gray-800">
                    ₹{selectedCruiseExcursions.reduce((acc, exc) => acc + (exc.price * totalGuests), 0).toLocaleString()}
                  </span>
                </div>
              )}

              {/* Spa treatments cost sum */}
              {selectedSpaTreatments.length > 0 && (
                <div className="flex justify-between font-semibold text-gray-500">
                  <span>Spa Treatments Total:</span>
                  <span className="font-bold text-gray-800">
                    ₹{selectedSpaTreatments.reduce((acc, spa) => acc + (spa.price * totalGuests), 0).toLocaleString()}
                  </span>
                </div>
              )}

              {/* Pay in full discount deduction */}
              {cruisePayOption === "full" && (
                <div className="flex justify-between font-semibold text-emerald-600 bg-emerald-50 p-1.5 rounded">
                  <span>5% Pay-in-Full Savings:</span>
                  <span className="font-bold">
                    - ₹{Math.round(
                      (
                        (selectedRoom ? Math.round((selectedRoom.price / (cruise.nights || 7)) * cruiseNights) : 0) * totalGuests +
                        8500 * totalGuests +
                        (cruiseDrinkPackage ? 4500 * cruiseNights * totalGuests : 0) +
                        (cruiseWifiPackage ? 1200 * cruiseNights * totalGuests : 0) +
                        selectedCruiseExcursions.reduce((acc, exc) => acc + (exc.price * totalGuests), 0) +
                        selectedSpaTreatments.reduce((acc, spa) => acc + (spa.price * totalGuests), 0)
                      ) * 0.05
                    ).toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-gray-900 border-t border-gray-100 pt-3">
                <span>Grand Total:</span>
                <span className="text-[#003580] font-[Unbounded]">
                  ₹{getCruiseCalculatedTotal().toLocaleString()}
                </span>
              </div>

              {/* Deposit payment summary notice */}
              {cruisePayOption === "deposit" && (
                <div className="bg-orange-50 border border-orange-100 text-orange-850 p-2.5 rounded-lg mt-2 font-bold text-[10px] space-y-1">
                  <div className="flex justify-between text-orange-950 font-black">
                    <span>Due Today (20%):</span>
                    <span>₹{Math.round(getCruiseCalculatedTotal() * 0.2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-semibold mt-0.5">
                    <span>Balance (Due 60 days before sail):</span>
                    <span>₹{Math.round(getCruiseCalculatedTotal() * 0.8).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit checkout redirect */}
            <button
              onClick={() => setView("checkout")}
              className="w-full bg-[#003580] hover:bg-blue-900 text-white font-extrabold py-3 rounded-lg text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer text-center border-none"
            >
              Proceed to Booking
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
