import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";
import { MdArrowBack } from "react-icons/md";
import { 
  Send, Compass, Calendar, DollarSign, Heart, MapPin, Sparkles, 
  Map, CheckSquare, ListTodo, Download, Share2, Plus, Info, 
  Smile, Shield, AlertCircle, RefreshCw, ChevronRight, Eye, Briefcase
} from "lucide-react";
import toast from "react-hot-toast";

// Detailed Database of Mock Itineraries for popular cities
const ITINERARIES_DB = {
  paris: {
    banner: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80",
    tips: [
      "Purchase a Navigo Decouverte card for unlimited transit.",
      "Book Eiffel Tower and Louvre museum tickets at least 1 month in advance.",
      "Most museums are free on the first Sunday of each month."
    ],
    packing: ["Comfortable walking shoes", "Universal adapter", "Light raincoat / umbrella", "Chic casual wear"],
    days: [
      {
        day: 1,
        title: "Iconic Landmarks & River Cruise",
        activities: [
          { time: "09:00 AM", title: "Eiffel Tower Climb", desc: "Start your morning climbing the architectural wonder. View all of Paris from the summit.", cost: "€28" },
          { time: "01:00 PM", title: "Walk along Seine & Lunch", desc: "Enjoy a traditional French galette at a local bistro along the Seine River banks.", cost: "€20" },
          { time: "03:30 PM", title: "Louvre Museum Tour", desc: "Explore masterpieces like Mona Lisa, Venus de Milo, and Winged Victory.", cost: "€22" },
          { time: "08:00 PM", title: "Seine River Cruise", desc: "A scenic night cruise viewing the illuminated monuments and bridges.", cost: "€15" }
        ]
      },
      {
        day: 2,
        title: "Artistic Montmartre & Historic Cafes",
        activities: [
          { time: "10:00 AM", title: "Sacre-Coeur Basilica", desc: "Visit the white basilica on top of Montmartre hill. Capture stunning views of Paris.", cost: "Free" },
          { time: "12:30 PM", title: "Place du Tertre Artists Square", desc: "Watch local street painters work. Enjoy a cafe au lait and croissant nearby.", cost: "€10" },
          { time: "03:00 PM", title: "Palais Garnier Opera House", desc: "Tour the breathtaking baroque opera hall that inspired Phantom of the Opera.", cost: "€15" },
          { time: "07:30 PM", title: "St-Germain-des-Pres Dinner", desc: "Dine at the historical neighborhood where Hemingway and Sartre used to write.", cost: "€35" }
        ]
      },
      {
        day: 3,
        title: "Royal Palace of Versailles",
        activities: [
          { time: "09:00 AM", title: "Versailles Palace & Hall of Mirrors", desc: "Take a train out of town to explore the gold-gilded royal residence of Louis XIV.", cost: "€25" },
          { time: "01:30 PM", title: "Versailles Royal Gardens", desc: "Stroll along the grand fountains, canals, and Marie Antoinette's Hamlet.", cost: "€10" },
          { time: "05:00 PM", title: "Return to Paris & Shopping", desc: "Browse fashion boutiques on Champs-Elysees and stop by the Arc de Triomphe.", cost: "Free" },
          { time: "08:30 PM", title: "Le Marais Dinner Bistro", desc: "Dine at a cozy vintage bistro in the historic Jewish and fashion quarter.", cost: "€30" }
        ]
      }
    ]
  },
  tokyo: {
    banner: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80",
    tips: [
      "Rent a pocket Wi-Fi or eSIM at the airport for navigation.",
      "Get a Suica or Pasmo card for seamless train rides.",
      "Carry a small bag for trash, as street trash bins are rare."
    ],
    packing: ["Slip-on shoes (for temples)", "Hand towel / handkerchief", "Coin purse", "Portable battery bank"],
    days: [
      {
        day: 1,
        title: "Futuristic Shinjuku & Shibuya Crossing",
        activities: [
          { time: "09:30 AM", title: "Meiji Jingu Shrine", desc: "Walk through the massive torii gate into the quiet, serene forest shrine in Shibuya.", cost: "Free" },
          { time: "12:00 PM", title: "Harajuku Takeshita Street", desc: "Browse wacky stores and eat colorful giant cotton candy or sweet crepes.", cost: "¥1,200" },
          { time: "03:00 PM", title: "Shibuya Crossing & Hachiko", desc: "Cross the world's busiest pedestrian intersection and photograph the loyal dog statue.", cost: "Free" },
          { time: "07:00 PM", title: "Shinjuku Omoide Yokocho Dinner", desc: "Eat grilled yakitori skewers inside narrow, nostalgic, lantern-lit alleyways.", cost: "¥3,500" }
        ]
      },
      {
        day: 2,
        title: "Traditional Asakusa & Akihabara Electronics",
        activities: [
          { time: "09:00 AM", title: "Senso-ji Temple", desc: "Tokyo's oldest Buddhist temple. Explore Nakamise shopping street for souvenir snacks.", cost: "Free" },
          { time: "01:00 PM", title: "Ueno Park Lunch", desc: "Enjoy a bento box in the park. Visit the national museum or shrines.", cost: "¥1,500" },
          { time: "03:30 PM", title: "Akihabara Electric Town", desc: "Immerse in anime shops, multi-level retro gaming arcades, and electronics stores.", cost: "Free" },
          { time: "08:00 PM", title: "Tokyo Skytree Night View", desc: "Climb the tallest tower in Japan for a panoramic view of the twinkling Tokyo skyline.", cost: "¥3,100" }
        ]
      },
      {
        day: 3,
        title: "High-Tech Odaiba & TeamLab Art",
        activities: [
          { time: "09:30 AM", title: "teamLab Planets TOKYO", desc: "Walk barefoot through immersive, digital projections and floating flower gardens.", cost: "¥3,800" },
          { time: "01:00 PM", title: "Odaiba Seaside Park", desc: "See the replica Statue of Liberty and giant Gundam Robot. Eat lunch by the bay.", cost: "¥2,000" },
          { time: "04:30 PM", title: "Tsukiji Outer Market Food Tour", desc: "Taste fresh sushi, wagyu skewers, tamagoyaki sweet omelets, and oysters.", cost: "¥4,000" },
          { time: "08:00 PM", title: "Roppongi Hills Observatory", desc: "Fabulous night views of the iconic red Tokyo Tower.", cost: "¥2,200" }
        ]
      }
    ]
  },
  delhi: {
    banner: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80",
    tips: [
      "Use the Delhi Metro (especially the Executive/First Coach for comfort).",
      "Drink only bottled water and eat at reputable outlets.",
      "Wear dress that covers shoulders and knees when visiting religious sites."
    ],
    packing: ["Light cotton clothing", "Sunscreen & Sunglasses", "Hand sanitizer & Wet wipes", "Scarf / shawl"],
    days: [
      {
        day: 1,
        title: "Historical Mughal Wonders",
        activities: [
          { time: "09:30 AM", title: "Red Fort (Lal Qila)", desc: "Tour the massive red sandstone palace walls built by Emperor Shah Jahan.", cost: "₹80" },
          { time: "12:00 PM", title: "Jama Masjid & Chandni Chowk Rikshaw Ride", desc: "Visit India's largest mosque, then ride a rickshaw through bustling ancient spice markets.", cost: "₹300" },
          { time: "02:00 PM", title: "Lunch at Karim's", desc: "Indulge in world-famous authentic Mughal seekh kebabs and butter chicken.", cost: "₹600" },
          { time: "04:30 PM", title: "Raj Ghat", desc: "Pay respects at the serene black marble memorial dedicated to Mahatma Gandhi.", cost: "Free" }
        ]
      },
      {
        day: 2,
        title: "Modern Monuments & Heritage Strolls",
        activities: [
          { time: "09:00 AM", title: "Qutub Minar Complex", desc: "See the world's tallest brick minaret and the ancient rust-proof iron pillar.", cost: "₹40" },
          { time: "12:30 PM", title: "Humayun's Tomb", desc: "A magnificent red-stone garden tomb that inspired the design of the Taj Mahal.", cost: "₹40" },
          { time: "03:30 PM", title: "India Gate & Kartavya Path", desc: "Photograph the archway war memorial and stroll along the government lawns.", cost: "Free" },
          { time: "06:30 PM", title: "Lotus Temple (Bahai House of Worship)", desc: "Experience complete silence inside the stunning white marble flower-shaped temple.", cost: "Free" }
        ]
      },
      {
        day: 3,
        title: "Culinary Haats & Spiritual Temples",
        activities: [
          { time: "09:30 AM", title: "Akshardham Temple", desc: "Explore the massive, intricate temple detailing Indian culture, water shows, and gardens.", cost: "₹250" },
          { time: "02:00 PM", title: "Shopping & Lunch at Dilli Haat", desc: "Shop handmade crafts directly from rural artisans and sample food stalls from every state of India.", cost: "₹100" },
          { time: "05:30 PM", title: "Connaught Place (CP) Walkabout", desc: "Stroll the circular British-era shopping plaza. Stop by a heritage cafe.", cost: "Free" },
          { time: "08:00 PM", title: "Dinner at Bukhara (ITC Maurya)", desc: "Dine at the legendary award-winning restaurant famous for its slow-cooked Dal Bukhara.", cost: "₹4,500" }
        ]
      }
    ]
  }
};

const AiTripPlannerScreen = () => {
  const navigate = useNavigate();

  // Form State
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(3);
  const [vibe, setVibe] = useState("cultural");
  const [budget, setBudget] = useState("moderate");
  const [notes, setNotes] = useState("");

  // Generation flow State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [resultItinerary, setResultItinerary] = useState(null);

  // Result Active Day tab State
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Packing list checklist State
  const [checkedItems, setCheckedItems] = useState({});

  const generationLabels = [
    "🧠 Analyzing travel style & preferences...",
    "🗺️ Mapping coordinates & route logistics...",
    "🏨 Querying top-rated accommodations...",
    "🍽️ Curating local dining & hidden gems...",
    "📅 Structuring daily hourly timeline..."
  ];

  // Run generation animation sequence
  const handleGenerate = (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast.error("Please enter a destination!");
      return;
    }

    setIsGenerating(true);
    setGenerationStep(0);
    setResultItinerary(null);

    // Loop through simulated AI thinking steps
    const interval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev >= generationLabels.length - 1) {
          clearInterval(interval);
          
          // Complete generating
          setTimeout(() => {
            const destKey = destination.trim().toLowerCase();
            let dbMatch = ITINERARIES_DB[destKey];
            
            // If no direct database match, generate a beautiful customized dynamic template!
            if (!dbMatch) {
              dbMatch = generateDynamicItinerary(destination, duration, vibe, budget);
            } else {
              // Adjust days array to match requested duration
              const adjustedDays = dbMatch.days.slice(0, duration);
              dbMatch = { ...dbMatch, days: adjustedDays };
            }

            setResultItinerary({
              destination: destination,
              duration: duration,
              vibe: vibe,
              budget: budget,
              ...dbMatch
            });
            setIsGenerating(false);
            setActiveDayIndex(0);
            setCheckedItems({});
            toast.success(`AI Itinerary for ${destination} generated successfully!`);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  // Helper to build a dynamically populated customized itinerary for custom destinations
  const generateDynamicItinerary = (destName, numDays, travelVibe, budgetLevel) => {
    const formattedDest = destName.charAt(0).toUpperCase() + destName.slice(1);
    
    // Choose banner based on vibe
    const banners = {
      adventure: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1200&auto=format&fit=crop&q=80",
      relaxation: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
      cultural: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&auto=format&fit=crop&q=80",
      family: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&auto=format&fit=crop&q=80",
      romantic: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80"
    };

    const currencySymbol = budgetLevel === "luxury" ? "$$$" : budgetLevel === "moderate" ? "$$" : "$";
    const costFactor = budgetLevel === "luxury" ? 2.5 : budgetLevel === "moderate" ? 1.2 : 0.6;

    const dynamicDays = [];
    for (let d = 1; d <= numDays; d++) {
      let activities = [];
      if (travelVibe === "adventure") {
        activities = [
          { time: "08:30 AM", title: `Outdoor Trek & Scenic Overlook`, desc: `Embark on an early morning wilderness hike up the local valleys of ${formattedDest}. Witness spectacular panoramas.`, cost: `${currencySymbol}${Math.round(25 * costFactor)}` },
          { time: "01:00 PM", title: `Zipline or Rock Climbing Adventure`, desc: `Get an adrenaline rush at the adventure park. Challenge yourself with suspension bridges and cables.`, cost: `${currencySymbol}${Math.round(45 * costFactor)}` },
          { time: "04:30 PM", title: `Explore Hidden Nature Trails`, desc: `Walk through quiet forest trails or paths less frequented by mainstream tourists. Discover hidden waterfalls.`, cost: "Free" },
          { time: "07:30 PM", title: `Hearty Local Campfire Dinner`, desc: `Unwind with rustic wood-fired pizza or grilled local specialities at an energetic trailside diner.`, cost: `${currencySymbol}${Math.round(22 * costFactor)}` }
        ];
      } else if (travelVibe === "relaxation") {
        activities = [
          { time: "09:30 AM", title: `Morning Yoga & Beach Sunrise Walk`, desc: `Start a stress-free day breathing fresh coastal air. Align your body with calming stretches.`, cost: "Free" },
          { time: "11:30 AM", title: `Therapeutic Mineral Spa Treatment`, desc: `Indulge in a signature relaxation massage using organic essential oils and hot stones.`, cost: `${currencySymbol}${Math.round(80 * costFactor)}` },
          { time: "03:00 PM", title: `Botanical Garden Lounge`, desc: `Read your favorite book or sip herbal infusions under the shade of massive tropical palm trees.`, cost: `${currencySymbol}${Math.round(8 * costFactor)}` },
          { time: "07:00 PM", title: `Seafood Dinner by the Waterfront`, desc: `Dine under the stars while listening to ocean waves or soft live jazz music. Enjoy a premium sunset view.`, cost: `${currencySymbol}${Math.round(40 * costFactor)}` }
        ];
      } else {
        // Cultural / Standard vibe
        activities = [
          { time: "09:00 AM", title: `Historic District walking tour`, desc: `Explore ancient architectures, monuments, and stone houses of ${formattedDest} with a local storyteller.`, cost: `${currencySymbol}${Math.round(15 * costFactor)}` },
          { time: "01:00 PM", title: `Old Quarter Artisan Market`, desc: `Browse hundreds of hand-carved ornaments, textiles, and local paintings. Have street snacks.`, cost: `${currencySymbol}${Math.round(10 * costFactor)}` },
          { time: "03:30 PM", title: `Museum of Fine Arts & Archaeology`, desc: `Examine relics, artifacts, and historic paintings tracing back centuries of regional history.`, cost: `${currencySymbol}${Math.round(12 * costFactor)}` },
          { time: "07:30 PM", title: `Traditional Folklore Music Dinner`, desc: `Enjoy authentic recipes handed down generations while watching a local cultural dance performance.`, cost: `${currencySymbol}${Math.round(30 * costFactor)}` }
        ];
      }
      
      dynamicDays.push({
        day: d,
        title: d === 1 ? "Arrival & Essential Highlights" : d === numDays ? "Local Shopping & Departure" : `Hidden Gems & Strolls`,
        activities: activities
      });
    }

    return {
      banner: banners[travelVibe] || banners.cultural,
      tips: [
        `Learn basic greeting phrases in the local language of ${formattedDest}.`,
        `Carry some cash since street vendors or transport networks might not support credit cards.`,
        `Observe local customs regarding gratuity and dress codes.`
      ],
      packing: [`All-weather walking shoes`, `Camera / smartphone`, `Light backpack`, `Local currency cash`],
      days: dynamicDays
    };
  };

  const handleToggleCheck = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleSaveToTrips = () => {
    if (!resultItinerary) return;

    try {
      const savedTrips = JSON.parse(localStorage.getItem("my-trips") || "[]");
      const isAlreadySaved = savedTrips.some(trip => trip.id === resultItinerary.id);
      
      if (!isAlreadySaved) {
        const newTrip = {
          id: `trip-${Date.now()}`,
          title: `Trip to ${resultItinerary.destination}`,
          destination: resultItinerary.destination,
          days: resultItinerary.duration,
          image: resultItinerary.banner,
          cost: resultItinerary.budget === "luxury" ? "₹1,20,000" : resultItinerary.budget === "moderate" ? "₹55,000" : "₹25,000",
          status: "Scheduled"
        };
        savedTrips.push(newTrip);
        localStorage.setItem("my-trips", JSON.stringify(savedTrips));
        toast.success(`Successfully saved to My Trips!`);
      } else {
        toast.success(`Trip already exists in your records!`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save trip.");
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col justify-between font-sans">
      <Navbar />

      {/* Main Wrapper */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1360px] w-full mx-auto flex-grow">
        
        {/* Back navigation */}
        <Link
          to="/booking"
          className="flex items-center gap-2 text-gray-800 font-medium mb-6 hover:text-[#005fad] transition-colors w-fit"
        >
          <MdArrowBack size={18} />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Header Branding */}
        <div className="mb-10 text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 bg-[#005fad]/10 text-[#005fad] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            <Sparkles size={13} /> AI Travel Suite
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none mb-3">
            AI Trip Planner
          </h1>
          <p className="text-gray-500 font-medium text-xs sm:text-sm max-w-xl mx-auto lg:mx-0">
            Generate fully-customized travel schedules, budget plans, maps, and packing checklists in seconds using our intelligent trip matching system.
          </p>
        </div>

        {/* ── CONDITIONAL VIEW 1: Input Setup Form ── */}
        {!resultItinerary && !isGenerating && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form (lg:col-span-7) */}
            <form onSubmit={handleGenerate} className="lg:col-span-7 bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
              
              {/* Destination Input */}
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-[#005fad]" /> Where is your destination?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paris, Tokyo, Delhi, Switzerland..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#005fad] focus:ring-1 focus:ring-[#005fad] font-semibold text-sm transition-all"
                />
              </div>

              {/* Grid: Duration & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Duration Slider / Input */}
                <div className="flex flex-col">
                  <label className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-[#005fad]" /> How many days?
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#005fad] font-semibold text-sm transition-all cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? "Day" : "Days"}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Selection */}
                <div className="flex flex-col">
                  <label className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <DollarSign size={16} className="text-[#005fad]" /> Select Budget
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "economy", label: "Economy" },
                      { id: "moderate", label: "Moderate" },
                      { id: "luxury", label: "Luxury" }
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBudget(b.id)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          budget === b.id
                            ? "bg-[#005fad] border-[#005fad] text-white shadow-sm"
                            : "border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Travel Vibe/Style selection */}
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Compass size={16} className="text-[#005fad]" /> Select Travel Style (Vibe)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: "cultural", label: "Cultural" },
                    { id: "relaxation", label: "Relaxation" },
                    { id: "adventure", label: "Adventure" },
                    { id: "romantic", label: "Romantic" },
                    { id: "family", label: "Family" }
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVibe(v.id)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        vibe === v.id
                          ? "bg-[#005fad] border-[#005fad] text-white shadow-sm"
                          : "border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Notes */}
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Briefcase size={16} className="text-[#005fad]" /> Special Interests / Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Vegetarian restaurants, historical focus, family friendly, wheelchair accessible..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#005fad] focus:ring-1 focus:ring-[#005fad] font-semibold text-sm transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#005fad] hover:bg-blue-800 text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 text-sm shadow-md transition-all cursor-pointer active:scale-[0.98] mt-2"
              >
                <Sparkles size={16} /> Generate AI Itinerary
              </button>

            </form>

            {/* Right Preview Card (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#005fad]/90 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full min-h-[420px]">
              <div>
                <h3 className="text-xl sm:text-2xl font-black mb-4 tracking-tight leading-snug">
                  Unleash the Power of AI
                </h3>
                <p className="text-white/80 font-medium text-xs sm:text-sm leading-relaxed mb-6">
                  BuildAI algorithms evaluate historical records, user reviews, weather data, and location maps to generate optimal travel paths.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    { title: "Smart Scheduling", desc: "Optimized hourly blocks preventing timing clashes." },
                    { title: "Budget breakdown", desc: "Realistic spending estimations scaled to preferences." },
                    { title: "Pre-made checklists", desc: "Tailored packing and travel tips curated instantly." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="bg-white/10 p-1.5 rounded-lg text-white">
                        <CheckSquare size={16} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs tracking-wide">{item.title}</h4>
                        <p className="text-white/60 text-[11px] font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/15 pt-6 mt-8 flex items-center gap-3">
                <Shield size={20} className="text-[#0093CB]" />
                <span className="text-[10px] font-bold text-white/50 tracking-wide uppercase leading-tight">
                  Secure &bull; Ads Free &bull; BuildAI.space Engine
                </span>
              </div>
            </div>

          </div>
        )}

        {/* ── CONDITIONAL VIEW 2: Generation Loading Sequence ── */}
        {isGenerating && (
          <div className="bg-white border border-gray-150 rounded-2xl p-8 sm:p-12 shadow-sm max-w-xl mx-auto text-center flex flex-col items-center justify-center min-h-[350px]">
            <div className="relative w-20 h-20 mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-[#005fad]/10 border-t-[#005fad] animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-[#0093CB]/10 border-b-[#0093CB] animate-spin [animation-direction:reverse]" />
            </div>

            <h3 className="font-black text-gray-900 text-lg sm:text-xl tracking-tight mb-2">
              Generating your Itinerary...
            </h3>
            <p className="text-gray-500 font-bold text-xs tracking-wide uppercase transition-all duration-300">
              {generationLabels[generationStep]}
            </p>

            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-6 overflow-hidden max-w-[280px] mx-auto">
              <div 
                className="bg-[#005fad] h-full transition-all duration-500 rounded-full"
                style={{ width: `${((generationStep + 1) / generationLabels.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ── CONDITIONAL VIEW 3: Itinerary Results Output Page ── */}
        {resultItinerary && (
          <div className="flex flex-col gap-8">
            
            {/* Actions Bar */}
            <div className="flex flex-wrap gap-3 items-center justify-between border-b border-gray-200/80 pb-4">
              <button
                onClick={() => setResultItinerary(null)}
                className="flex items-center gap-2 text-gray-600 font-bold hover:text-gray-900 text-xs sm:text-sm cursor-pointer"
              >
                <RefreshCw size={15} /> Plan another trip
              </button>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveToTrips}
                  className="bg-[#005fad] hover:bg-blue-800 text-white font-extrabold text-xs py-2 px-5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Plus size={14} /> Save to My Trips
                </button>
                <button
                  onClick={() => toast.success("Itinerary PDF download initiated!")}
                  className="border border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Download size={14} /> PDF
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="border border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>

            {/* Banner Section */}
            <div className="relative h-[220px] sm:h-[300px] rounded-2xl overflow-hidden shadow-sm">
              <img
                src={resultItinerary.banner}
                alt={resultItinerary.destination}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <div>
                  <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tight leading-none mb-2">
                    {resultItinerary.destination.toUpperCase()} ITINERARY
                  </h2>
                  <div className="flex flex-wrap gap-2 text-white/90 text-xs font-semibold">
                    <span className="bg-white/25 rounded-md px-2.5 py-0.5">{resultItinerary.duration} Days</span>
                    <span className="bg-white/25 rounded-md px-2.5 py-0.5 capitalize">{resultItinerary.vibe} vibe</span>
                    <span className="bg-white/25 rounded-md px-2.5 py-0.5 capitalize">{resultItinerary.budget} budget</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Screen Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Daily timeline grid (lg:col-span-8) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Day selector tabs */}
                <div className="flex overflow-x-auto gap-2 border-b border-gray-200 pb-3 scrollbar-hide">
                  {resultItinerary.days.map((d, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveDayIndex(index)}
                      className={`px-5 py-2.5 text-xs sm:text-sm font-black border rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                        activeDayIndex === index
                          ? "border-[#005fad] bg-[#005fad] text-white shadow-sm"
                          : "border-gray-200 text-gray-400 hover:text-gray-700 bg-white"
                      }`}
                    >
                      Day {d.day}
                    </button>
                  ))}
                </div>

                {/* Active day timeline */}
                <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight leading-snug">
                      Day {resultItinerary.days[activeDayIndex].day}: {resultItinerary.days[activeDayIndex].title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-6 relative pl-3 sm:pl-4">
                    {/* Vertical line timeline */}
                    <div className="absolute left-4 top-2 bottom-6 w-[2px] border-l-2 border-dashed border-[#005fad]/20" />

                    {resultItinerary.days[activeDayIndex].activities.map((act, index) => (
                      <div key={index} className="flex gap-4 relative">
                        {/* Circle bullet */}
                        <div className="absolute left-[-1.125rem] top-1.5 w-3.5 h-3.5 bg-white border-2 border-[#005fad] rounded-full z-10" />
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <span className="text-[#005fad] font-black text-xs uppercase tracking-wider">
                              {act.time}
                            </span>
                            <span className="text-[11px] font-bold text-gray-400 px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md">
                              Est. Cost: {act.cost}
                            </span>
                          </div>
                          
                          <h4 className="font-extrabold text-sm sm:text-base text-gray-900 tracking-tight leading-snug mt-1 mb-1.5">
                            {act.title}
                          </h4>
                          
                          <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed max-w-[650px]">
                            {act.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar Checklist/Tips (lg:col-span-4) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Travel tips */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-black text-gray-900 text-xs sm:text-sm tracking-wide uppercase border-b border-gray-100 pb-2.5 mb-3.5 flex items-center gap-2">
                    <Info size={16} className="text-[#005fad]" /> Smart Travel Tips
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {resultItinerary.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-gray-600 leading-relaxed">
                        <Smile size={14} className="text-[#0093CB] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Packing checklist */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-black text-gray-900 text-xs sm:text-sm tracking-wide uppercase border-b border-gray-100 pb-2.5 mb-3.5 flex items-center gap-2">
                    <ListTodo size={16} className="text-[#005fad]" /> Packing Checklist
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {resultItinerary.packing.map((item, idx) => {
                      const itemKey = `${resultItinerary.destination}-${item}`;
                      const isChecked = !!checkedItems[itemKey];
                      return (
                        <li key={idx}>
                          <button
                            onClick={() => handleToggleCheck(itemKey)}
                            className="flex items-center gap-2.5 text-left w-full cursor-pointer text-xs font-bold text-gray-600 hover:text-gray-900"
                          >
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                              isChecked
                                ? "bg-[#005fad] border-[#005fad] text-white"
                                : "border-gray-300 bg-white"
                            }`}>
                              {isChecked && "✓"}
                            </div>
                            <span className={isChecked ? "line-through text-gray-400 font-medium" : ""}>
                              {item}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default AiTripPlannerScreen;
