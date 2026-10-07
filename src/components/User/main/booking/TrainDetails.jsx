import React, { useState } from "react";
import { 
  Train, Filter, Check, ShieldCheck, User, Phone, Mail, 
  CreditCard, Clock, MessageSquare, ThumbsUp, HelpCircle, 
  MapPin, Star, Sparkles, AlertCircle, Info, ChevronRight, Users
} from "lucide-react";
import toast from "react-hot-toast";

export default function TrainDetails({
  train,
  trainClass,
  setTrainClass,
  selectedTrainSeats,
  setSelectedTrainSeats,
  trainCatering,
  setTrainCatering,
  trainFreeCancel,
  setTrainFreeCancel,
  trainInsurance,
  setTrainInsurance,
  selectedEurailCountries,
  setSelectedEurailCountries,
  guestsCount,
  setGuestsCount,
  eurailTravellers,
  setEurailTravellers,
  eurailClass,
  setEurailClass,
  eurailDuration,
  setEurailDuration,
  eurailCountry,
  setEurailCountry,
  setView,
  getTrainCalculatedTotal
}) {
  const [activeSubTab, setActiveSubTab] = useState("overview"); // overview | route | seats | catering | policies

  if (!train) return null;

  const isEurail = train.id === "eurail-pass-item";
  const numGuests = isEurail ? eurailTravellers : ((guestsCount.adults || 2) + (guestsCount.children || 0));

  // Dynamic route generation
  const routeStations = isEurail ? [
    { station: "London St Pancras", arr: "--", dep: "08:00", halt: "--", day: 1, dist: 0 },
    { station: "Paris Gare du Nord", arr: "11:17", dep: "11:45", halt: "28m", day: 1, dist: 492 },
    { station: "Brussels South", arr: "13:20", dep: "13:40", halt: "20m", day: 1, dist: 810 },
    { station: "Amsterdam Centraal", arr: "15:35", dep: "--", halt: "--", day: 1, dist: 1045 }
  ] : [
    { station: train.from + " Jn", arr: "--", dep: train.depart, halt: "--", day: 1, dist: 0 },
    { station: "Mathura Jn", arr: "18:40", dep: "18:42", halt: "2m", day: 1, dist: 141 },
    { station: "Kota Jn", arr: "21:40", dep: "21:45", halt: "5m", day: 1, dist: 465 },
    { station: "Ratlam Jn", arr: "01:10", dep: "01:13", halt: "3m", day: 2, dist: 732 },
    { station: "Vadodara Jn", arr: "04:35", dep: "04:40", halt: "5m", day: 2, dist: 992 },
    { station: "Surat", arr: "06:10", dep: "06:13", halt: "3m", day: 2, dist: 1122 },
    { station: train.to + " Central", arr: train.arrive, dep: "--", halt: "--", day: 2, dist: 1385 }
  ];

  // Meal menu database
  const mealsList = [
    { id: "vegThali", name: "Standard Veg Thali", desc: "Dal Tadka, Paneer Butter Masala, 3 Rotis, Jeera Rice, Curd & Pickle", price: 150, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&auto=format&fit=crop&q=80" },
    { id: "chickenBiryani", name: "Chicken Dum Biryani", desc: "Aromatic Basmati rice layered with spiced chicken, served with Raita", price: 220, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80" },
    { id: "jainThali", name: "Pure Jain Thali", desc: "Prepared strictly without onion or garlic: Yellow Dal, Mix Veg, Rice, Rotis & Sweets", price: 130, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=200&auto=format&fit=crop&q=80" }
  ];

  // Reviews mock
  const trainReviews = [
    { name: "Suresh Kumar", rating: 5, date: "July 12, 2026", comment: "Super fast and punctual. The food served in AC 3 Tier was very fresh and hygienic. Recommended!", positive: true },
    { name: "Priya Sharma", rating: 4, date: "June 28, 2026", comment: "Comfortable sleeper berths. Clean toilets, but charging point was slightly loose. Overall great experience.", positive: true },
    { name: "Rohan Das", rating: 3, date: "May 15, 2026", comment: "Train was late by 30 mins, but speed was good. Bedding was clean.", positive: false }
  ];

  // Calculate pricing values
  const basePrice = train.price;
  const cancelFee = trainFreeCancel ? 199 * numGuests : 0;
  const insuranceFee = trainInsurance ? 0.35 * numGuests : 0;
  
  let mealsTotal = 0;
  Object.entries(trainCatering).forEach(([mealId, qty]) => {
    const mealObj = mealsList.find(m => m.id === mealId);
    if (mealObj) {
      mealsTotal += mealObj.price * qty;
    }
  });

  const grandTotal = (basePrice * numGuests) + cancelFee + insuranceFee + mealsTotal;

  return (
    <div className="mx-auto w-full max-w-6xl flex flex-col gap-6 text-left animate-fade-in">
      
      {/* Top back button navigation */}
      <button
        type="button"
        onClick={() => setView("results")}
        className="text-xs font-bold text-gray-500 hover:text-[#003580] flex items-center gap-1.5 w-fit cursor-pointer border-none bg-transparent"
      >
        &larr; Back to Train Listings
      </button>

      {/* Header Banner */}
      <div className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
              <Train size={10} /> {isEurail ? "Eurail Authorized Partner" : "IRCTC Official Booking"}
            </span>
            <span className="text-gray-400 text-xs font-semibold">
              🚅 {isEurail ? "Eurail High Speed" : "Indian Railways"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">{train.name}</h2>
          <p className="text-xs text-gray-500 font-bold mt-1.5 flex items-center gap-3">
            <span className="text-yellow-500 font-extrabold flex items-center gap-0.5">
              ★ 4.6
            </span>
            <span>(Over 12,000 passenger ratings)</span>
            <span>·</span>
            <span>⏱️ Punctuality: 98%</span>
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <span className="text-[10px] text-gray-400 font-black uppercase">Starts from</span>
          <span className="text-2xl font-black text-[#003580] font-[Unbounded]">
            ₹{basePrice.toLocaleString()}
          </span>
          <span className="text-[9px] text-gray-400 font-semibold mt-0.5">including platform reservation fees</span>
        </div>
      </div>

      {/* Responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Tab contents */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto bg-white rounded-t-xl px-4 pt-2 shadow-xs scrollbar-hide gap-1">
            {[
              { id: "overview", label: "Overview & Amenities" },
              { id: "route", label: "Route & Schedule" },
              ...(!isEurail ? [
                { id: "seats", label: "Interactive Berth Map" },
                { id: "catering", label: "In-Train Meals" }
              ] : []),
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

          {/* TAB CONTENT: OVERVIEW */}
          {activeSubTab === "overview" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-4">
                  Train Specifications & Comforts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Wi-Fi", value: isEurail ? "Free High Speed" : "Station hotspots", icon: "📶" },
                    { label: "Pantry Car", value: "Available on board", icon: "🍱" },
                    { label: "Charging Point", value: "1 per berth", icon: "🔌" },
                    { label: "Cleanliness", value: "Excellent (Class A)", icon: "✨" },
                    { label: "Air Conditioning", value: "Climate Controlled", icon: "❄️" },
                    { label: "E-Catering", value: "Seat Delivery", icon: "📲" },
                    { label: "Bedding / Pillows", value: "Fresh linen provided", icon: "🛏️" },
                    { label: "Security", value: "CCTV & RPF Escort", icon: "🛡️" }
                  ].map((spec, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 p-3.5 rounded-xl hover:shadow-xs transition">
                      <span className="text-xl block mb-1">{spec.icon}</span>
                      <span className="block text-[11px] font-black text-gray-800">{spec.label}</span>
                      <span className="block text-[10px] text-gray-500 font-semibold mt-0.5">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-4">
                  Train Class Choices
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { code: "AC 3 Tier", name: "3 AC Sleeper", desc: "Climate controlled coach with 6-berth cabins + 2 side berths.", selected: trainClass === "AC 3 Tier" },
                    { code: "AC 2 Tier", name: "2 AC Sleeper", desc: "Added privacy with curtains, 4-berth cabins + 2 side berths.", selected: trainClass === "AC 2 Tier" },
                    { code: "AC First Class", name: "1 AC First Class Suite", desc: "Private lockable compartments (coupes or cabins), maximum privacy.", selected: trainClass === "AC First Class" },
                    { code: "Sleeper Class", name: "Non-AC Sleeper", desc: "Standard budget sleeper coach with open windows and ceiling fans.", selected: trainClass === "Sleeper Class" }
                  ].map(cls => (
                    <div 
                      key={cls.code}
                      onClick={() => !isEurail && setTrainClass(cls.code)}
                      className={`border p-4 rounded-xl transition-all ${isEurail ? "opacity-60 cursor-default" : "cursor-pointer"} ${
                        cls.selected 
                          ? "border-[#003580] bg-blue-50/20 ring-1 ring-[#003580]" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-xs text-gray-800">{cls.name}</span>
                        {!isEurail && (
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${cls.selected ? "border-[#003580]" : "border-gray-300"}`}>
                            {cls.selected && <div className="w-1.5 h-1.5 rounded-full bg-[#003580]" />}
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">{cls.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-4">
                  Passenger Feedback & Reviews
                </h3>
                <div className="space-y-3.5">
                  {trainReviews.map((rev, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-gray-805">{rev.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-yellow-500 mt-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 font-semibold leading-relaxed mt-1.5">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: ROUTE SCHEDULE */}
          {activeSubTab === "route" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm animate-fade-in text-left">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-6">
                Station Route & Halt Schedule Timings
              </h3>
              
              <div className="relative border-l-2 border-orange-100 pl-5 ml-4 space-y-6">
                {routeStations.map((station, idx) => {
                  const isFirst = idx === 0;
                  const isLast = idx === routeStations.length - 1;
                  return (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <div className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${
                        isFirst ? "bg-green-500" : isLast ? "bg-red-500" : "bg-orange-500"
                      }`} />
                      
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <h4 className="font-extrabold text-xs text-gray-900">
                          {station.station}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-bold">
                          Day {station.day} • {station.dist} km
                        </span>
                      </div>

                      <div className="flex gap-4 text-[10px] text-gray-500 font-bold mt-1">
                        <span>Arr: <strong className="text-gray-700">{station.arr}</strong></span>
                        <span>Dep: <strong className="text-gray-700">{station.dep}</strong></span>
                        {station.halt !== "--" && (
                          <span>Halt: <strong className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">{station.halt}</strong></span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB CONTENT: SEATS SELECTOR (only for normal trains) */}
          {activeSubTab === "seats" && !isEurail && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-1">
                  Interactive Coach Seat Map
                </h3>
                <p className="text-xs text-gray-400 font-semibold">
                  Choose up to 4 preferred berths. Standard IRCTC auto-allocation applies if berths are not selected.
                </p>
              </div>

              {/* Berth Grid layout */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5">
                <div className="text-center font-bold text-[10px] text-gray-400 uppercase tracking-widest mb-4">
                  Coach B1 / S1 Layout - Door & Toilet on Left Side
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {Array.from({ length: 18 }).map((_, idx) => {
                    const seatNum = idx + 1;
                    const isSelected = selectedTrainSeats.includes(seatNum);
                    
                    // Berth Label assignments
                    const berthTypes = ["Lower", "Middle", "Upper", "Lower", "Middle", "Upper"];
                    const berthType = berthTypes[idx % 6];
                    const isSide = idx % 6 === 3 || idx % 6 === 5;
                    const displayLabel = isSide ? `Side ${berthType}` : berthType;

                    return (
                      <button
                        key={seatNum}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedTrainSeats(prev => prev.filter(s => s !== seatNum));
                          } else {
                            if (selectedTrainSeats.length >= 4) {
                              toast.error("You can select at most 4 berths per transaction!");
                              return;
                            }
                            setSelectedTrainSeats(prev => [...prev, seatNum]);
                          }
                        }}
                        className={`h-14 border rounded-xl flex flex-col items-center justify-center p-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#003580] border-[#003580] text-white shadow-md scale-95"
                            : "bg-white border-gray-200 text-gray-650 hover:border-gray-400"
                        }`}
                      >
                        <span className="text-xs font-black leading-none">{seatNum}</span>
                        <span className="text-[8px] leading-none opacity-80 mt-1">{displayLabel}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-4 justify-center text-[10px] font-bold text-gray-600 mt-5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded border border-gray-200 bg-white"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-[#003580]"></div>
                    <span>Selected</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CATERING (only for normal trains) */}
          {activeSubTab === "catering" && !isEurail && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-4 animate-fade-in">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-1">
                  Seat Delivery IRCTC E-Catering Service
                </h3>
                <p className="text-xs text-gray-400 font-semibold">
                  Add fresh and hot meals. Delivered to your seat at partner stations.
                </p>
              </div>

              <div className="space-y-3.5">
                {mealsList.map(meal => {
                  const quantity = trainCatering[meal.id] || 0;
                  return (
                    <div key={meal.id} className="border border-gray-150 rounded-xl overflow-hidden flex bg-gray-50/50 hover:shadow-xs transition">
                      <div className="w-24 h-24 shrink-0 bg-gray-150 border-r border-gray-150">
                        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="p-3.5 flex flex-col justify-between flex-grow text-left">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-extrabold text-xs sm:text-sm text-gray-805">{meal.name}</h4>
                            <span className="text-xs font-black text-[#003580]">₹{meal.price}</span>
                          </div>
                          <p className="text-[10px] text-gray-500 font-semibold mt-1 max-w-md line-clamp-2">
                            {meal.desc}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-2.5">
                          <span className="text-[9px] font-bold text-gray-450 uppercase">Order Quantity</span>
                          
                          <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (quantity > 0) {
                                  setTrainCatering(prev => ({ ...prev, [meal.id]: quantity - 1 }));
                                }
                              }}
                              className="w-5.5 h-5.5 rounded flex items-center justify-center font-extrabold text-xs bg-gray-50 hover:bg-gray-100 cursor-pointer border border-gray-150"
                            >
                              -
                            </button>
                            <span className="text-xs font-black w-4 text-center">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setTrainCatering(prev => ({ ...prev, [meal.id]: quantity + 1 }));
                              }}
                              className="w-5.5 h-5.5 rounded flex items-center justify-center font-extrabold text-xs bg-gray-50 hover:bg-gray-100 cursor-pointer border border-gray-150"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB CONTENT: POLICIES */}
          {activeSubTab === "policies" && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-4">
                  IRCTC Cancellation & Refund Policy
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-gray-700">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-900 font-extrabold text-[10px] uppercase tracking-wider">
                        <th className="py-2.5 px-3 text-left">Time of Cancellation</th>
                        <th className="py-2.5 px-3 text-right">Flat Cancellation Charge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-semibold">
                      <tr>
                        <td className="py-2.5 px-3 text-left">More than 48 hours before departure</td>
                        <td className="py-2.5 px-3 text-right text-gray-800 font-bold">₹120 (AC Class) / ₹60 (Sleeper)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 text-left">Between 48 hours and 12 hours before departure</td>
                        <td className="py-2.5 px-3 text-right text-gray-800 font-bold">25% of total ticket fare</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 text-left">Between 12 hours and 4 hours before departure</td>
                        <td className="py-2.5 px-3 text-right text-gray-800 font-bold">50% of total ticket fare</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 text-left">Less than 4 hours (No Chart Prepared / Chart Prepared)</td>
                        <td className="py-2.5 px-3 text-right text-red-500 font-bold">No Refund Allowed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider font-[Unbounded] border-b border-gray-100 pb-2 mb-3">
                  Frequently Asked Questions (FAQ)
                </h3>
                <div className="space-y-4">
                  {[
                    { q: "Is catering fee included in the ticket fare?", a: "No, meals are not mandatory. You can choose to add e-catering meals during details customization, or purchase meals directly on board the train." },
                    { q: "What is Tatkal Quota booking?", a: "Tatkal quota tickets are booked one day before departure (10:00 AM for AC, 11:00 AM for Sleeper). Higher charge rates apply and refunds are not allowed upon cancellation of confirmed Tatkal tickets." },
                    { q: "How does travel insurance cover work?", a: "The optional travel insurance fee (₹0.35/traveler) covers accidental death, permanent disability, and hospitalization expenses up to ₹10 Lakhs during transit." }
                  ].map((faq, i) => (
                    <div key={i} className="text-xs">
                      <h5 className="font-extrabold text-gray-850 flex items-center gap-1">
                        <span>❓</span> {faq.q}
                      </h5>
                      <p className="text-gray-500 font-semibold leading-relaxed mt-1 pl-4">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Eurail Customizer Options */}
          {isEurail && (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-gray-900 font-[Unbounded] border-b border-gray-100 pb-3 flex items-center gap-2">
                🇪🇺 Eurail Country Inclusions
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Add participating European countries to your rail ticket:
              </p>
              <div className="flex flex-wrap gap-2">
                {["France", "Switzerland", "Italy", "Germany", "Austria", "Spain", "Netherlands", "Belgium", "Norway"].map(c => {
                  const isSel = selectedEurailCountries.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        if (isSel) {
                          setSelectedEurailCountries(prev => prev.filter(x => x !== c));
                        } else {
                          setSelectedEurailCountries(prev => [...prev, c]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                        isSel
                          ? "bg-blue-50 border-blue-300 text-[#003580]"
                          : "bg-white border-gray-200 text-gray-650 hover:bg-gray-50"
                      }`}
                    >
                      {isSel ? "✓ " : ""}{c}
                    </button>
                  );
                })}
              </div>
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-xs text-gray-600 leading-relaxed font-semibold">
                💡 Currently includes unlimited train travel and seat reservations across {selectedEurailCountries.join(", ") || "selected countries"}.
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Fare Calculation & Check Out */}
        <div className="lg:col-span-4 sticky top-4 space-y-6">
          <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm text-left flex flex-col gap-5">
            <div>
              <h3 className="font-black text-sm text-gray-900 mb-1">Fare Details & Bill</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                {train.name}
              </p>
            </div>

            {/* Passenger quantity incrementor */}
            {isEurail ? (
              <div className="border border-gray-200 rounded-lg p-2.5 flex items-center gap-2.5 bg-gray-50/20">
                <User className="text-gray-400 shrink-0" size={18} />
                <div className="flex-grow">
                  <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-1.5">Travellers count</label>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gray-800">{eurailTravellers} Passenger{eurailTravellers !== 1 ? "s" : ""}</span>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() => setEurailTravellers(p => Math.max(1, p - 1))}
                        className="w-5.5 h-5.5 rounded flex items-center justify-center font-extrabold text-xs bg-gray-50 hover:bg-gray-100 cursor-pointer border border-gray-150"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setEurailTravellers(p => p + 1)}
                        className="w-5.5 h-5.5 rounded flex items-center justify-center font-extrabold text-xs bg-gray-50 hover:bg-gray-100 cursor-pointer border border-gray-150"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-2.5 flex items-center gap-2.5 bg-gray-50/20">
                <Users className="text-gray-400 shrink-0" size={18} />
                <div className="flex-grow">
                  <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-1.5">Passengers count</label>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gray-800">
                      {guestsCount.adults} Ad • {guestsCount.children} Ch
                    </span>
                    
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-gray-400 font-bold">Adult</span>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => setGuestsCount(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                            className="w-5 h-5 rounded flex items-center justify-center font-extrabold text-xs bg-gray-50 border-none cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-black px-1.5">{guestsCount.adults}</span>
                          <button
                            type="button"
                            onClick={() => setGuestsCount(p => ({ ...p, adults: p.adults + 1 }))}
                            className="w-5 h-5 rounded flex items-center justify-center font-extrabold text-xs bg-gray-50 border-none cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Travel Protections */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Protect Your Ride</h4>
              
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trainFreeCancel}
                  onChange={(e) => setTrainFreeCancel(e.target.checked)}
                  className="mt-0.5 accent-[#003580]"
                />
                <div>
                  <span className="text-xs font-bold text-gray-805 block leading-tight">Free Cancellation cover</span>
                  <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">+ ₹199 / traveler</span>
                </div>
              </label>

              {!isEurail && (
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trainInsurance}
                    onChange={(e) => setTrainInsurance(e.target.checked)}
                    className="mt-0.5 accent-[#003580]"
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-805 block leading-tight">Rail Travel Insurance</span>
                    <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">+ ₹0.35 / traveler</span>
                  </div>
                </label>
              )}
            </div>

            {/* Selected seats display */}
            {!isEurail && selectedTrainSeats.length > 0 && (
              <div className="border-t border-gray-100 pt-3.5 text-xs">
                <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">Berths Selected</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrainSeats.map(s => (
                    <span key={s} className="bg-blue-50 border border-blue-100 text-[#003580] font-black text-[9px] px-2 py-0.5 rounded">
                      Berth {s} (Coach S1)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing calculations breakdown */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-gray-500">
                <span>Base Ticket Rate:</span>
                <span className="font-extrabold text-gray-800">
                  ₹{basePrice.toLocaleString()} &times; {numGuests}
                </span>
              </div>
              
              {trainFreeCancel && (
                <div className="flex justify-between font-semibold text-gray-500">
                  <span>Cancellation Cover:</span>
                  <span className="font-extrabold text-gray-800">
                    ₹{(199 * numGuests).toLocaleString()}
                  </span>
                </div>
              )}

              {trainInsurance && !isEurail && (
                <div className="flex justify-between font-semibold text-gray-500">
                  <span>Rail Travel Insurance:</span>
                  <span className="font-extrabold text-gray-800">
                    ₹{(0.35 * numGuests).toFixed(2)}
                  </span>
                </div>
              )}

              {mealsTotal > 0 && (
                <div className="flex justify-between font-semibold text-gray-500">
                  <span>In-Train Catering Meals:</span>
                  <span className="font-extrabold text-gray-800">
                    ₹{mealsTotal.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between font-semibold text-gray-500">
                <span>IRCTC Conven. Fee & Taxes:</span>
                <span className="font-extrabold text-gray-800">₹0.00</span>
              </div>

              <div className="flex justify-between text-sm font-black text-gray-900 border-t border-gray-100 pt-3">
                <span>Total Fare:</span>
                <span className="text-[#003580] font-[Unbounded]">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Check out Trigger */}
            <button
              onClick={() => {
                if (!isEurail && selectedTrainSeats.length > 0 && selectedTrainSeats.length !== numGuests) {
                  toast.error(`You have selected ${selectedTrainSeats.length} seats for ${numGuests} passengers! Please select exactly ${numGuests} seats, or clear the selection to let IRCTC auto-allocate.`);
                  return;
                }
                setView("checkout");
              }}
              className="w-full bg-[#003580] hover:bg-blue-900 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer text-center border-none"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
