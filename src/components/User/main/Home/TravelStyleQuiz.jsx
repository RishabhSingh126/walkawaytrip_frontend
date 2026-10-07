import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Sparkles, User, Users, Heart, Users2, ArrowRight } from "lucide-react";

const recommendations = {
  "Solo-Adventure": {
    title: "Ladakh: High Mountain Bike Expedition",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?w=600&auto=format&fit=crop&q=80",
    price: "₹24,000",
    duration: "9 Days",
    tag: "High Adrenaline"
  },
  "Solo-Beach": {
    title: "Phuket: Island Hopping & Sunset Beach Cruises",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80",
    price: "₹19,500",
    duration: "7 Days",
    tag: "Tropical Paradise"
  },
  "Solo-Historic": {
    title: "Kyoto: Golden Pavilion Temples & Traditional Walks",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80",
    price: "₹41,000",
    duration: "6 Days",
    tag: "Cultural Gem"
  },
  "Solo-Nightlife": {
    title: "Shibuya: Neon-Lit Shibuya Crossing Night Walk",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=600&auto=format&fit=crop&q=80",
    price: "₹26,000",
    duration: "4 Days",
    tag: "City Lights"
  },
  "Couple-Adventure": {
    title: "Cappadocia: Hot Air Balloon Flight & Cave Exploring",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=600&auto=format&fit=crop&q=80",
    price: "₹18,500",
    duration: "5 Days",
    tag: "Romantic Adventure"
  },
  "Couple-Beach": {
    title: "Maldives: Couples Secluded Beachfront Ocean Dinner",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format&fit=crop&q=80",
    price: "₹65,000",
    duration: "5 Days",
    tag: "Absolute Luxury"
  },
  "Couple-Historic": {
    title: "Rome: The Mighty Colosseum & Historic Vatican Tour",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80",
    price: "₹32,000",
    duration: "6 Days",
    tag: "Timeless History"
  },
  "Couple-Nightlife": {
    title: "Paris: Eiffel Tower Sunset Views & Seine Dinner Cruise",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80",
    price: "₹55,000",
    duration: "5 Days",
    tag: "Vibrant & Cozy"
  },
  "Family-Adventure": {
    title: "Rishikesh: River Rafting & Bungee Jumping Thrills",
    image: "https://images.unsplash.com/photo-1596760410712-404db35824ad?w=600&auto=format&fit=crop&q=80",
    price: "₹7,500",
    duration: "4 Days",
    tag: "Active Family"
  },
  "Family-Beach": {
    title: "Bali: Pristine Beaches & Exotic Sea Temples",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80",
    price: "₹28,000",
    duration: "8 Days",
    tag: "Tropical Resort"
  },
  "Family-Historic": {
    title: "Agra: Taj Mahal Historical places in India, 7 wonders",
    duration: "6 Days",
    price: "₹5,000",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80",
    tag: "Wonders of India"
  },
  "Family-Nightlife": {
    title: "Singapore: Gardens by the Bay & Marina Bay Skyline",
    duration: "4 Days",
    price: "₹22,000",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=80",
    tag: "Modern & Fun"
  }
};

const TravelStyleQuiz = () => {
  const [step, setStep] = useState(1);
  const [companion, setCompanion] = useState("");
  const [vibe, setVibe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const navigate = useNavigate();

  const handleCompanionSelect = (type) => {
    setCompanion(type);
    setStep(2);
  };

  const handleVibeSelect = (type) => {
    setVibe(type);
    setIsLoading(true);
    setStep(3);
    
    // Simulate AI match calculation
    setTimeout(() => {
      const matchKey = `${companion}-${type}`;
      // Fallback to Family-Beach if matchKey not in map (e.g. Friends-...)
      const matchData = recommendations[matchKey] || recommendations["Family-Beach"];
      setResult(matchData);
      setIsLoading(false);
    }, 1200);
  };

  const resetQuiz = () => {
    setCompanion("");
    setVibe("");
    setResult(null);
    setStep(1);
  };

  return (
    <section className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-12 md:p-16 border border-slate-800 shadow-2xl">
        
        {/* Abstract Background Light Flares */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          
          <div className="flex items-center gap-2 mb-4 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 text-[#ffe600] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
            <Sparkles size={12} className="animate-spin" />
            <span>Interactive Vibe Matcher</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-[Unbounded] font-extrabold text-white tracking-tight leading-tight mb-4 text-center">
            Find Your Ideal Travel Vibe
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-10 max-w-lg text-center">
            Answer two quick questions to let our intelligent planner recommend the ultimate package for your travel style.
          </p>

          {/* STEP 1: Companion Picker */}
          {step === 1 && (
            <div className="w-full space-y-6">
              <p className="text-sm font-black text-slate-300 uppercase tracking-widest text-center">
                Step 1: Who is joining you on this escape?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {[
                  { name: "Solo", label: "Solo Traveler", icon: <User size={24} />, emoji: "🎒" },
                  { name: "Couple", label: "Romantic Duo", icon: <Heart size={24} />, emoji: "💑" },
                  { name: "Family", label: "Family Trip", icon: <Users size={24} />, emoji: "👨‍👩‍👧" },
                  { name: "Friends", label: "Group Getaway", icon: <Users2 size={24} />, emoji: "👥" }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleCompanionSelect(item.name === "Friends" ? "Family" : item.name)} // mapping friends to family fallback
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 hover:scale-[1.03] active:scale-98 cursor-pointer transition-all duration-300 gap-3 group"
                  >
                    <div className="text-[#ffe600] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-200">{item.label}</span>
                    <span className="text-sm">{item.emoji}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Vibe Picker */}
          {step === 2 && (
            <div className="w-full space-y-6">
              <p className="text-sm font-black text-slate-300 uppercase tracking-widest text-center flex items-center justify-center gap-2">
                <button onClick={() => setStep(1)} className="text-[11px] text-[#ffe600] underline font-bold border-none bg-transparent cursor-pointer mr-2">← Back</button>
                Step 2: Choose your travel vibe
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {[
                  { name: "Adventure", label: "Thrills & Trekking", emoji: "🏔️" },
                  { name: "Beach", label: "Sun & Relaxing Sea", emoji: "🏖️" },
                  { name: "Historic", label: "Heritage & Culture", emoji: "🏛️" },
                  { name: "Nightlife", label: "Neon City Nights", emoji: "🏙️" }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleVibeSelect(item.name)}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 hover:scale-[1.03] active:scale-98 cursor-pointer transition-all duration-300 gap-3 text-center"
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-xs font-bold text-slate-200 leading-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Load or Suggest Recommendation */}
          {step === 3 && (
            <div className="w-full flex flex-col items-center justify-center min-h-[220px]">
              {isLoading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-t-[#ffe600] border-white/10 rounded-full animate-spin" />
                  <p className="text-sm text-slate-400 font-bold animate-pulse">Matching your custom vibes...</p>
                </div>
              ) : (
                result && (
                  <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-lg transform scale-100 transition-transform">
                    {/* Destination Image */}
                    <div className="w-full md:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden shrink-0">
                      <img src={result.image} alt={result.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow text-left space-y-3">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#ffe600] bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                        {result.tag}
                      </span>
                      <h4 className="text-lg font-bold font-[Unbounded] text-white leading-snug">
                        {result.title}
                      </h4>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-400 font-bold">
                        <span>🕒 {result.duration}</span>
                        <span>From <strong className="text-white text-sm">{result.price}</strong> / person</span>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => navigate("/booking")}
                          className="group bg-[#f15a22] text-white font-extrabold text-[11px] py-2 px-5 rounded-full hover:bg-orange-600 transition flex items-center gap-1.5 cursor-pointer border-none shadow-md shadow-orange-500/20"
                        >
                          <span>Book This Vibe</span>
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <button
                          onClick={resetQuiz}
                          className="bg-white/10 text-slate-300 font-bold text-[11px] py-2 px-4 rounded-full hover:bg-white/15 transition cursor-pointer border-none"
                        >
                          Start Over
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default TravelStyleQuiz;
