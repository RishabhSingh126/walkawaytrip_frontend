import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";
import { 
  Bell, 
  Calendar, 
  Clock, 
  MapPin, 
  Shield, 
  Tag, 
  CheckCircle2, 
  XCircle, 
  Trash2,
  Inbox
} from "lucide-react";
import toast from "react-hot-toast";

const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    type: "booking",
    title: "Booking Confirmed!",
    message: "Your stay at Landaa Giraavaru Overwater Resort is successfully booked for July 08 - July 14, 2026.",
    time: "2 hours ago",
    read: false,
    link: "/my-account",
  },
  {
    id: "n2",
    type: "plan",
    title: "Upcoming Trip Reminder",
    message: "Maldives getaway is just 9 days away! Have you loaded USD to your Forex card?",
    time: "5 hours ago",
    read: false,
    link: "/my-account",
  },
  {
    id: "n3",
    type: "setting",
    title: "Security Update",
    message: "Your password was changed successfully. If this wasn't you, please secure your account.",
    time: "1 day ago",
    read: true,
    link: "/my-account",
  },
  {
    id: "n4",
    type: "booking",
    title: "Booking Cancelled",
    message: "Your car rental (Ford Mustang V6) booking B-2026-9042 has been cancelled. Refund has been initiated.",
    time: "3 days ago",
    read: true,
    link: "/my-account",
  },
  {
    id: "n5",
    type: "promotion",
    title: "Special Summer Offer ☀️",
    message: "Get up to 25% off on European tour packages if you book by this weekend!",
    time: "4 days ago",
    read: true,
    link: "/seasonal-offers",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'booking' | 'setting' | 'plan'

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast.success("Notification marked as read");
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDeleteNotification = (e, id) => {
    e.stopPropagation(); // Prevent trigger link/click read
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Top Gradient Banner Section */}
        <div className="w-full bg-gradient-to-b from-[#C4EDF6]/60 via-[#C4EDF6]/10 to-white pt-28 pb-4">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-2">
            {/* Back to Home Link */}
            <Link
              to="/main"
              className="flex items-center gap-2 text-gray-600 font-medium hover:text-[#0093CB] transition-colors w-fit"
            >
              <MdArrowBack size={16} />
              <span className="text-xs">Back to Home</span>
            </Link>

            {/* Header Title Row */}
            <div className="flex justify-between items-center mt-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 font-[Unbounded] tracking-tight">
                Notification
              </h1>
              <Link
                to="/notifications"
                className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#0093CB] transition flex items-center gap-1 font-[Unbounded]"
              >
                Flights Status Update <span className="text-sm font-light">&gt;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Area: 2-Column Responsive Layout */}
        <div className="max-w-[1440px] mx-auto px-0 pb-16">
          <div className="flex flex-col lg:flex-row gap-0 w-full items-stretch mt-0">

            {/* Left Column: Interactive Notification Section */}
            <div className="w-full lg:w-[42.8%] flex flex-col self-stretch px-4 sm:px-6 lg:px-8 mb-6 lg:mb-0">
              <div className="w-full h-full bg-white border border-gray-200 rounded-[23px] p-6 lg:p-7 flex flex-col justify-between shadow-sm min-h-[550px] max-h-[700px]">
                <div>
                  {/* Title Bar */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-gray-950 font-[Unbounded] tracking-tight">
                        Inbox
                      </h2>
                      {unreadCount > 0 && (
                        <span className="bg-[#0093CB]/10 text-[#0093CB] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs text-[#0093CB] font-bold hover:underline cursor-pointer bg-transparent border-none outline-none"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {[
                      { id: "all", label: "All" },
                      { id: "booking", label: "Bookings" },
                      { id: "plan", label: "Plans" },
                      { id: "setting", label: "Settings" }
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer outline-none ${
                          activeFilter === filter.id
                            ? "bg-[#0093CB] text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notifications Scrollable List */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notif) => {
                      let IconComponent = Bell;
                      let iconBg = "bg-gray-100 text-gray-500";
                      
                      if (notif.type === "booking") {
                        IconComponent = CheckCircle2;
                        iconBg = "bg-emerald-50 text-emerald-600";
                      } else if (notif.type === "plan") {
                        IconComponent = MapPin;
                        iconBg = "bg-[#0093CB]/10 text-[#0093CB]";
                      } else if (notif.type === "setting") {
                        IconComponent = Shield;
                        iconBg = "bg-gray-50 text-gray-600";
                      } else if (notif.type === "promotion") {
                        IconComponent = Tag;
                        iconBg = "bg-amber-50 text-amber-600";
                      }

                      return (
                        <div
                          key={notif.id}
                          onClick={() => handleMarkAsRead(notif.id)}
                          className={`p-3.5 rounded-xl border border-gray-100 flex items-start gap-3 transition-all duration-200 cursor-pointer relative group ${
                            !notif.read ? "bg-[#0093CB]/5 border-[#0093CB]/10" : "bg-white hover:bg-gray-50"
                          }`}
                        >
                          {/* Unread indicator dot */}
                          {!notif.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0093CB] absolute top-4 right-4 flex-shrink-0 animate-pulse" />
                          )}
                          
                          {/* Left icon */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                            <IconComponent size={14} />
                          </div>
                          
                          {/* Center content */}
                          <div className="flex-1 min-w-0 pr-4">
                            <span className="font-extrabold text-xs sm:text-sm text-gray-950 block mb-0.5 leading-snug">
                              {notif.title}
                            </span>
                            <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-2">
                              {notif.message}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] text-gray-400 font-extrabold flex items-center gap-1 font-mono uppercase tracking-wider">
                                <Clock size={10} className="text-gray-300" />
                                {notif.time}
                              </span>
                              
                              {notif.link && (
                                <Link
                                  to={notif.link}
                                  className="text-[10px] text-[#0093CB] font-extrabold hover:underline"
                                >
                                  Manage &gt;
                                </Link>
                              )}
                            </div>
                          </div>
                          
                          {/* Delete button (hover) */}
                          <button
                            onClick={(e) => handleDeleteNotification(e, notif.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-1 cursor-pointer absolute bottom-2 right-2 rounded-md hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-3">
                        <Inbox size={20} />
                      </div>
                      <p className="text-xs font-bold text-gray-700">No notifications found</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">We couldn't find any alerts in this category.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Stacked Rectangle 135 & Rectangle 136 */}
            <div className="w-full lg:w-[57.2%] flex flex-col justify-start gap-0 -ml-[14px]">

              {/* Top Right Card: Rectangle 135.svg */}
              <div className="relative w-full aspect-[1078/463] flex items-center justify-center">
                <img
                  src="/images/Rectangle 135.svg"
                  alt="Prize Drop Alert Card"
                  className="absolute inset-0 w-full h-full block pointer-events-none"
                  style={{ opacity: 1 }}
                />
                {/* 
                  Mathematical padding overlay to match SVG card coordinates:
                  Left/Right: 2.8% (representing x=30 offset out of 1078 width)
                  Top: 5.6% (representing y=26 offset out of 463 height)
                  Bottom: 7.3%
                */}
                <div className="absolute left-[2.8%] right-[2.8%] top-[5.6%] bottom-[7.3%] z-10 flex flex-col justify-start p-6 sm:p-8 lg:p-10 pt-[20px] lg:pt-[24px] pl-[40px]">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-950 font-[Unbounded]">
                    Prize Drop Alert
                  </h2>
                </div>
              </div>

              {/* Bottom Right Card: Rectangle 136.svg */}
              <div className="relative w-full aspect-[1072/676] flex items-center justify-center -mt-[14px]">
                <img
                  src="/images/Rectangle 136.svg"
                  alt="Exclusive Deals Card"
                  className="absolute inset-0 w-full h-full block pointer-events-none"
                  style={{ opacity: 1 }}
                />
                {/* 
                  Mathematical padding overlay to match SVG card coordinates:
                  Left/Right: 2.8% (representing x=30 offset out of 1072 width)
                  Top: 3.8% (representing y=26 offset out of 676 height)
                  Bottom: 5.0%
                */}
                <div className="absolute left-[2.8%] right-[2.8%] top-[3.8%] bottom-[5%] z-10 flex flex-col justify-start p-6 sm:p-8 lg:p-10 pt-[16px] lg:pt-[18px] pl-[40px]">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-950 font-[Unbounded]">
                    Exclusive Deals
                  </h2>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default Notifications;
