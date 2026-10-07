import React from "react";
import ticket from "@/assets/image/landing/ticket.svg";
import balloon from "@/assets/image/landing/hot-air-balloon.svg";
import gem from "@/assets/image/landing/diamond.svg";
import award from "@/assets/image/landing/medal.svg";

const features = [
  {
    icon: ticket,
    title: "Ultimate Flexibility",
    description:
      "You're in control, with free cancellation and payment options to satisfy any plan or budget.",
  },
  {
    icon: balloon,
    title: "Memorable Experiences",
    description:
      "Browse and book tours and activities so incredible, you'll want to tell your friends.",
  },
  {
    icon: gem,
    title: "Quality at Our Core",
    description:
      "High-quality standards. Millions of reviews. A tourz company.",
  },
  {
    icon: award,
    title: "Award-Winning Support",
    description: "New price? New plan? No problem. We're here to help, 24/7.",
  },
];

const Features = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white text-center max-w-7xl mx-auto">
      <header className="text-left mb-12">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-[#279ab5] font-[Unbounded]">
          Why Choose WalkAwayTrip
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <article key={index} className="flex flex-col items-center text-center">
            <img src={feature.icon} alt={feature.title} className="w-14 h-14" />
            <h3 className="text-xl font-semibold mt-5 font-[Unbounded]">{feature.title}</h3>
            <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Features;
