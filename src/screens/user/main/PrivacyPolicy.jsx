import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";

// SVG coordinate reference: 1649 × 1142
// Each button rect: x=4, width=400, height=46
// y positions: 57, 122, 187, 252, 317
const POLICY_BUTTONS = [
  { id: "studio",  label: "Studio Software Terms & Conditions", top: 57,  height: 46, route: "/policy/studio",  heroImage: "/images/Group 693.svg" },
  { id: "cookies", label: "Cookies Policy",                     top: 122, height: 46, route: "/policy/cookies", heroImage: "/images/Group 693 (3).svg" },
  { id: "pay",     label: "Pay Terms & Conditions",              top: 187, height: 46, route: "/policy/pay",     heroImage: "/images/Group 693 (1).svg" },
  { id: "website", label: "Website Terms of Use",                top: 252, height: 46, route: "/policy/website", heroImage: "/images/Group 693 (1).svg" },
  { id: "service", label: "Service Level Agreement",             top: 317, height: 46, route: "/policy/service", heroImage: "/images/Group 693 (2).svg" },
];

const SVG_W = 1649;
const SVG_H = 1142;
// Button x/width in SVG coords
const BTN_X = 4;
const BTN_W = 400;

const toPercent = (val, total) => `${((val / total) * 100).toFixed(4)}%`;

const PrivacyPolicy = () => {
  const [activePolicy, setActivePolicy] = useState("studio");
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  let heroImage = "/images/Group 693.svg"; // Default for /privacy-policy and /policy/studio

  if (currentPath === "/policy/cookies") {
    heroImage = "/images/Group 693 (3).svg";
  } else if (currentPath === "/policy/pay" || currentPath === "/policy/website") {
    heroImage = "/images/Group 693 (1).svg";
  } else if (currentPath === "/policy/service") {
    heroImage = "/images/Group 693 (2).svg";
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Hero section — dynamic SVG depending on active route */}
      <div
        className="w-full relative"
        style={{ marginTop: "70px", height: "340px" }}
      >
        <img
          src={heroImage}
          alt="Privacy Policy Hero"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", opacity: 1 }}
        />
      </div>

      {/* Frame 1097.svg with transparent clickable button overlays */}
      <div
        className="relative"
        style={{ width: "90%", marginLeft: "70px", marginTop: "100px" }}
      >
        {/* The SVG image — visual is untouched */}
        <img
          src="/images/Frame 1097.svg"
          alt="Privacy Policy Content"
          className="w-full h-auto block"
        />

        {/* Transparent button overlays — positioned as % of SVG viewBox */}
        {POLICY_BUTTONS.map((btn) => (
          <button
            key={btn.id}
            onClick={() => navigate(btn.route, { state: { heroImage: btn.heroImage, label: btn.label } })}
            aria-label={btn.label}
            title={btn.label}
            style={{
              position: "absolute",
              left:   toPercent(BTN_X, SVG_W),
              top:    toPercent(btn.top, SVG_H),
              width:  toPercent(BTN_W, SVG_W),
              height: toPercent(btn.height, SVG_H),
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              margin: 0,
              borderRadius: "10px",
            }}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
