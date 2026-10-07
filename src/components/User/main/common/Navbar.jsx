import { useState, useContext } from "react";
import { Menu, Search, Globe, User, HelpCircle, X, Bell, ChevronDown, Heart } from "lucide-react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "@/context/AuthContext";
import toast from "react-hot-toast";
import { LANGUAGES, getCurrentLanguage, setLanguageCookie } from "@/utils/translator";

const Navbar = ({ transparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const { state } = useContext(AuthContext) || {};
  const user = state?.user;
  const userPic = user?.avatarUrl || user?.profilePicture || user?.avatar || localStorage.getItem("userProfilePic") || null;

  const currentLangCode = getCurrentLanguage();
  const currentLang = LANGUAGES.find((l) => l.code === currentLangCode) || LANGUAGES[0];

  const handleLanguageChange = (code) => {
    setLanguageCookie(code);
    setLangOpen(false);
    setMobileLangOpen(false);
    toast.success(`Changing language to ${LANGUAGES.find((l) => l.code === code)?.name}...`);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <nav className={`px-4 sm:px-6 py-1.5 flex items-center justify-between w-full top-0 left-0 z-50 transition-all duration-300 ${transparent
      ? "absolute bg-transparent"
      : "fixed bg-white border-b border-gray-100 shadow-sm"
      }`}>
      {/* Logo */}
      <Link to="/main" className="flex items-center">
        <img src="/vite.svg" alt="Logo" className="h-6.5 cursor-pointer" />
      </Link>

      {/* Search Bar — hidden on mobile */}
      <div className="hidden md:flex flex-grow justify-end pr-4">
        <div className={`relative flex items-center rounded-full px-4 h-8 w-full max-w-lg ${transparent ? 'bg-white/80 backdrop-blur-md shadow-sm border border-white/40' : 'bg-gray-100'}`}>
          <input
            type="text"
            placeholder="Search your destination"
            className="bg-transparent outline-none flex-grow text-xs px-2 text-gray-700 placeholder-gray-400 font-medium"
          />
          <Search size={14} className="text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      {/* Right Icons — desktop */}
      <div className="hidden md:flex items-center gap-4">
        <button className={`w-8 h-8 flex items-center justify-center rounded-full transition text-gray-600 cursor-pointer ${transparent ? 'bg-white/80 backdrop-blur-md shadow-sm hover:bg-white border border-white/40' : 'bg-gray-100 hover:bg-gray-200'}`}>
          <Bell size={14} />
        </button>
        <Link to="/wishlist" className={`w-8 h-8 flex items-center justify-center rounded-full transition text-gray-600 cursor-pointer ${transparent ? 'bg-white/80 backdrop-blur-md shadow-sm hover:bg-white border border-white/40' : 'bg-gray-100 hover:bg-gray-200'}`}>
          <Heart size={14} />
        </Link>
        <button className={`h-8 px-3 flex items-center justify-center rounded-full transition text-[11px] font-bold text-gray-705 cursor-pointer ${transparent ? 'bg-white/80 backdrop-blur-md shadow-sm hover:bg-white border border-white/40' : 'bg-gray-100 hover:bg-gray-200'}`}>
          Support
        </button>

        {/* Desktop Language Selector */}
        <div className="relative flex items-center">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className={`h-8 px-2 flex items-center justify-center gap-1.5 rounded-full transition text-gray-600 cursor-pointer ${transparent ? 'bg-white/80 backdrop-blur-md shadow-sm hover:bg-white border border-white/40' : 'bg-gray-100 hover:bg-gray-200'} ${
              langOpen ? (transparent ? "bg-white text-[#0093CB]" : "bg-[#0093CB]/10 text-[#0093CB]") : ""
            }`}
          >
            <span className="text-sm leading-none">{currentLang.flag}</span>
            <Globe size={13} className="text-gray-500" />
            <ChevronDown size={11} className="text-gray-400" />
          </button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white/90 border border-gray-100 rounded-xl shadow-lg py-1 z-50 origin-top-right backdrop-blur-md notranslate"
              >
                <div className="px-3 py-1 border-b border-gray-100/50 mb-0.5">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400">
                    Select Language
                  </span>
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-gray-100/50 ${
                      currentLangCode === lang.code
                        ? "text-[#0093CB]"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.name}</span>
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

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-8 pl-1 pr-2 rounded-full transition flex items-center gap-2 cursor-pointer ${transparent ? 'bg-white/80 backdrop-blur-md shadow-sm hover:bg-white border border-white/40' : 'bg-gray-100 hover:bg-gray-200 border border-gray-200/50'}`}
        >
          {userPic ? (
            <img
              src={userPic}
              alt="User Profile"
              className="w-5.5 h-5.5 rounded-full object-cover"
            />
          ) : (
            <div className="w-5.5 h-5.5 rounded-full bg-[#0093CB]/10 text-[#0093CB] flex items-center justify-center">
              <User size={12} />
            </div>
          )}
          <Menu size={14} className="text-gray-600" />
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 ml-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="md:hidden fixed top-[52px] left-0 right-0 bottom-0 bg-white z-[999] overflow-y-auto px-5 py-6 pb-24 flex flex-col gap-6 text-left"
          >
            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 border border-gray-200/50">
              <input
                type="text"
                placeholder="Search your destination"
                className="bg-transparent outline-none flex-grow text-sm text-gray-700 placeholder-gray-400 font-medium"
              />
              <Search size={16} className="text-gray-500" />
            </div>

            {/* Quick Actions (Home & Account) */}
            <div className="grid grid-cols-3 gap-2.5">
              <Link 
                to="/main" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-gray-50 border border-gray-150 py-3 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-gray-100 transition shadow-xs"
              >
                <span className="text-lg">🏠</span>
                <span className="text-[11px] font-black text-gray-800">Home</span>
              </Link>
              <Link 
                to="/gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-gray-50 border border-gray-150 py-3 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-gray-100 transition shadow-xs"
              >
                <span className="text-lg">🖼️</span>
                <span className="text-[11px] font-black text-gray-800">Gallery</span>
              </Link>
              <Link 
                to="/my-account" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#0093CB] text-white py-3 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-[#007ba8] transition shadow-xs"
              >
                <span className="text-lg">👤</span>
                <span className="text-[11px] font-black">My Account</span>
              </Link>
            </div>

            {/* Menu Categories */}
            <div className="space-y-4">
              
              {/* Category 1: Search & Booking */}
              <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-4 space-y-3">
                <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1.5 flex items-center justify-between">
                  <span>Search & Booking</span>
                  <span>🔍</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs font-bold text-gray-700">
                  <Link to="/flights" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">✈️ Flights</Link>
                  <Link to="/hotel" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">🏨 Hotels</Link>
                  <Link to="/buses" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">🚌 Buses</Link>
                  <Link to="/cars" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">🚗 Car Rentals</Link>
                  <Link to="/holidays" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">📦 Holiday Packages</Link>
                  <Link to="/trains" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">🚆 Trains</Link>
                  <Link to="/cruises" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">🚢 Cruises</Link>
                  <Link to="/trending-destinations" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB] col-span-2">🔥 Trending Destinations</Link>
                  <Link to="/seasonal-offers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">🏷️ Seasonal Offers</Link>
                  <Link to="/my-trips" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">🧳 My Trip</Link>
                </div>
              </div>

              {/* Category 2: Travel Tools */}
              <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-4 space-y-3">
                <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1.5 flex items-center justify-between">
                  <span>Travel Tools</span>
                  <span>⚙️</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5 text-xs font-bold text-gray-700">
                  <Link to="/travel-tools" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Currency Converter</Link>
                  <Link to="/travel-tools" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Weather Update</Link>
                  <Link to="/travel-tools" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Travel Insurance</Link>
                  <Link to="/visa-passport" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• VISA & Passport Guide</Link>
                </div>
              </div>

              {/* Category 3: Customer Support */}
              <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-4 space-y-3">
                <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1.5 flex items-center justify-between">
                  <span>Customer Support</span>
                  <span>💬</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5 text-xs font-bold text-gray-700">
                  <Link to="/ai-chatbot" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB] font-extrabold text-[#0093CB] flex items-center gap-1.5">
                    🤖 AI ChatBot <span className="bg-[#0093CB]/10 px-1.5 py-0.5 rounded text-[8px]">New</span>
                  </Link>
                  <Link to="/customer-support" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• FAQs</Link>
                  <Link to="/customer-support" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Contact Us</Link>
                </div>
              </div>

              {/* Category 4: Notifications */}
              <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-4 space-y-3">
                <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1.5 flex items-center justify-between">
                  <span>Notifications</span>
                  <span>🔔</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5 text-xs font-bold text-gray-700">
                  <Link to="/notifications" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Price Drop Alert</Link>
                  <Link to="/notifications" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Flight Status Updates</Link>
                  <Link to="/notifications" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Exclusive Deals & Offers</Link>
                </div>
              </div>

              {/* Category 5: About & Policies */}
              <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-4 space-y-3">
                <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1.5 flex items-center justify-between">
                  <span>About & Policies</span>
                  <span>📄</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5 text-xs font-bold text-gray-700">
                  <Link to="/about-policies" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• About Us</Link>
                  <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Privacy Policy</Link>
                  <Link to="/policy/website" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Terms & Conditions</Link>
                  <Link to="/policy/service" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Refund & Cancellation Policy</Link>
                </div>
              </div>

              {/* Category 6: Account & Wallet */}
              <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-4 space-y-3">
                <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1.5 flex items-center justify-between">
                  <span>Account & Wallet</span>
                  <span>💳</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5 text-xs font-bold text-gray-700">
                  <Link to="/complete-profile" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Profile & Settings</Link>
                  <Link to="/my-account" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Payment Methods</Link>
                  <Link to="/my-account" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#0093CB]">• Travel Wallet</Link>
                </div>
              </div>

            </div>

            {/* Language Selection Quick Bar */}
            <div className="border border-gray-150 rounded-2xl p-4 bg-gray-50/50 text-left notranslate">
              <span className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Select Language</span>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs font-semibold ${
                      currentLangCode === lang.code
                        ? "border-[#0093CB] bg-[#0093CB]/5 text-[#0093CB]"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Mega Menu (Dropdown) — desktop only */}
      <AnimatePresence>
        {isOpen && (
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
            className="absolute top-full left-0 w-full bg-white shadow-2xl py-6 px-10 flex gap-8 z-40 border-t border-gray-100 origin-top"
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
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-gray-800 text-[14px] flex items-center hover:text-[#0093CB] transition-colors cursor-pointer group" onClick={() => setIsOpen(false)}>
                  <MdKeyboardArrowLeft className="mr-1 text-lg group-hover:-translate-x-1 transition-transform" /> Home
                </h3>
                <Link to="/booking" onClick={() => setIsOpen(false)}>
                  <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">Search & Booking</h3>
                </Link>
                <ul className="text-gray-500 text-[12px] font-medium space-y-1.5 ml-1 border-l border-gray-100 pl-3">
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/flights" onClick={() => setIsOpen(false)}>• Flights</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/hotel" onClick={() => setIsOpen(false)}>• Hotels</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/buses" onClick={() => setIsOpen(false)}>• Buses</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/cars" onClick={() => setIsOpen(false)}>• Car Rentals</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/holidays" onClick={() => setIsOpen(false)}>• Holiday Packages</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/trains" onClick={() => setIsOpen(false)}>• Trains</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/cruises" onClick={() => setIsOpen(false)}>• Cruises</Link>
                  </li>
                </ul>
                <Link to="/trending-destinations" onClick={() => setIsOpen(false)}>
                  <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">• Trending Destinations</h3>
                </Link>
                <Link to="/seasonal-offers" onClick={() => setIsOpen(false)}>
                  <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">• Seasonal Offers</h3>
                </Link>
                <Link to="/my-trips" onClick={() => setIsOpen(false)}>
                  <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">• My Trip</h3>
                </Link>
              </div>
              <div className="h-full w-px bg-gray-100" />
            </div>

            {/* Middle Column */}
            <div className="flex gap-8">
              <div className="space-y-3">
                <Link to="/travel-tools" onClick={() => setIsOpen(false)} className="block mb-1.5">
                  <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">Travel Tools</h3>
                </Link>
                <ul className="text-gray-500 text-[12px] font-medium space-y-1.5">
                  <li className="cursor-pointer hover:text-[#0093CB] transition">• Currency Converter</li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">• Weather Update</li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">• Travel Insurance</li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">• VISA & Passport Guide</li>
                </ul>
                <Link to="/customer-support" onClick={() => setIsOpen(false)} className="block mb-1.5">
                  <h3 className="font-semibold text-gray-800 text-[14px] hover:text-[#0093CB] transition-colors cursor-pointer">
                    Customer Support
                  </h3>
                </Link>
                <ul className="text-gray-500 text-[12px] font-medium space-y-1.5">
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/ai-chatbot" onClick={() => setIsOpen(false)}>• AI ChatBot</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/customer-support" onClick={() => setIsOpen(false)}>• FAQs</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/customer-support" onClick={() => setIsOpen(false)}>• Contact Us</Link>
                  </li>
                </ul>
                <Link to="/gallery" onClick={() => setIsOpen(false)}>
                  <h3 className="font-semibold text-gray-800 text-[14px] cursor-pointer hover:text-[#0093CB] transition">Gallery</h3>
                </Link>
              </div>
              <div className="space-y-3">
                <Link to="/notifications" onClick={() => setIsOpen(false)}>
                  <h3 className="font-semibold text-gray-800 text-[14px] cursor-pointer hover:text-[#0093CB] transition">Notifications</h3>
                </Link>
                <ul className="text-gray-500 text-[12px] font-medium space-y-1.5">
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/notifications" onClick={() => setIsOpen(false)}>• Price Drop Alert</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/notifications" onClick={() => setIsOpen(false)}>• Flight Status Updates</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0093CB] transition">
                    <Link to="/notifications" onClick={() => setIsOpen(false)}>• Exclusive Deals & Offers</Link>
                  </li>
                </ul>
                <Link to="/about-policies" onClick={() => setIsOpen(false)}>
                  <h3 className="font-semibold text-gray-800 text-[14px] cursor-pointer hover:text-[#0093CB] transition">About & Policies</h3>
                </Link>
                <ul className="text-gray-500 text-[12px] font-medium space-y-1.5">
                  <li className="cursor-pointer hover:text-[#0093CB] transition">• About Us</li>
                  <li className="hover:text-[#0093CB] cursor-pointer transition">
                    <Link to="/privacy-policy" onClick={() => setIsOpen(false)}>• Privacy Policy</Link>
                  </li>
                  <li className="hover:text-[#0093CB] cursor-pointer transition">
                    <Link to="/policy/website" onClick={() => setIsOpen(false)}>• Terms & Conditions</Link>
                  </li>
                  <li className="hover:text-[#0093CB] cursor-pointer transition">
                    <Link to="/policy/service" onClick={() => setIsOpen(false)}>• Refund & Cancellation Policy</Link>
                  </li>
                </ul>
              </div>
              <div className="h-full w-px bg-gray-50" />
            </div>

            {/* Right Column */}
            <div className="flex-grow text-center flex flex-col items-center justify-center bg-gray-50/50 rounded-xl p-6 border border-gray-100">
              {userPic ? (
                <img
                  src={userPic}
                  alt="User Profile"
                  className="w-14 h-14 rounded-full border-2 border-[#0093CB] object-cover shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 rounded-full border-2 border-[#0093CB] bg-[#0093CB]/10 text-[#0093CB] flex items-center justify-center shadow-sm">
                  <User size={28} />
                </div>
              )}
              <Link
                to="/my-account"
                onClick={() => setIsOpen(false)}
                className="bg-[#0093CB] text-white py-1.5 px-5 mt-4 rounded-lg font-bold text-[10px] uppercase tracking-[0.15em] shadow-md shadow-[#0093CB]/10 hover:bg-[#007094] transition-all text-center"
              >
                My Account
              </Link>
              <h3 className="font-semibold text-gray-800 text-[14px] mt-6">Account & Wallet</h3>
              <ul className="text-gray-500 text-[12px] font-medium space-y-2 mt-2">
                <li className="cursor-pointer hover:text-[#0093CB] transition">• Profile & Settings</li>
                <li className="cursor-pointer hover:text-[#0093CB] transition">• Payment Methods</li>
                <li className="cursor-pointer hover:text-[#0093CB] transition">• Travel Wallet</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
