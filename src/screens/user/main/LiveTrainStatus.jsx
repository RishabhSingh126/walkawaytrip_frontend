import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Train, Search, ArrowRight, Clock, MapPin, AlertCircle, Info, ChevronDown } from "lucide-react";
import Navbar from "@/components/User/common/Navbar"; // Fallback to common Navbar if main one isn't imported right
import Footer from "@/components/User/common/Footer";
import AutocompleteInput from "@/components/User/main/Home/searchBars/AutocompleteInput";
import { INDIAN_TRAINS } from "@/data/trainsList";

import MainNavbar from "@/components/User/main/common/Navbar";

const parseTiming = (timingStr) => {
  if (!timingStr) return { arrival: '-', departure: '-' };
  const lowerStr = timingStr.toLowerCase();
  if (lowerStr.includes('destination') || lowerStr.includes('source')) {
    return { arrival: '-', departure: '-' };
  }
  
  if (timingStr.length === 10) {
    return {
      arrival: timingStr.substring(0, 5),
      departure: timingStr.substring(5, 10)
    };
  }
  return { arrival: timingStr, departure: timingStr };
};

const LiveTrainStatus = () => {
  const [trainNumber, setTrainNumber] = useState("");
  const [journeyDate, setJourneyDate] = useState("Today");
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [liveData, setLiveData] = useState(null);
  const [error, setError] = useState("");
  
  // SEO Meta Tags (using standard DOM since we might not have React Helmet)
  useEffect(() => {
    document.title = "Live Train Running Status - Spot Your Train Instantly | WalkawayTrip";
    
    // Add meta description for SEO
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Check live train running status, spot your train location in real-time, get delay alerts, and track upcoming station arrivals instantly with WalkawayTrip.";
    
    return () => {
      document.title = "WalkawayTrip - Book Hotels, Flights, Trains & Holidays";
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trainNumber) return;
    
    setIsSearching(true);
    setError("");
    setShowResult(false);
    
    try {
      // Send request to our backend
      const response = await fetch(`http://localhost:4000/api/trains/live-status?trainNo=${encodeURIComponent(trainNumber)}&date=${journeyDate}`);
      const data = await response.json();
      
      if (response.ok) {
        setLiveData(data.data);
        setShowResult(true);
      } else {
        setError(data.error || "Failed to fetch train status.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching the status.");
    } finally {
      setIsSearching(false);
    }
  };

  const faqs = [
    {
      q: "How to check Live Train Running Status?",
      a: "Enter your 5-digit Train Number or Train Name in the search box above, select your journey date (Yesterday, Today, or Tomorrow), and click 'Check Status'. You will instantly see the real-time location and expected arrival/departure times."
    },
    {
      q: "What does 'Spot your Train' mean?",
      a: "Spot your Train is a feature that allows passengers to track the exact GPS location of their train in real-time. It provides information about the last departed station, the next upcoming station, and any delays."
    },
    {
      q: "How accurate is the Live Train Status?",
      a: "Our Live Train Status is highly accurate and uses the official NTES (National Train Enquiry System) data combined with GPS tracking from the locomotive engines to give you the most precise location."
    },
    {
      q: "Can I check the train status without internet while travelling?",
      a: "While our website requires an internet connection, if you are inside the train, you can check the offline status by looking at GPS coordinates if you have downloaded our mobile app."
    }
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans flex flex-col justify-between">
      <MainNavbar />

      <main className="flex-grow pt-24 pb-12">
        {/* --- Hero Section --- */}
        <section className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 mt-6">
          <div className="bg-gradient-to-br from-[#0a2351] via-[#103a8e] to-[#0a2351] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl text-center">
            
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?w=1200&auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay object-cover w-full h-full"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="bg-orange-500/20 border border-orange-500/30 text-orange-400 font-extrabold text-[11px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-flex items-center gap-2 shadow-lg shadow-orange-500/10">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                Real-Time GPS Tracking
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Unbounded] font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-md">
                Live Train <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Running Status</span>
              </h1>
              
              <p className="text-blue-100/90 text-sm sm:text-base font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                Spot your train instantly. Enter your train number to get real-time location updates, delay alerts, and exact arrival times for all Indian Railways trains.
              </p>

              {/* Search Box */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 sm:p-3 rounded-2xl shadow-2xl max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-white rounded-xl h-14 relative group focus-within:ring-2 focus-within:ring-orange-400 transition-all">
                  <AutocompleteInput 
                    icon={<Train className="text-gray-400 mr-3 group-focus-within:text-[#0a2351]" size={20} />}
                    placeholder="Enter Train No. or Name"
                    value={trainNumber}
                    onChange={(val) => setTrainNumber(val)}
                    suggestionsList={INDIAN_TRAINS}
                    className="h-full overflow-hidden"
                    inputClassName="text-gray-800 font-bold placeholder-gray-400 text-xs sm:text-sm text-ellipsis"
                  />
                </div>
                
                <div className="w-full sm:w-40 bg-white rounded-xl flex items-center px-4 h-14 relative group focus-within:ring-2 focus-within:ring-orange-400 transition-all">
                  <CalendarIcon className="text-gray-400 mr-2 group-focus-within:text-[#0a2351]" size={18} />
                  <select 
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="w-full h-full outline-none text-gray-800 font-bold bg-transparent cursor-pointer appearance-none"
                  >
                    <option value="Yesterday">Yesterday</option>
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                  </select>
                </div>

                <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className={`font-extrabold h-14 px-8 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap min-w-[160px] ${
                    isSearching 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                      : 'bg-[#f15a22] hover:bg-[#e04a12] text-white shadow-orange-500/40 hover:shadow-orange-500/60 hover:-translate-y-1 active:scale-95 cursor-pointer'
                  }`}
                >
                  {isSearching ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>Check Status <ArrowRight size={18} /></>
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-sm font-semibold">
                  {error}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- Result Section --- */}
        {showResult && liveData && (
          <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-16 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              
              {/* Left Column: Summary Panel */}
              <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-extrabold text-[#0a2351] mb-1 leading-tight">{liveData.trainNumber} - {liveData.trainName}</h2>
                    <p className="text-sm text-gray-500 font-medium">Live Running Status</p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-bl-full pointer-events-none"></div>
                    <p className="text-xs text-orange-600 font-bold uppercase mb-1 tracking-wider">Current Status</p>
                    <p className="text-sm font-bold text-gray-900">{liveData.status === 'Scheduled' ? 'Yet to Start / Scheduled' : liveData.status}</p>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Source</p>
                      <p className="text-sm font-extrabold text-gray-900 truncate max-w-[120px]">{liveData.source}</p>
                    </div>
                    <div className="flex-1 px-4 flex justify-center">
                       <ArrowRight className="text-gray-300" size={20} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Destination</p>
                      <p className="text-sm font-extrabold text-gray-900 truncate max-w-[120px]">{liveData.destination}</p>
                    </div>
                  </div>
                  
                  {/* Mock Progress Line - calculated based on current station index */}
                  {(() => {
                    const route = liveData.fullRoute || [];
                    const currentIndex = route.findIndex(s => s.is_current_station);
                    const progress = currentIndex !== -1 && route.length > 0 ? (currentIndex / (route.length - 1)) * 100 : 0;
                    return (
                      <div className="w-full bg-gray-100 h-2 rounded-full mt-5 mb-2 overflow-hidden relative">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-[#f15a22] rounded-full transition-all duration-1000"
                          style={{ width: `${Math.max(progress, 5)}%` }}
                        ></div>
                      </div>
                    )
                  })()}
                  <p className="text-[11px] text-center text-gray-400 font-semibold mt-3 uppercase tracking-wider">Data provided by NTES</p>
                </div>
              </div>

              {/* Right Column: Detailed Route Table */}
              <div className="flex-1 w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                
                {/* Table Header */}
                <div className="flex items-center bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-4 text-[11px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                  <div className="w-[50px] sm:w-[70px] shrink-0 text-left">Arrival</div>
                  <div className="w-8 shrink-0"></div>
                  <div className="flex-1 pl-2 sm:pl-4">Station Name</div>
                  <div className="w-[50px] sm:w-[70px] shrink-0 text-center hidden sm:block">Platform</div>
                  <div className="w-[50px] sm:w-[70px] shrink-0 text-center hidden sm:block">Halt</div>
                  <div className="w-[50px] sm:w-[70px] shrink-0 text-right">Depart</div>
                </div>

                {/* Table Body */}
                <div className="relative">
                  {(liveData.fullRoute || []).map((station, index) => {
                    const times = parseTiming(station.timing);
                    const isPassed = !station.is_current_station && liveData.fullRoute.findIndex(s => s.is_current_station) > index;
                    const isCurrent = station.is_current_station;
                    
                    return (
                      <div key={index} className={`flex items-center py-4 px-4 sm:px-6 relative hover:bg-gray-50/80 transition-colors border-b border-dashed border-gray-100 last:border-0 ${isCurrent ? 'bg-orange-50/30' : ''}`}>
                        
                        {/* Arrival */}
                        <div className={`w-[50px] sm:w-[70px] shrink-0 text-xs sm:text-sm font-bold text-left ${isPassed ? 'text-gray-400' : 'text-gray-700'}`}>
                          {times.arrival}
                        </div>

                        {/* Node & Line container */}
                        <div className="w-8 shrink-0 flex flex-col items-center justify-center relative self-stretch">
                          {/* Vertical Line Segment */}
                          <div className={`absolute w-[2px] ${isPassed ? 'bg-gray-300' : 'bg-gray-200'}
                            ${index === 0 ? 'top-1/2 bottom-0' : index === liveData.fullRoute.length - 1 ? 'top-0 bottom-1/2' : 'top-0 bottom-0'}
                          `}></div>
                          
                          {/* Node Point */}
                          <div className={`w-3.5 h-3.5 rounded-full border-2 bg-white z-10 relative flex items-center justify-center
                            ${isPassed ? 'border-gray-400' : isCurrent ? 'border-orange-500 w-8 h-8 sm:w-10 sm:h-10 shadow-[0_0_0_4px_rgba(249,115,22,0.15)] bg-orange-100' : 'border-gray-300'}
                          `}>
                            {isCurrent && <Train size={16} className="text-orange-600 sm:w-5 sm:h-5" />}
                          </div>
                        </div>

                        {/* Station Name */}
                        <div className="flex-1 min-w-0 pl-2 sm:pl-4 py-1">
                          <p className={`text-sm sm:text-[15px] font-bold truncate ${isPassed ? 'text-gray-500' : isCurrent ? 'text-orange-600' : 'text-gray-900'}`}>
                            {station.station_name}
                          </p>
                          <p className="text-[11px] sm:text-xs text-gray-400 font-semibold truncate mt-0.5">{station.distance}</p>
                        </div>

                        {/* Platform */}
                        <div className={`w-[50px] sm:w-[70px] shrink-0 text-center text-xs sm:text-sm font-semibold hidden sm:block ${isPassed ? 'text-gray-400' : 'text-gray-600'}`}>
                          {station.platform ? `PF ${station.platform}` : '-'}
                        </div>

                        {/* Halt */}
                        <div className={`w-[50px] sm:w-[70px] shrink-0 text-center text-xs sm:text-sm font-medium hidden sm:block truncate px-1 ${isPassed ? 'text-gray-400' : 'text-gray-500'}`}>
                          {station.halt !== '0min' && !station.halt.toLowerCase().includes('destination') && !station.halt.toLowerCase().includes('source') ? station.halt : '-'}
                        </div>

                        {/* Departure */}
                        <div className={`w-[50px] sm:w-[70px] shrink-0 text-right text-xs sm:text-sm font-bold ${isPassed ? 'text-gray-400' : 'text-gray-700'}`}>
                          {times.departure}
                        </div>

                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* --- SEO Article & Features --- */}
        <article className="max-w-[1000px] mx-auto px-4 sm:px-6 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2351] tracking-tight">Why Check Train Status Here?</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pinpoint Accuracy</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">Direct GPS tracking integrated with official NTES servers ensures you always see the most accurate train location.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real-Time Delays</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">Instantly know if your train is running late, the expected arrival time at the next station, and cover up speed.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Platform Predictions</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">Get highly probable platform numbers before you even reach the station to avoid last-minute rush on the bridge.</p>
            </div>
          </div>
        </article>

        {/* --- FAQs Section --- */}
        <section className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
              <Info className="text-[#0a2351]" size={28} />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} />
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

// Helper component for SVG Icon since Calendar might not be exported from lucide-react if imported wrongly
const CalendarIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// Simple accordion FAQ component
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-gray-800 hover:bg-gray-50 bg-white"
      >
        <span>{faq.q}</span>
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0a2351]' : ''}`} />
      </button>
      <div 
        className={`px-5 text-gray-600 font-medium text-sm leading-relaxed overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-5 pt-1 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {faq.a}
      </div>
    </div>
  );
};

export default LiveTrainStatus;
