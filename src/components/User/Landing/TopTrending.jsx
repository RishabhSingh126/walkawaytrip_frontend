import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import image1 from "@/assets/image/Landing/image1.png";
import image2 from "@/assets/image/Landing/image2.png";
import image3 from "@/assets/image/Landing/image3.png";
import image4 from "@/assets/image/Landing/image4.png";

const trendingData = [
  {
    location: "Paris, France",
    title: "Centipede Tour - Guided Arizona Desert Tour by ATV",
    rating: "4.8 (243)",
    duration: "4 days",
    price: "$189.25",
    image: image1,
  },
  {
    location: "New York, USA",
    title: "Molokini and Turtle Town Snorkeling Adventure Aboard",
    rating: "4.8 (243)",
    duration: "4 days",
    price: "$225",
    image: image2,
  },
  {
    location: "London, UK",
    title: "Westminster Walking Tour & Westminster Abbey Entry",
    rating: "4.8 (243)",
    duration: "4 days",
    price: "$943",
    image: image3,
  },
  {
    location: "New York, USA",
    title: "All Inclusive Ultimate Circle Island Day Tour with Lunch",
    rating: "4.8 (243)",
    duration: "4 days",
    price: "$771",
    image: image4,
  },
];


const TopTrending = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:p-6 bg-[#f5f5f5] rounded-2xl mt-8 sm:mt-14">
      <div className="py-4 sm:p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#279ab5] font-[Unbounded]">Top Trending</h2>
          <a href="#" className="text-blue-600 text-sm">
            See all
          </a>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {trendingData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs text-gray-500">{item.location}</p>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.rating}</p>
                  <div className="flex justify-between text-sm mt-2">
                    <span>{item.duration}</span>
                    <span className="font-bold text-gray-900">
                      From {item.price}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopTrending;
