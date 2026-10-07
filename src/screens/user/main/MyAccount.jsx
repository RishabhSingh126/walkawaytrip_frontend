import React, { useState, useContext, useEffect } from "react";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import {
  ChevronRight,
  Pencil,
  User as UserIcon,
  Loader2,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Wallet,
  ArrowRight,
  Star,
  Clock
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { AUTH_ACTIONS } from "@/context/constants";
import { completeProfile } from "@/api/userAPI";
import toast from "react-hot-toast";

const navItems = [
  { label: "Personal Information", path: "/my-account" },
  { label: "Payment Methods", path: "/payment-methods" },
  { label: "Travel Wallet", path: "/travel-wallet" },
  { label: "Traveler Badges & Stats", path: "/traveler-badges" },
  { label: "Family & Companions", path: "/companions" },
  { label: "Fare Alerts & Subscriptions", path: "/fare-alerts" },
  { label: "My Booking & Travel", path: "/my-trips" },
  { label: "Wishlist", path: "/wishlist" },
  { label: "Booking History", path: "/booking-history" },
  { label: "Upcomming Plan", path: "/upcoming-plan" },
];

const MOCK_PLANS = {
  upcoming: [
    {
      id: "P-UP-9841",
      type: "hotel",
      title: "Landaa Giraavaru Overwater Resort",
      location: "Baa Atoll, Maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "July 08, 2026 - July 14, 2026",
      details: "1 Villa · 2 Guests · 6 Nights",
      price: "$2,450.00",
      countdown: 9,
    },
    {
      id: "P-UP-9842",
      type: "flight",
      title: "Singapore Airlines Flight SQ-425",
      location: "Changi Airport (SIN) to Male (MLE)",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "July 08, 2026",
      details: "Economy · Terminal 3 · Seat 18C, 18D",
      price: "$780.00",
      countdown: 9,
    }
  ],
  completed: [
    {
      id: "P-CO-8941",
      type: "hotel",
      title: "Lakeside Motel Waterfront",
      location: "Lake Wanaka, New Zealand",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "March 18, 2026 - March 20, 2026",
      details: "1 Room · 2 Guests · 2 Nights",
      price: "$260.00",
      rating: 5,
    },
    {
      id: "P-CO-7832",
      type: "activity",
      title: "Phi Phi Islands Adventure Day Trip",
      location: "Phuket, Thailand",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "May 15, 2026",
      details: "Seaview Lunch · Snorkeling Gear · Guide Included",
      price: "$180.00",
      rating: 4,
    }
  ],
  cancelled: [
    {
      id: "P-CA-9042",
      type: "car",
      title: "Ford Mustang Convertible (V6)",
      location: "Los Angeles Airport (LAX)",
      image: "https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=600&auto=format&fit=crop&q=80",
      date: "June 05, 2026 - June 08, 2026",
      details: "Unlimited Mileage · Collision Damage Waiver",
      price: "$210.00",
      refundStatus: "Refund Processed",
    }
  ],
  unsuccessful: [
    {
      id: "P-UN-5521",
      type: "flight",
      title: "Emirates Flight EK-512",
      location: "Mumbai (BOM) to Dubai (DXB)",
      image: "https://images.unsplash.com/photo-1627501691850-db08eb81199a?w=600&auto=format&fit=crop&q=80",
      date: "June 20, 2026",
      details: "Business Class · Payment Failed",
      price: "$850.00",
      reason: "Transaction timeout by issuing bank",
    }
  ]
};

const MOCK_CARDS = [
  { id: "c1", cardholder: "John Doe", number: "•••• •••• •••• 4242", expiry: "12/28", brand: "visa", color: "from-[#0F2027] via-[#203A43] to-[#2C5364]" },
  { id: "c2", cardholder: "John Doe", number: "•••• •••• •••• 8890", expiry: "08/29", brand: "mastercard", color: "from-[#1A2980] to-[#26D0CE]" }
];

const MOCK_TRANSACTIONS = [
  { id: "t1", title: "Maldives Booking Deposit", date: "June 25, 2026", amount: "-$500.00", type: "debit" },
  { id: "t2", title: "Refund: Cancelled Mustang Rental", date: "June 10, 2026", amount: "+$210.00", type: "credit" },
  { id: "t3", title: "Wallet Top-up", date: "June 01, 2026", amount: "+$1,000.00", type: "credit" }
];

const MyAccount = () => {
  const navigate = useNavigate();
  const { state: authState, dispatch } = useContext(AuthContext) || {};
  const user = authState?.user;

  const [activeNav, setActiveNav] = useState("Personal Information");
  const [activePlanTab, setActivePlanTab] = useState("upcoming"); // 'upcoming' | 'completed' | 'cancelled' | 'unsuccessful'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [addressTitle, setAddressTitle] = useState("");

  const [showCompleteBanner, setShowCompleteBanner] = useState(
    localStorage.getItem("hideCompleteProfileBanner") !== "true"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPhone, setIsChangingPhone] = useState(false);

  // Sync with current user details on load/change
  useEffect(() => {
    const syncUser = (userData) => {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setAddress(userData.address || "");
      setPincode(userData.pincode || "");
      setState(userData.state || "");
      setCity(userData.city || "");
      setCountry(userData.country || "India");
      setAddressTitle(userData.addressTitle || "");
    };

    if (user && user.name) {
      syncUser(user);
    } else {
      // Force fetch if user context is missing details
      import('@/api/userAPI').then(m => {
        m.getUser().then(freshUser => {
          if (freshUser) {
            syncUser(freshUser);
            dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: freshUser });
          }
        }).catch(err => console.warn("Failed to fetch fresh user data:", err));
      });
    }
  }, [user, dispatch]);

  const userPic = user?.avatarUrl || user?.profilePicture || user?.avatar || localStorage.getItem("userProfilePic") || null;

  const handleNotNow = () => {
    localStorage.setItem("hideCompleteProfileBanner", "true");
    setShowCompleteBanner(false);
  };

  const handleShowBanner = () => {
    localStorage.removeItem("hideCompleteProfileBanner");
    setShowCompleteBanner(true);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const payload = {
        name,
        email,
        phone,
        address,
        pincode,
        state,
        city,
        country,
        addressTitle,
        avatarUrl: userPic,
      };

      const userId = user?._id || user?.id || "temp-user-id";
      let updatedUser = { ...user, ...payload };

      if (user?._id || user?.id) {
        try {
          const response = await completeProfile(userId, payload);
          if (response && response.user) {
            updatedUser = response.user;
          }
        } catch (apiError) {
          console.warn("API request failed, falling back to local storage:", apiError);
        }
      }

      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: updatedUser,
      });

      toast.success("Changes saved successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePhone = async () => {
    if (!phone.trim()) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setIsChangingPhone(true);
    try {
      const payload = { phone };
      const userId = user?._id || user?.id || "temp-user-id";
      let updatedUser = { ...user, phone };

      if (user?._id || user?.id) {
        try {
          const response = await completeProfile(userId, { ...user, phone });
          if (response && response.user) {
            updatedUser = response.user;
          }
        } catch (apiError) {
          console.warn("API failed, updating locally:", apiError);
        }
      }

      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: updatedUser,
      });

      toast.success("Phone number updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update phone number.");
    } finally {
      setIsChangingPhone(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between relative overflow-x-hidden">
      {/* Top Background Gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0096B9 0%, #0096B9 40%, rgba(0, 150, 185, 0.7) 60%, rgba(0, 150, 185, 0.3) 80%, rgba(255, 255, 255, 0) 100%)",
          zIndex: 0
        }}
      />

      <div className="relative z-10">
        <Navbar />

        {/* First Section - container (1) copy.svg */}
        <div className="pt-24 pb-4 px-8 sm:px-16 md:px-24 lg:px-32 flex justify-center">
          <div className="max-w-[1150px] w-full relative">
            <img
              src="/images/container (1) copy.svg"
              alt="Account Overview"
              className="w-full h-auto block rounded-xl shadow-sm"
            />
            {/* Overlay user profile picture over the top right profile template */}
            <div
              className="absolute rounded-full overflow-hidden border-2 border-white shadow-md"
              style={{
                top: "0%",
                right: "0%",
                width: "8.33%",
                aspectRatio: "1/1",
              }}
            >
              {userPic ? (
                <img
                  src={userPic}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#007CAD] text-white flex items-center justify-center font-bold text-[2vw] md:text-2xl">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>

            {/* Dynamic greeting overlay that covers "Hi! Aditya" in the SVG */}
            <div
              className="absolute flex items-center text-white font-bold"
              style={{
                left: "0.2%",
                top: "6%",
                width: "38%",
                height: "13%",
                background: "linear-gradient(to right, #00A1C2 0%, #0096B9 90%)", // perfectly covers "Hi! Aditya"
                fontSize: "3.2vw",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              <p>Hi! {name ? name.split(" ")[0] : "User"}</p>
            </div>
          </div>
        </div>

        {/* Second Section - Complete Profile Banner */}
        {showCompleteBanner && (
          <div className="pb-10 px-8 sm:px-16 md:px-24 lg:px-32 flex justify-center">
            <div className="max-w-[1150px] w-full relative">
              <div className="w-full bg-gradient-to-r from-[#007CAD] via-[#005F8A] to-[#004A6E] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                {/* Background accent light circle */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />

                <div className="flex-1 text-center md:text-left z-10">
                  <span className="bg-white/20 text-white text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full mb-3 inline-block border border-white/10">
                    Profile Completion
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    Unlock Personalized Travel Experiences!
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xl">
                    Complete your profile to enjoy seamless bookings, real-time trip notifications, and exclusive curated travel guides.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto z-10">
                  <button
                    onClick={handleNotNow}
                    className="w-full sm:w-auto px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/15 transition-all duration-200 text-xs font-extrabold uppercase tracking-wider"
                  >
                    Not Now
                  </button>
                  <button
                    onClick={() => navigate("/complete-profile")}
                    className="w-full sm:w-auto px-6 py-3 bg-white text-[#007CAD] rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-200 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-black/10"
                  >
                    Complete Now
                  </button>
                </div>
              </div>

              {/* Decorative Vector Image (Airplane) */}
              <div
                className="absolute pointer-events-none z-10 hidden md:block"
                style={{
                  width: "224px",
                  height: "60px",
                  bottom: "-20px",
                  right: "-230px",
                  transform: "rotate(0deg)",
                  opacity: 1,
                }}
              >
                <img
                  src="/images/Vector (2).svg"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* ─── Third Section: Manage Account ─── */}
        <div className="pb-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 flex justify-center">
          <div className="max-w-[1150px] w-full">
            {/* Section Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Manage Account
              </h2>
              {!showCompleteBanner && (
                <button
                  onClick={handleShowBanner}
                  className="w-full sm:w-auto text-xs text-[#007CAD] font-bold hover:underline bg-[#007CAD]/5 px-3 py-1.5 rounded-lg border border-[#007CAD]/20 transition-all active:scale-95 text-center cursor-pointer"
                >
                  Show Profile Completion Banner
                </button>
              )}
            </div>

            <div className="flex flex-col lg:flex-row items-start" style={{ gap: "20px" }}>

              {/* ── Left Sidebar ── */}
              <div
                className="relative flex-shrink-0 rounded-[23px] overflow-hidden border border-gray-200 w-full lg:w-[326px] lg:h-[380px]"
              >
                {/* Teal gradient background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(160deg, #007CAD 0%, #005F8A 60%, #004A6E 100%)",
                  }}
                />

                {/* Navigation links */}
                <div className="relative z-10 pt-4 sm:pt-6 px-1 sm:px-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={(e) => {
                        const dynamicTabs = [
                          "Personal Information",
                          "Booking History",
                          "Upcomming Plan",
                          "Payment Methods",
                          "Travel Wallet",
                          "Traveler Badges & Stats",
                          "Family & Companions",
                          "Fare Alerts & Subscriptions"
                        ];
                        if (dynamicTabs.includes(item.label)) {
                          e.preventDefault();
                          setActiveNav(item.label);
                          if (item.label === "Upcomming Plan") {
                            setActivePlanTab("upcoming");
                          } else if (item.label === "Booking History") {
                            setActivePlanTab("upcoming");
                          }
                        } else {
                          setActiveNav(item.label);
                        }
                      }}
                      className={`flex items-center justify-between w-full px-3 sm:px-5 py-2.5 sm:py-3.5 text-sm font-medium transition-all duration-200 group ${activeNav === item.label
                        ? "bg-white/20 text-white rounded-xl"
                        : "text-white/90 hover:bg-white/10 rounded-xl"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform ${activeNav === item.label
                          ? "text-white"
                          : "text-white/60 group-hover:text-white"
                          }`}
                      />
                    </Link>
                  ))}
                </div>

                {/* City silhouette at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-0">
                  <svg
                    viewBox="0 0 426 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full"
                    style={{ opacity: 0.25 }}
                  >
                    {/* Tall central tower */}
                    <rect x="160" y="40" width="18" height="160" fill="white" />
                    <rect x="165" y="20" width="8" height="22" fill="white" />
                    <rect x="167" y="10" width="4" height="12" fill="white" />
                    {/* Tower windows */}
                    <rect x="163" y="50" width="4" height="6" fill="#007CAD" />
                    <rect x="171" y="50" width="4" height="6" fill="#007CAD" />
                    <rect x="163" y="65" width="4" height="6" fill="#007CAD" />
                    <rect x="171" y="65" width="4" height="6" fill="#007CAD" />
                    <rect x="163" y="80" width="4" height="6" fill="#007CAD" />
                    <rect x="171" y="80" width="4" height="6" fill="#007CAD" />
                    <rect x="163" y="95" width="4" height="6" fill="#007CAD" />
                    <rect x="171" y="95" width="4" height="6" fill="#007CAD" />
                    <rect x="163" y="110" width="4" height="6" fill="#007CAD" />
                    <rect x="171" y="110" width="4" height="6" fill="#007CAD" />
                    <rect x="163" y="125" width="4" height="6" fill="#007CAD" />
                    <rect x="171" y="125" width="4" height="6" fill="#007CAD" />
                    {/* Left building */}
                    <rect x="60" y="100" width="70" height="100" fill="white" />
                    <rect x="65" y="80" width="60" height="22" fill="white" />
                    <rect x="80" y="65" width="30" height="17" fill="white" />
                    <rect x="65" y="108" width="8" height="8" fill="#007CAD" />
                    <rect x="80" y="108" width="8" height="8" fill="#007CAD" />
                    <rect x="95" y="108" width="8" height="8" fill="#007CAD" />
                    <rect x="110" y="108" width="8" height="8" fill="#007CAD" />
                    <rect x="65" y="123" width="8" height="8" fill="#007CAD" />
                    <rect x="80" y="123" width="8" height="8" fill="#007CAD" />
                    <rect x="95" y="123" width="8" height="8" fill="#007CAD" />
                    <rect x="110" y="123" width="8" height="8" fill="#007CAD" />
                    <rect x="65" y="138" width="8" height="8" fill="#007CAD" />
                    <rect x="80" y="138" width="8" height="8" fill="#007CAD" />
                    <rect x="95" y="138" width="8" height="8" fill="#007CAD" />
                    <rect x="110" y="138" width="8" height="8" fill="#007CAD" />
                    <rect x="65" y="155" width="8" height="8" fill="#007CAD" />
                    <rect x="80" y="155" width="8" height="8" fill="#007CAD" />
                    <rect x="95" y="155" width="8" height="8" fill="#007CAD" />
                    <rect x="110" y="155" width="8" height="8" fill="#007CAD" />
                    {/* Right building */}
                    <rect x="205" y="85" width="80" height="115" fill="white" />
                    <rect x="215" y="65" width="60" height="22" fill="white" />
                    <rect x="205" y="93" width="10" height="10" fill="#007CAD" />
                    <rect x="222" y="93" width="10" height="10" fill="#007CAD" />
                    <rect x="239" y="93" width="10" height="10" fill="#007CAD" />
                    <rect x="256" y="93" width="10" height="10" fill="#007CAD" />
                    <rect x="273" y="93" width="10" height="10" fill="#007CAD" />
                    <rect x="205" y="110" width="10" height="10" fill="#007CAD" />
                    <rect x="222" y="110" width="10" height="10" fill="#007CAD" />
                    <rect x="239" y="110" width="10" height="10" fill="#007CAD" />
                    <rect x="256" y="110" width="10" height="10" fill="#007CAD" />
                    <rect x="273" y="110" width="10" height="10" fill="#007CAD" />
                    <rect x="205" y="130" width="10" height="10" fill="#007CAD" />
                    <rect x="222" y="130" width="10" height="10" fill="#007CAD" />
                    <rect x="239" y="130" width="10" height="10" fill="#007CAD" />
                    <rect x="256" y="130" width="10" height="10" fill="#007CAD" />
                    <rect x="273" y="130" width="10" height="10" fill="#007CAD" />
                    <rect x="205" y="150" width="10" height="10" fill="#007CAD" />
                    <rect x="222" y="150" width="10" height="10" fill="#007CAD" />
                    <rect x="239" y="150" width="10" height="10" fill="#007CAD" />
                    <rect x="256" y="150" width="10" height="10" fill="#007CAD" />
                    <rect x="273" y="150" width="10" height="10" fill="#007CAD" />
                    {/* Far right small building */}
                    <rect x="320" y="120" width="50" height="80" fill="white" />
                    <rect x="325" y="130" width="8" height="8" fill="#007CAD" />
                    <rect x="340" y="130" width="8" height="8" fill="#007CAD" />
                    <rect x="355" y="130" width="8" height="8" fill="#007CAD" />
                    <rect x="325" y="145" width="8" height="8" fill="#007CAD" />
                    <rect x="340" y="145" width="8" height="8" fill="#007CAD" />
                    <rect x="355" y="145" width="8" height="8" fill="#007CAD" />
                    {/* Far left small building */}
                    <rect x="10" y="130" width="45" height="70" fill="white" />
                    <rect x="15" y="140" width="8" height="8" fill="#007CAD" />
                    <rect x="30" y="140" width="8" height="8" fill="#007CAD" />
                    <rect x="15" y="155" width="8" height="8" fill="#007CAD" />
                    <rect x="30" y="155" width="8" height="8" fill="#007CAD" />
                    {/* Ground */}
                    <rect x="0" y="198" width="426" height="2" fill="white" />
                  </svg>
                </div>
              </div>

              {/* ── Right Content Panel ── */}
              <div
                className="flex-1 border border-gray-200 rounded-[23px] bg-white"
              >
                <div className="p-4 sm:p-6 md:p-8">
                  {activeNav === "Personal Information" && (
                    <>
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            Personal Information
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Update your info and find out how it's used.
                          </p>
                        </div>
                        <button
                          onClick={() => navigate("/complete-profile")}
                          className="flex items-center gap-1.5 text-[#007CAD] text-sm font-medium hover:underline cursor-pointer"
                        >
                          Edit Profile
                          <Pencil size={13} className="text-[#007CAD]" />
                        </button>
                      </div>

                      {/* Profile Photo & Greeting */}
                      <div className="mb-6 flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
                          {userPic ? (
                            <img
                              src={userPic}
                              alt="Profile"
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#007CAD]/10 text-[#007CAD] flex items-center justify-center">
                              <UserIcon size={32} />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-base font-extrabold text-[#007CAD] leading-tight">
                            Hi! {name || "User"}
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">Personal Account</p>
                        </div>
                      </div>

                      {/* Name */}
                      <div className="mb-3">
                        <div className="relative border border-gray-200 rounded-lg bg-[#f0f8fc] px-3 pt-2 pb-2">
                          <label className="block text-[10px] text-gray-400 mb-0.5">
                            Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-800 font-medium outline-none"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <div className="relative border border-gray-200 rounded-lg bg-[#f0f8fc] px-3 pt-2 pb-2">
                          <label className="block text-[10px] text-gray-400 mb-0.5">
                            Email
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-800 font-medium outline-none"
                          />
                        </div>
                      </div>

                      {/* Phone + Change button */}
                      <div className="mb-5">
                        <div className="relative border border-gray-200 rounded-lg bg-[#f0f8fc] px-3 pt-2 pb-2 flex flex-wrap sm:flex-nowrap items-center justify-between">
                          <div className="flex-1">
                            <label className="block text-[10px] text-gray-400 mb-0.5">
                              Phone
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-transparent text-sm text-gray-800 font-medium outline-none"
                            />
                          </div>
                          <button
                            onClick={handleChangePhone}
                            disabled={isChangingPhone}
                            className="ml-4 bg-[#007CAD] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#005f8a] transition-colors flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                          >
                            {isChangingPhone ? (
                              <><Loader2 size={14} className="animate-spin" /> Saving...</>
                            ) : "Change"}
                          </button>
                        </div>
                      </div>

                      {/* Address Section */}
                      <h4 className="text-base font-bold text-gray-900 mb-3">
                        Address
                      </h4>

                      {/* Complete Address */}
                      <div className="mb-2">
                        <div className="relative border border-gray-200 rounded-lg bg-[#f0f8fc] px-3 py-2.5">
                          <textarea
                            placeholder="Complete Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            maxLength={110}
                            rows={2}
                            className="w-full bg-transparent text-sm text-gray-700 outline-none resize-none placeholder:text-gray-500"
                          />
                        </div>
                        <div className="text-right text-[10px] text-gray-400 mt-0.5 pr-1">
                          {address.length}/110
                        </div>
                      </div>

                      {/* Pincode + State */}
                      <div className="flex flex-col sm:flex-row gap-3 mb-3">
                        <div className="flex-1 border border-gray-200 rounded-lg bg-[#f0f8fc] px-3 py-2.5">
                          <input
                            type="text"
                            placeholder="Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400"
                          />
                        </div>
                        <div className="flex-1 border border-gray-200 rounded-lg bg-[#f0f8fc] px-3 py-2.5 flex items-center">
                          <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-500 outline-none appearance-none"
                          >
                            <option value="">State</option>
                            <option>Andhra Pradesh</option>
                            <option>Delhi</option>
                            <option>Goa</option>
                            <option>Gujarat</option>
                            <option>Karnataka</option>
                            <option>Kerala</option>
                            <option>Maharashtra</option>
                            <option>Rajasthan</option>
                            <option>Tamil Nadu</option>
                            <option>Uttar Pradesh</option>
                            <option>West Bengal</option>
                          </select>
                        </div>
                      </div>

                      {/* City + Country */}
                      <div className="flex flex-col sm:flex-row gap-3 mb-3">
                        <div className="flex-1 border border-gray-200 rounded-lg bg-[#f0f8fc] px-3 py-2.5">
                          <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400"
                          />
                        </div>
                        <div className="flex-1 border border-gray-200 rounded-lg bg-[#f0f8fc] px-3 py-2.5 flex items-center">
                          <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-600 outline-none appearance-none"
                          >
                            <option>India</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Australia</option>
                            <option>Canada</option>
                            <option>Germany</option>
                            <option>France</option>
                            <option>Japan</option>
                            <option>Singapore</option>
                            <option>UAE</option>
                          </select>
                        </div>
                      </div>

                      {/* Address Title */}
                      <div className="mb-6">
                        <div className="border border-gray-200 rounded-lg bg-[#f0f8fc] px-3 py-2.5">
                          <input
                            type="text"
                            placeholder="Address Title (Optional)"
                            value={addressTitle}
                            onChange={(e) => setAddressTitle(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      {/* Profile Connections */}
                      <h4 className="text-base font-bold text-gray-900 mb-3">
                        Profile Connections
                      </h4>
                      <div className="flex items-center gap-3 mb-6">
                        {/* Google */}
                        <button className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer">
                          <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                          </svg>
                        </button>
                        {/* Facebook */}
                        <button className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </button>
                        {/* Apple */}
                        <button className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#000">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                          </svg>
                        </button>
                      </div>

                      {/* Account Type */}
                      <h4 className="text-base font-bold text-gray-900 mb-3">
                        Account Type
                      </h4>
                      <div className="border border-gray-200 rounded-lg bg-white px-3 py-3 mb-6">
                        <p className="text-sm text-gray-500">Normal</p>
                      </div>

                      {/* Travel Preferences (Cleartrip style) */}
                      <h4 className="text-base font-bold text-gray-900 mb-3">
                        Travel Preferences
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
                        <div className="border border-gray-250/70 rounded-lg bg-[#f0f8fc] px-3 py-2.5 flex items-center">
                          <select className="w-full bg-transparent text-sm text-gray-600 outline-none appearance-none">
                            <option value="">Frequent Flyer Airline</option>
                            <option>Air India</option>
                            <option>Emirates</option>
                            <option>Singapore Airlines</option>
                            <option>Qatar Airways</option>
                          </select>
                        </div>
                        <div className="border border-gray-250/70 rounded-lg bg-[#f0f8fc] px-3 py-2.5">
                          <input
                            type="text"
                            placeholder="Frequent Flyer Number"
                            className="w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400"
                          />
                        </div>
                        <div className="border border-gray-250/70 rounded-lg bg-[#f0f8fc] px-3 py-2.5 flex items-center">
                          <select className="w-full bg-transparent text-sm text-gray-600 outline-none appearance-none">
                            <option value="">Seat Preference</option>
                            <option>Window Seat</option>
                            <option>Aisle Seat</option>
                            <option>Extra Legroom</option>
                          </select>
                        </div>
                        <div className="border border-gray-250/70 rounded-lg bg-[#f0f8fc] px-3 py-2.5 flex items-center">
                          <select className="w-full bg-transparent text-sm text-gray-600 outline-none appearance-none">
                            <option value="">Meal Preference</option>
                            <option>Vegetarian</option>
                            <option>Non-Vegetarian</option>
                            <option>Gluten Free</option>
                            <option>Diabetic Meal</option>
                          </select>
                        </div>
                      </div>

                      {/* Save Changes Button */}
                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveChanges}
                          disabled={isSaving}
                          className="w-full sm:w-auto px-8 py-3 bg-[#007CAD] hover:bg-[#005f8a] text-white rounded-xl transition-all text-sm font-bold shadow-lg shadow-[#007CAD]/20 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="animate-spin" size={18} />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </>
                  )}

                  {/* Booking History & Upcoming Plan - Dynamic Responsive Dashboard */}
                  {(activeNav === "Booking History" || activeNav === "Upcomming Plan") && (
                    <div>
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          My Plans & Trips
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          View and manage your upcoming, completed, cancelled, or unsuccessful plans.
                        </p>
                      </div>

                      {/* Responsive Sub-tabs */}
                      <div className="flex flex-wrap border-b border-gray-200/50 mb-6 pb-px gap-1">
                        {[
                          { id: "upcoming", label: "Upcoming", color: "text-[#007CAD]", bg: "bg-[#007CAD]/10" },
                          { id: "completed", label: "Completed", color: "text-emerald-600", bg: "bg-emerald-50" },
                          { id: "cancelled", label: "Cancelled", color: "text-red-600", bg: "bg-red-50" },
                          { id: "unsuccessful", label: "Unsuccessful", color: "text-amber-700", bg: "bg-amber-50" }
                        ].map((tab) => {
                          const count = MOCK_PLANS[tab.id]?.length || 0;
                          const isActive = activePlanTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setActivePlanTab(tab.id)}
                              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                                  ? "border-[#007CAD] text-[#007CAD]"
                                  : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
                                }`}
                            >
                              {tab.label}
                              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black leading-none ${isActive ? `${tab.bg} ${tab.color}` : "bg-gray-100 text-gray-500"
                                }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Plans List */}
                      <div className="space-y-4">
                        {MOCK_PLANS[activePlanTab]?.length > 0 ? (
                          MOCK_PLANS[activePlanTab].map((plan) => (
                            <div
                              key={plan.id}
                              className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col md:flex-row gap-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                            >
                              {/* Left Image Section */}
                              <div className="w-full md:w-44 h-32 rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-50 border border-gray-100/50">
                                <img
                                  src={plan.image}
                                  alt={plan.title}
                                  className="w-full h-full object-cover"
                                />
                                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                  {plan.type}
                                </span>
                              </div>

                              {/* Right Content Section */}
                              <div className="flex-1 flex flex-col justify-between py-0.5">
                                <div>
                                  <div className="flex justify-between items-start gap-2 mb-1">
                                    <h4 className="text-base font-extrabold text-gray-900 leading-tight">
                                      {plan.title}
                                    </h4>
                                    <span className="text-[9px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 flex-shrink-0">
                                      ID: {plan.id}
                                    </span>
                                  </div>

                                  <div className="space-y-1 mt-2 text-gray-600">
                                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                                      <MapPin size={13} className="text-gray-400 flex-shrink-0" />
                                      <span className="truncate">{plan.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                                      <Calendar size={13} className="text-gray-400 flex-shrink-0" />
                                      <span>{plan.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                                      <Clock size={13} className="text-gray-400 flex-shrink-0" />
                                      <span>{plan.details}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Bottom Info Row */}
                                <div className="flex flex-wrap items-end justify-between gap-3 mt-4 pt-3 border-t border-gray-50">
                                  <div>
                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">
                                      Total Cost
                                    </span>
                                    <span className="text-base font-black text-gray-900">
                                      {plan.price}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    {/* Tab-Specific Badges */}
                                    {activePlanTab === "upcoming" && (
                                      <span className="bg-[#007CAD]/10 text-[#007CAD] text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <Clock size={10} />
                                        In {plan.countdown} days
                                      </span>
                                    )}
                                    {activePlanTab === "cancelled" && (
                                      <span className="bg-red-50 text-red-600 border border-red-100 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <XCircle size={10} />
                                        {plan.refundStatus}
                                      </span>
                                    )}
                                    {activePlanTab === "completed" && (
                                      <div className="flex text-amber-400">
                                        {[...Array(plan.rating)].map((_, i) => (
                                          <Star key={i} size={11} fill="currentColor" className="stroke-none" />
                                        ))}
                                      </div>
                                    )}
                                    {activePlanTab === "unsuccessful" && (
                                      <span className="bg-amber-50 text-amber-800 border border-amber-100 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <AlertTriangle size={10} />
                                        Payment Failed
                                      </span>
                                    )}

                                    {/* Action Buttons */}
                                    {activePlanTab === "upcoming" && (
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => toast.success("Trip cancellation request sent successfully!")}
                                          className="text-red-500 hover:text-red-600 text-xs font-extrabold px-2.5 py-1.5 rounded-lg hover:bg-red-50/55 transition-colors cursor-pointer"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={() => navigate("/upcoming-plan")}
                                          className="bg-[#007CAD] hover:bg-[#005f8a] text-white text-xs font-extrabold px-4 py-1.5 rounded-lg shadow-xs active:scale-95 transition-all cursor-pointer"
                                        >
                                          Details
                                        </button>
                                      </div>
                                    )}

                                    {activePlanTab === "completed" && (
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => toast.success("Invoice download started.")}
                                          className="text-gray-600 hover:text-gray-800 text-xs font-extrabold px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                          Invoice
                                        </button>
                                        <button
                                          onClick={() => toast.success(`Searching available deals for ${plan.title}...`)}
                                          className="bg-[#007CAD] hover:bg-[#005f8a] text-white text-xs font-extrabold px-4 py-1.5 rounded-lg shadow-xs active:scale-95 transition-all cursor-pointer"
                                        >
                                          Book Again
                                        </button>
                                      </div>
                                    )}

                                    {activePlanTab === "cancelled" && (
                                      <button
                                        onClick={() => toast.success(`Searching available deals for ${plan.title}...`)}
                                        className="bg-[#007CAD] hover:bg-[#005f8a] text-white text-xs font-extrabold px-4 py-1.5 rounded-lg shadow-xs active:scale-95 transition-all cursor-pointer"
                                      >
                                        Rebook
                                      </button>
                                    )}

                                    {activePlanTab === "unsuccessful" && (
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => toast.success("Support ticket created. We will contact you soon.")}
                                          className="text-gray-600 hover:text-gray-800 text-xs font-extrabold px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                          Support
                                        </button>
                                        <button
                                          onClick={() => toast.success("Retrying transaction...")}
                                          className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold px-4 py-1.5 rounded-lg shadow-xs active:scale-95 transition-all cursor-pointer"
                                        >
                                          Retry
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {activePlanTab === "unsuccessful" && plan.reason && (
                                  <p className="mt-2 text-[10px] text-amber-700 bg-amber-50/50 p-2 rounded-lg border border-amber-100/50 leading-relaxed">
                                    <strong>Failure Reason:</strong> {plan.reason}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="border border-dashed border-gray-200 rounded-2xl py-12 px-4 text-center">
                            <AlertTriangle size={32} className="text-gray-300 mx-auto mb-2" />
                            <h4 className="text-sm font-bold text-gray-700">No {activePlanTab} plans found</h4>
                            <p className="text-xs text-gray-400 mt-1">There are no records in this category.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Payment Methods Section */}
                  {activeNav === "Payment Methods" && (
                    <div>
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          Payment Methods
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Manage your credit cards, debit cards, and payment options.
                        </p>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {MOCK_CARDS.map((card) => (
                          <div
                            key={card.id}
                            className={`rounded-2xl p-5 bg-gradient-to-br ${card.color} text-white shadow-md hover:shadow-lg hover:scale-102 transition-all duration-300 flex flex-col justify-between h-40`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-bold tracking-widest uppercase opacity-75">
                                Travel Card
                              </span>
                              <span className="text-lg font-black uppercase italic tracking-wider">
                                {card.brand}
                              </span>
                            </div>
                            <div>
                              <p className="text-lg font-mono tracking-widest mb-4">
                                {card.number}
                              </p>
                              <div className="flex justify-between items-end">
                                <div>
                                  <span className="text-[8px] uppercase tracking-wider block opacity-60">
                                    Cardholder
                                  </span>
                                  <span className="text-xs font-bold truncate block max-w-[120px]">
                                    {card.cardholder}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[8px] uppercase tracking-wider block opacity-60">
                                    Expires
                                  </span>
                                  <span className="text-xs font-bold">
                                    {card.expiry}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Add Card Button Card */}
                        <div
                          onClick={() => toast.success("Add Payment Wizard launched.")}
                          className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-8 px-4 hover:border-[#007CAD] hover:bg-[#007CAD]/5 transition-all duration-300 cursor-pointer group h-40"
                        >
                          <CreditCard size={24} className="text-gray-400 group-hover:text-[#007CAD] group-hover:scale-110 transition-all duration-300" />
                          <span className="font-bold text-xs text-gray-500 group-hover:text-[#007CAD] mt-2">
                            Add New Payment Method
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Travel Wallet Section */}
                  {activeNav === "Travel Wallet" && (
                    <div>
                      {/* Header */}
                      <div className="mb-6 text-left">
                        <h3 className="text-xl font-bold text-gray-900">
                          Travel Wallet
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          View your balance, load money, and check transaction history.
                        </p>
                      </div>

                      {/* Cleartrip-style split balance display */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Deposit balance */}
                        <div className="bg-gradient-to-br from-[#007CAD] to-[#005F8A] rounded-2xl p-5 text-white shadow-md relative overflow-hidden flex flex-col justify-between h-36">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-6 -mt-6 pointer-events-none" />
                          <div className="text-left">
                            <span className="text-[9px] font-extrabold text-white/70 uppercase tracking-widest block">
                              Deposit Balance
                            </span>
                            <span className="text-2xl font-black font-[Unbounded] mt-1 block">
                              ₹2,500.00
                            </span>
                            <p className="text-[10px] text-white/70 mt-1">Real funds added by you for direct bookings</p>
                          </div>
                          <button
                            onClick={() => toast.success("Top-up wizard initiated.")}
                            className="bg-white text-[#007CAD] font-extrabold text-[10px] py-2 px-4 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-1 self-start shadow-sm active:scale-95 z-10 cursor-pointer"
                          >
                            <Wallet size={12} />
                            Add Funds
                          </button>
                        </div>

                        {/* Promo cashback balance */}
                        <div className="bg-gradient-to-br from-indigo-600 to-[#004A6E] rounded-2xl p-5 text-white shadow-md relative overflow-hidden flex flex-col justify-between h-36">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-6 -mt-6 pointer-events-none" />
                          <div className="text-left">
                            <span className="text-[9px] font-extrabold text-white/70 uppercase tracking-widest block">
                              Promo Cashback Balance
                            </span>
                            <span className="text-2xl font-black font-[Unbounded] mt-1 block">
                              ₹12,000.00
                            </span>
                            <p className="text-[10px] text-white/70 mt-1">Earned from bookings, referrals & cancellations</p>
                          </div>
                          <span className="text-[10px] bg-white/15 px-3 py-1 rounded-full self-start font-bold border border-white/10 select-none">
                            100% Useable on next trip
                          </span>
                        </div>
                      </div>

                      {/* Refer & Earn Promo Card */}
                      <div className="border border-gray-150 rounded-2xl p-5 bg-gray-50/50 text-left flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                        <div>
                          <h4 className="text-sm font-black text-gray-800 font-[Unbounded]">
                            🎁 Refer Friends & Save Big!
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed max-w-md">
                            Share your personal referral code and earn ₹500 travel credits when your friend signs up and books their first trip. Your friend gets ₹250!
                          </p>
                        </div>
                        <div className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded-xl shrink-0">
                          <span className="text-xs font-black text-gray-700 font-mono tracking-wider">
                            WALK-ADI-9921
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText("WALK-ADI-9921");
                              toast.success("Referral code copied to clipboard!");
                            }}
                            className="bg-[#007CAD] hover:bg-[#005f8a] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg active:scale-95 transition cursor-pointer border-none"
                          >
                            Copy Code
                          </button>
                        </div>
                      </div>

                      {/* Transaction History */}
                      <div className="mt-8">
                        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                          <Clock size={16} className="text-gray-400" />
                          Recent Transactions
                        </h4>

                        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
                          {MOCK_TRANSACTIONS.map((tx) => (
                            <div
                              key={tx.id}
                              className="flex justify-between items-center p-4 hover:bg-gray-50/50 transition-colors"
                            >
                              <div>
                                <span className="text-xs font-bold text-gray-800 block">
                                  {tx.title}
                                </span>
                                <span className="text-[10px] text-gray-400 block mt-0.5">
                                  {tx.date}
                                </span>
                              </div>
                              <span className={`text-xs font-black ${tx.type === "credit" ? "text-emerald-600" : "text-gray-900"
                                }`}>
                                {tx.amount}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Traveler Badges & Stats Section */}
                  {activeNav === "Traveler Badges & Stats" && (
                    <div>
                      {/* Header */}
                      <div className="mb-6 text-left">
                        <h3 className="text-xl font-bold text-gray-900">
                          Traveler Badges & Milestones
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Track your travel achievements, experience points, and level milestones.
                        </p>
                      </div>

                      {/* Explorer Level Progress */}
                      <div className="bg-gradient-to-r from-[#007CAD]/5 to-indigo-500/5 border border-[#007CAD]/10 rounded-2xl p-6 mb-8 text-left">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                          <div>
                            <span className="text-[10px] font-black text-[#007CAD] uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100 mb-1 inline-block">
                              Level 4 Explorer
                            </span>
                            <h4 className="text-base font-extrabold text-gray-800 font-[Unbounded]">
                              Aditya's Travel Progress
                            </h4>
                          </div>
                          <span className="text-xs font-black text-[#007CAD]">
                            7,800 / 10,000 XP
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-gray-200/80 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-[#007CAD] to-indigo-500 h-full rounded-full w-[78%]" />
                        </div>
                        
                        {/* Grid stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200/60 text-center">
                          <div>
                            <span className="block text-xl font-black text-[#007CAD]">12</span>
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400">Trips Completed</span>
                          </div>
                          <div className="border-x border-gray-200/60 px-2">
                            <span className="block text-xl font-black text-[#007CAD]">5</span>
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400">Countries Visited</span>
                          </div>
                          <div>
                            <span className="block text-xl font-black text-[#007CAD]">8</span>
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400">Badges Unlocked</span>
                          </div>
                        </div>
                      </div>

                      {/* Badges Grid */}
                      <h4 className="text-sm font-bold text-gray-900 mb-4 text-left">
                        Your Unlocked Badges
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
                        {/* Badge 1 */}
                        <div className="border border-gray-100 rounded-2xl p-4 bg-white hover:shadow-md transition duration-300 flex items-start gap-3">
                          <span className="text-3xl shrink-0">✈️</span>
                          <div>
                            <h5 className="text-xs font-black text-gray-800 uppercase tracking-wide">Frequent Flyer</h5>
                            <p className="text-[10px] text-gray-500 mt-1 leading-normal font-semibold">Completed 5+ flights booking through our AI portal.</p>
                          </div>
                        </div>
                        {/* Badge 2 */}
                        <div className="border border-gray-100 rounded-2xl p-4 bg-white hover:shadow-md transition duration-300 flex items-start gap-3">
                          <span className="text-3xl shrink-0">🏖️</span>
                          <div>
                            <h5 className="text-xs font-black text-gray-800 uppercase tracking-wide">Beach Bum</h5>
                            <p className="text-[10px] text-gray-500 mt-1 leading-normal font-semibold">Booked 3+ tropical beachfront resort packages.</p>
                          </div>
                        </div>
                        {/* Badge 3 */}
                        <div className="border border-gray-100 rounded-2xl p-4 bg-white hover:shadow-md transition duration-300 flex items-start gap-3">
                          <span className="text-3xl shrink-0">🍽️</span>
                          <div>
                            <h5 className="text-xs font-black text-gray-800 uppercase tracking-wide">Culinary Explorer</h5>
                            <p className="text-[10px] text-gray-500 mt-1 leading-normal font-semibold">Tasted local recommendations in 3+ states.</p>
                          </div>
                        </div>
                        {/* Badge 4 (Locked) */}
                        <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 opacity-60 flex items-start gap-3 select-none">
                          <span className="text-3xl filter grayscale shrink-0">🧗</span>
                          <div>
                            <h5 className="text-xs font-black text-gray-400 uppercase tracking-wide">Mountain Nomad 🔒</h5>
                            <p className="text-[10px] text-gray-400 mt-1 leading-normal font-medium">Book a high-altitude mountain pass expedition to unlock.</p>
                          </div>
                        </div>
                        {/* Badge 5 (Locked) */}
                        <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 opacity-60 flex items-start gap-3 select-none">
                          <span className="text-3xl filter grayscale shrink-0">👑</span>
                          <div>
                            <h5 className="text-xs font-black text-gray-400 uppercase tracking-wide">Luxury Elite 🔒</h5>
                            <p className="text-[10px] text-gray-400 mt-1 leading-normal font-medium">Book a 5-star resort or private villa stays to unlock.</p>
                          </div>
                        </div>
                        {/* Badge 6 (Locked) */}
                        <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 opacity-60 flex items-start gap-3 select-none">
                          <span className="text-3xl filter grayscale shrink-0">🌃</span>
                          <div>
                            <h5 className="text-xs font-black text-gray-400 uppercase tracking-wide">Night Owl 🔒</h5>
                            <p className="text-[10px] text-gray-400 mt-1 leading-normal font-medium">Book a city nightlife tour pack to unlock.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Family & Companions Section */}
                  {activeNav === "Family & Companions" && (
                    <div>
                      {/* Header */}
                      <div className="mb-6 text-left">
                        <h3 className="text-xl font-bold text-gray-900">
                          Family & Companions Directory
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Manage details of your travel partners for faster checkouts and easy bookings.
                        </p>
                      </div>

                      {/* Directory Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
                        {/* Companion 1 */}
                        <div className="border border-gray-150 rounded-2xl p-5 bg-white shadow-2xs hover:shadow-md transition flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#007CAD] bg-[#007CAD]/5 px-2 py-0.5 rounded border border-[#007CAD]/10 inline-block mb-2">
                              Spouse
                            </span>
                            <h4 className="text-sm font-black text-gray-800 font-[Unbounded]">
                              Jane Doe
                            </h4>
                            <p className="text-[10px] text-gray-500 font-bold mt-1.5">DOB: October 14, 1996</p>
                            <p className="text-[10px] text-gray-500 font-bold">Passport: Z-982****</p>
                          </div>
                          <button
                            onClick={() => toast.success("Companion details copy to clipboard!")}
                            className="mt-4 text-[10px] text-[#007CAD] hover:underline font-bold self-start cursor-pointer border-none bg-transparent"
                          >
                            Copy Details
                          </button>
                        </div>

                        {/* Companion 2 */}
                        <div className="border border-gray-150 rounded-2xl p-5 bg-white shadow-2xs hover:shadow-md transition flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#007CAD] bg-[#007CAD]/5 px-2 py-0.5 rounded border border-[#007CAD]/10 inline-block mb-2">
                              Child
                            </span>
                            <h4 className="text-sm font-black text-gray-800 font-[Unbounded]">
                              Jimmy Doe
                            </h4>
                            <p className="text-[10px] text-gray-500 font-bold mt-1.5">DOB: August 08, 2018</p>
                            <p className="text-[10px] text-gray-500 font-bold">Passport: X-113****</p>
                          </div>
                          <button
                            onClick={() => toast.success("Companion details copy to clipboard!")}
                            className="mt-4 text-[10px] text-[#007CAD] hover:underline font-bold self-start cursor-pointer border-none bg-transparent"
                          >
                            Copy Details
                          </button>
                        </div>
                      </div>

                      {/* Add Companion Card Form */}
                      <div className="border border-gray-150 rounded-2xl p-5 bg-gray-50/50 text-left">
                        <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-2 mb-4">
                          Add New Companion
                        </h4>
                        <div className="space-y-3.5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              placeholder="Full Name" 
                              className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:border-blue-400"
                            />
                            <input 
                              type="text" 
                              placeholder="Date of Birth (DD/MM/YYYY)" 
                              className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:border-blue-400"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              placeholder="Passport Number (Optional)" 
                              className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:border-blue-400"
                            />
                            <select className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-500 outline-none focus:border-blue-400">
                              <option value="">Relationship</option>
                              <option>Spouse</option>
                              <option>Child</option>
                              <option>Parent</option>
                              <option>Friend</option>
                            </select>
                          </div>
                          <div className="flex justify-end pt-2">
                            <button
                              onClick={() => toast.success("Companion profile saved successfully!")}
                              className="bg-[#007CAD] hover:bg-[#005f8a] text-white text-xs font-extrabold px-6 py-2.5 rounded-lg active:scale-95 transition cursor-pointer border-none shadow-xs"
                            >
                              Save Companion
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fare Alerts & Subscriptions Section */}
                  {activeNav === "Fare Alerts & Subscriptions" && (
                    <div>
                      {/* Header */}
                      <div className="mb-6 text-left">
                        <h3 className="text-xl font-bold text-gray-900">
                          Fare Alerts & Price Trackers
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Monitor price drops, flight status subscriptions, and customized travel alerts.
                        </p>
                      </div>

                      {/* Active Price Alerts */}
                      <h4 className="text-sm font-bold text-gray-900 mb-4 text-left">
                        Active Price Alerts
                      </h4>
                      
                      <div className="space-y-4 text-left mb-8">
                        {/* Alert 1 */}
                        <div className="border border-gray-150 rounded-2xl p-5 bg-white shadow-2xs hover:shadow-md transition flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#007CAD] bg-[#007CAD]/5 px-2.5 py-0.5 rounded border border-[#007CAD]/10 inline-block">
                              Flights Alert
                            </span>
                            <h4 className="text-base font-extrabold text-gray-800 font-[Unbounded] leading-tight">
                              Delhi (DEL) ➔ Mumbai (BOM)
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-bold">
                              <span>Lowest Price: <strong className="text-emerald-600">₹4,800</strong></span>
                              <span>Change: <span className="text-emerald-600">↓ 5% Drop Today</span></span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <button
                              onClick={() => toast.success("Alert frequency set to weekly")}
                              className="text-xs text-gray-600 hover:text-gray-800 bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-lg font-bold hover:bg-gray-100 transition cursor-pointer"
                            >
                              Frequency: Daily
                            </button>
                            <button
                              onClick={() => toast.success("Fare alert deleted successfully.")}
                              className="text-xs text-red-500 hover:text-red-600 bg-red-50/50 hover:bg-red-50 border border-red-100/50 px-3.5 py-1.5 rounded-lg font-extrabold transition cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Alert 2 */}
                        <div className="border border-gray-150 rounded-2xl p-5 bg-white shadow-2xs hover:shadow-md transition flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#007CAD] bg-[#007CAD]/5 px-2.5 py-0.5 rounded border border-[#007CAD]/10 inline-block">
                              Hotels Alert
                            </span>
                            <h4 className="text-base font-extrabold text-gray-800 font-[Unbounded] leading-tight">
                              Landaa Giraavaru Overwater Resort
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-bold">
                              <span>Lowest Price: <strong className="text-gray-700">₹1,85,000/Night</strong></span>
                              <span>Change: <span className="text-gray-500">Stable</span></span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <button
                              onClick={() => toast.success("Alert frequency set to daily")}
                              className="text-xs text-gray-600 hover:text-gray-800 bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-lg font-bold hover:bg-gray-100 transition cursor-pointer"
                            >
                              Frequency: Weekly
                            </button>
                            <button
                              onClick={() => toast.success("Fare alert deleted successfully.")}
                              className="text-xs text-red-500 hover:text-red-600 bg-red-50/50 hover:bg-red-50 border border-red-100/50 px-3.5 py-1.5 rounded-lg font-extrabold transition cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Notification Preferences Toggle Panel */}
                      <div className="border border-gray-150 rounded-2xl p-5 bg-gray-50/50 text-left">
                        <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-2 mb-4">
                          Alert Subscriptions Settings
                        </h4>
                        <div className="divide-y divide-gray-200/60">
                          <div className="flex justify-between items-center py-3">
                            <div>
                              <span className="text-xs font-black text-gray-800 block">Email Newsletters</span>
                              <span className="text-[10px] text-gray-500 block">Weekly best discounts and holiday package offers</span>
                            </div>
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#007CAD]" />
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <div>
                              <span className="text-xs font-black text-gray-800 block">SMS Instant Updates</span>
                              <span className="text-[10px] text-gray-500 block">Real-time status changes and pricing alerts on mobile</span>
                            </div>
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#007CAD]" />
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <div>
                              <span className="text-xs font-black text-gray-800 block">WhatsApp Travel Bot Notifications</span>
                              <span className="text-[10px] text-gray-500 block">Complimentary updates, itinerary guides, and booking invoices via chatbot</span>
                            </div>
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#007CAD]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
