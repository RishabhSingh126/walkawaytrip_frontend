import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import frameBg from "@/assets/image/Landing/Frame.png";

const reviews = [
  {
    id: 1,
    name: "John Smith",
    role: "Traveler",
    message:
      "I had an amazing experience with this company. The service was top-notch, and the staff was incredibly friendly. I highly recommend them!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Blogger",
    message:
      "Their attention to detail and customer care were outstanding. I would definitely use their service again!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Photographer",
    message:
      "Great experience! Everything was smooth and well-organized. Thank you for an unforgettable time!",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const CustomerReviews = () => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-cover bg-center px-4 md:px-12 py-16 md:py-24"
      style={{ backgroundImage: `url(${frameBg})` }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2a9ab5] mb-8 sm:mb-10 text-center font-[Unbounded]">
        Customer Reviews
      </h2>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={4000} // Slightly slower for better readability
        transitionTime={800} // Smooth transition effect
        className="w-full max-w-2xl"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg"
          >
            <div className="relative w-24 h-24">
              <img
                src={review.image}
                alt={`Profile of ${review.name}`}
                className="rounded-full w-full h-full object-cover border-4 border-blue-500"
              />
              <FaQuoteLeft className="absolute -top-2 -left-2 bg-blue-500 text-white p-1 rounded-full text-lg" />
            </div>
            <p className="text-gray-800 font-medium mt-4 px-4 md:px-6">
              "{review.message}"
            </p>
            <h3 className="mt-3 text-[#2a9ab5] font-semibold text-lg">{review.name}</h3>
            <span className="text-sm text-gray-500">{review.role}</span>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomerReviews;
