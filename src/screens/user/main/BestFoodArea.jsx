import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Star,
  MapPin,
  Globe,
  User,
  Menu,
  Utensils,
  ExternalLink,
  ChevronRight,
  Clock
} from "lucide-react";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { LANGUAGES, getCurrentLanguage, setLanguageCookie } from "@/utils/translator";
import { MdArrowBack, MdKeyboardArrowLeft } from "react-icons/md";

const MOCK_FOOD_PLACES = [
  {
    id: "f1",
    name: "Karim's Restaurant",
    cuisine: "Mughlai, North Indian",
    location: "Jama Masjid, Old Delhi",
    rating: 4.6,
    reviews: "15,800 reviews",
    avgCost: "₹800 for two",
    specialty: "Mutton Korma, Chicken Jahangiri, Seekh Kebabs",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&w=800&q=80",
    desc: "Established in 1913, Karim's is legendary for serving authentic royal Mughal delicacies near the historic Jama Masjid.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Karims+Jama+Masjid+Delhi",
  },
  {
    id: "f2",
    name: "Bukhara",
    cuisine: "North Indian, Tandoori",
    location: "ITC Maurya, Chanakyapuri",
    rating: 4.8,
    reviews: "9,200 reviews",
    avgCost: "₹8,000 for two",
    specialty: "Dal Bukhara, Sikandari Raan, Tandoori Jhinga",
    image: "https://images.unsplash.com/photo-1585938338392-50a59970d2ee?w=600&auto=format&fit=crop&w=800&q=80",
    desc: "An award-winning restaurant famous globally for its rustic tandoori flavours and the legendary 18-hour slow-cooked Dal Bukhara.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bukhara+ITC+Maurya+Delhi",
  },
  {
    id: "f3",
    name: "Paranthe Wali Gali",
    cuisine: "Street Food, North Indian",
    location: "Chandni Chowk, Old Delhi",
    rating: 4.4,
    reviews: "21,000 reviews",
    avgCost: "₹200 for two",
    specialty: "Rabri Parantha, Kaju Parantha, Mix Parantha",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&w=800&q=80",
    desc: "A narrow lane in Chandni Chowk famous for dozens of shops selling deep-fried, golden-brown parathas served with sweet and sour chutneys.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Paranthe+Wali+Gali+Delhi",
  },
  {
    id: "f4",
    name: "Majnu Ka Tilla (Tibetan Colony)",
    cuisine: "Tibetan, Asian",
    location: "New Aruna Nagar, North Delhi",
    rating: 4.5,
    reviews: "8,500 reviews",
    avgCost: "₹600 for two",
    specialty: "Tingmo, Chicken Momos, Thukpa, Laphing",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&w=800&q=80",
    desc: "A vibrant Tibetan settlement offering cosy cafes, authentic laphing stalls, and top-tier Himalayan dining spots like AMA Cafe.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ama+Cafe+Majnu+Ka+Tilla+Delhi",
  },
  {
    id: "f5",
    name: "Dilli Haat Food Stalls",
    cuisine: "Multi-State Cuisines",
    location: "INA, Kidwai Nagar",
    rating: 4.5,
    reviews: "11,300 reviews",
    avgCost: "₹500 for two",
    specialty: "Rajasthani Pyaaz Kachori, Naga Pork Momos, Kahwa",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&w=800&q=80",
    desc: "Features food stalls representing every Indian state, serving local specialties from Kashmir to Kerala in an open-market setting.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dilli+Haat+INA+Delhi",
  },
  {
    id: "f6",
    name: "Sandoz",
    cuisine: "North Indian, Chinese",
    location: "Connaught Place, New Delhi",
    rating: 4.3,
    reviews: "7,900 reviews",
    avgCost: "₹1,200 for two",
    specialty: "Bhatti Chicken, Dal Makhani, Paneer Tikka",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&w=800&q=80",
    desc: "A widely popular family dining hub in Connaught Place, celebrated for its rich butter chicken and lively, warm atmosphere.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sandoz+Connaught+Place+Delhi",
  }
];

const BestFoodArea = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const [langOpen, setLangOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const currentLangCode = getCurrentLanguage();
  const currentLang = LANGUAGES.find((l) => l.code === currentLangCode) || LANGUAGES[0];

  const handleLanguageChange = (code) => {
    setLanguageCookie(code);
    setLangOpen(false);
    toast.success(`Changing language to ${LANGUAGES.find((l) => l.code === code)?.name}...`);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const filteredPlaces = MOCK_FOOD_PLACES.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCuisine =
      selectedCuisine === "All" ||
      place.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());

    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div className="relative">
        {/* Header Search Banner Container */}
        <div
          className="relative w-full h-[350px] rounded-b-[40px] md:rounded-b-[60px] overflow-hidden shadow-lg select-none"
          style={{
            background: "url('/images/Rectangle 111.svg') no-repeat center center / cover",
          }}
        >
          {/* Header Overlay (Navbar elements from image) */}
          <div className="relative z-20 flex justify-between items-center px-6 md:px-12 py-5 max-w-[1440px] mx-auto">
            {/* Logo */}
            <Link to="/main" className="flex items-center gap-2 text-white font-extrabold text-lg sm:text-xl tracking-tight font-[Unbounded]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l8 2.5z" />
              </svg>
              Travel
            </Link>

            {/* Navbar Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/customer-support")}
                className="bg-white hover:bg-gray-100 text-[#005DAD] text-xs font-bold px-5 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
              >
                Contact
              </button>

              {/* Language Selector Trigger */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer relative ${langOpen ? "bg-[#0093CB]/20 border-[#0093CB] text-[#0093CB]" : "border-white/20 bg-white/10 text-white hover:bg-white/25"
                    }`}
                >
                  <Globe size={15} />
                  {currentLangCode !== "en" && (
                    <span className="absolute -top-1 -right-1 text-[9px] bg-[#0093CB] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {currentLang.flag}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 origin-top-right notranslate"
                    >
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                          Select Language
                        </span>
                      </div>
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors hover:bg-gray-50 ${currentLangCode === lang.code
                            ? "text-[#0093CB]"
                            : "text-gray-700"
                            }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="text-base">{lang.flag}</span>
                            <span>{lang.name}</span>
                            <span className="text-gray-400 font-normal">({lang.localName})</span>
                          </span>
                          {currentLangCode === lang.code && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0093CB]" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Menu Toggle Trigger */}
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className={`rounded-full flex items-center gap-1.5 px-3 py-1.5 transition-colors shadow-xs cursor-pointer border ${megaMenuOpen ? "bg-[#0093CB] text-white border-[#0093CB]" : "bg-white text-gray-800 border-gray-100 hover:bg-gray-100"
                  }`}
              >
                <User size={13} className={megaMenuOpen ? "text-white" : "text-gray-600"} />
                <Menu size={13} className={megaMenuOpen ? "text-white" : "text-gray-500"} />
              </button>
            </div>
          </div>

          {/* Left Decorative Food SVGs */}
          <div className="absolute left-0 bottom-0 top-12 w-[35%] z-10 pointer-events-none select-none hidden sm:block">
            {/* Burger */}
            <img
              src="/images/6a6e0e4bfe1ac28c289fa289bc018d2a 1.svg"
              alt="Burger decoration"
              className="absolute left-[8%] top-[24%] w-[65px] md:w-[95px] h-auto object-contain transition-transform hover:scale-105"
            />
            {/* Skewers */}
            <img
              src="/images/281465da42e6b432b0a2d8d253463987 1.svg"
              alt="Skewers decoration"
              className="absolute left-[32%] top-[10%] w-[50px] md:w-[70px] h-auto object-contain transition-transform hover:scale-105"
            />
            {/* Pizza */}
            <img
              src="/images/c18b20de1065fa365038b38d42823a27 1.svg"
              alt="Pizza decoration"
              className="absolute left-[18%] bottom-[3%] w-[100px] md:w-[150px] h-auto object-contain transition-transform hover:scale-105"
            />
          </div>

          {/* Right Decorative Food table SVGs */}
          <div className="absolute left-[67%] right-0 bottom-0 w-[32%] lg:w-[28%] z-10 pointer-events-none select-none hidden sm:block">
            <img
              src="/images/Rectangle 113.svg"
              alt="Cooking table decoration"
              className="absolute right-[2%] bottom-0 w-[300px] md:max-w-[480px] w-full h-auto object-contain transition-transform hover:scale-103"
            />
          </div>

          {/* Central Banner Search Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 mt-6">
            {/* Centered SVG Title */}
            <div className="max-w-[90%] sm:max-w-[680px] w-full h-auto mb-6">
              <img
                src="/images/Search best food Area in your Area.svg"
                alt="Search best food Area in your Area"
                className="w-full h-auto mx-auto select-none pointer-events-none filter drop-shadow-md"
              />
            </div>

            {/* Centered White Search Input */}
            <div className="w-full max-w-[90%] sm:max-w-[620px] bg-white rounded-2xl shadow-xl border border-white/20 p-1.5 flex items-center relative z-20 hover:shadow-2xl transition-all duration-300">
              <div className="pl-3 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by restaurant name, cuisine or food street..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none px-3 text-sm text-gray-800 placeholder-gray-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="pr-2 text-gray-400 hover:text-gray-600 font-bold text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
              transition={{
                type: "spring",
                mass: 1,
                stiffness: 100,
                damping: 15
              }}
              className="absolute top-[72px] left-0 w-full bg-white shadow-2xl py-6 px-10 flex gap-8 z-40 border-t border-gray-100 origin-top"
            >
              {/* Left Column */}
              <div className="flex gap-8">
                <div className="flex items-center justify-center m-4 relative group cursor-pointer overflow-hidden rounded-xl w-56 h-36 shadow-lg border border-gray-50">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY465BT0LBlQZbqVwyb4CHTuNHSdSDIP5JRhG0SEvBow&s=10"
                    alt="walkawaytrip.com"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Gradient for Text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/20"></div>

                  {/* Top Text */}
                  <div className="absolute top-4 left-4">
                    <p className="text-white text-[10px] font-semibold uppercase tracking-[0.2em] opacity-90 drop-shadow-md">walkawaytrip.com</p>
                  </div>

                  {/* Left Mid Text Stack */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-0.5">
                    <p className="text-white text-base font-semibold leading-tight tracking-tight drop-shadow-lg">your personal</p>
                    <p className="text-white text-base font-semibold leading-tight tracking-tight drop-shadow-lg">travel</p>
                    <p className="text-white text-base font-semibold leading-tight tracking-tight drop-shadow-lg">guide</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-left">
                  <h3 className="font-semibold text-gray-800 text-[14px] flex items-center hover:text-[#0093CB] transition-colors cursor-pointer group" onClick={() => setMegaMenuOpen(false)}>
                    <MdKeyboardArrowLeft className="mr-1 text-lg group-hover:-translate-x-1 transition-transform" /> Home
                  </h3>
                  <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">Search & Booking</h3>
                  <ul className="text-gray-500 text-[12px] font-medium space-y-1.5 ml-1 border-l border-gray-100 pl-3">
                    <li className="cursor-pointer hover:text-[#0093CB] transition" onClick={() => setMegaMenuOpen(false)}>• Flights</li>
                    <li className="cursor-pointer hover:text-[#0093CB] transition" onClick={() => setMegaMenuOpen(false)}>• Hotels</li>
                    <li className="cursor-pointer hover:text-[#0093CB] transition">
                      <Link to="/car-rental" onClick={() => setMegaMenuOpen(false)}>• Rental Cars</Link>
                    </li>
                    <li className="cursor-pointer hover:text-[#0093CB] transition" onClick={() => setMegaMenuOpen(false)}>• Holiday Packages</li>
                  </ul>
                  <Link to="/trending-destinations" onClick={() => setMegaMenuOpen(false)}>
                    <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">• Trending Destinations</h3>
                  </Link>
                  <Link to="/seasonal-offers" onClick={() => setMegaMenuOpen(false)}>
                    <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">• Seasonal Offers</h3>
                  </Link>
                  <Link to="/my-trips" onClick={() => setMegaMenuOpen(false)}>
                    <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">• My Trip</h3>
                  </Link>
                </div>
                <div className="h-full w-px bg-gray-100" />
              </div>

              {/* Middle Column */}
              <div className="flex gap-8 text-left">
                <div className="space-y-3">
                  <Link to="/travel-tools" onClick={() => setMegaMenuOpen(false)} className="block mb-1.5">
                    <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">Travel Tools</h3>
                  </Link>
                  <ul className="text-gray-500 text-[12px] font-medium space-y-1.5">
                    <li className="cursor-pointer hover:text-[#0093CB] transition">• Currency Converter</li>
                    <li className="cursor-pointer hover:text-[#0093CB] transition">• Weather Update</li>
                    <li className="cursor-pointer hover:text-[#0093CB] transition">• Travel Insurance</li>
                    <li className="cursor-pointer hover:text-[#0093CB] transition">• VISA & Passport Guide</li>
                  </ul>
                  <Link to="/customer-support" onClick={() => setMegaMenuOpen(false)} className="block mb-1.5">
                    <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">
                      Customer Support
                    </h3>
                  </Link>
                  <ul className="text-gray-500 text-[12px] font-medium space-y-1.5">
                    <li className="cursor-pointer hover:text-[#0093CB] transition">
                      <Link to="/ai-chatbot" onClick={() => setMegaMenuOpen(false)}>• AI ChatBot</Link>
                    </li>
                    <li className="cursor-pointer hover:text-[#0093CB] transition">
                      <Link to="/customer-support" onClick={() => setMegaMenuOpen(false)}>• FAQs</Link>
                    </li>
                    <li className="cursor-pointer hover:text-[#0093CB] transition">
                      <Link to="/customer-support" onClick={() => setMegaMenuOpen(false)}>• Contact Us</Link>
                    </li>
                  </ul>
                </div>
                <div className="h-full w-px bg-gray-100" />
              </div>

              {/* Right Column */}
              <div className="space-y-4 text-left">
                <Link to="/my-account" onClick={() => setMegaMenuOpen(false)}>
                  <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">My Account</h3>
                </Link>
                <ul className="text-gray-500 text-[12px] font-medium space-y-1.5">
                  <li>
                    <Link to="/my-account" onClick={() => setMegaMenuOpen(false)}>• Profile</Link>
                  </li>
                  <li>
                    <Link to="/booking-history" onClick={() => setMegaMenuOpen(false)}>• Booking History</Link>
                  </li>
                  <li>
                    <Link to="/my-account" onClick={() => setMegaMenuOpen(false)}>• Travel Wallet</Link>
                  </li>
                  <li>
                    <Link to="/my-account" onClick={() => setMegaMenuOpen(false)}>• Saved Cards</Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Main Sections */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Section 1: Explore trending Food Point in Delhi */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[Unbounded] tracking-tight text-left">
            Explore trending Food Point in Delhi
          </h2>
          <div className="rounded-[24px] overflow-hidden border border-gray-100 shadow-xs hover:shadow-md hover:scale-[1.002] transition-all duration-300 bg-white">
            <img
              src="/images/container of delhi hotels.svg"
              alt="Explore trending Food Point in Delhi"
              className="w-full h-auto block select-none pointer-events-none"
            />
          </div>
        </section>

        {/* Section 2: Choose a Hotel That Matches Your Mood */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[Unbounded] tracking-tight text-left">
            Choose a Hotel That Matches Your Mood
          </h2>
          <div className="rounded-[24px] overflow-hidden border border-gray-100 shadow-xs hover:shadow-md hover:scale-[1.002] transition-all duration-300 bg-white">
            <img
              src="/images/container of hotels list.svg"
              alt="Choose a Hotel That Matches Your Mood"
              className="w-full h-auto block select-none pointer-events-none"
            />
          </div>
        </section>

        {/* Section 3: Start planning your Next Trip */}
        <section className="space-y-6 pt-6 ml-6 mr-6">
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

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default BestFoodArea;
