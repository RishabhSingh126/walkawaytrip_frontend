import React from "react";
import logo1 from "@/assets/image/Home/logo/Component.svg";
import logo2 from "@/assets/image/Home/logo/logo2.svg";
import logo3 from "@/assets/image/Home/logo/logo3.svg";
import logo4 from "@/assets/image/Home/logo/logo4.svg";
import logo5 from "@/assets/image/Home/logo/logo5.svg";

const TravelBrands = () => {
  const logos = [
    { src: logo1, alt: "Booking.com Logo" },
    { src: logo2, alt: "GetYourGuide Logo" },
    { src: logo3, alt: "Viator Logo" },
    { src: logo4, alt: "Beautiful Destinations Logo" },
    { src: logo5, alt: "Skyscanner Logo" },
  ];

  return (
    <section className="py-12 px-4 text-center max-w-6xl mx-auto w-full">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-8 font-[Unbounded] tracking-tight">
        Powered by Trusted Travel Brands
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16 mt-4">
        {logos.map((logo, index) => (
          <div 
            key={index} 
            className="h-10 sm:h-12 flex items-center justify-center transition-all duration-300 hover:scale-105 filter drop-shadow-xs"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-full w-auto object-contain max-h-full opacity-80 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelBrands;
