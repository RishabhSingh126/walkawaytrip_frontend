import React from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";
import Testimonial from "@/components/User/main/Home/Testimonials";
import TravelPlanner from "@/components/User/main/Home/TravelPlanner";

const AboutPolicies = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div>
        <Navbar transparent />

        {/* Hero Image with text overlays */}
        <div className="w-full relative">
          <img
            src="/images/Container (1).svg"
            alt="About Travel"
            className="w-full h-auto block"
            style={{
              width: "100%",
              aspectRatio: "1920 / 901",
              objectFit: "cover",
              opacity: 1,
            }}
          />

          {/* "About Travel" heading — top: 228/901 = 25.3%, left: 712/1920 = 37.1%, width: 496/1920 = 25.8% */}
          <div
            className="absolute text-white text-center"
            style={{
              top: "25.3%",
              left: "37.1%",
              width: "25.8%",
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4.17vw, 80px)",
              lineHeight: "1",
              letterSpacing: "-0.96px",
              whiteSpace: "nowrap",
            }}
          >
            About Travel
          </div>

          {/* Subtitle — top: 623/901 = 69.1%, left: 418/1920 = 21.8%, width: 1083/1920 = 56.4% */}
          <div
            className="absolute text-white text-center"
            style={{
              top: "69.1%",
              left: "21.8%",
              width: "56.4%",
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(12px, 1.56vw, 30px)",
              lineHeight: "55px",
              letterSpacing: "-0.96px",
              whiteSpace: "nowrap",
            }}
          >
            Navigate the world with Layla; AI trip planner and your ultimate travel sidekick.
          </div>
        </div>

        {/* Section 2: Rectangle 65.svg — centered, 1336/1920 wide, border-radius 10px */}
        <div className="w-full flex justify-center px-[15.2%] py-10">
          <img
            src="/images/Rectangle 65.svg"
            alt="About section"
            className="w-full h-auto block"
            style={{
              aspectRatio: "1336 / 862",
              objectFit: "cover",
              borderRadius: "10px",
              opacity: 1,
            }}
          />
        </div>

        {/* Section 3: Frame 68.svg — centered, 1336/1920 wide, 1px border */}
        <div className="w-full flex justify-center px-[15.2%] pb-10">
          <img
            src="/images/Frame 68.svg"
            alt="Policies frame"
            className="w-full h-auto block"
            style={{
              border: "1px solid #e5e7eb",
              opacity: 1,
            }}
          />
        </div>

        {/* Section 4: search.svg — left-aligned to content area, width: 300px, height: 77px */}
        <div className="w-full flex justify-start px-[11.2%] pb-10">
          <img
            src="/images/search.svg"
            alt="Search policies"
            className="block max-w-full"
            style={{
              width: "300px",
              height: "77px",
              opacity: 1,
              padding: "10px",
              gap: "10px",
            }}
          />
        </div>

        {/* Section 5: Section.svg with decorative d6afe186 overlay at far left */}
        <div
          className="w-full relative mb-10"
          style={{ height: "660px" }}
        >
          {/* Decorative SVG — left: 20px, top aligned slightly above Section.svg (top: 4046 vs 4057 = -11px relative) */}
          <img
            src="/images/d6afe186eed0f8f901fcde0b327743a4 1.svg"
            alt="Decorative travel icon"
            className="absolute"
            style={{
              width: "200px",
              height: "130px",
              left: "15px",
              top: "0px",
              opacity: 1,
              zIndex: 1,
            }}
          />
          {/* Main Section.svg — equal 205px gap on left and right */}
          <div
            className="absolute"
            style={{
              left: "160px",
              right: "205px",
              top: "11px",
              width: "calc(100% - 300px)",
              maxWidth: "1410px",
            }}
          >
            <img
              src="/images/Section.svg"
              alt="AI trip planner section"
              className="w-full h-auto block"
              style={{
                opacity: 1,
              }}
            />
          </div>
        </div>

        <div className="-mt-35">
          <Testimonial />
        </div>



      </div>

      {/* Section (1).svg — equal left/right gap, slightly reduced size */}
      <div className="w-full bg-white flex justify-center px-[5.2%] py-10 mb-10">
        <img
          src="/images/Section (1).svg"
          alt="Section illustration"
          className="w-full h-auto block"
        />
      </div>

      {/* Section (2).svg — full width, height 513px */}
      <div className="w-full" style={{ marginLeft: "-1px" }}>
        <img
          src="/images/Section (2).svg"
          alt="Section 2 illustration"
          className="block"

        />
      </div>
      <ContactFooter />
      <Footer />
    </div>
  );
};

export default AboutPolicies;
