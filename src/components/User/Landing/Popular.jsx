import React from "react";
import hot from "@/assets/image/Landing/image.png";

import image1 from "@/assets/image/Landing/image1.png";
import image2 from "@/assets/image/Landing/image2.png";
import image3 from "@/assets/image/Landing/image3.png";
import image4 from "@/assets/image/Landing/image4.png";
import image5 from "@/assets/image/Landing/image5.png";
import image6 from "@/assets/image/Landing/image6.png";
import image7 from "@/assets/image/Landing/image7.png";
import image8 from "@/assets/image/Landing/image8.png";

const tours = [
  { id: 1, image: image1, location: "Paris, France", title: "Centipede Tour - Guided Arizona Desert Tour by ATV", rating: "4.8 (243)", duration: "4 days", price: "$189.25" },
  { id: 2, image: image2, location: "New York, USA", title: "Molokini and Turtle Town Snorkeling Adventure Aboard", rating: "4.8 (243)", duration: "4 days", price: "$225" },
  { id: 3, image: image3, location: "London, UK", title: "Westminster Walking Tour & Westminster Abbey Entry", rating: "4.8 (243)", duration: "4 days", price: "$943" },
  { id: 4, image: image4, location: "New York, USA", title: "All Inclusive Ultimate Circle Island Day Tour with Lunch", rating: "4.8 (243)", duration: "4 days", price: "$771" },
  { id: 5, image: image5, location: "Paris, France", title: "Space Center Houston Admission Ticket", rating: "4.8 (243)", duration: "4 days", price: "$189.25" },
  { id: 6, image: image6, location: "New York, USA", title: "Clear Kayak Tour of Shell Key Preserve and Tampa Bay Area", rating: "4.8 (243)", duration: "4 days", price: "$225" },
  { id: 7, image: image7, location: "London, UK", title: "History and Hauntings of Salem Guided Walking Tour", rating: "4.8 (243)", duration: "4 days", price: "$943" },
  { id: 8, image: image8, location: "New York, USA", title: "Mauna Kea Summit Sunset and Stars Free Astro Photos", rating: "4.8 (243)", duration: "4 days", price: "$771" },
];


const Popular = () => {
  return (
    <div>
      <section className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-14 mt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#279ab5] font-[Unbounded]">
            Find Popular Tours
          </h2>
          <a href="#" className="text-blue-500 hover:underline">
            See all
          </a>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white shadow-lg border-[#e7e6e6] rounded-lg overflow-hidden"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover p-3"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500">{tour.location}</p>
                <h3 className="text-[15.88px] font-semibold mt-1 text-[#07083d]">{tour.title}</h3>
                <p className="text-sm text-gray-500 text-center mb-4">{tour.rating}</p>
                <hr />
                <div className="flex justify-between items-center mt-3">
                  <p className="text-gray-500 text-sm">{tour.duration}</p>
                  <p className="font-bold text-gray-800">From {tour.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="flex flex-col md:flex-row items-center bg-[#fef6f2] rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto mt-8">
        {/* Left Section */}
        <div className="md:w-1/2 p-6 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Grab up to <span className="text-[#005ead]">35% off</span>
            <br /> on your favorite{" "}
            <span className="text-gray-900">Destination</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Limited time offer, don't miss the opportunity
          </p>
          <button className="mt-4 bg-[#005ead] text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>

        {/* Right Section (Image) */}
        <div className="md:w-1/2 w-full flex justify-center mt-6 md:mt-0">
          <img
            src={hot}
            alt="Travel Destination"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Popular;
