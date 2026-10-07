import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Train, Search, AlertCircle, MapPin, Clock, ArrowRight, Activity, Map } from "lucide-react";
import MainNavbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";

const PlatformLocator = () => {
  const [trainNumber, setTrainNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [platformData, setPlatformData] = useState(null);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Platform Locator - WalkawayTrip";
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trainNumber) return;
    
    // Train number is usually 5 digits
    if (!/^\d{5}$/.test(trainNumber)) {
      setError("Please enter a valid 5-digit Train Number.");
      return;
    }
    
    setIsSearching(true);
    setError("");
    setShowResult(false);
    
    try {
      const response = await fetch(`http://localhost:4000/api/trains/platform-locator?trainNumber=${encodeURIComponent(trainNumber)}`);
      const data = await response.json();
      
      if (response.ok) {
        setPlatformData(data.data);
        setShowResult(true);
      } else {
        setError(data.error || "Failed to fetch platform data.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching platform data.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-[#f0f4f8] min-h-screen font-sans flex flex-col justify-between">
      <MainNavbar />

      <main className="flex-grow pt-[36px] md:pt-[72px] pb-12">
        {/* --- Hero Section (Premium Bright Travel Aesthetic) --- */}
        <section className="relative h-[380px] sm:h-[450px] w-full flex items-center">
          {/* Stunning Background Image */}
          <div className="absolute inset-0 w-full h-full bg-[#0a2351]">
            <img 
              src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=2000&auto=format&fit=crop&q=80" 
              alt="Train platform" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            {/* Soft Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a2351]/90 via-[#0a2351]/60 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 text-center sm:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[Unbounded] font-extrabold text-white tracking-tight mb-4 max-w-2xl drop-shadow-lg leading-tight mx-auto sm:mx-0">
              Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Platform</span> <br/> Locator.
            </h1>
            <p className="text-blue-100 text-base sm:text-lg font-medium max-w-xl mb-8 leading-relaxed mx-auto sm:mx-0">
              Never rush at the last minute again. Know exactly which platform your train is arriving at across its entire route.
            </p>
          </div>
        </section>

        {/* --- Floating Pristine Search Card --- */}
        <section className="relative max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 mt-[-100px] sm:mt-[-120px] z-20 mb-16">
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 relative">
            
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-8 pb-6 border-b border-gray-100">
               <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                 <MapPin size={20} />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-gray-900">Locate Platform</h2>
                  <p className="text-sm text-gray-500 font-medium">Enter your 5-digit train number below</p>
               </div>
            </div>

            {/* Input Field */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <div className="flex-1 relative">
                  <label className="absolute -top-3 left-6 bg-white px-2 text-xs font-bold text-emerald-600 uppercase tracking-widest z-10">
                    Train Number
                  </label>
                  <input 
                    type="text"
                    maxLength={5}
                    value={trainNumber}
                    onChange={(e) => setTrainNumber(e.target.value.replace(/\D/g, ''))} // only numbers
                    placeholder="e.g. 12952"
                    className="w-full h-16 bg-gray-50 border-2 border-gray-200 focus:border-emerald-500 rounded-2xl px-6 text-xl sm:text-2xl font-black text-gray-800 outline-none placeholder-gray-300 tracking-[0.2em] transition-all"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSearching || trainNumber.length !== 5}
                  className={`h-16 px-10 rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest text-[15px] ${
                    isSearching || trainNumber.length !== 5 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                      : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.5)] hover:-translate-y-1 active:scale-95 cursor-pointer'
                  }`}
                >
                  {isSearching ? (
                    <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Search size={18} /> Find Platforms
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="absolute -bottom-8 left-0 w-full text-center sm:text-left text-red-500 text-sm font-bold pl-2 flex items-center justify-center sm:justify-start gap-1.5">
                  <AlertCircle size={14} /> {error}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* --- Result Section: Glowing Interactive Timeline --- */}
        {showResult && platformData && (
          <section className="max-w-[1000px] mx-auto px-4 sm:px-6 mb-20 animate-[fade-in-up_0.5s_ease-out]">
            <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden">
              
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-100 p-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                <div>
                  <h3 className="text-2xl font-[Unbounded] font-extrabold text-[#0a2351] flex items-center justify-center sm:justify-start gap-3">
                    <Train className="text-emerald-500" size={28} />
                    {platformData.train_no} - {platformData.train_name}
                  </h3>
                  <p className="text-gray-500 font-medium mt-1">Expected Platform Route</p>
                </div>
                {platformData.isMock && (
                   <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200">
                      <AlertCircle size={14} /> Mock Data Demo
                   </div>
                )}
              </div>

              {/* Timeline Container */}
              <div className="p-8 sm:p-12">
                <div className="relative border-l-4 border-gray-200 ml-4 sm:ml-8 space-y-12 pb-8">
                  {platformData.route.map((station, index) => {
                     const isFirst = index === 0;
                     const isLast = index === platformData.route.length - 1;
                     
                     return (
                       <div key={index} className="relative pl-8 sm:pl-12 group">
                         {/* Timeline Node */}
                         <div className={`absolute -left-[14px] top-1 w-6 h-6 rounded-full border-4 flex items-center justify-center bg-white shadow-sm transition-transform duration-300 group-hover:scale-125 ${isFirst || isLast ? 'border-emerald-500 w-7 h-7 -left-[16px]' : 'border-blue-400'}`}>
                           {(isFirst || isLast) && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}
                         </div>

                         {/* Content Card */}
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group-hover:border-blue-200">
                            
                            {/* Station Info */}
                            <div className="flex-1">
                              <h4 className="text-xl font-black text-gray-900 mb-1">{station.station_name}</h4>
                              
                              <div className="flex items-center gap-4 text-sm font-semibold text-gray-500 mt-3">
                                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                  <ArrowRight size={14} className="text-emerald-500"/>
                                  Arr: <span className="text-gray-900">{station.arrival_time}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                  <ArrowRight size={14} className="text-blue-500"/>
                                  Dep: <span className="text-gray-900">{station.departure_time}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                  <Clock size={14} className="text-amber-500"/>
                                  Halt: <span className="text-gray-900">{station.halt}</span>
                                </div>
                              </div>
                            </div>

                            {/* Huge Platform Badge */}
                            <div className="flex flex-col items-center justify-center bg-blue-50 border border-blue-100 rounded-xl py-3 px-6 min-w-[140px]">
                              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Platform</span>
                              <span className="text-4xl font-black text-blue-700 font-[Unbounded] drop-shadow-sm">
                                #{station.platform}
                              </span>
                            </div>

                         </div>
                       </div>
                     );
                  })}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* --- Informative Guide Section --- */}
        <section className="max-w-[1000px] mx-auto px-4 sm:px-6 mb-20">
          <div className="bg-[#0a2351] rounded-[2rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <Activity className="text-emerald-400" size={40} />
            </div>

            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-white tracking-tight mb-3">
                Why checking Platform matters
              </h2>
              <p className="text-blue-200 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                Major Indian Railway junctions can have up to 23 platforms. Searching for your train's platform after reaching the station creates unnecessary panic. Use this locator to direct your cab exactly to the entrance closest to your expected platform. 
                <br/><br/>
                <span className="text-emerald-300 font-bold">Pro Tip:</span> While this data is highly accurate based on historical arrivals, always double-check the digital announcement boards at the station as platforms can change at the very last minute due to rail traffic.
              </p>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default PlatformLocator;
