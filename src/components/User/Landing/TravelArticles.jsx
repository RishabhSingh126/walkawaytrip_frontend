import React from "react";

import t1 from "@/assets/image/Landing/t1.png";
import t2 from "@/assets/image/Landing/t2.png";
import t3 from "@/assets/image/Landing/t3.png";

const articles = [
  {
    id: 1,
    title: "Kenya vs Tanzania Safari: The Better African Safari Experience",
    date: "April 06 2023",
    author: "Ali Tufan",
    image: t1,
    tag: "Trips",
  },
  {
    id: 2,
    title: "Exploring the Serengeti: A Wildlife Adventure",
    date: "April 07 2023",
    author: "Emily Johnson",
    image: t2,
    tag: "Trips",
  },
  {
    id: 3,
    title: "Into the Wild: An Unforgettable Safari Journey",
    date: "April 08 2023",
    author: "Maxwell Rhodes",
    image: t3,
    tag: "Trips",
  },
];

const TravelArticles = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#2a99b5]">Travel Articles</h2>
        <a href="#" className="text-blue-500 hover:underline text-sm">See all</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <span className="absolute top-2 left-2 bg-[#ffffff] text-xs px-2 py-1 rounded-full">
                {article.tag}
              </span>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">
                {article.date} &nbsp; | &nbsp; By {article.author}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{article.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelArticles;