import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";
import { Calendar, MapPin, Receipt, CheckCircle2, XCircle, Search, Hotel, Plane, CalendarDays, Car, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_BOOKINGS = [
  {
    id: "B-2026-8941",
    type: "hotel",
    title: "Lakeside Motel Waterfront",
    location: "Lake Wanaka, New Zealand",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "March 18, 2026 - March 20, 2026",
    details: "1 Room · 2 Guests · 2 Nights",
    status: "Completed",
    price: "$260.00",
    invoiceUrl: "#",
    bookingDate: "Jan 12, 2026",
  },
  {
    id: "B-2026-7832",
    type: "flight",
    title: "Singapore Airlines Flight SQ-22",
    location: "Changi Intl (SIN) to Heathrow (LHR)",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "April 02, 2026",
    details: "Economy · Seat 24A, 24B · One-Way",
    status: "Completed",
    price: "$1,120.00",
    invoiceUrl: "#",
    bookingDate: "Feb 05, 2026",
  },
  {
    id: "B-2026-1123",
    type: "activity",
    title: "Phi Phi Islands Adventure Day Trip",
    location: "Phuket, Thailand",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "May 15, 2026",
    details: "Seaview Lunch · Snorkeling Gear · Guide Included",
    status: "Completed",
    price: "$180.00",
    invoiceUrl: "#",
    bookingDate: "April 10, 2026",
  },
  {
    id: "B-2026-9042",
    type: "car",
    title: "Ford Mustang Convertible (V6)",
    location: "Los Angeles Airport (LAX)",
    image: "https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=600&auto=format&fit=crop&q=80",
    date: "June 05, 2026 - June 08, 2026",
    details: "Unlimited Mileage · Collision Damage Waiver",
    status: "Cancelled",
    price: "$210.00",
    invoiceUrl: "#",
    bookingDate: "May 01, 2026",
  }
];

const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    const matchesTab = activeTab === "all" || booking.type === activeTab;
    const matchesSearch =
      booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDownloadInvoice = (id) => {
    toast.success(`Invoice for booking ${id} downloaded successfully!`);
  };

  const handleRebook = (title) => {
    toast.success(`Checking current availability for ${title}...`);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        background: "linear-gradient(to bottom, #C8E9F0 0%, #D8F0F5 30%, #EBF7FA 60%, #F5FBFD 85%, #ffffff 100%)",
      }}
    >
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1240px] w-full mx-auto flex-grow">
        {/* Back Link */}
        <Link
          to="/my-account"
          className="flex items-center gap-2 text-gray-800 font-medium mb-6 hover:text-[#0093CB] transition-colors inline-flex"
        >
          <MdArrowBack size={18} />
          <span className="text-sm">Back to My Account</span>
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-[#1A1A1A] tracking-tight">Booking History</h1>
            <p className="text-gray-600 text-sm mt-1">Review all your past reservations, receipts, and invoices.</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by hotel, flight, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0093CB]/20 focus:border-[#0093CB] transition-all shadow-sm"
            />
            <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="flex overflow-x-auto gap-2 border-b border-gray-200/50 pb-px mb-8 scrollbar-hide">
          {[
            { id: "all", label: "All Bookings", icon: CalendarDays },
            { id: "hotel", label: "Hotels", icon: Hotel },
            { id: "flight", label: "Flights", icon: Plane },
            { id: "activity", label: "Activities", icon: Calendar },
            { id: "car", label: "Car Rentals", icon: Car },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                    ? "border-[#0093CB] text-[#0093CB]"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                  }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-all duration-300 p-4 gap-5"
              >
                {/* Visual Thumbnail */}
                <div className="w-full md:w-56 h-36 md:h-auto flex-shrink-0 rounded-xl overflow-hidden relative">
                  <img
                    src={booking.image}
                    alt={booking.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 ${booking.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                  >
                    {booking.status === "Completed" ? (
                      <CheckCircle2 size={10} />
                    ) : (
                      <XCircle size={10} />
                    )}
                    {booking.status}
                  </span>
                </div>

                {/* Main details content */}
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded tracking-wide">
                          {booking.type}
                        </span>
                        <span className="text-gray-400 text-xs font-mono">ID: {booking.id}</span>
                      </div>
                      <h3 className="text-lg font-black text-gray-900 leading-tight mb-2">
                        {booking.title}
                      </h3>
                      <div className="space-y-1.5 text-gray-600 text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-gray-400" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <HelpCircle size={14} className="text-gray-400" />
                          <span>{booking.details}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end min-w-[120px] self-stretch justify-between mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                      <div className="md:text-right">
                        <span className="text-xs text-gray-400 font-bold block mb-0.5">Total Paid</span>
                        <span className="text-xl font-extrabold text-[#1A1A1A]">{booking.price}</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Booked on {booking.bookingDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-100/70">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadInvoice(booking.id)}
                        className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs px-4 py-2 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                      >
                        <Receipt size={14} />
                        Invoice / Receipt
                      </button>
                    </div>

                    <button
                      onClick={() => handleRebook(booking.title)}
                      className="bg-[#0093CB]/5 hover:bg-[#0093CB] hover:text-white text-[#0093CB] font-extrabold text-xs px-5 py-2.5 rounded-lg border border-[#0093CB]/20 transition-all active:scale-95 cursor-pointer"
                    >
                      Book Again
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 py-16 px-4 text-center">
              <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-black text-gray-800">No bookings found</h3>
              <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
                We couldn't find any bookings matching "{searchQuery}" under "{activeTab === "all" ? "All" : activeTab}" category.
              </p>
            </div>
          )}
        </div>
      </main>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default BookingHistory;
