import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Train, Ticket, ShieldCheck, CheckCircle2, AlertCircle, RefreshCcw, FileText, QrCode, Info, ChevronDown, ChevronUp, Zap, MapPin } from "lucide-react";
import MainNavbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";

// FAQ Component for clean code
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-2xl mb-4 overflow-hidden bg-white hover:border-blue-300 transition-colors">
      <button 
        className="w-full px-6 py-5 text-left flex justify-between items-center bg-white"
        onClick={onClick}
      >
        <span className="font-bold text-gray-800 text-lg">{question}</span>
        {isOpen ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-600 leading-relaxed font-medium">
          {answer}
        </div>
      )}
    </div>
  );
};

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [pnrData, setPnrData] = useState(null);
  const [error, setError] = useState("");
  const [openFAQ, setOpenFAQ] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Check PNR Status Live - WalkawayTrip";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Check your IRCTC PNR status instantly. Get live updates on seat confirmation, chart status, and coach positions on WalkawayTrip.";
    
    return () => {
      document.title = "WalkawayTrip - Book Hotels, Flights, Trains & Holidays";
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!pnrNumber) return;
    
    if (!/^\d{10}$/.test(pnrNumber)) {
      setError("Please enter a valid 10-digit PNR number.");
      return;
    }
    
    setIsSearching(true);
    setError("");
    setShowResult(false);
    
    try {
      const response = await fetch(`http://localhost:4000/api/trains/pnr?pnr=${encodeURIComponent(pnrNumber)}`);
      const data = await response.json();
      
      if (response.ok) {
        setPnrData(data.data);
        setShowResult(true);
      } else {
        setError(data.error || "Failed to fetch PNR status.");
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
      q: "What is a PNR number?",
      a: "PNR stands for 'Passenger Name Record'. It is a unique 10-digit number assigned to every booked train ticket by Indian Railways. It holds all your travel information including passenger details, itinerary, and booking status."
    },
    {
      q: "When is the final reservation chart prepared?",
      a: "The first reservation chart is usually prepared 4 hours before the train's scheduled departure from its origin station. For early morning trains, charts are prepared the previous night at around 8:00 PM."
    },
    {
      q: "Can I travel with a Waitlisted (WL) e-ticket?",
      a: "No. If your e-ticket remains fully Waitlisted (WL) after the final chart preparation, it is automatically cancelled and the refund is credited to your original payment method. You cannot board reserved coaches. However, if you have a physical counter ticket, different rules apply."
    },
    {
      q: "What is the difference between GNWL, PQWL, and RLWL?",
      a: "GNWL (General Waitlist) is issued for journeys starting from the originating station and has the highest chance of confirmation. RLWL (Remote Location Waitlist) is for intermediate stations with a dedicated quota. PQWL (Pooled Quota Waitlist) is for passengers travelling between intermediate stations with generally lower confirmation chances."
    }
  ];

  return (
    <div className="bg-[#f0f4f8] min-h-screen font-sans flex flex-col justify-between">
      <MainNavbar />

      <main className="flex-grow pt-[36px] md:pt-[72px] pb-12">
        {/* --- Hero Section (Premium Bright Travel Aesthetic) --- */}
        <section className="relative h-[400px] sm:h-[480px] w-full flex items-center">
          {/* Stunning Background Image */}
          <div className="absolute inset-0 w-full h-full bg-[#0a2351]">
            <img 
              src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?w=2000&auto=format&fit=crop&q=80" 
              alt="Train journey" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            {/* Soft Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a2351] via-[#0a2351]/80 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[Unbounded] font-extrabold text-white tracking-tight mb-4 max-w-2xl drop-shadow-lg leading-tight">
              Check PNR Status <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Instantly.</span>
            </h1>
            <p className="text-blue-100 text-base sm:text-lg font-medium max-w-xl mb-8 leading-relaxed">
              Get real-time IRCTC ticket confirmation, live chart updates, and intelligent coach predictions directly from official servers.
            </p>
          </div>
        </section>

        {/* --- Floating Pristine Search Card --- */}
        <section className="relative max-w-[950px] mx-auto px-4 sm:px-6 lg:px-8 mt-[-100px] sm:mt-[-130px] z-20 mb-16">
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 relative">
            
            {/* Navigation Tabs (Top of Card) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 mb-8 text-sm font-bold border-b border-gray-100 pb-6">
              <button 
                onClick={() => navigate('/trains')}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors px-4 py-2 rounded-full hover:bg-blue-50"
              >
                <Ticket size={18} /> Book Tickets
              </button>
              <button className="flex items-center gap-2 text-blue-600 bg-blue-50 px-5 py-2.5 rounded-full border border-blue-100 shadow-sm ring-1 ring-blue-600/20">
                <FileText size={18} /> Check PNR Status
              </button>
              <button 
                onClick={() => navigate('/train-running-status')}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors px-4 py-2 rounded-full hover:bg-blue-50"
              >
                <Train size={18} /> Live Train Status
              </button>
            </div>

            {/* Input Field */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <div className="flex-1 relative">
                  <label className="absolute -top-3 left-6 bg-white px-2 text-xs font-bold text-blue-600 uppercase tracking-widest z-10">
                    Enter 10-digit PNR Number
                  </label>
                  <input 
                    type="text"
                    maxLength={10}
                    value={pnrNumber}
                    onChange={(e) => setPnrNumber(e.target.value.replace(/\D/g, ''))} // only numbers
                    placeholder="e.g. 8412345670"
                    className="w-full h-16 bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-2xl px-6 text-xl sm:text-2xl font-black text-gray-800 outline-none placeholder-gray-300 tracking-[0.1em] transition-all"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSearching || pnrNumber.length !== 10}
                  className={`h-16 px-10 rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest text-[15px] ${
                    isSearching || pnrNumber.length !== 10 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                      : 'bg-gradient-to-r from-[#ff6d38] to-[#ff4700] hover:from-[#ff5920] hover:to-[#e64000] text-white shadow-[0_10px_25px_rgba(255,109,56,0.4)] hover:shadow-[0_15px_35px_rgba(255,109,56,0.5)] hover:-translate-y-1 active:scale-95 cursor-pointer'
                  }`}
                >
                  {isSearching ? (
                    <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    "Check Status"
                  )}
                </button>
              </div>
              
              {error && (
                <div className="absolute -bottom-8 left-0 w-full text-left text-red-500 text-sm font-bold pl-2 flex items-center gap-1.5">
                  <AlertCircle size={14} /> {error}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* --- Result Section: Crisp Boarding Pass --- */}
        {showResult && pnrData && (
          <section className="max-w-[850px] mx-auto px-4 sm:px-6 mb-20 animate-[fade-in-up_0.5s_ease-out]">
            <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden relative">
              
              {/* Ticket Edge Design (Cutouts) */}
              <div className="absolute top-[130px] -left-5 w-10 h-10 bg-[#f0f4f8] rounded-full shadow-inner border-r border-gray-200 z-10"></div>
              <div className="absolute top-[130px] -right-5 w-10 h-10 bg-[#f0f4f8] rounded-full shadow-inner border-l border-gray-200 z-10"></div>
              <div className="absolute top-[150px] left-0 w-full border-t-2 border-dashed border-gray-200"></div>

              {/* Ticket Header (White & Crisp) */}
              <div className="bg-white p-8 pb-10 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md tracking-wider">
                      PNR: {pnrData.pnr}
                    </span>
                    <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <CheckCircle2 size={12} /> {pnrData.chart_status}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-bold text-[#0a2351] leading-tight">
                    {pnrData.train_no} <span className="text-gray-300 mx-1">|</span> {pnrData.train_name}
                  </h2>
                </div>
                <div className="hidden sm:block opacity-60">
                  <QrCode size={50} />
                </div>
              </div>
              
              {/* Ticket Route Details */}
              <div className="px-8 py-10 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6 relative">
                <div className="text-center sm:text-left w-full sm:w-1/3">
                  <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest mb-1">Boarding</p>
                  <p className="text-2xl font-black text-gray-900 truncate" title={pnrData.boarding_station}>
                    {pnrData.boarding_station.split(' ')[0]}
                  </p>
                  <p className="text-sm text-gray-500 font-semibold mt-0.5">{pnrData.boarding_station}</p>
                </div>
                
                <div className="flex-1 w-full flex flex-col items-center justify-center relative px-2">
                  <div className="w-full relative flex items-center justify-center h-8 mb-2">
                    <div className="absolute w-full h-[2px] bg-gradient-to-r from-gray-300 via-orange-400 to-gray-300"></div>
                    <div className="w-10 h-10 bg-white border-2 border-orange-400 rounded-full flex items-center justify-center z-10 shadow-sm text-orange-500">
                      <Train size={20} />
                    </div>
                  </div>
                  <p className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">
                    {pnrData.doj}
                  </p>
                </div>
                
                <div className="text-center sm:text-right w-full sm:w-1/3">
                  <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest mb-1">Destination</p>
                  <p className="text-2xl font-black text-gray-900 truncate" title={pnrData.reservation_upto}>
                    {pnrData.reservation_upto.split(' ')[0]}
                  </p>
                  <p className="text-sm text-gray-500 font-semibold mt-0.5">{pnrData.reservation_upto}</p>
                </div>
              </div>
              
              {/* Ticket Class & Quota */}
              <div className="px-8 py-4 bg-white border-b border-gray-100 flex flex-wrap gap-8 justify-center sm:justify-start">
                <div>
                  <span className="text-xs text-gray-400 font-extrabold uppercase tracking-widest block mb-0.5">Class</span>
                  <span className="text-lg font-black text-gray-800">{pnrData.class}</span>
                </div>
                <div className="w-[1px] h-10 bg-gray-200 hidden sm:block"></div>
                <div>
                  <span className="text-xs text-gray-400 font-extrabold uppercase tracking-widest block mb-0.5">Quota</span>
                  <span className="text-lg font-black text-gray-800">{pnrData.quota}</span>
                </div>
                {pnrData.isMock && (
                   <div className="ml-auto flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg border border-orange-200">
                      <AlertCircle size={14} /> Mock Data Example
                   </div>
                )}
              </div>

              {/* Passenger List Table */}
              <div className="p-8 pt-6 bg-white">
                <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span> Passenger Status
                </h3>
                
                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-xs font-extrabold text-gray-500 uppercase tracking-widest border-b border-gray-200">
                        <th className="py-4 px-6">Passenger</th>
                        <th className="py-4 px-6">Booking Status</th>
                        <th className="py-4 px-6">Current Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {pnrData.passenger_info?.map((passenger, index) => {
                        const isCNF = passenger.current_status.includes('CNF');
                        const isRAC = passenger.current_status.includes('RAC');
                        
                        return (
                          <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                            <td className="py-4 px-6">
                              <span className="font-bold text-gray-800 text-sm">Passenger {passenger.passenger_serial}</span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-semibold text-gray-500 text-sm">{passenger.booking_status}</span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-col items-start">
                                <span className={`font-black tracking-wider text-[13px] px-2.5 py-1 rounded-lg border ${
                                  isCNF ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                                  isRAC ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                                  'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                  {passenger.current_status}
                                </span>
                                {(passenger.current_coach && passenger.current_coach !== '-') && (
                                  <span className="text-[12px] font-bold text-gray-600 mt-2 flex items-center gap-1.5 bg-gray-100 px-2 py-0.5 rounded-md">
                                    <MapPin size={12} className="text-gray-400" />
                                    Coach <span className="text-gray-900">{passenger.current_coach}</span> • Berth <span className="text-gray-900">{passenger.current_berth}</span> {passenger.current_berth_type && `(${passenger.current_berth_type})`}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- Why Check With Us (New Section) --- */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-2">
            Why Check PNR Status With Us?
          </h2>
          <p className="text-gray-500 font-medium mb-12 max-w-2xl mx-auto">
            Experience the fastest and most accurate PNR tracking engine. We process millions of statuses securely.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Sync</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Directly connected to official IRCTC servers to give you 100% accurate status the second it changes.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Confirmation Prediction</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Our AI analyzes historical data to predict if your waitlisted ticket will get confirmed before the chart prep.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-Grade Security</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Your PNR queries are processed with absolute privacy. We do not store or share your journey details.
              </p>
            </div>
          </div>
        </section>

        {/* --- The Complete PNR Abbreviations Guide --- */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-20">
          <div className="bg-[#0a2351] rounded-[2rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Info className="text-blue-200" size={24} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-white tracking-tight">
                  PNR Abbreviations Guide
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <span className="text-emerald-400 font-black text-xl block mb-1">CNF</span>
                  <span className="text-white font-bold block mb-2">Confirmed</span>
                  <p className="text-blue-200 text-sm font-medium">Guaranteed seat. Coach/Berth allocated.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <span className="text-amber-400 font-black text-xl block mb-1">RAC</span>
                  <span className="text-white font-bold block mb-2">Reservation Against Cancellation</span>
                  <p className="text-blue-200 text-sm font-medium">Allowed to board. Half berth allocated.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <span className="text-red-400 font-black text-xl block mb-1">WL / GNWL</span>
                  <span className="text-white font-bold block mb-2">General Waitlist</span>
                  <p className="text-blue-200 text-sm font-medium">No seat yet. Highest chance of confirmation.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <span className="text-purple-400 font-black text-xl block mb-1">PQWL / RLWL</span>
                  <span className="text-white font-bold block mb-2">Pooled / Remote Waitlist</span>
                  <p className="text-blue-200 text-sm font-medium">Intermediate stations. Lower confirmation chance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Interactive FAQ Section --- */}
        <section className="max-w-[800px] mx-auto px-4 sm:px-6 mb-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 font-medium">Everything you need to know about your PNR</p>
          </div>
          
          <div>
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
              />
            ))}
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default PNRStatus;
