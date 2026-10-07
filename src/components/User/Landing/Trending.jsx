import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import Paris from "@/assets/image/Landing/Paris.png";
import Singapore from "@/assets/image/Landing/Singapore.png";
import Roma from "@/assets/image/Landing/Roma.png";
import Bangkok from "@/assets/image/Landing/Bangkok.png";
import Bali from "@/assets/image/Landing/Bali.png";
import Phuket from "@/assets/image/Landing/Phuket.png";
import Tokyo from "@/assets/image/Landing/Tokyo.png";
import Cappadocia from "@/assets/image/Landing/Cappadocia.png";

const destinations = [
  { name: "Paris", tours: "100+", image: Paris },
  { name: "Singapore", tours: "300+", image: Singapore },
  { name: "Roma", tours: "400+", image: Roma },
  { name: "Bangkok", tours: "100+", image: Bangkok },
  { name: "Bali", tours: "600+", image: Bali },
  { name: "Phuket", tours: "200+", image: Phuket },
  { name: "Tokyo", tours: "700+", image: Tokyo },
  { name: "Cappadocia", tours: "900+", image: Cappadocia },
];

const Trending = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#279ab5] font-[Unbounded]">
          Trending destinations
        </h2>
        <a href="#" className="text-sm text-gray-500 hover:underline">
          See all
        </a>
      </div>

      {/* Swiper */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1.5}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        className="mt-6"
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center">
              {/* Circular Image */}
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 overflow-hidden rounded-full shadow-lg flex items-center justify-center">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Text */}
              <p className="mt-2 font-semibold text-center">{destination.name}</p>
              <p className="text-gray-500 text-sm text-center">{destination.tours} Tours</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Animated Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {destinations.map((_, index) => (
          <motion.span
            key={index}
            className={`w-2 h-2 rounded-full transition-all`}
            animate={{
              backgroundColor: activeIndex === index ? "#279ab5" : "#D1D5DB", // Blue for active, Gray for inactive
              scale: activeIndex === index ? 1.5 : 1,
              opacity: activeIndex === index ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Trending;
