import React, { useState } from "react";
import Navbar from "@/components/User/main/common/Navbar";
import ContactFooter from "@/components/User/Landing/ContactPage";
import Footer from "@/components/User/common/Footer";
import { FaCalendarAlt, FaCheckCircle, FaStar, FaUser, FaPhone, FaComment, FaCheck, FaTimes } from "react-icons/fa";
import { MdAir, MdDirectionsCar, MdLocationOn, MdSpeed } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import {
  SiToyota, SiFord, SiTesla, SiVolkswagen, SiHonda, SiNissan,
  SiChevrolet, SiBmw, SiMercedes, SiHyundai, SiAudi, SiKia
} from "react-icons/si";
import { toast } from "react-hot-toast";

const CarRental = () => {
  const brands = [
    { name: "Toyota", icon: <SiToyota size={40} /> },
    { name: "Ford", icon: <SiFord size={40} /> },
    { name: "Tesla", icon: <SiTesla size={40} /> },
    { name: "Volkswagen", icon: <SiVolkswagen size={40} /> },
    { name: "Honda", icon: <SiHonda size={40} /> },
    { name: "Nissan", icon: <SiNissan size={40} /> },
    { name: "Chevrolet", icon: <SiChevrolet size={40} /> },
    { name: "BMW", icon: <SiBmw size={40} /> },
    { name: "Mercedes-Benz", icon: <SiMercedes size={40} /> },
    { name: "Hyundai", icon: <SiHyundai size={40} /> },
    { name: "Audi", icon: <SiAudi size={40} /> },
    { name: "KIA", icon: <SiKia size={40} /> },
  ];

  const [selectedCar, setSelectedCar] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [customerGender, setCustomerGender] = useState(""); // "female" | "male"
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Itinerary inputs
  const [pickupLoc, setPickupLoc] = useState("");
  const [dropLoc, setDropLoc] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");

  // SIXT custom configurations
  const [activeService, setActiveService] = useState("rental"); // "rental" | "subscription" | "ride"
  const [subVehicleClass, setSubVehicleClass] = useState("Luxury Sedan");
  const [subMileage, setSubMileage] = useState("1,000 miles/month");
  const [subProtection, setSubProtection] = useState(true);
  const [subShowResult, setSubShowResult] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);

  const [ridePickup, setRidePickup] = useState("");
  const [rideDest, setRideDest] = useState("");
  const [rideFlightNum, setRideFlightNum] = useState("");
  const [rideShowResult, setRideShowResult] = useState(false);
  const [rideSuccess, setRideSuccess] = useState(false);
  const [rideSelectedVehicle, setRideSelectedVehicle] = useState(null);

  // SIXT enhanced parameters
  const [rentDiffLocation, setRentDiffLocation] = useState(false);
  const [rentDriverAge, setRentDriverAge] = useState("25-69");
  const [rentPreFuel, setRentPreFuel] = useState("All");

  const [subAddSecondDriver, setSubAddSecondDriver] = useState(false);
  const [subAddWinterTyres, setSubAddWinterTyres] = useState(false);
  const [subAddRoadside, setSubAddRoadside] = useState(false);

  const [rideType, setRideType] = useState("oneway"); // "oneway" | "hourly"
  const [rideHourlyHours, setRideHourlyHours] = useState("3 Hours");
  const [rideMeetGreet, setRideMeetGreet] = useState(true);
  const [ridePassengers, setRidePassengers] = useState(1);
  const [rideLuggage, setRideLuggage] = useState(1);

  // Reviews mock database, keyed by car name
  const [reviewsData, setReviewsData] = useState({
    "Jaguar XE L P250": [
      { id: 1, author: "Aanya S.", rating: 5, text: "Excellent behavior. Driver was extremely professional, turned on the AC immediately without asking, and drove very safely.", date: "July 2, 2026", behavior: true, ac: true, clean: true },
      { id: 2, author: "Rahul M.", rating: 4, text: "Good ride. Driver turned on the AC and maintained decent behavior, but was a few minutes late due to traffic.", date: "June 28, 2026", behavior: true, ac: true, clean: false }
    ],
    "Audi R8": [
      { id: 1, author: "Vikram K.", rating: 5, text: "Amazing experience! The driver maintained perfect behavior, turned on AC, and gave me great local recommendations.", date: "July 4, 2026", behavior: true, ac: true, clean: true }
    ],
    "BMW M3": [
      { id: 1, author: "Sneha P.", rating: 5, text: "Very polite driver. Extremely clean car and cooling AC. Perfect ride.", date: "June 30, 2026", behavior: true, ac: true, clean: true }
    ],
    "Lamborghini Huracan": [
      { id: 1, author: "Rohan D.", rating: 5, text: "Superb ride. The driver kept the AC running throughout, was very friendly, and handled luggage carefully.", date: "July 1, 2026", behavior: true, ac: true, clean: true }
    ]
  });

  // New review form input
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewBehavior, setNewReviewBehavior] = useState(true);
  const [newReviewAc, setNewReviewAc] = useState(true);
  const [newReviewClean, setNewReviewClean] = useState(true);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section - Compact & Balanced (Above the Fold) */}
      <section className="relative min-h-[calc(100vh-80px)] lg:min-h-[90vh] py-16 flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">

          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-5 mb-6 lg:mb-8">
            {/* Left: Text Content */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-[75px] font-extrabold text-gray-900 leading-[0.95] font-[Unbounded] tracking-tighter">
                Find, book and <br className="hidden lg:block" />
                rent a car <span className="text-[#005fad] relative inline-block">
                  Easily
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#2a99b5]" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 7C50 2 150 2 200 7" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Right: Integrated Car Image (Even Larger) */}
            <div className="w-full lg:w-[45%] relative flex justify-end">
              <img
                src="/carrentallogo/car 2 1.svg"
                alt="Porsche 718 Boxster GTS"
                className="w-full lg:w-[130%] h-auto object-contain mix-blend-multiply drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)] transform lg:translate-x-20 lg:translate-y-[60px]"
              />
            </div>
          </div>


          {/* SIXT Style Service Switcher */}
          <div className="flex bg-gray-100 p-1.5 rounded-full mb-6 z-10 shadow-sm border border-gray-200">
            {[
              { id: "rental", label: "SIXT Rent" },
              { id: "subscription", label: "SIXT+ Subscription" },
              { id: "ride", label: "SIXT Ride (Chauffeur)" }
            ].map(srv => (
              <button
                key={srv.id}
                type="button"
                onClick={() => {
                  setActiveService(srv.id);
                  setSubShowResult(false);
                  setRideShowResult(false);
                  setSubSuccess(false);
                  setRideSuccess(false);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer border-none ${
                  activeService === srv.id
                    ? "bg-[#2a99b5] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 bg-transparent"
                }`}
              >
                {srv.label}
              </button>
            ))}
          </div>

          {/* Search Box - Dark Black Text & Compact Button */}
          <div className="w-full flex flex-col items-center justify-center -mt-2 lg:-mt-6 gap-6 z-20">
            
            {activeService === "rental" && (
              <div className="bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12)] rounded-[40px] p-6 lg:p-7 flex flex-col gap-5 w-full lg:max-w-4xl border border-gray-200 text-left">
                <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center w-full">
                  <div className="flex-1 min-w-[170px]">
                    <label className="text-[11px] font-black text-black block mb-2 uppercase tracking-widest font-[Unbounded]">Pick-up Location</label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                      <MdLocationOn className="text-[#2a99b5] text-lg" />
                      <input
                        type="text"
                        placeholder="Search pick-up location"
                        value={pickupLoc}
                        onChange={e => setPickupLoc(e.target.value)}
                        className="bg-transparent w-full focus:outline-none text-xs font-semibold text-black placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {rentDiffLocation && (
                    <div className="flex-1 min-w-[170px] animate-in fade-in duration-200">
                      <label className="text-[11px] font-black text-black block mb-2 uppercase tracking-widest font-[Unbounded]">Drop-off Location</label>
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                        <MdLocationOn className="text-[#e8731a] text-lg" />
                        <input
                          type="text"
                          placeholder="Search drop-off location"
                          value={dropLoc}
                          onChange={e => setDropLoc(e.target.value)}
                          className="bg-transparent w-full focus:outline-none text-xs font-semibold text-black placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex-1 min-w-[130px]">
                    <label className="text-[11px] font-black text-black block mb-2 uppercase tracking-widest font-[Unbounded]">Pick-up Date</label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={e => setPickupDate(e.target.value)}
                        className="bg-transparent w-full focus:outline-none text-xs font-bold text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-[130px]">
                    <label className="text-[11px] font-black text-black block mb-2 uppercase tracking-widest font-[Unbounded]">Drop-off Date</label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                      <input
                        type="date"
                        value={dropDate}
                        onChange={e => setDropDate(e.target.value)}
                        className="bg-transparent w-full focus:outline-none text-xs font-bold text-gray-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary Filters for Rental */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rentDiffLocation}
                        onChange={e => setRentDiffLocation(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#2a99b5] focus:ring-[#2a99b5]"
                      />
                      <span className="text-xs font-bold text-gray-600">Return to a different location</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-450 uppercase">Driver Age:</span>
                      <select
                        value={rentDriverAge}
                        onChange={e => setRentDriverAge(e.target.value)}
                        className="border border-gray-200 rounded-lg p-1.5 text-xs font-bold text-gray-700 bg-gray-50 outline-none"
                      >
                        <option value="18-24">18 - 24 years</option>
                        <option value="25-69">25 - 69 years</option>
                        <option value="70+">70+ years</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-450 uppercase">Fuel:</span>
                      <select
                        value={rentPreFuel}
                        onChange={e => setRentPreFuel(e.target.value)}
                        className="border border-gray-200 rounded-lg p-1.5 text-xs font-bold text-gray-700 bg-gray-50 outline-none"
                      >
                        <option value="All">All Fuel Types</option>
                        <option value="Electric">Electric / Hybrid</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!pickupLoc || !pickupDate) {
                        toast.error("Please fill in pickup city and date!");
                        return;
                      }
                      toast.success("Rentals filtered. Scroll down to see cars list!");
                      window.scrollTo({ top: 900, behavior: "smooth" });
                    }}
                    className="bg-[#2a99b5] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-[#1f7a91] transition-all shadow cursor-pointer border-none"
                  >
                    Find a Vehicle
                  </button>
                </div>
              </div>
            )}

            {activeService === "subscription" && (
              <div className="bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12)] rounded-[40px] p-6 lg:p-7 flex flex-col gap-6 w-full lg:max-w-4xl border border-gray-200 text-left">
                
                {/* Visual Category Selection Chips */}
                <div>
                  <label className="text-[11px] font-black text-black block mb-3 uppercase tracking-widest font-[Unbounded]">Select Vehicle Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: "Luxury Sedan", label: "BMW 5 Series / Audi A6", icon: "🚗" },
                      { name: "Sports Coupe", label: "Porsche GTS / BMW M4", icon: "🏎️" },
                      { name: "Premium SUV", label: "Volvo XC90 / Audi Q7", icon: "🚙" },
                      { name: "Eco Electric", label: "Tesla Model Y / BMW i4", icon: "⚡" }
                    ].map(cat => {
                      const isSelected = subVehicleClass.includes(cat.name);
                      return (
                        <div
                          key={cat.name}
                          onClick={() => setSubVehicleClass(cat.name)}
                          className={`border rounded-2xl p-3 cursor-pointer transition flex items-start gap-2.5 ${
                            isSelected ? "border-[#2a99b5] bg-teal-50/20 shadow-sm" : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-xl shrink-0 mt-0.5">{cat.icon}</span>
                          <div>
                            <h4 className="font-extrabold text-xs text-gray-800">{cat.name}</h4>
                            <p className="text-[9px] text-gray-400 font-bold mt-0.5 leading-none">{cat.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mileage Options Selector */}
                <div>
                  <label className="text-[11px] font-black text-black block mb-3 uppercase tracking-widest font-[Unbounded]">Mileage Allowance</label>
                  <div className="flex flex-wrap gap-2.5">
                    {["500 miles/month", "1,000 miles/month", "1,500 miles/month", "2,000 miles/month"].map(mil => {
                      const isSel = subMileage.includes(mil.split(" ")[0]);
                      return (
                        <button
                          key={mil}
                          type="button"
                          onClick={() => setSubMileage(mil)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            isSel
                              ? "bg-[#2a99b5] border-[#2a99b5] text-white shadow-sm"
                              : "bg-white border-gray-200 text-gray-650 hover:bg-gray-50"
                          }`}
                        >
                          {mil}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toggles for Add-ons packages */}
                <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={subAddSecondDriver}
                        onChange={e => setSubAddSecondDriver(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#2a99b5] focus:ring-[#2a99b5]"
                      />
                      <span className="text-xs font-bold text-gray-600">Register Secondary Driver (+₹1,500/mo)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={subAddWinterTyres}
                        onChange={e => setSubAddWinterTyres(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#2a99b5] focus:ring-[#2a99b5]"
                      />
                      <span className="text-xs font-bold text-gray-600">All-Weather Winter Tyres package (+₹800/mo)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={subAddRoadside}
                        onChange={e => setSubAddRoadside(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#2a99b5] focus:ring-[#2a99b5]"
                      />
                      <span className="text-xs font-bold text-gray-600">Roadside Assistance Premium Assistance (+₹500/mo)</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubShowResult(true);
                      setSubSuccess(false);
                    }}
                    className="bg-[#2a99b5] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-[#1f7a91] transition-all shadow cursor-pointer border-none"
                  >
                    Configure Plan
                  </button>
                </div>
              </div>
            )}

            {activeService === "ride" && (
              <div className="bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12)] rounded-[40px] p-6 lg:p-7 flex flex-col gap-5 w-full lg:max-w-4xl border border-gray-200 text-left">
                
                {/* Transfer type switcher */}
                <div className="flex gap-4 border-b border-gray-100 pb-3">
                  {[
                    { id: "oneway", label: "One-Way Transfer" },
                    { id: "hourly", label: "Hourly Booking" }
                  ].map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setRideType(type.id)}
                      className={`text-xs font-extrabold pb-1.5 transition border-b-2 cursor-pointer bg-transparent border-none ${
                        rideType === type.id ? "border-[#2a99b5] text-[#2a99b5]" : "border-transparent text-gray-400"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center w-full">
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-[11px] font-black text-black block mb-2 uppercase tracking-widest font-[Unbounded]">Pickup Address</label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                      <MdLocationOn className="text-[#2a99b5] text-lg" />
                      <input
                        type="text"
                        placeholder="Search pickup address"
                        value={ridePickup}
                        onChange={e => setRidePickup(e.target.value)}
                        className="bg-transparent w-full focus:outline-none text-xs font-semibold text-black placeholder:text-gray-400 font-[Unbounded]"
                      />
                    </div>
                  </div>

                  {rideType === "oneway" ? (
                    <div className="flex-1 min-w-[200px] animate-in fade-in duration-200">
                      <label className="text-[11px] font-black text-black block mb-2 uppercase tracking-widest font-[Unbounded]">Destination Address</label>
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                        <MdLocationOn className="text-[#2a99b5] text-lg" />
                        <input
                          type="text"
                          placeholder="Search destination address"
                          value={rideDest}
                          onChange={e => setRideDest(e.target.value)}
                          className="bg-transparent w-full focus:outline-none text-xs font-semibold text-black placeholder:text-gray-400 font-[Unbounded]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 min-w-[150px] animate-in fade-in duration-200">
                      <label className="text-[11px] font-black text-black block mb-2 uppercase tracking-widest font-[Unbounded]">Duration Hours</label>
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                        <select
                          value={rideHourlyHours}
                          onChange={e => setRideHourlyHours(e.target.value)}
                          className="bg-transparent w-full focus:outline-none text-xs font-bold text-gray-800"
                        >
                          <option value="3 Hours">3 Hours (Include 40 kms)</option>
                          <option value="6 Hours">6 Hours (Include 80 kms)</option>
                          <option value="12 Hours">12 Hours (Include 150 kms)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="w-full lg:w-36">
                    <label className="text-[11px] font-black text-black block mb-2 uppercase tracking-widest font-[Unbounded]">Flight / Train No</label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                      <input
                        type="text"
                        placeholder="AI 302"
                        value={rideFlightNum}
                        onChange={e => setRideFlightNum(e.target.value)}
                        className="bg-transparent w-full focus:outline-none text-xs font-bold text-gray-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Passengers, luggage counter and airport Meet and Greet selector */}
                <div className="border-t border-gray-100 pt-3 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>Passengers:</span>
                      <div className="flex items-center gap-1.5 border border-gray-250 bg-gray-50 rounded-lg p-0.5">
                        <button type="button" onClick={() => { if (ridePassengers > 1) setRidePassengers(p => p - 1); }} className="w-5 h-5 rounded flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100 font-bold">-</button>
                        <span className="w-3 text-center">{ridePassengers}</span>
                        <button type="button" onClick={() => setRidePassengers(p => p + 1)} className="w-5 h-5 rounded flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100 font-bold">+</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>Luggage Bags:</span>
                      <div className="flex items-center gap-1.5 border border-gray-250 bg-gray-50 rounded-lg p-0.5">
                        <button type="button" onClick={() => { if (rideLuggage > 0) setRideLuggage(l => l - 1); }} className="w-5 h-5 rounded flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100 font-bold">-</button>
                        <span className="w-3 text-center">{rideLuggage}</span>
                        <button type="button" onClick={() => setRideLuggage(l => l + 1)} className="w-5 h-5 rounded flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100 font-bold">+</button>
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rideMeetGreet}
                        onChange={e => setRideMeetGreet(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#2a99b5] focus:ring-[#2a99b5]"
                      />
                      <span>Meet & Greet (Driver holds sign board at arrivals, +₹500)</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!ridePickup) {
                        toast.error("Please enter pickup location address!");
                        return;
                      }
                      setRideShowResult(true);
                      setRideSuccess(false);
                    }}
                    className="bg-[#2a99b5] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-[#1f7a91] transition-all shadow cursor-pointer border-none"
                  >
                    Configure Ride
                  </button>
                </div>
              </div>
            )}

            {/* SIXT+ Configurator Result Panels */}
            {activeService === "subscription" && subShowResult && (
              <div className="w-full lg:max-w-4xl bg-gray-50 border border-gray-200 rounded-[30px] p-6 lg:p-8 text-left space-y-5 animate-in slide-in-from-bottom duration-250 z-10">
                {subSuccess ? (
                  <div className="text-center py-6 space-y-4">
                    <span className="w-12 h-12 rounded-full bg-green-100 border border-green-400 text-green-600 flex items-center justify-center text-xl font-bold mx-auto">✓</span>
                    <h3 className="text-lg font-black text-gray-900">SIXT+ Subscription Confirmed!</h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto font-semibold">
                      Your monthly order for a <strong>{subVehicleClass}</strong> package is successfully scheduled. Our team will contact you for license verification.
                    </p>
                    <button type="button" onClick={() => setSubShowResult(false)} className="bg-[#2a99b5] text-white font-bold text-xs py-2 px-5 rounded-lg border-none cursor-pointer">Close</button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <h4 className="text-sm font-black text-gray-900 font-[Unbounded]">SIXT+ Subscription Plan Details</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{subVehicleClass} &bull; {subMileage}</p>
                      </div>
                      <span className="bg-teal-50 border border-teal-100 text-teal-600 font-extrabold text-[10px] px-2.5 py-1 rounded">All-Inclusive Rates</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 text-xs font-semibold text-gray-500">
                        <div className="flex justify-between">
                          <span>Base Subscription Fee:</span>
                          <span className="text-gray-800 font-bold">
                            ₹{subVehicleClass.includes("Sedan") ? "42,000" : subVehicleClass.includes("Coupe") ? "55,000" : subVehicleClass.includes("SUV") ? "49,000" : "38,000"} / mo
                          </span>
                        </div>
                        <div className="flex justify-between"><span>Mileage Addon ({subMileage}):</span> <span className="text-gray-800 font-bold">{subMileage.includes("500") ? "Included" : subMileage.includes("1,000") ? "₹5,000" : subMileage.includes("1,500") ? "₹10,000" : "₹15,000"} / mo</span></div>
                        <div className="flex justify-between"><span>Premium Zero Deductible Cover:</span> <span className="text-gray-800 font-bold">{subProtection ? "₹2,500" : "Not Selected"} / mo</span></div>
                        
                        {subAddSecondDriver && <div className="flex justify-between text-gray-600"><span>Secondary Driver registration:</span> <span className="text-gray-800 font-bold">₹1,500 / mo</span></div>}
                        {subAddWinterTyres && <div className="flex justify-between text-gray-600"><span>Winter Tyres package:</span> <span className="text-gray-800 font-bold">₹800 / mo</span></div>}
                        {subAddRoadside && <div className="flex justify-between text-gray-600"><span>Roadside Assist Premium:</span> <span className="text-gray-800 font-bold">₹500 / mo</span></div>}
                        
                        <div className="flex justify-between border-t border-gray-150 pt-2 font-black text-sm text-[#2a99b5]">
                          <span>Estimated Monthly Cost:</span>
                          <span>
                            ₹{(
                              (subVehicleClass.includes("Sedan") ? 42000 : subVehicleClass.includes("Coupe") ? 55000 : subVehicleClass.includes("SUV") ? 49000 : 38000) +
                              (subMileage.includes("500") ? 0 : subMileage.includes("1,000") ? 5000 : subMileage.includes("1,500") ? 10000 : 15000) +
                              (subProtection ? 2500 : 0) +
                              (subAddSecondDriver ? 1500 : 0) +
                              (subAddWinterTyres ? 800 : 0) +
                              (subAddRoadside ? 500 : 0)
                            ).toLocaleString()} / month
                          </span>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-150 rounded-2xl p-4 text-[10px] text-gray-555 leading-relaxed font-semibold space-y-1">
                        <p className="font-extrabold text-gray-700 text-xs mb-1">🎁 What's Included in SIXT+:</p>
                        <p>✓ Instant pick-up or cancellation at any time monthly.</p>
                        <p>✓ Maintenance, road tax, and registration completely covered.</p>
                        <p>✓ Wear-and-tear replacement & roadside assistance support.</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button type="button" onClick={() => setSubShowResult(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-650 hover:bg-gray-150 cursor-pointer bg-white">Cancel</button>
                      <button type="button" onClick={() => setSubSuccess(true)} className="px-6 py-2 bg-[#2a99b5] text-white rounded-lg text-xs font-black uppercase hover:bg-[#1f7a91] transition cursor-pointer border-none shadow-sm">Confirm Subscription</button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* SIXT Ride result panels */}
            {activeService === "ride" && rideShowResult && (
              <div className="w-full lg:max-w-4xl bg-gray-50 border border-gray-200 rounded-[30px] p-6 lg:p-8 text-left space-y-5 animate-in slide-in-from-bottom duration-250 z-10">
                {rideSuccess ? (
                  <div className="text-center py-6 space-y-4">
                    <span className="w-12 h-12 rounded-full bg-green-100 border border-green-400 text-green-600 flex items-center justify-center text-xl font-bold mx-auto">✓</span>
                    <h3 className="text-lg font-black text-gray-900">Limousine Transfer Confirmed!</h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto font-semibold">
                      Chauffeur booking confirmed for <strong>{rideSelectedVehicle?.name}</strong>. Pick-up at <strong>{ridePickup}</strong> will be managed with luggage support.
                    </p>
                    <button type="button" onClick={() => setRideShowResult(false)} className="bg-[#2a99b5] text-white font-bold text-xs py-2 px-5 rounded-lg border-none cursor-pointer">Close</button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <h4 className="text-sm font-black text-gray-900 font-[Unbounded]">Select Chauffeured Limousine</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                          {rideType === "oneway" ? `Oneway: ${ridePickup} ➔ ${rideDest}` : `Hourly: ${ridePickup} (${rideHourlyHours})`}
                        </p>
                      </div>
                      <span className="bg-teal-50 border border-teal-100 text-teal-600 font-extrabold text-[10px] px-2.5 py-1 rounded">
                        Passengers: {ridePassengers} | Bags: {rideLuggage}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: "Business Class Sedan", car: "BMW 5 Series or E-Class", price: 4500, icon: "🤵" },
                        { name: "Luxury Limousine", car: "Mercedes S-Class or BMW 7 Series", price: 8000, icon: "👑" },
                        { name: "Business SUV/Van", car: "Mercedes V-Class or Multivan", price: 6200, icon: "🚐" }
                      ].map((veh, vIdx) => {
                        // Adjust rates for hourly bookings or meet & greet
                        let rate = veh.price;
                        if (rideType === "hourly") {
                          const multiplier = rideHourlyHours.includes("3") ? 1.8 : rideHourlyHours.includes("6") ? 3.2 : 5.8;
                          rate = Math.round(rate * multiplier);
                        }
                        if (rideMeetGreet) rate += 500;

                        return (
                          <div
                            key={vIdx}
                            onClick={() => setRideSelectedVehicle({ ...veh, price: rate })}
                            className={`bg-white border rounded-2xl p-4 cursor-pointer hover:border-[#2a99b5] transition flex flex-col justify-between ${
                              rideSelectedVehicle?.name === veh.name ? "border-[#2a99b5] ring-2 ring-[#2a99b5]/10" : "border-gray-200"
                            }`}
                          >
                            <div>
                              <span className="text-2xl block mb-2">{veh.icon}</span>
                              <h5 className="font-extrabold text-xs text-gray-805">{veh.name}</h5>
                              <span className="text-[9px] text-gray-455 block font-semibold mt-0.5">{veh.car}</span>
                            </div>
                            <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between items-baseline">
                              <span className="text-[9px] text-gray-400 font-bold uppercase">Rate</span>
                              <span className="text-xs font-black text-[#2a99b5]">₹{rate.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {rideSelectedVehicle && (
                      <div className="flex justify-end gap-3 border-t border-gray-150 pt-4">
                        <button type="button" onClick={() => setRideShowResult(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-650 hover:bg-gray-150 cursor-pointer bg-white">Cancel</button>
                        <button type="button" onClick={() => setRideSuccess(true)} className="px-6 py-2 bg-[#2a99b5] text-white rounded-lg text-xs font-black uppercase hover:bg-[#1f7a91] transition cursor-pointer border-none shadow-sm">Confirm Chauffeur Ride</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* How It Works */}
      <div className="text-center mt-20 mb-20">
        <div className="bg-[#f0f9ff] inline-block px-10 py-3 rounded-full mb-12 border border-blue-50">
          <span className="text-[#2a99b5] font-bold uppercase text-sm tracking-[0.2em]">How It Works</span>
          <div className="text-2xl text-center font-black text-gray-700 tracking-tighter">
            Rent with following 3 working steps
          </div>
        </div>



        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Choose destination", text: "Choose your favorite destination to visit with our premium cars.", icon: <MdLocationOn size={32} className="text-[#005fad]" /> },
            { title: "Choose car", text: "We have multiple car collections for our premium clients.", icon: <MdDirectionsCar size={32} className="text-[#005fad] icon" /> },
            { title: "Book and fly", text: "Book your car and fly to your destination with ease.", icon: <FaCheckCircle size={32} className="text-[#005fad]" /> }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1">
              <div className="w-18 h-18 bg-white shadow-[0_15px_40px_-12px_rgba(0,0,0,0.08)] rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 text-[#005fad]">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-[Unbounded] text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-xs max-w-[220px] leading-relaxed mx-auto">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rent by Brands */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Rent by Brands</h2>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#005fad] transition-all">
              View all <span className="text-lg">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand, i) => (
              <div key={i} className="bg-[#f0f7ff] p-5 rounded-[12px] flex flex-col items-center justify-center gap-2 cursor-default border border-transparent">
                <div className="h-12 flex items-center justify-center text-gray-500">
                  <div className="scale-[1.1] opacity-80">
                    {brand.icon}
                  </div>
                </div>
                <span className="text-[13px] font-bold text-gray-600 tracking-tight">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rent by body type */}
      <section className="py-20 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Rent by body type</h2>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#005fad] transition-all">
              View all <span className="text-lg">→</span>
            </button>
          </div>

          <div className="w-full h-auto flex justify-center">
            <img
              src="/carrentallogo/Frame 1165.svg"
              alt="Car Body Types"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Our Impressive Collection of Cars */}
      <section className="py-12 bg-[#f3f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <div className="inline-block bg-[#daedff] text-[#2a99b5] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-lg mb-3">
            Popular Rental Deals
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">Our Impressive Collection of Cars</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-6 text-xs leading-relaxed font-bold">
            Ranging from elegant sedans to powerful sports cars, all carefully selected to provide our customers with the ultimate driving experience.
          </p>

          {/* Filters - Scrollable on mobile */}
          <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 mb-8 pb-1 sm:pb-0 scrollbar-hide no-scrollbar">
            {["Popular Car", "Luxury Car", "Vintage Car", "Family Car", "Off-Road Car"].map((filter, i) => (
              <button
                key={i}
                className={`flex-none px-5 py-2 rounded-full text-[12px] font-bold transition-all whitespace-nowrap ${i === 0 ? "bg-[#2a99b5] text-white shadow-lg shadow-teal-100" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Car Grid - Compact Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { name: "Jaguar XE L P250", rating: "4.8", reviews: "2,435", price: "1,800", img: "https://media.zigcdn.com/media/model/2021/Oct/xf-1_600x400.jpg", passengers: "4", engine: "Auto", doors: "4" },
              { name: "Audi R8", rating: "4.5", reviews: "1,935", price: "2,100", img: "https://www.ccarprice.com/products/Audi_R8_Coupe_V10_GT_RWD_2023_1.jpg", passengers: "2", engine: "Auto", doors: "2" },
              { name: "BMW M3", rating: "4.5", reviews: "2,035", price: "1,600", img: "https://imgd-ct.aeplcdn.com/1056x660/n/blhfidb_1737219.jpg?q=80", passengers: "4", engine: "Auto", doors: "4" },
              { name: "Lamborghini Huracan", rating: "4.3", reviews: "2,235", price: "2,300", img: "https://imgd-ct.aeplcdn.com/664x415/n/k6nhhva_1601387.jpg?q=80", passengers: "2", engine: "Auto", doors: "2" },
            ].map((car, i) => (
              <div key={i} className="bg-white rounded-[20px] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] text-left flex flex-col border border-gray-50 hover:shadow-lg transition-all group">
                <div className="bg-white rounded-[16px] mb-3 h-40 sm:h-44 flex items-center justify-center overflow-hidden border border-gray-50/50">
                  <img
                    src={car.img}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-contain mix-blend-multiply contrast-[1.15] saturate-[1.1] group-hover:scale-105 transition-transform duration-500 ${i === 2 ? "scale-90" : i === 0 ? "scale-125" : ""}`}
                  />
                </div>

                <h3 className="text-[15px] font-black text-gray-900 mb-0.5">{car.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <FaStar className="text-yellow-400 text-[9px]" />
                  <span className="text-[10px] font-black text-gray-900">{car.rating}</span>
                  <span className="text-[8px] font-bold text-gray-400">({car.reviews} reviews)</span>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-2 mb-4 border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <BiUser className="text-sm" />
                    <span className="text-[9px] font-bold">{car.passengers} Passagers</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <MdSpeed className="text-sm" />
                    <span className="text-[9px] font-bold">{car.engine}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <MdAir className="text-sm text-teal-500/40" />
                    <span className="text-[9px] font-bold">AC</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <MdDirectionsCar className="text-sm" />
                    <span className="text-[9px] font-bold">{car.doors} Doors</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-wider">Price</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black text-gray-900">${car.price}</span>
                      <span className="text-[8px] font-bold text-gray-400">/day</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCar(car);
                      setCustomerGender("");
                      setPassengerName("");
                      setPassengerPhone("");
                      setBookingSuccess(false);
                      setNewReviewText("");
                      setNewReviewAuthor("");
                      setShowBookingModal(true);
                    }}
                    className="bg-[#2a99b5] text-white px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-[#1f7a91] transition-all cursor-pointer"
                  >
                    Rent Now →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              setSelectedCar({ name: "Jaguar XE L P250", rating: "4.8", reviews: "2,435", price: "1,800", img: "https://media.zigcdn.com/media/model/2021/Oct/xf-1_600x400.jpg", passengers: "4", engine: "Auto", doors: "4" });
              setCustomerGender("");
              setPassengerName("");
              setPassengerPhone("");
              setBookingSuccess(false);
              setNewReviewText("");
              setNewReviewAuthor("");
              setShowBookingModal(true);
            }}
            className="inline-flex items-center gap-2 border-2 border-[#2a99b5]/20 text-[#2a99b5] px-7 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-[#2a99b5] hover:text-white transition-all group cursor-pointer"
          >
            Show all vehicles <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-[15rem] md:text-[22rem] font-black text-[#f0f7ff] select-none pointer-events-none whitespace-nowrap z-0 tracking-tighter">
          Rental Car
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center relative">

            {/* Steps Column - Overlapping */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4 z-20 relative">
              {[
                {
                  title: "Browse and select",
                  desc: "Choose from our wide range of premium cars, select the pickup and return dates and locations that suit you best.",
                  icon: "🔍"
                },
                {
                  title: "Book and confirm",
                  desc: "Book your desired car with just a few clicks and receive an instant confirmation via email or SMS.",
                  icon: "📅"
                },
                {
                  title: "Enjoy your ride",
                  desc: "Pick up your car at the designated location and enjoy your premium driving experience with our top-quality service.",
                  icon: "😊"
                }
              ].map((step, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-50 flex items-center gap-6 md:gap-8 group">
                  <div className="flex-none w-14 h-14 md:w-16 md:h-16 bg-[#ebf5ff] rounded-2xl flex items-center justify-center text-xl md:text-2xl">
                    {step.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight">{step.title}</h3>
                    <p className="text-[12px] md:text-[13px] text-gray-400 font-bold leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Black Container Column - Bleeding to right */}
            <div className="absolute right-[-20vw] top-1/2 -translate-y-1/2 w-[80vw] lg:w-[70vw] h-[550px] z-10 hidden lg:block">
              <div className="bg-[#0a0a0a] rounded-l-[100px] h-full w-full flex items-center justify-center overflow-hidden -translate-x-20">
                <img
                  src="https://cdn.imweb.me/upload/S201908299b9630c317040/36783c045fb49.png"
                  alt="Front view car"
                  className="w-[70%] object-contain -translate-y-4"
                />
              </div>
            </div>

            {/* Mobile Fallback for Car Image */}
            <div className="w-full h-64 lg:hidden mt-8 bg-gray-900 rounded-[40px] flex items-center justify-center overflow-hidden">
              <img
                src="https://cdn.imweb.me/upload/S201908299b9630c317040/36783c045fb49.png"
                alt="Front view car"
                className="w-[80%] object-contain"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-[#2a99b5]">
        <div className="max-w-7xl mx-auto px-10 md:px-[15%] lg:px-[20%] text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">Our Services & Benefits</h2>
          <p className="text-white/80 text-[11px] md:text-[13px] font-bold leading-relaxed mb-12">
            To make renting easy and hassle-free, we provide a variety of services and advantages. We have you covered with a variety of vehicles and flexible rental terms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Quality Choice",
                desc: "We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more.",
                icon: "✨"
              },
              {
                title: "Affordable Prices",
                desc: "Our rental rates are highly competitive and affordable, allowing our customers to enjoy their trips.",
                icon: "💰"
              },
              {
                title: "Convenient Online Booking",
                desc: "With our easy-to-use online booking system, reserve your car from anywhere, anytime.",
                icon: "✔️"
              }
            ].map((service, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-13 h-13 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-lg text-[#2a99b5]">
                  {service.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] font-bold text-white uppercase tracking-wider">{service.title}</h3>
                  <p className="text-white/70 text-[11px] font-bold leading-relaxed max-w-[220px] mx-auto">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0">

            {/* Car Image - left, with padding */}
            <div className="w-full lg:w-1/2 flex justify-start relative pl-4 lg:pl-8">
              <img
                src="https://www.ccarprice.com/products/Audi_R8_Manual_2024.jpg"
                alt="Audi R8"
                className="w-full scale-125 object-contain mix-blend-multiply contrast-[1.15] saturate-[1.15] brightness-[1.02]"
              />
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 pl-12 lg:pl-24">
              {/* Badge */}
              <div className="inline-block bg-[#e8f4ff] text-[#2a99b5] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-md w-fit">
                Why Choose Us
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight">
                We offer the best experience<br />with our rental deals
              </h2>

              {/* Features */}
              <div className="flex flex-col gap-5 mt-2">
                {[
                  {
                    icon: "🔒",
                    title: "Best price guaranteed",
                    desc: "Find a lower price? We'll refund you 100% of the difference.",
                  },
                  {
                    icon: "👤",
                    title: "Experience driver",
                    desc: "Don't have driver? Don't worry, we have many experienced driver for you.",
                  },
                  {
                    icon: "🚗",
                    title: "24 hour car delivery",
                    desc: "Book your car anytime and we will deliver it directly to you.",
                  },
                  {
                    icon: "🎧",
                    title: "24/7 technical support",
                    desc: "Have a question? Contact Rentcars support any time when you have problem.",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-none w-11 h-11 bg-[#e8f4ff] rounded-xl flex items-center justify-center text-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-black text-gray-900 mb-0.5">{feature.title}</h4>
                      <p className="text-[12px] text-gray-400 font-bold leading-snug max-w-xs">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#f0f7ff] relative overflow-hidden">
        <div className="max-w-full mx-auto flex justify-center">
          <img
            src="/carrentallogo/What people say.svg"
            alt="Customer Testimonials"
            className="w-full h-auto lg:max-w-[1920px] w-full lg:h-[864px] object-contain"
          />
        </div>
      </section>

      {/* Dynamic Car Rental Booking & Reviews Modal */}
      {showBookingModal && selectedCar && (() => {
        const handleAddReview = (e) => {
          e.preventDefault();
          if (!newReviewAuthor.trim() || !newReviewText.trim()) {
            toast.error("Please fill in your name and review message!");
            return;
          }
          const currentReviews = reviewsData[selectedCar.name] || [];
          const updatedReviews = [
            {
              id: currentReviews.length + 1,
              author: newReviewAuthor,
              rating: newReviewRating,
              text: newReviewText,
              date: "Today",
              behavior: newReviewBehavior,
              ac: newReviewAc,
              clean: newReviewClean
            },
            ...currentReviews
          ];
          setReviewsData({
            ...reviewsData,
            [selectedCar.name]: updatedReviews
          });
          setNewReviewAuthor("");
          setNewReviewText("");
          setNewReviewRating(5);
          toast.success("Review submitted successfully!");
        };

        const handleConfirmBooking = (e) => {
          e.preventDefault();
          if (!passengerName.trim() || !passengerPhone.trim()) {
            toast.error("Please fill in passenger details!");
            return;
          }
          if (!customerGender) {
            toast.error("Please select gender for driver matching policy!");
            return;
          }
          setBookingSuccess(true);
          toast.success("Ride reservation confirmed!");
        };

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto font-sans animate-in fade-in duration-200">
            <div 
              className="bg-white rounded-3xl shadow-2xl w-full max-w-[950px] overflow-hidden flex flex-col max-h-[90vh] animate-in scale-in-95 duration-200 text-left"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#2a99b5] text-white flex items-center justify-between shrink-0">
                <div>
                  <h3 className="font-black text-lg tracking-tight uppercase">Reserve {selectedCar.name}</h3>
                  <p className="text-[10px] text-white/80 font-bold tracking-wider mt-0.5">Driver feedback and gender safety pick-up policy</p>
                </div>
                <button 
                  onClick={() => {
                    setShowBookingModal(false);
                    setBookingSuccess(false);
                  }}
                  className="text-white hover:text-gray-200 p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Modal Body */}
              {!bookingSuccess ? (
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* LEFT SIDE: Reviews Feed */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-sm font-black text-gray-900 border-b border-gray-150 pb-2 mb-4 uppercase tracking-wider">Driver Ratings & Reviews</h4>
                      
                      {/* Driver profile summary card */}
                      <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex items-center justify-between mb-4 flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xl shrink-0">
                            {customerGender === "female" ? "👩‍✈️" : "👨‍✈️"}
                          </div>
                          <div>
                            <span className="text-[9px] text-[#2a99b5] font-black uppercase tracking-wider block">Matched Driver</span>
                            <h5 className="font-extrabold text-sm text-gray-800">
                              {customerGender === "female" ? "Priya Sharma (Lady Driver)" : 
                               customerGender === "male" ? "Ramesh Kumar (Gents Driver)" : 
                               "Ramesh K. / Priya S. (Assigned on gender)"}
                            </h5>
                            <p className="text-[10px] text-gray-400 font-bold mt-0.5">
                              {customerGender === "female" ? "★ 5.0 (250+ safety rated)" : "★ 4.9 (400+ trips)"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-[10px] bg-green-50 text-green-700 font-black px-2 py-0.5 rounded border border-green-150">Active Safe Driver</span>
                        </div>
                      </div>

                      {/* Reviews Feed */}
                      <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                        {(reviewsData[selectedCar.name] || []).length === 0 ? (
                          <p className="text-xs text-gray-400 font-bold italic py-4">No reviews yet for this vehicle driver. Be the first to add one!</p>
                        ) : (
                          (reviewsData[selectedCar.name] || []).map(rev => (
                            <div key={rev.id} className="border border-gray-150 rounded-xl p-3.5 bg-white shadow-sm hover:shadow transition-shadow">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-[#ebf5ff] text-[#2a99b5] flex items-center justify-center text-[10px] font-black uppercase">
                                    {rev.author.substring(0, 2)}
                                  </div>
                                  <span className="text-xs font-extrabold text-gray-800">{rev.author}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar key={i} size={9} className={i < rev.rating ? "text-yellow-400" : "text-gray-200"} />
                                    ))}
                                  </div>
                                  <span className="text-[9px] text-gray-400 font-bold">{rev.date}</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 font-bold leading-relaxed">{rev.text}</p>
                              
                              {/* Review Badges */}
                              <div className="flex flex-wrap gap-1.5 mt-2.5">
                                {rev.behavior && (
                                  <span className="text-[8px] bg-green-50 text-green-700 font-black px-1.5 py-0.5 rounded border border-green-100 flex items-center gap-0.5">
                                    <FaCheck size={7} /> Good Behavior
                                  </span>
                                )}
                                {rev.ac && (
                                  <span className="text-[8px] bg-blue-50 text-blue-700 font-black px-1.5 py-0.5 rounded border border-blue-100 flex items-center gap-0.5">
                                    <FaCheck size={7} /> Turned On AC
                                  </span>
                                )}
                                {rev.clean && (
                                  <span className="text-[8px] bg-amber-50 text-amber-700 font-black px-1.5 py-0.5 rounded border border-amber-100 flex items-center gap-0.5">
                                    <FaCheck size={7} /> Clean Car
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Add Review Form */}
                    <form onSubmit={handleAddReview} className="bg-gray-50 border border-gray-150 rounded-2xl p-4 space-y-3">
                      <h5 className="text-[11px] font-black text-gray-850 uppercase tracking-wider">Submit Driver Review</h5>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Your Name</label>
                          <input 
                            type="text" 
                            placeholder="Your Name" 
                            required
                            value={newReviewAuthor}
                            onChange={e => setNewReviewAuthor(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-750 outline-none focus:border-[#2a99b5]"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Rating</label>
                          <select 
                            value={newReviewRating}
                            onChange={e => setNewReviewRating(Number(e.target.value))}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-750 outline-none focus:border-[#2a99b5]"
                          >
                            <option value="5">5 Stars (Excellent)</option>
                            <option value="4">4 Stars (Good)</option>
                            <option value="3">3 Stars (Average)</option>
                            <option value="2">2 Stars (Poor)</option>
                            <option value="1">1 Star (Very Bad)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Driver Feedback (AC, driver behavior, etc.)</label>
                        <textarea 
                          rows="2"
                          placeholder="e.g. He maintained good behavior, turned on AC, and drove safely." 
                          required
                          value={newReviewText}
                          onChange={e => setNewReviewText(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-755 outline-none focus:border-[#2a99b5] resize-none"
                        />
                      </div>

                      {/* Feature Checklist Toggles */}
                      <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-gray-600">
                            <input 
                              type="checkbox" 
                              checked={newReviewBehavior}
                              onChange={e => setNewReviewBehavior(e.target.checked)}
                              className="rounded text-[#2a99b5] focus:ring-[#2a99b5] h-3.5 w-3.5"
                            />
                            Good Behavior
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-gray-600">
                            <input 
                              type="checkbox" 
                              checked={newReviewAc}
                              onChange={e => setNewReviewAc(e.target.checked)}
                              className="rounded text-[#2a99b5] focus:ring-[#2a99b5] h-3.5 w-3.5"
                            />
                            Turned On AC
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-gray-600">
                            <input 
                              type="checkbox" 
                              checked={newReviewClean}
                              onChange={e => setNewReviewClean(e.target.checked)}
                              className="rounded text-[#2a99b5] focus:ring-[#2a99b5] h-3.5 w-3.5"
                            />
                            Clean Car
                          </label>
                        </div>
                        <button 
                          type="submit"
                          className="bg-[#2a99b5] hover:bg-[#1f7a91] text-white font-black text-[9px] uppercase tracking-wider px-4 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                          Submit Feedback
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* RIGHT SIDE: Booking Form */}
                  <div className="lg:col-span-5 border-l border-gray-100 lg:pl-8 space-y-4">
                    <h4 className="text-sm font-black text-gray-900 border-b border-gray-150 pb-2 mb-2 uppercase tracking-wider">Itinerary Details</h4>
                    
                    {/* Passenger Specs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Name</label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                          <FaUser size={10} className="text-[#2a99b5]" />
                          <input 
                            type="text" 
                            placeholder="Passenger Name" 
                            required
                            value={passengerName}
                            onChange={e => setPassengerName(e.target.value)}
                            className="bg-transparent w-full focus:outline-none text-xs font-semibold text-gray-750"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Phone</label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                          <FaPhone size={10} className="text-[#2a99b5]" />
                          <input 
                            type="tel" 
                            placeholder="Phone Number" 
                            required
                            value={passengerPhone}
                            onChange={e => setPassengerPhone(e.target.value)}
                            className="bg-transparent w-full focus:outline-none text-xs font-semibold text-gray-755"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Locations */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Pick-up Location</label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                          <MdLocationOn size={12} className="text-[#2a99b5]" />
                          <input 
                            type="text" 
                            placeholder="Pick-up Location" 
                            required
                            value={pickupLoc}
                            onChange={e => setPickupLoc(e.target.value)}
                            className="bg-transparent w-full focus:outline-none text-xs font-semibold text-gray-750"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Drop Location</label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                          <MdLocationOn size={12} className="text-[#2a99b5]" />
                          <input 
                            type="text" 
                            placeholder="Drop Location" 
                            required
                            value={dropLoc}
                            onChange={e => setDropLoc(e.target.value)}
                            className="bg-transparent w-full focus:outline-none text-xs font-semibold text-gray-755"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Pick-up Date</label>
                        <input 
                          type="date" 
                          required
                          value={pickupDate}
                          onChange={e => setPickupDate(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-750 outline-none focus:border-[#2a99b5]"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Drop Date</label>
                        <input 
                          type="date" 
                          required
                          value={dropDate}
                          onChange={e => setDropDate(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-755 outline-none focus:border-[#2a99b5]"
                        />
                      </div>
                    </div>

                    {/* Driver Gender matching block */}
                    <div className="space-y-2 border-t border-gray-100 pt-3">
                      <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider block">Gender Safety Match Policy</span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setCustomerGender("female")}
                          className={`py-2 px-3 border-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${customerGender === "female" ? "bg-green-50 border-green-500 text-green-700" : "bg-white border-gray-200 text-gray-600 hover:border-green-200"}`}
                        >
                          Female / Lady
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomerGender("male")}
                          className={`py-2 px-3 border-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${customerGender === "male" ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white border-gray-200 text-gray-600 hover:border-blue-200"}`}
                        >
                          Male / Gentleman
                        </button>
                      </div>

                      {/* Driver details description matching the policies */}
                      {customerGender === "female" && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-[11px] text-green-800 font-bold leading-normal animate-in fade-in duration-200 flex items-start gap-2">
                          <span className="text-sm shrink-0">👩‍✈️</span>
                          <p><strong>Lady Driver Assigned:</strong> For maximum safety, verified female driver <strong>Priya Sharma</strong> will be assigned to pick you up.</p>
                        </div>
                      )}

                      {customerGender === "male" && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[11px] text-blue-800 font-bold leading-normal animate-in fade-in duration-200 flex items-start gap-2">
                          <span className="text-sm shrink-0">👨‍✈️</span>
                          <p><strong>Male Driver Assigned:</strong> Professional verified driver <strong>Ramesh Kumar</strong> will be assigned to pick you up.</p>
                        </div>
                      )}
                    </div>

                    {/* Submit Section */}
                    <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Daily Price</span>
                        <span className="text-sm font-black text-gray-800">${selectedCar.price}</span>
                      </div>
                      <button
                        onClick={handleConfirmBooking}
                        className="bg-[#2a99b5] hover:bg-[#1f7a91] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer active:scale-95 shadow"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                /* Confirmation Screen */
                <div className="flex-grow overflow-y-auto p-12 text-center flex flex-col items-center justify-center space-y-6">
                  <div className="w-16 h-16 bg-green-50 border-2 border-green-500 text-green-500 rounded-full flex items-center justify-center text-3xl animate-bounce">
                    ✓
                  </div>
                  <div className="max-w-md">
                    <h4 className="text-xl font-black text-gray-900 tracking-tight mb-2">Car Booking Confirmed!</h4>
                    <p className="text-xs text-gray-450 font-bold leading-relaxed">
                      Your vehicle <strong>{selectedCar.name}</strong> is reserved successfully. Here is your matching driver assignment details:
                    </p>
                  </div>

                  <div className="border border-dashed border-gray-300 bg-gray-50/50 rounded-3xl p-6 w-full max-w-sm text-left space-y-4 shadow-sm">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3 border-dashed">
                      <span className="text-[9px] font-black text-[#2a99b5] uppercase tracking-wider">Booking ID: WT-CAR-{Math.floor(100000 + Math.random() * 900000)}</span>
                      <span className="text-[10px] text-green-700 bg-green-100/50 px-2 py-0.5 rounded font-black uppercase">Confirmed</span>
                    </div>

                    <div className="space-y-2.5 text-xs text-gray-600 font-bold">
                      <p className="flex justify-between"><span>Passenger Name:</span> <span className="text-gray-800 font-extrabold">{passengerName}</span></p>
                      <p className="flex justify-between"><span>Vehicle:</span> <span className="text-gray-800 font-extrabold">{selectedCar.name}</span></p>
                      <p className="flex justify-between"><span>Driver Assignment:</span> <span className="text-gray-800 font-extrabold uppercase">{customerGender === "female" ? "Lady Driver assignment" : "Male Driver assignment"}</span></p>
                      <p className="flex justify-between"><span>Assigned Driver:</span> <span className="text-green-700 font-black flex items-center gap-1">
                        {customerGender === "female" ? "Priya Sharma 👩‍✈️" : "Ramesh Kumar 👨‍✈️"}
                      </span></p>
                      <p className="flex justify-between"><span>Pick-up:</span> <span className="text-gray-800 font-semibold">{pickupLoc || "Delhi"}</span></p>
                      <p className="flex justify-between"><span>Drop:</span> <span className="text-gray-800 font-semibold">{dropLoc || "Noida Office"}</span></p>
                      <p className="flex justify-between"><span>Date:</span> <span className="text-gray-800 font-semibold">{pickupDate || "Today"}</span></p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setShowBookingModal(false);
                      setBookingSuccess(false);
                    }}
                    className="bg-[#2a99b5] text-white hover:bg-[#1f7a91] font-black text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* SIXT Share Map Section */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="bg-[#2a99b5]/20 text-[#2a99b5] font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-lg inline-block">
              Walkawaytrip Share
            </span>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight leading-none font-[Unbounded]">
              SIXT Share <br />Instant Cars Near You
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-semibold leading-relaxed">
              No counters, no keys, no paperwork. Open the Walkawaytrip App, find any luxury car parked on the street near you, scan to unlock, and start driving instantly. Cancel or drop off anywhere in the city limits.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="bg-gray-800 p-4 rounded-2xl flex-1 border border-gray-700">
                <span className="text-xl block mb-1">📱</span>
                <h4 className="font-extrabold text-xs">Zero Key Pickup</h4>
                <p className="text-[10px] text-gray-500 font-semibold mt-1">Unlock with app scan</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-2xl flex-1 border border-gray-700">
                <span className="text-xl block mb-1">⚡</span>
                <h4 className="font-extrabold text-xs">Flexible Parking</h4>
                <p className="text-[10px] text-gray-500 font-semibold mt-1">Park in public slots free</p>
              </div>
            </div>
          </div>

          {/* Interactive Radar Graphic */}
          <div className="relative flex justify-center items-center h-80 bg-gray-950 border border-gray-800 rounded-[35px] overflow-hidden w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,153,181,0.06)_0%,transparent_70%)]"></div>
            
            {/* Pulsing Radar Ring */}
            <div className="absolute w-64 h-64 border border-dashed border-[#2a99b5]/30 rounded-full animate-ping duration-1000"></div>
            <div className="absolute w-44 h-44 border border-dashed border-[#2a99b5]/20 rounded-full"></div>
            <div className="absolute w-24 h-24 border border-[#2a99b5]/10 rounded-full"></div>
            
            {/* Center user dot */}
            <div className="absolute w-4 h-4 rounded-full bg-[#2a99b5] border-2 border-white shadow-lg z-15 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
            </div>

            {/* Floating Car markers */}
            <div className="absolute top-[25%] left-[30%] bg-gray-800 border border-gray-700 p-1.5 rounded-full shadow flex items-center gap-1.5 animate-bounce">
              <span className="text-[10px] font-bold">🚗 BMW M3 (200m)</span>
            </div>
            <div className="absolute bottom-[30%] right-[25%] bg-gray-800 border border-gray-700 p-1.5 rounded-full shadow flex items-center gap-1.5 animate-bounce delay-150">
              <span className="text-[10px] font-bold">⚡ Tesla Model 3 (450m)</span>
            </div>
            <div className="absolute top-[40%] right-[30%] bg-gray-800 border border-gray-700 p-1.5 rounded-full shadow flex items-center gap-1.5 animate-bounce delay-300">
              <span className="text-[10px] font-bold">🚗 Audi R8 (600m)</span>
            </div>
          </div>
        </div>
      </section>

      {/* SIXT Corporate Cards */}
      <section className="py-24 bg-white text-left">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 space-y-12">
          <div className="max-w-2xl">
            <span className="bg-[#2a99b5]/10 text-[#2a99b5] font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-lg inline-block">
              Corporate Priority Tiers
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-3 tracking-tight font-[Unbounded]">
              Walkawaytrip SIXT VIP Loyalty Cards
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold mt-1">
              Unlock exclusive rental privileges and express double-tier upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Gold Membership", desc: "Up to 10% discount on rentals, free secondary driver inclusion, and corporate terminal checkout access.", style: "from-amber-600 to-yellow-500 text-white" },
              { name: "Platinum VIP Card", desc: "Up to 15% discount, complimentary double-category upgrade, and priority fast-track counter queuing.", style: "from-slate-700 to-slate-900 text-white" },
              { name: "Diamond Elite Club", desc: "Up to 20% discount, guaranteed reservation till 2h before, complimentary access to airport VIP lounge hubs.", style: "from-zinc-900 to-stone-950 text-white border-2 border-amber-500/20" }
            ].map((card, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${card.style} rounded-3xl p-6 shadow-md flex flex-col justify-between min-h-[220px] transition-transform hover:-translate-y-1 duration-200`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-lg">💳</span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">SIXT loyalty</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-tight">{card.name}</h4>
                    <p className="text-[10px] opacity-80 font-semibold leading-relaxed mt-2">{card.desc}</p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center text-[10px] font-bold">
                  <span>MEMBER ID: WT-{40283 + idx * 104}</span>
                  <span className="text-[#2a99b5] bg-white px-3 py-1 rounded-md cursor-pointer hover:bg-gray-100">Apply &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rent Protection Coverage comparisons */}
      <section className="py-20 bg-gray-50 border-t border-gray-150 text-left">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 space-y-8">
          <div>
            <h3 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight font-[Unbounded]">Collision & Liability Protections</h3>
            <p className="text-gray-500 text-xs font-semibold mt-1">Select the best peace of mind coverage plan for your upcoming trips</p>
          </div>

          <div className="border border-gray-200 rounded-3xl bg-white overflow-hidden shadow-sm">
            <table className="w-full text-xs font-semibold">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-4 text-left font-black text-gray-700">Coverage Features</th>
                  <th className="p-4 text-center font-black text-gray-700">Basic Cover</th>
                  <th className="p-4 text-center font-black text-[#2a99b5]">SIXT Gold Protection</th>
                  <th className="p-4 text-center font-black text-gray-900">Zero Excess Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-650">
                <tr>
                  <td className="p-4 font-bold text-gray-800">Third Party Liability (TPL)</td>
                  <td className="p-4 text-center text-green-600 font-bold">✓ Included</td>
                  <td className="p-4 text-center text-green-600 font-bold">✓ Included</td>
                  <td className="p-4 text-center text-green-600 font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-800">Collision Damage Waiver (CDW)</td>
                  <td className="p-4 text-center text-gray-400">₹30,000 Excess</td>
                  <td className="p-4 text-center text-blue-600">₹5,000 Excess</td>
                  <td className="p-4 text-center text-green-600 font-bold">✓ Zero Excess (₹0)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-800">Theft Protection Cover</td>
                  <td className="p-4 text-center text-gray-400">₹30,000 Excess</td>
                  <td className="p-4 text-center text-blue-600">₹5,000 Excess</td>
                  <td className="p-4 text-center text-green-600 font-bold">✓ Zero Excess (₹0)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-800">Tire and Windscreen Protection</td>
                  <td className="p-4 text-center text-red-500">✗ Excluded</td>
                  <td className="p-4 text-center text-red-500">✗ Excluded</td>
                  <td className="p-4 text-center text-green-600 font-bold">✓ Included (₹0)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default CarRental;
