import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";
import { Calendar, MapPin, Clock, Compass, Plane, Hotel, CheckSquare, Plus, Bell, CalendarCheck, Share2, Sun } from "lucide-react";
import toast from "react-hot-toast";

const CAROUSEL_SLIDES = [
  {
    destination: "Maldives Getaway",
    location: "North Malé Atoll, Maldives",
    startDate: "July 08, 2026",
    endDate: "July 14, 2026",
    weather: "29°C Sunny",
    countdownDays: 6,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=100",
  },
  {
    destination: "Paris Romantic Escape",
    location: "Paris, France",
    startDate: "August 15, 2026",
    endDate: "August 22, 2026",
    weather: "24°C Partly Cloudy",
    countdownDays: 44,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=100",
  },
  {
    destination: "Japan Culture Trail",
    location: "Tokyo & Kyoto, Japan",
    startDate: "September 01, 2026",
    endDate: "September 10, 2026",
    weather: "27°C Clear",
    countdownDays: 61,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=100",
  },
  {
    destination: "Bali Spiritual Retreat",
    location: "Ubud & Seminyak, Bali",
    startDate: "October 05, 2026",
    endDate: "October 12, 2026",
    weather: "31°C Tropical",
    countdownDays: 95,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=100",
  },
  {
    destination: "Dubai Luxury Tour",
    location: "Downtown Dubai, UAE",
    startDate: "November 10, 2026",
    endDate: "November 16, 2026",
    weather: "28°C Warm & Clear",
    countdownDays: 131,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=100",
  },
  {
    destination: "New York City Break",
    location: "Manhattan, New York, USA",
    startDate: "December 20, 2026",
    endDate: "December 27, 2026",
    weather: "3°C Snowy",
    countdownDays: 171,
    image: "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?auto=format&fit=crop&w=1200&q=100",
  },
  {
    destination: "Greek Islands Cruise",
    location: "Santorini & Mykonos, Greece",
    startDate: "May 01, 2027",
    endDate: "May 10, 2027",
    weather: "22°C Mediterranean",
    countdownDays: 303,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=100",
  },
  {
    destination: "Swiss Alps Adventure",
    location: "Interlaken & Zermatt, Switzerland",
    startDate: "June 15, 2027",
    endDate: "June 22, 2027",
    weather: "15°C Cool & Crisp",
    countdownDays: 348,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=100",
  },
];

// Clone of first slide appended so we can slide forward into it, then silently snap back to real index 0
const EXTENDED_SLIDES = [...CAROUSEL_SLIDES, CAROUSEL_SLIDES[0]];

const MOCK_UPCOMING_TRIP = {
  destination: "Maldives Getaway",
  countdownDays: 12,
  startDate: "July 08, 2026",
  endDate: "July 14, 2026",
  coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=100",
  checklist: [
    { id: 1, task: "Check Visa & Passport validity", completed: true },
    { id: 2, task: "Buy Travel Insurance via PolicyBazaar", completed: true },
    { id: 3, task: "Load USD to HDFC Forex Card", completed: false },
    { id: 4, task: "Download Offline Maps", completed: false },
    { id: 5, task: "Confirm Airport Pick-up service", completed: false }
  ],
  itinerary: [
    {
      day: "Day 1 - July 08, 2026",
      events: [
        {
          id: 101,
          time: "08:30 AM",
          type: "flight",
          title: "Flight SQ-425 to Male (MLE)",
          subtitle: "Singapore Airlines · Terminal 3 · Seat 18C, 18D",
          location: "Changi Intl Airport (SIN)",
          icon: Plane,
          color: "bg-[#0093CB]/10 text-[#0093CB]"
        },
        {
          id: 102,
          time: "02:00 PM",
          type: "hotel",
          title: "Speedboat Transfer & Resort Check-in",
          subtitle: "Landaa Giraavaru Resort Overwater Villa #108",
          location: "Resort Landing Pier",
          icon: Hotel,
          color: "bg-emerald-50 text-emerald-600"
        }
      ]
    },
    {
      day: "Day 2 - July 09, 2026",
      events: [
        {
          id: 103,
          time: "09:30 AM",
          type: "activity",
          title: "Private Snorkeling & Manta Ray Excursion",
          subtitle: "With marine biologist · Equipment and snacks provided",
          location: "Dive Centre Marina",
          icon: Compass,
          color: "bg-purple-50 text-purple-600"
        },
        {
          id: 104,
          time: "07:30 PM",
          type: "dining",
          title: "Sunset Beach Barbecue Dinner",
          subtitle: "Resort signature buffet with traditional Bodu Beru music",
          location: "Main Beach Shoreline",
          icon: Compass,
          color: "bg-amber-50 text-amber-600"
        }
      ]
    },
    {
      day: "Day 3 - July 10, 2026",
      events: [
        {
          id: 105,
          time: "10:00 AM",
          type: "activity",
          title: "Spa & Wellness Session",
          subtitle: "60-minute Balinese massage reservation",
          location: "Overwater Spa Sanctuary",
          icon: Compass,
          color: "bg-rose-50 text-rose-600"
        }
      ]
    }
  ]
};

const UpcomingPlan = () => {
  const [checklist, setChecklist] = useState(MOCK_UPCOMING_TRIP.checklist);
  const [newCheckItem, setNewCheckItem] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const [noTransition, setNoTransition] = useState(false);

  // Auto-slide every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // When we hit the clone at the end, silently snap back to real index 0
  useEffect(() => {
    if (slideIndex === EXTENDED_SLIDES.length - 1) {
      const t = setTimeout(() => {
        setNoTransition(true);
        setSlideIndex(0);
      }, 720);
      return () => clearTimeout(t);
    }
  }, [slideIndex]);

  // Re-enable transition after the silent snap
  useEffect(() => {
    if (noTransition) {
      const t = setTimeout(() => setNoTransition(false), 30);
      return () => clearTimeout(t);
    }
  }, [noTransition]);

  const goToPrev = () =>
    setSlideIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () =>
    setSlideIndex((prev) =>
      prev < EXTENDED_SLIDES.length - 1 ? prev + 1 : prev
    );

  // Use modulo so the clone (index 8) maps back to real slide 0
  const currentSlide = CAROUSEL_SLIDES[slideIndex % CAROUSEL_SLIDES.length];
  const activeDotIndex = slideIndex % CAROUSEL_SLIDES.length;

  const handleToggleCheck = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddCheckItem = (e) => {
    e.preventDefault();
    if (!newCheckItem.trim()) return;
    const newItem = {
      id: Date.now(),
      task: newCheckItem.trim(),
      completed: false
    };
    setChecklist([...checklist, newItem]);
    setNewCheckItem("");
    toast.success("Task added to your trip checklist!");
  };

  const handleAddToCalendar = () => {
    toast.success("Trip added to Google / Apple Calendar successfully!");
  };

  const handleShareTrip = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Trip itinerary link copied to clipboard!");
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

        {/* Hero Card Carousel Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8 border border-white/20 h-64 md:h-80 flex flex-col justify-end p-6 md:p-8">
          {/* Sliding strip — infinite right-to-left loop */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="flex h-full"
              style={{
                width: `${EXTENDED_SLIDES.length * 100}%`,
                transform: `translateX(-${slideIndex * (100 / EXTENDED_SLIDES.length)}%)`,
                transition: noTransition ? 'none' : 'transform 700ms ease-in-out',
              }}
            >
              {EXTENDED_SLIDES.map((slide, idx) => (
                <div
                  key={idx}
                  className="h-full flex-shrink-0"
                  style={{ width: `${100 / EXTENDED_SLIDES.length}%` }}
                >
                  <img
                    src={slide.image}
                    alt={slide.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Prev / Next Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full w-8 h-8 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            &#8249;
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full w-8 h-8 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next slide"
          >
            &#8250;
          </button>

          {/* Top Banner Content */}
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 z-10">
            <Sun size={14} className="text-amber-400" />
            <span>Resort Weather: {currentSlide.weather}</span>
          </div>

          {/* Dot Indicators */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeDotIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Bottom Banner Content */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div
              key={slideIndex}
              style={{
                animation: "slideUpFade 0.5s ease-out both",
              }}
            >
              <style>{`@keyframes slideUpFade { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }`}</style>
              <span className="bg-[#0093CB] text-white text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full mb-2 inline-block">
                Plan {slideIndex + 1} of {CAROUSEL_SLIDES.length}
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
                {currentSlide.destination}
              </h1>
              <p className="text-white/70 text-[11px] md:text-xs font-semibold mt-0.5 flex items-center gap-1">
                📍 {currentSlide.location}
              </p>
              <p className="text-white/80 text-xs md:text-sm font-semibold mt-1">
                {currentSlide.startDate} — {currentSlide.endDate}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddToCalendar}
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <CalendarCheck size={14} className="text-[#0093CB]" />
                Add to Calendar
              </button>
              <button
                onClick={handleShareTrip}
                className="bg-white/25 hover:bg-white/35 backdrop-blur-md text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Counter Widget */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#0093CB]/10 text-[#0093CB] flex items-center justify-center flex-shrink-0">
              <Bell className="animate-bounce" size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                Countdown for {currentSlide.destination}!
              </h3>
              <p className="text-gray-500 text-xs mt-0.5">
                {currentSlide.startDate} — {currentSlide.endDate} &middot; {currentSlide.location}
              </p>
            </div>
          </div>
          <div
            key={slideIndex}
            className="bg-[#0093CB]/5 border border-[#0093CB]/10 rounded-xl px-5 py-2.5 text-center"
            style={{ animation: "slideUpFade 0.4s ease-out both" }}
          >
            <span className="block text-2xl font-black text-[#0093CB] tracking-tight">
              {currentSlide.countdownDays} Days
            </span>
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-2">
              <Compass className="text-[#0093CB]" size={20} />
              Daily Itinerary Plan
            </h2>

            <div className="relative border-l-2 border-[#0093CB]/20 pl-6 ml-3 space-y-8">
              {MOCK_UPCOMING_TRIP.itinerary.map((dayPlan, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline point */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#0093CB] bg-white shadow-sm" />

                  <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-4">
                    {dayPlan.day}
                  </h3>

                  <div className="space-y-4">
                    {dayPlan.events.map((event) => {
                      const Icon = event.icon;
                      return (
                        <div
                          key={event.id}
                          className="bg-white rounded-xl border border-gray-100 p-4 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2.5 rounded-lg ${event.color} flex-shrink-0`}>
                              <Icon size={18} />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                                <h4 className="text-sm md:text-base font-bold text-gray-900 leading-snug">
                                  {event.title}
                                </h4>
                                <span className="flex items-center gap-1 text-[11px] font-bold text-[#0093CB] bg-[#0093CB]/5 px-2 py-0.5 rounded">
                                  <Clock size={11} />
                                  {event.time}
                                </span>
                              </div>
                              <p className="text-gray-500 text-xs leading-normal">{event.subtitle}</p>
                              <div className="flex items-center gap-1 text-[11px] text-gray-400 font-semibold mt-2.5">
                                <MapPin size={12} />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prep Checklist - Right 1 Column */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-2">
              <CheckSquare className="text-[#0093CB]" size={20} />
              Departure Checklist
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
              <div className="space-y-3">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 cursor-pointer group text-xs sm:text-sm font-semibold select-none py-1"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleCheck(item.id)}
                      className="mt-0.5 accent-[#0093CB] rounded border-gray-300 w-4 h-4 transition-all"
                    />
                    <span
                      className={`transition-colors ${item.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700 group-hover:text-gray-900"
                        }`}
                    >
                      {item.task}
                    </span>
                  </label>
                ))}
              </div>

              {/* Add custom checklist item */}
              <form onSubmit={handleAddCheckItem} className="flex gap-2 pt-3 border-t border-gray-100">
                <input
                  type="text"
                  placeholder="Add custom task..."
                  value={newCheckItem}
                  onChange={(e) => setNewCheckItem(e.target.value)}
                  className="flex-grow bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0093CB]"
                />
                <button
                  type="submit"
                  className="bg-[#0093CB] text-white p-1.5 rounded-lg hover:bg-[#0082B3] transition-colors flex-shrink-0 cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </form>
            </div>

            {/* Travel Assistance Callout */}
            <div className="bg-gradient-to-br from-[#0093CB]/10 to-[#0093CB]/5 rounded-2xl border border-[#0093CB]/10 p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900">Need Travel Assistance?</h3>
              <p className="text-gray-500 text-xs leading-normal">
                Make sure to check our visa assistant or apply for travel insurance before you fly.
              </p>
              <Link
                to="/travel-tools"
                className="text-xs font-extrabold text-[#0093CB] hover:underline flex items-center gap-1"
              >
                Go to Travel Tools →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default UpcomingPlan;
