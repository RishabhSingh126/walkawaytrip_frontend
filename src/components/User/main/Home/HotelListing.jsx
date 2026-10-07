import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const hotels = [
  {
    name: "Vivanta Hotel : Vivanta New Delhi, Dwarka",
    price: "₹17000/Night",
    img: "https://images.trvl-media.com/lodging/9000000/8740000/8738300/8738241/9fdc0ad2.jpg?impolicy=fcrop&w=900&h=675&p=1&q=medium",
    link: "https://www.vivantahotels.com/en-in/hotels/vivanta-new-delhi"
  },
  {
    name: "Delhi : Taj Palace Hotel",
    price: "₹10000/Night",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80",
    link: "https://www.tajhotels.com/en-in/hotels/taj-palace-new-delhi"
  },
  {
    name: "Delhi: ITC Maurya",
    price: "₹10000",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
    link: "https://www.itchotels.com/in/en/itcmaurya-new-delhi"
  },
  {
    name: "Delhi : The Claridges",
    price: "₹10000",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    link: "https://www.claridges.com/the-claridges-new-delhi/rooms.html"
  },
];

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      return saved.some(item => item.title === hotel.name);
    } catch (e) {
      return false;
    }
  });

  const handleToggle = (e) => {
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (isAdded) {
        const updated = saved.filter(item => item.title !== hotel.name);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setIsAdded(false);
      } else {
        const newItem = {
          title: hotel.name,
          image: hotel.img,
          price: hotel.price,
          type: "hotel"
        };
        saved.push(newItem);
        localStorage.setItem("wishlist", JSON.stringify(saved));
        setIsAdded(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = () => {
    navigate("/booking?tab=stays&view=results");
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-t-2xl rounded-b-none overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img
          src={hotel.img}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button
          onClick={handleToggle}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          <Heart size={18} className={isAdded ? "fill-red-500 text-red-500" : ""} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-base font-bold text-gray-800 leading-tight mb-2 line-clamp-2 font-[Unbounded]">
          {hotel.name}
        </h3>

        <div className="mt-auto flex items-baseline gap-1">
          <span className="text-xs text-gray-500 font-medium">
            {hotel.price.includes("Night") ? "Starting from" : "From"}
          </span>
          <span className="text-sm font-bold text-[#1D60C7]">
            {hotel.price.split("/")[0]}
          </span>
          <span className="text-[11px] text-gray-500 font-normal">
            {hotel.price.includes("Night") ? " / Night" : " / person"}
          </span>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="flex flex-row px-0 pb-0 w-full mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/booking?tab=stays&view=results");
          }}
          className="w-full py-2.5 text-[11px] font-semibold bg-[#005fad] text-white hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer tracking-wide rounded-none border-none"
        >
          Book Hotel
        </button>
      </div>
    </div>
  );
};

const HotelListing = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-[Unbounded]">
          Delhi(Famous food point and hotels)
        </h2>
        <button 
          onClick={() => navigate("/hotel")}
          className="bg-gray-500 text-white px-5 py-1.5 rounded-full text-xs font-medium hover:bg-gray-650 hover:shadow-md transition-all cursor-pointer border-none"
        >
          See All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {hotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelListing;
