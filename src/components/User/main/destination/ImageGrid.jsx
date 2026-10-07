import React from "react";

const imageData = [
  {
    id: 1,
    src: "/images/img1.jpg", // Replace with actual image path
    alt: "Qutub Minar",
    span: "row-span-2 col-span-2", // Large image
  },
  {
    id: 2,
    src: "/images/img2.jpg",
    alt: "Humayun's Tomb",
    span: "col-span-2", // Wide image
  },
  {
    id: 3,
    src: "/images/img3.jpg",
    alt: "Old Delhi Rooftop",
    span: "col-span-1", // Small image
  },
  {
    id: 4,
    src: "/images/img4.jpg",
    alt: "India Gate",
    span: "col-span-1", // Small image
  },
];

export default function ImageGrid() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-3 grid-rows-3 gap-4 md:grid-cols-4 md:grid-rows-2">
        {imageData.map((image) => (
          <div key={image.id} className={`overflow-hidden rounded-lg shadow-md ${image.span}`}>
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
