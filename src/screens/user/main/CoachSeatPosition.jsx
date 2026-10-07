import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Train, Ticket, Search, AlertCircle, Eye, Info, HelpCircle, ChevronDown, ChevronUp, MapPin, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import MainNavbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";

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

const CoachSeatPosition = () => {
  const [trainNumber, setTrainNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [trainData, setTrainData] = useState(null);
  const [error, setError] = useState("");
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Train Coach & Seat Position - WalkawayTrip";
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
    setSelectedCoach(null);
    
    try {
      const response = await fetch(`http://localhost:4000/api/trains/coach-position?trainNumber=${encodeURIComponent(trainNumber)}`);
      const data = await response.json();
      
      if (response.ok) {
        setTrainData(data.data);
        setShowResult(true);
      } else {
        setError(data.error || "Failed to fetch coach position.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching coach data.");
    } finally {
      setIsSearching(false);
    }
  };

  const getCoachColor = (type) => {
    if (type === 'ENGINE' || type === 'EOG') return 'bg-gray-800 text-white border-gray-900';
    if (type.includes('A')) return 'bg-blue-600 text-white border-blue-700'; // AC Classes
    if (type === 'SL' || type === 'S') return 'bg-emerald-500 text-white border-emerald-600'; // Sleeper
    if (type === 'GEN' || type === 'UR') return 'bg-amber-500 text-white border-amber-600'; // General
    if (type === 'PC') return 'bg-purple-500 text-white border-purple-600'; // Pantry Car
    return 'bg-gray-200 text-gray-800 border-gray-300';
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
              src="https://images.unsplash.com/photo-1560963680-928db8c569f6?w=2000&auto=format&fit=crop&q=80" 
              alt="Train platform" 
              className="w-full h-full object-cover opacity-70 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a2351] via-[#0a2351]/80 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[Unbounded] font-extrabold text-white tracking-tight mb-4 max-w-2xl drop-shadow-lg leading-tight">
              Train Coach <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5]">Position & Layout</span>
            </h1>
            <p className="text-blue-100 text-base sm:text-lg font-medium max-w-xl mb-8 leading-relaxed">
              Visualize the exact location of your coach before the train arrives and explore the seat layout diagram.
            </p>
          </div>
        </section>

        {/* --- Floating Pristine Search Card --- */}
        <section className="relative max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 mt-[-100px] sm:mt-[-120px] z-20 mb-16">
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 relative">
            
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
               <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                 <Eye size={20} />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-gray-900">Spot Your Coach</h2>
                  <p className="text-sm text-gray-500 font-medium">Enter your 5-digit train number below</p>
               </div>
            </div>

            {/* Input Field */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <div className="flex-1 relative">
                  <label className="absolute -top-3 left-6 bg-white px-2 text-xs font-bold text-blue-600 uppercase tracking-widest z-10">
                    Train Number
                  </label>
                  <input 
                    type="text"
                    maxLength={5}
                    value={trainNumber}
                    onChange={(e) => setTrainNumber(e.target.value.replace(/\D/g, ''))} // only numbers
                    placeholder="e.g. 12952"
                    className="w-full h-16 bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-2xl px-6 text-xl sm:text-2xl font-black text-gray-800 outline-none placeholder-gray-300 tracking-[0.2em] transition-all"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSearching || trainNumber.length !== 5}
                  className={`h-16 px-10 rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest text-[15px] ${
                    isSearching || trainNumber.length !== 5 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                      : 'bg-gradient-to-r from-blue-600 to-[#3a7bd5] hover:from-blue-700 hover:to-[#2c65b5] text-white shadow-[0_10px_25px_rgba(58,123,213,0.4)] hover:shadow-[0_15px_35px_rgba(58,123,213,0.5)] hover:-translate-y-1 active:scale-95 cursor-pointer'
                  }`}
                >
                  {isSearching ? (
                    <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Search size={18} /> Locate Coach
                    </>
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

        {/* --- Result Section: Visual Train Composition --- */}
        {showResult && trainData && (
          <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-20 animate-[fade-in-up_0.5s_ease-out]">
            <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden">
              
              <div className="bg-gray-50 border-b border-gray-100 p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-2xl font-[Unbounded] font-extrabold text-[#0a2351]">
                    {trainData.train_no} - {trainData.train_name}
                  </h3>
                  <p className="text-gray-500 font-medium mt-1">Live Coach Composition (Engine to Rear)</p>
                </div>
                <div className="flex gap-4 flex-wrap justify-center">
                   <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                      <div className="w-3 h-3 bg-blue-600 rounded-sm"></div> AC Coaches
                   </div>
                   <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                      <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Sleeper
                   </div>
                   <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                      <div className="w-3 h-3 bg-amber-500 rounded-sm"></div> General
                   </div>
                </div>
              </div>

              {/* The Visual Train */}
              <div className="p-8 sm:p-12 overflow-x-auto custom-scrollbar">
                <div className="flex items-center gap-1 pb-4 min-w-max">
                  {trainData.coaches.map((coach, index) => (
                    <div key={index} className="flex items-center">
                      {/* Train Coupling */}
                      {index > 0 && (
                        <div className="flex flex-col items-center justify-center w-6 h-8 gap-[2px]">
                          <div className="w-full h-1 bg-gray-400"></div>
                          <div className="w-full h-1 bg-gray-400"></div>
                        </div>
                      )}
                      
                      {/* Coach Block */}
                      <div 
                        onClick={() => setSelectedCoach(coach)}
                        className={`relative w-[100px] h-[70px] sm:w-[120px] sm:h-[80px] rounded-lg border-b-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl ${getCoachColor(coach.type)} ${selectedCoach?.name === coach.name ? 'ring-4 ring-offset-2 ring-blue-400' : 'shadow-md'}`}
                      >
                        {coach.type === 'ENGINE' ? (
                          <Train size={32} className="text-white/90" />
                        ) : (
                          <>
                            <span className="text-2xl sm:text-3xl font-black">{coach.name}</span>
                            <span className="text-[10px] sm:text-xs font-bold opacity-80 mt-1 uppercase tracking-wider">{coach.type}</span>
                          </>
                        )}
                        
                        {/* Wheels */}
                        <div className="absolute -bottom-3 left-3 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-400"></div>
                        <div className="absolute -bottom-3 right-3 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-400"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="w-full h-2 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full mt-4"></div>
                <p className="text-center text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Platform Direction &rarr;</p>
              </div>

              {/* Selected Coach Details / Seat Map */}
              {selectedCoach && selectedCoach.type !== 'ENGINE' && selectedCoach.type !== 'EOG' && selectedCoach.type !== 'PC' && (
                <div className="border-t border-gray-100 bg-blue-50/30 p-8 sm:p-12 animate-[fade-in-up_0.3s_ease-out]">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black">
                        {selectedCoach.name}
                      </span>
                      Seat Layout Map
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                       {/* Seat Layout Diagram */}
                       <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                         <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                           <span className="text-sm font-bold text-gray-500">Aisle</span>
                           <span className="text-sm font-bold text-gray-500">Window</span>
                         </div>
                         
                         {/* Sample Cabin Compartment */}
                         <div className="relative border-2 border-gray-300 rounded-lg p-4 bg-gray-50 mb-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                               {/* Main Berths */}
                               <div className="col-span-3 flex flex-col gap-2">
                                 <div className="h-10 bg-blue-100 border border-blue-300 rounded flex items-center justify-center font-bold text-blue-800 text-xs">Upper (U)</div>
                                 <div className="h-10 bg-blue-100 border border-blue-300 rounded flex items-center justify-center font-bold text-blue-800 text-xs">Middle (M)</div>
                                 <div className="h-10 bg-blue-100 border border-blue-300 rounded flex items-center justify-center font-bold text-blue-800 text-xs">Lower (L)</div>
                               </div>
                               
                               {/* Aisle Space */}
                               <div className="col-span-1 flex items-center justify-center">
                                 <div className="w-[1px] h-full bg-dashed bg-gray-300"></div>
                               </div>

                               {/* Side Berths */}
                               <div className="col-span-1 flex flex-col justify-between">
                                 <div className="h-12 bg-emerald-100 border border-emerald-300 rounded flex items-center justify-center font-bold text-emerald-800 text-xs text-center p-1">Side Upper (SU)</div>
                                 <div className="h-12 bg-emerald-100 border border-emerald-300 rounded flex items-center justify-center font-bold text-emerald-800 text-xs text-center p-1">Side Lower (SL)</div>
                               </div>
                            </div>
                         </div>
                         <p className="text-xs text-gray-400 font-medium text-center">Typical Compartment Layout for 3A / Sleeper Coach</p>
                       </div>

                       {/* Information */}
                       <div>
                         <ul className="space-y-4">
                           <li className="flex items-start gap-3">
                             <div className="mt-1"><Info size={18} className="text-blue-500" /></div>
                             <p className="text-sm text-gray-600 font-medium"><strong className="text-gray-900 block mb-1">Lower Berths (L, SL)</strong> Preferred by elderly and those who want easy access. Window views are excellent.</p>
                           </li>
                           <li className="flex items-start gap-3">
                             <div className="mt-1"><Info size={18} className="text-blue-500" /></div>
                             <p className="text-sm text-gray-600 font-medium"><strong className="text-gray-900 block mb-1">Middle Berths (M)</strong> Needs to be folded down during the day to allow seating on the lower berth.</p>
                           </li>
                           <li className="flex items-start gap-3">
                             <div className="mt-1"><Info size={18} className="text-blue-500" /></div>
                             <p className="text-sm text-gray-600 font-medium"><strong className="text-gray-900 block mb-1">Upper Berths (U, SU)</strong> Great for privacy and sleeping during the day without disturbances.</p>
                           </li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* --- Comprehensive Coach Guide Section --- */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-20">
          <div className="bg-[#0a2351] rounded-[2rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Train className="text-blue-200" size={24} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-white tracking-tight">
                  Indian Railways Coach Guide
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 border border-blue-400/30">
                    <span className="text-blue-300 font-bold">1A / 2A / 3A</span>
                  </div>
                  <span className="text-white font-bold text-lg block mb-2">AC Classes</span>
                  <p className="text-blue-200 text-sm font-medium leading-relaxed">Air-conditioned comfort with bedding provided. 1A offers private coupes, 2A has curtains for privacy, and 3A is the standard budget AC option.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 border border-emerald-400/30">
                    <span className="text-emerald-300 font-bold">SL</span>
                  </div>
                  <span className="text-white font-bold text-lg block mb-2">Sleeper Class</span>
                  <p className="text-blue-200 text-sm font-medium leading-relaxed">The most common non-AC coach. Open windows, standard fans, and 72 berths per coach. Best for budget long-distance travel.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 border border-purple-400/30">
                    <span className="text-purple-300 font-bold">CC / EC</span>
                  </div>
                  <span className="text-white font-bold text-lg block mb-2">Chair Car</span>
                  <p className="text-blue-200 text-sm font-medium leading-relaxed">Air-conditioned seating coaches mostly used for daytime journeys (like Shatabdi). EC offers 2x2 seating, while CC is 3x2.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Boarding Tips & Information --- */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-2">
              Smart Boarding Tips
            </h2>
            <p className="text-gray-500 font-medium">Everything you need to know before you reach the platform.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Finding Your Coach on Platform</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Most major stations have digital coach indicators hanging above the platform. For example, if your coach is S4, look for the digital board blinking 'S4'. Stand directly under it to board without rushing.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Last-Minute Composition Changes</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Sometimes, due to technical reasons, Railways may reverse the engine or change the coach sequence at the last minute. Always rely on the platform announcements and digital indicators for final confirmation.
                </p>
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
          </div>
          
          <div>
            {[
              {
                q: "Why is the coach position important?",
                a: "Trains can be very long (up to 24 coaches). Knowing your coach position (e.g., 5th from the engine) helps you stand at the exact spot on the platform, avoiding the rush with heavy luggage when the train arrives."
              },
              {
                q: "What does 'EOG' mean in the train composition?",
                a: "EOG stands for End On Generation. These are the generator cars usually placed at the very front (behind the engine) and at the extreme rear of LHB trains to provide power for air conditioning and lighting."
              },
              {
                q: "Are the seat numbers sequential?",
                a: "Yes, seat numbers start from 1 at one end of the coach and go sequentially to 72 (in Sleeper/3A) or 80+ in General coaches. Generally, the lower numbers are near the toilet/door at one end, and the highest numbers are at the other end."
              }
            ].map((faq, index) => (
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

export default CoachSeatPosition;
