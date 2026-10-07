import React from "react";

const categories = [
  {
    title: "Cruises",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=600",
    size: "col-span-1 row-span-1"
  },
  {
    title: "Beach Tours",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    size: "col-span-1 md:row-span-2"
  },
  {
    title: "City Tours",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=600",
    size: "col-span-2 md:col-span-2"
  },
  {
    title: "Museum Tour",
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&q=80&w=600",
    size: "col-span-1"
  },
  {
    title: "Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    size: "col-span-1"
  },
  {
    title: "Hiking",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
    size: "col-span-1"
  },
];

const BentoGrid = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mt-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#279ab5] font-[Unbounded] tracking-tight">
            Popular things to do
          </h2>
          <div className="h-1 w-12 bg-[#279ab5] mt-2 rounded-full"></div>
        </div>
        <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-full">
          See all
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[minmax(100px,_1fr)] md:auto-rows-[minmax(130px,_1fr)]">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl ${item.size} group shadow-sm hover:shadow-xl transition-all duration-500`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 md:p-6 opacity-90 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-base md:text-xl font-bold tracking-wide">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoGrid;
