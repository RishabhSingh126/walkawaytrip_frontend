import { useState } from "react";
import TravelCards from "./TravelCards";
import { Star, Mountain, Umbrella, Building2, Gem, Crown, Landmark, Heart, TowerControl } from "lucide-react";

const categories = [
  { name: "For You", icon: <Star size={16} /> },
  { name: "Adventure", icon: <Mountain size={16} /> },
  { name: "Beach", icon: <Umbrella size={16} /> },
  { name: "City Trips", icon: <Building2 size={16} /> },
  { name: "Hidden Gems", icon: <Gem size={16} /> },
  { name: "Luxury", icon: <Crown size={16} /> },
  { name: "Historic & Culture" , icon: <Landmark size={16} /> },
  { name: "Romantic", icon: <Heart size={16} /> },
  { name: "Night Light", icon: <TowerControl size={16} /> },
];

export default function TripListing() {
  const [selectedCategory, setSelectedCategory] = useState("For You");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 font-[Unbounded] text-gray-900">
        Discover Unforgettable Trips
      </h2>
      
      {/* Horizontally scrollable row */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-3 sm:gap-6 pb-2 scrollbar-hide items-center relative z-10">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-bold transition-all duration-300 ${
                selectedCategory === cat.name
                  ? "bg-white text-gray-900 shadow-md border border-gray-100"
                  : "text-gray-500 hover:text-gray-700 bg-transparent"
              }`}
            >
              <span className={selectedCategory === cat.name ? "text-gray-900" : "text-gray-400"}>
                {cat.icon}
              </span>
              {cat.name}
            </button>
          ))}
        </div>
        
        {/* Baseline */}
        <div className="absolute bottom-2 left-0 w-full h-[1px] bg-gray-300" />
      </div>

      <div className="mt-4">
        <TravelCards category={selectedCategory} />
      </div>
    </div>
  );
}

