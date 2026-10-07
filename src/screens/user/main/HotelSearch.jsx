import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import {
  MapPin,
  Calendar as CalendarIcon,
  User,
  Search,
  ChevronDown,
  Plus,
  Minus,
  Globe,
  Menu,
  Check
} from "lucide-react";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";
import toast from "react-hot-toast";

const HotelSearch = () => {
  const navigate = useNavigate();
  const [budgetTab, setBudgetTab] = useState("LOW BUDGET");
  const [location, setLocation] = useState("Delhi, India");
  const [onlyHotel, setOnlyHotel] = useState(true);
  const [hotelFood, setHotelFood] = useState(false);

  // Date states
  const [dateRange, setDateRange] = useState("Nov 05 - Nov 12");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Traveler states
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showTravelerSelect, setShowTravelerSelect] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    toast.success(`Searching stays in ${location} (${budgetTab}) for ${adults} travelers, ${rooms} room(s)...`);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div>
        {/* Navbar */}
        <Navbar transparent={false} />

        {/* Content Body wrapper */}
        <main className="max-w-[1240px] mx-auto px-6 sm:px-12 md:px-16 pt-28 pb-16">

          {/* Back Navigation Link */}
          <div className="mb-8">
            <Link
              to="/destination/Delhi"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#0093CB] transition-colors"
            >
              <MdArrowBack size={15} />
              Back to Delhi
            </Link>
          </div>

          {/* Interactive Clickable Hotel Search Component */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-md p-6 max-w-[1040px] mx-auto mb-16">

            {/* Top Budget Tabs */}
            <div className="flex justify-center border-b border-gray-100 pb-4 mb-6 gap-8 md:gap-16">
              {["LOW BUDGET", "MID RANGE", "PRIMIUM"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setBudgetTab(tab)}
                  className={`text-xs md:text-sm font-black tracking-wider transition-all cursor-pointer pb-2 relative ${budgetTab === tab
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  {tab}
                  {budgetTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0093CB] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Input Row Form */}
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">

                {/* 1. Destination Field */}
                <div className="lg:col-span-4 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="where to"
                    className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#0093CB] rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-gray-800 outline-none transition-colors"
                  />
                  <span className="absolute top-1 left-11 text-[9px] font-black uppercase text-gray-400 select-none">
                    Destination
                  </span>
                </div>

                {/* 2. Date Selector popover */}
                <div className="lg:col-span-4 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDatePicker(!showDatePicker);
                      setShowTravelerSelect(false);
                    }}
                    className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#0093CB] rounded-xl py-3.5 pl-11 pr-4 text-left text-sm font-bold text-gray-800 outline-none transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                        <CalendarIcon size={18} />
                      </div>
                      <span>{dateRange}</span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <span className="absolute top-1 left-11 text-[9px] font-black uppercase text-gray-400 select-none">
                    Date
                  </span>

                  {/* Calendar Popover Mockup */}
                  {showDatePicker && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-2xl p-4 z-30 w-72">
                      <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2 mb-3">
                        Choose Travel Dates
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {["Nov 05 - Nov 12", "Nov 15 - Nov 22", "Dec 01 - Dec 08", "Dec 20 - Dec 27"].map((dates) => (
                          <button
                            key={dates}
                            type="button"
                            onClick={() => {
                              setDateRange(dates);
                              setShowDatePicker(false);
                            }}
                            className={`px-3 py-2 border rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${dateRange === dates
                              ? "border-[#0093CB] bg-[#0093CB]/5 text-[#0093CB]"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                              }`}
                          >
                            {dates}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Traveler Selector Popover */}
                <div className="lg:col-span-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTravelerSelect(!showTravelerSelect);
                      setShowDatePicker(false);
                    }}
                    className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#0093CB] rounded-xl py-3.5 pl-11 pr-4 text-left text-sm font-bold text-gray-800 outline-none transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                        <User size={18} />
                      </div>
                      <span className="truncate">{adults + children} travelers, {rooms} room</span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <span className="absolute top-1 left-11 text-[9px] font-black uppercase text-gray-400 select-none">
                    Travels
                  </span>

                  {/* Travelers Popover Selectors */}
                  {showTravelerSelect && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-2xl p-4 z-30 w-72 space-y-4">
                      <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2 mb-1">
                        Select Rooms & Guests
                      </h4>

                      {/* Rooms */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-700">Rooms</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            disabled={rooms <= 1}
                            onClick={() => setRooms(rooms - 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-xs font-extrabold text-gray-800 w-4 text-center">{rooms}</span>
                          <button
                            type="button"
                            onClick={() => setRooms(rooms + 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Adults */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-700">Adults</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            disabled={adults <= 1}
                            onClick={() => setAdults(adults - 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-xs font-extrabold text-gray-800 w-4 text-center">{adults}</span>
                          <button
                            type="button"
                            onClick={() => setAdults(adults + 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-700">Children</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            disabled={children <= 0}
                            onClick={() => setChildren(children - 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-xs font-extrabold text-gray-800 w-4 text-center">{children}</span>
                          <button
                            type="button"
                            onClick={() => setChildren(children + 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Done */}
                      <button
                        type="button"
                        onClick={() => setShowTravelerSelect(false)}
                        className="w-full bg-[#0093CB] hover:bg-[#007ba8] text-white font-bold text-xs py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Teal Search Button */}
                <div className="lg:col-span-1">
                  <button
                    type="submit"
                    className="w-full bg-[#29A4C6] hover:bg-[#208ba8] text-white py-3.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center hover:scale-102 active:scale-98"
                  >
                    <Search size={18} />
                  </button>
                </div>

              </div>

              {/* Bottom Custom Checkboxes */}
              <div className="flex items-center gap-6 mt-4 pl-1">
                {/* Option 1: Only Hotel */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyHotel}
                    onChange={(e) => {
                      setOnlyHotel(e.target.checked);
                      if (e.target.checked) setHotelFood(false);
                    }}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${onlyHotel
                    ? "bg-[#0093CB] border-[#0093CB] text-white"
                    : "border-gray-200 bg-white"
                    }`}>
                    {onlyHotel && <Check size={13} strokeWidth={3} />}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-600">Only Hotel</span>
                </label>

                {/* Option 2: Hotel + Food */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hotelFood}
                    onChange={(e) => {
                      setHotelFood(e.target.checked);
                      if (e.target.checked) setOnlyHotel(false);
                    }}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${hotelFood
                    ? "bg-[#0093CB] border-[#0093CB] text-white"
                    : "border-gray-200 bg-white"
                    }`}>
                    {hotelFood && <Check size={13} strokeWidth={3} />}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-600">Hotel + Food</span>
                </label>
              </div>
            </form>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 font-[Unbounded] tracking-tight text-left">
              Explore stays in trending Hotels in Delhi
            </h2>
          </div>

          {/* Stays list container SVG Image */}
          <div className="rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.002] bg-white mb-10">
            <img
              src="/carrentallogo/container of delhi hotels.svg"
              alt="Stays in trending Hotels in Delhi"
              className="w-full h-auto block select-none pointer-events-none"
            />
          </div>

          {/* Section 2: Choose a Hotel That Matches Your Mood */}
          <div className="space-y-6 pt-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-black text-gray-950 font-[Unbounded] tracking-tight">
                Choose a Hotel That Matches Your Mood
              </h2>
            </div>
            <div className="rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.002] bg-white">
              <img
                src="/carrentallogo/container of hotels list.svg"
                alt="Choose a Hotel That Matches Your Mood"
                className="w-full h-auto block select-none pointer-events-none"
              />
            </div>
          </div>
          {/* Section 3: Start planning your Next Trip */}
          <section className="space-y-6 pt-12">
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 font-[Unbounded] tracking-tight text-left">
              Start planning your <span className="text-[#0093CB]">Next Trip</span>
            </h2>

            {/* Desktop Layout (4 in first row, 3 centered in second row) */}
            <div className="hidden lg:block space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Members Discount", img: "/carrentallogo/member.svg" },
                  { label: "Sunny beach places", img: "/carrentallogo/Rectangle 105.svg" },
                  { label: "water fall", img: "/carrentallogo/Rectangle 106.svg" },
                  { label: "Mountains", img: "/carrentallogo/Rectangle 107.svg" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-[24px] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:scale-[1.03] cursor-pointer group bg-gray-50 border border-gray-100"
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white font-extrabold text-base md:text-lg font-[Unbounded] leading-tight max-w-[85%] whitespace-pre-line">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-[75%] mx-auto">
                {[
                  { label: "Snow fall & Winter", img: "/carrentallogo/Rectangle 108.svg" },
                  { label: "Wild Life Explore", img: "/carrentallogo/Rectangle 109.svg" },
                  { label: "Tracking Mountains", img: "/carrentallogo/Rectangle 110.svg" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-[24px] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:scale-[1.03] cursor-pointer group bg-gray-50 border border-gray-100"
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white font-extrabold text-base md:text-lg font-[Unbounded] leading-tight max-w-[85%] whitespace-pre-line">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile & Tablet Responsive Layout (Grid-based flow) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden">
              {[
                { label: "Members Discount", img: "/carrentallogo/member.svg" },
                { label: "Sunny beach places", img: "/carrentallogo/Rectangle 105.svg" },
                { label: "water fall", img: "/carrentallogo/Rectangle 106.svg" },
                { label: "Mountains", img: "/carrentallogo/Rectangle 107.svg" },
                { label: "Snow fall & Winter", img: "/carrentallogo/Rectangle 108.svg" },
                { label: "Wild Life Explore", img: "/carrentallogo/Rectangle 109.svg" },
                { label: "Tracking Mountains", img: "/carrentallogo/Rectangle 110.svg" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-[24px] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group bg-gray-50 border border-gray-100"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white font-extrabold text-base font-[Unbounded] leading-tight max-w-[85%] whitespace-pre-line">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Banner */}
          <section className="pt-15">
            <div className="rounded-[0px] overflow-hidden border border-gray-100 transition-all duration-300 bg-white ml-25 mr-25">
              <img
                src="/carrentallogo/Discover More, Stress Less – Your Journey, Perfectly Planned!.svg"
                alt="Discover More, Stress Less – Your Journey, Perfectly Planned!"
                className="w-full h-auto block select-none pointer-events-none"
              />
            </div>
          </section>

        </main>
      </div>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default HotelSearch;
