import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Heart } from "lucide-react";

const destinationsByCategory = {
  "For You": [
    {
      title: "Thailand: From Bustling Bangkok to Serene Shores",
      duration: "13 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://cdn.dev.beautifuldestinations.app/004803c9-d1fe-4e0e-a617-10d7fbab0c29/originalThumbnail.jpg",
    },
    {
      title: "Lucknow: Flourished as a North Indian cultural",
      duration: "5 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://images.pexels.com/photos/21369811/pexels-photo-21369811/free-photo-of-chota-imambara-in-lakhnau-in-india.jpeg",
    },
    {
      title: "Delhi: A historic capital city and cultural treasure trove",
      duration: "6 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://images.pexels.com/photos/9371002/pexels-photo-9371002.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Mumbai: Beaches, cinemas, studios, and historical monuments",
      duration: "6 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://imgmediagumlet.lbb.in/media/2025/01/6780cf6b7f78be4023ad3e82_1736494955072.jpg",
    },
    {
      title: "Thailand: From Bustling Bangkok to Serene Shores",
      duration: "13 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://images.pexels.com/photos/25025516/pexels-photo-25025516/free-photo-of-back-view-of-a-motorcyclist-standing-in-the-middle-of-the-road-with-his-arms-spread.jpeg",
    },
    {
      title: "Agra: Taj Mahal Historical places in India, 7 wonders",
      duration: "6 Days",
      locations: "5 Locations",
      price: "₹5000",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqbWFoYWx8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Delhi: A historic capital city and cultural treasure trove",
      duration: "6 Days",
      locations: "5 Locations",
      price: "₹5000",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ef/9d/06/caption.jpg?w=1200&h=-1&s=1",
    },
    {
      title: "Mumbai: Beaches, cinemas, studios, and historical monuments",
      duration: "6 Days",
      locations: "5 Locations",
      price: "₹10000",
      image: "https://images.pexels.com/photos/5868644/pexels-photo-5868644.jpeg?cs=srgb&dl=pexels-imadclicks-5868644.jpg&fm=jpg",
    },
  ],
  "Adventure": [
    {
      title: "Rishikesh: River Rafting & Bungee Jumping Thrills",
      duration: "4 Days",
      locations: "3 Locations",
      price: "₹7,500",
      image: "https://images.unsplash.com/photo-1683318528842-bd5f1fd0ff9a?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Ladakh: High Mountain Pass Bike Expedition",
      duration: "9 Days",
      locations: "6 Locations",
      price: "₹24,000",
      image: "https://images.unsplash.com/photo-1593118845043-359e5f628214?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Cappadocia: Hot Air Balloon Flight & Cave Exploring",
      duration: "5 Days",
      locations: "4 Locations",
      price: "₹18,500",
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Dubai: Desert Safari & Sand Dune Dune-Bashing",
      duration: "3 Days",
      locations: "2 Locations",
      price: "₹12,000",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    }
  ],
  "Beach": [
    {
      title: "Maldives: Luxury Overwater Villa & Coral Snorkeling",
      duration: "6 Days",
      locations: "3 Locations",
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Bali: Pristine Beaches & Exotic Sea Temples",
      duration: "8 Days",
      locations: "6 Locations",
      price: "₹28,000",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Phuket: Island Hopping & Sunset Beach Cruises",
      duration: "7 Days",
      locations: "4 Locations",
      price: "₹19,500",
      image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Mauritius: Private Island Escapes & Crystal Waters",
      duration: "6 Days",
      locations: "4 Locations",
      price: "₹38,000",
      image: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=600&auto=format&fit=crop&q=80",
    }
  ],
  "City Trips": [
    {
      title: "Tokyo: Neon Streets, Tech Districts & Ancient Shrines",
      duration: "7 Days",
      locations: "8 Locations",
      price: "₹52,000",
      image: "https://images.unsplash.com/photo-1613488328514-e424950c0b0d?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "New York City: Broadway Shows & Central Park Strolls",
      duration: "6 Days",
      locations: "10 Locations",
      price: "₹65,000",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "London: Historic Palaces, Museums & River Cruises",
      duration: "6 Days",
      locations: "7 Locations",
      price: "₹48,000",
      image: "https://images.unsplash.com/photo-1758901433276-e9eba4ed0331?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Singapore: Gardens by the Bay & Marina Bay Skyline",
      duration: "4 Days",
      locations: "5 Locations",
      price: "₹22,000",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=80",
    }
  ],
  "Hidden Gems": [
    {
      title: "Spiti Valley: Secluded Monasteries & High Altitude Lakes",
      duration: "8 Days",
      locations: "6 Locations",
      price: "₹16,500",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Meghalaya: Living Root Bridges & Mystical Caves",
      duration: "6 Days",
      locations: "4 Locations",
      price: "₹14,000",
      image: "https://images.unsplash.com/photo-1593813738953-fb3c93e0769d?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Hallstatt: Fairytale Alpine Village by the Lake",
      duration: "4 Days",
      locations: "3 Locations",
      price: "₹21,000",
      image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Faroe Islands: Dramatic Cliffs & Waterfall Viewpoints",
      duration: "7 Days",
      locations: "5 Locations",
      price: "₹42,500",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80",
    }
  ],
  "Luxury": [
    {
      title: "Bora Bora: Private Lagoon Villa & Luxury Yacht Tour",
      duration: "6 Days",
      locations: "4 Locations",
      price: "₹1,20,000",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Udaipur: Grand Palace Stay & Lakeside Royal Dining",
      duration: "4 Days",
      locations: "3 Locations",
      price: "₹38,000",
      image: "https://plus.unsplash.com/premium_photo-1661963369594-9b25cd53be4d?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Monaco: High-End French Riviera Coast Yachting",
      duration: "5 Days",
      locations: "5 Locations",
      price: "₹1,45,000",
      image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Dubai: Ultimate 7-star Hotel & Skyscraper Escapes",
      duration: "5 Days",
      locations: "4 Locations",
      price: "₹95,000",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80",
    }
  ],
  "Historic & Culture": [
    {
      title: "Rome: The Mighty Colosseum & Historic Vatican Tour",
      duration: "6 Days",
      locations: "8 Locations",
      price: "₹32,000",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Kyoto: Golden Pavilion Temples & Traditional Geisha Walks",
      duration: "6 Days",
      locations: "7 Locations",
      price: "₹41,000",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Agra: Majestic Taj Mahal History & Mughal Forts",
      duration: "3 Days",
      locations: "3 Locations",
      price: "₹5,000",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Athens: Ruins of Acropolis & Classical Greek Monuments",
      duration: "5 Days",
      locations: "6 Locations",
      price: "₹28,500",
      image: "https://images.unsplash.com/photo-1503152394-c571994fd383?w=600&auto=format&fit=crop&q=80",
    }
  ],
  "Romantic": [
    {
      title: "Paris: Eiffel Tower Sunset Views & Seine Dinner Cruise",
      duration: "5 Days",
      locations: "4 Locations",
      price: "₹55,000",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Venice: Gondola Rides on Canal Grande & Historic Palaces",
      duration: "4 Days",
      locations: "3 Locations",
      price: "₹34,000",
      image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Santorini: Whitewashed Villas & World-Famous Sunsets",
      duration: "5 Days",
      locations: "3 Locations",
      price: "₹42,000",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Maldives: Couples Secluded Beachfront Ocean Dinner",
      duration: "5 Days",
      locations: "2 Locations",
      price: "₹65,000",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format&fit=crop&q=80",
    }
  ],
  "Night Light": [
    {
      title: "Las Vegas: Casino Strips, Neon Lights & Live Shows",
      duration: "5 Days",
      locations: "5 Locations",
      price: "₹39,000",
      image: "https://plus.unsplash.com/premium_photo-1671132512859-f50459af3812?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Shibuya: Neon-Lit Shibuya Crossing Night Walk",
      duration: "4 Days",
      locations: "4 Locations",
      price: "₹26,000",
      image: "https://images.unsplash.com/photo-1555397430-57791c75748a?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Hong Kong: Symphony of Lights Harbor Night Cruise",
      duration: "4 Days",
      locations: "4 Locations",
      price: "₹21,500",
      image: "https://images.unsplash.com/photo-1506970845246-18f21d533b20?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Ibiza: Nightclub Beach Parties & Sunsets",
      duration: "6 Days",
      locations: "3 Locations",
      price: "₹35,000",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    }
  ]
};

const DestinationCard = ({ destination }) => {
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

  const handleBook = (e) => {
    e.stopPropagation();
    navigate(getDetailsRoute(), { state: { destination } });
  };

  const getDetailsRoute = () => {
    const titleLower = destination.title.toLowerCase();
    return `/destination/${titleLower.replace(/[^a-z0-9]+/g, "-")}`;
  };

  return (
    <div
      onClick={() => navigate(getDetailsRoute(), { state: { destination } })}
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

        <h3 className="text-sm sm:text-base font-bold text-gray-800 leading-snug mb-3 line-clamp-2 font-[Unbounded]">
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
          onClick={handleBook}
          className="w-1/2 py-2 text-[10px] sm:text-xs font-bold bg-[#1D60C7] text-white hover:bg-[#154ba1] transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 rounded-md border-none whitespace-nowrap"
        >
          Book Trip <span className="text-[11px] font-bold leading-none">&gt;</span>
        </button>
      </div>
    </div>
  );
};

const TravelCards = ({ category }) => {
  const list = destinationsByCategory[category] || destinationsByCategory["For You"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((destination, index) => (
          <DestinationCard key={index} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default TravelCards;
