import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Heart, Search, ArrowRight } from "lucide-react";

const TravelCard = ({ destination }) => {
  const [isAdded, setIsAdded] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      return saved.some(item => item.title === destination.title);
    } catch (e) {
      return false;
    }
  });
  const navigate = useNavigate();

  const handleToggle = (e) => {
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (isAdded) {
        const updated = saved.filter(item => item.title !== destination.title);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setIsAdded(false);
      } else {
        const newItem = {
          title: destination.title,
          image: destination.image,
          price: destination.price,
          duration: destination.duration,
          locations: destination.locations,
          type: "destination"
        };
        saved.push(newItem);
        localStorage.setItem("wishlist", JSON.stringify(saved));
        setIsAdded(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={() => navigate(`/destination/${destination.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, { state: { destination } })}
      className="group bg-white rounded-t-2xl rounded-b-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button
          onClick={handleToggle}
          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all cursor-pointer z-10"
        >
          <Heart size={18} className={isAdded ? "fill-red-500 text-red-500" : ""} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium mb-3">
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-[#005fad]" />
            {destination.duration}
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-[#005fad]" />
            {destination.locations}
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-800 leading-snug mb-3 line-clamp-2 min-h-[40px] font-[Unbounded]">
          {destination.title}
        </h3>

        <div className="mt-auto flex items-baseline gap-1">
          <span className="text-xs text-gray-500 font-medium">From</span>
          <span className="text-sm font-bold text-[#1D60C7]">
            {destination.price}
          </span>
          <span className="text-[10px] text-gray-500 font-normal">/ person</span>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-row gap-2 px-2 pb-4 pt-1 w-full mt-auto">
        <button
          onClick={handleToggle}
          className={`w-1/2 py-2 text-[10px] sm:text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 rounded-md border-none whitespace-nowrap ${isAdded
            ? "bg-[#E86B62] text-white"
            : "bg-[#E8F1FC] text-[#1D60C7] hover:bg-[#d5e6f9]"
            }`}
        >
          {isAdded ? "♥ Added" : "Add to Wishlist"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/destination/${destination.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, { state: { destination } });
          }}
          className="w-1/2 py-2 text-[10px] sm:text-xs font-bold bg-[#1D60C7] text-white hover:bg-[#154ba1] transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 rounded-md border-none whitespace-nowrap"
        >
          Book Trip <span className="text-[11px] font-bold leading-none">&gt;</span>
        </button>
      </div>
    </div>
  );
};

const TravelSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchTerm)}&count=5&language=en&format=json`);
        const data = await response.json();
        if (data.results) {
          const uniqueCities = Array.from(new Set(data.results.map(item => `${item.name}, ${item.country}`)));
          setSuggestions(uniqueCities);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(fetchCities, 400);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const destinations = [
    {
      title: "Thailand: From Bustling Bangkok to Serene Shores",
      duration: "13 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=375,height=375,dpr=2/tour_img/9b0616bc785ca63fae37ebcb363c1fe6b326162b7d10c79aee732e8ea61d6591.jpg",
    },
    {
      title: "Lucknow: Flourished as a North Indian cultural",
      duration: "8 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://c.ndtvimg.com/gws/ms/6-fascinating-facts-about-delhi-every-traveller-should-know/assets/5.jpeg?1759225428",
    },
    {
      title: "Delhi: A historic capital city and cultural treasure trove",
      duration: "5 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://images.pexels.com/photos/9371002/pexels-photo-9371002.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Mumbai : Beaches, cinemas, studios, holy places, amusement parks and historical monuments",
      duration: "6 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://www.pelago.com/img/products/IN-India/world-heritage-monuments-of-delhi-premium-private-tour/b6b390db-939f-4197-9a25-a91889f34d85_world-heritage-monuments-of-delhi-premium-private-tour-xlarge.jpg",
    },
  ];

  return (
    <section className="container mx-auto p-4 max-w-6xl py-4 md:py-12 relative">
      {/* Top Section See All - Moved Higher */}
      <div className="absolute top-0 right-4 md:right-0">
        <button 
          onClick={() => navigate("/booking")}
          className="bg-gray-500 text-white px-5 py-1.5 rounded-full text-xs font-medium hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-300 transition-all duration-300 cursor-pointer"
        >
          See All
        </button>
      </div>

      {/* Discovery Section */}
      <div className="mt-8 mb-12 md:mb-16 px-1">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 font-[Unbounded] mb-6 md:mb-8 text-left">
          Discover Famous places in your trip
        </h2>
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl sm:max-w-3xl group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <div className="bg-[#005fad]/10 p-2 rounded-full text-[#005fad] group-focus-within:bg-[#005fad] group-focus-within:text-white transition-colors duration-300">
                <Search className="h-5 w-5" />
              </div>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="Where do you want to go? (e.g. Paris, Tokyo...)"
              className="block w-full pl-16 pr-6 py-4 sm:py-5 border-2 border-transparent bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full text-base placeholder:text-gray-400 focus:outline-none focus:border-[#005fad]/30 focus:shadow-[0_8px_30px_rgb(0,95,173,0.15)] transition-all font-medium relative z-10 text-gray-700"
            />
            {showDropdown && (searchTerm.length >= 2) && (
              <ul className="absolute z-20 w-[95%] left-1/2 -translate-x-1/2 bg-white border border-gray-100 mt-2 shadow-2xl max-h-72 overflow-auto text-left rounded-2xl py-2 scrollbar-thin scrollbar-thumb-gray-200">
                {isSearching ? (
                  <li className="px-6 py-4 text-sm text-gray-500 flex items-center gap-3">
                    <div className="animate-spin h-4 w-4 border-2 border-[#005fad] border-t-transparent rounded-full"></div>
                    Searching destinations...
                  </li>
                ) : suggestions.length > 0 ? (
                  suggestions.map((suggestion, idx) => (
                    <li
                      key={idx}
                      onMouseDown={() => {
                        setSearchTerm(suggestion);
                        setShowDropdown(false);
                      }}
                      className="px-6 py-3 text-sm text-gray-700 hover:bg-[#005fad]/5 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-none font-medium"
                    >
                      <div className="bg-gray-100 p-1.5 rounded-full text-gray-500">
                        <MapPin size={16} />
                      </div>
                      {suggestion}
                    </li>
                  ))
                ) : (
                  <li className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
                    <Search size={16} className="text-gray-400" />
                    No places found. Try a different spelling.
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-[Unbounded] text-left">
          Delhi(Famous places to explore)
        </h2>
        <button 
          onClick={() => navigate("/booking")}
          className="bg-gray-500 text-white px-5 py-1.5 rounded-full text-xs font-medium hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-300 transition-all duration-300 cursor-pointer"
        >
          See All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinations.map((destination, index) => (
          <TravelCard key={index} destination={destination} />
        ))}
      </div>
    </section>
  );
};

export default TravelSection;
