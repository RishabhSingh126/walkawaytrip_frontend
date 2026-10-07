import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";
import { MdArrowBack } from "react-icons/md";
import { Clock, MapPin, Star, Heart, Calendar, ShieldCheck, Compass, Menu, X, ArrowRight, Eye, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const PisaDetail = () => {
  const [activeSection, setActiveSection] = useState("top");
  const [tocCollapsed, setTocCollapsed] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      return saved.some(item => item.title === "Leaning Tower of Pisa");
    } catch (e) {
      return false;
    }
  });
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      const sections = [
        "top",
        "architect",
        "construction",
        "history",
        "earthquake",
        "technical",
        "guinness",
        "gallery",
        "references"
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.pageYOffset;
          if (window.scrollY >= top - 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      isScrolling.current = true;
      setActiveSection(id);

      const yOffset = -110; // Offset for sticky navbar
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling.current = false;
      }, 850);
    }
  };

  const handleToggleWishlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (isWishlisted) {
        const updated = saved.filter(item => item.title !== "Leaning Tower of Pisa");
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setIsWishlisted(false);
        toast.success("Removed from wishlist.");
      } else {
        const newItem = {
          title: "Leaning Tower of Pisa",
          image: "https://plus.unsplash.com/premium_photo-1661952525120-a01282212dfc?w=1600&auto=format&fit=crop&q=90",
          price: "Free Entry",
          duration: "2-3 Hours",
          locations: "Pisa, Italy",
          type: "destination"
        };
        saved.push(newItem);
        localStorage.setItem("wishlist", JSON.stringify(saved));
        setIsWishlisted(true);
        toast.success("Added Leaning Tower of Pisa to your wishlist!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Section links
  const sectionsList = [
    { id: "top", label: "(Top)" },
    { id: "architect", label: "Architect" },
    { id: "construction", label: "Construction" },
    { id: "history", label: "History following construction" },
    { id: "earthquake", label: "Earthquake survival" },
    { id: "technical", label: "Technical information" },
    { id: "guinness", label: "Guinness World Records" },
    { id: "gallery", label: "Gallery" },
    { id: "references", label: "References & External Links" }
  ];

  // Gallery photos
  const galleryItems = [
    {
      src: "https://images.unsplash.com/photo-1705066402031-07053d50793b?w=600&auto=format&fit=crop&q=100",
      caption: "Leaning Tower of Pisa in 2022"
    },
    {
      src: "https://images.unsplash.com/photo-1626212200570-7f308847844d?w=600&auto=format&fit=crop&q=100",
      caption: "Column capital details on top level"
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1661963280973-8f31f4b5a348?w=600&auto=format&fit=crop&q=100",
      caption: "Column details & base arches"
    },
    {
      src: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&auto=format&fit=crop&q=100",
      caption: "Cathedral Square (Piazza del Duomo) view"
    },
    {
      src: "https://images.unsplash.com/photo-1631902558330-2fd74640c470?w=600&auto=format&fit=crop&q=100",
      caption: "Top-level bells chamber"
    },
    {
      src: "https://images.unsplash.com/photo-1705066458795-981a9de1346b?w=600&auto=format&fit=crop&q=100",
      caption: "Beautiful sunset behind the tower"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col justify-between font-sans">
      <Navbar />

      {/* Main Content Container */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1360px] w-full mx-auto flex-grow">

        {/* Back navigation */}
        <Link
          to="/trending-destinations"
          className="flex items-center gap-2 text-gray-800 font-medium mb-6 hover:text-[#0093CB] transition-colors w-fit"
        >
          <MdArrowBack size={18} />
          <span className="text-sm">Back to Trending Destinations</span>
        </Link>

        {/* Hero Header Section */}
        <div className="relative h-[250px] sm:h-[350px] md:h-[420px] rounded-3xl overflow-hidden mb-10 shadow-md">
          <img
            src="https://plus.unsplash.com/premium_photo-1661952525120-a01282212dfc?w=1600&auto=format&fit=crop&q=90"
            alt="Leaning Tower of Pisa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="bg-[#0093CB] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                World Wonder
              </span>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-3 mb-1">
                Leaning Tower of Pisa
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                <MapPin size={14} className="text-[#0093CB]" /> Pisa, Tuscany, Italy &bull; Coordinates: 43°43′23″N 10°23′47″E
              </p>
            </div>

            <button
              onClick={handleToggleWishlist}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white text-white hover:text-[#E86B62] font-semibold py-2 px-5 rounded-xl flex items-center gap-2 transition-all text-xs cursor-pointer w-fit"
            >
              <Heart size={16} className={isWishlisted ? "fill-[#E86B62] text-[#E86B62]" : ""} />
              {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>

        {/* ── 3-Column Split Layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">

          {/* COLUMN 1: Sticky Table of Contents Sidebar */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-28 z-35 bg-white border border-gray-150/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <span className="font-extrabold text-gray-800 text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2">
                <Menu size={16} className="text-[#0093CB]" /> Contents
              </span>
              <button
                onClick={() => setTocCollapsed(!tocCollapsed)}
                className="text-xs font-bold text-[#0093CB] hover:underline cursor-pointer"
              >
                {tocCollapsed ? "Show" : "Hide"}
              </button>
            </div>

            {!tocCollapsed && (
              <ul className="flex flex-col gap-1.5 max-h-[350px] overflow-y-auto scrollbar-thin">
                {sectionsList.map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => scrollToSection(sec.id)}
                      className={`text-left w-full text-xs font-semibold py-1.5 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-between ${activeSection === sec.id
                        ? "bg-[#0093CB]/10 text-[#0093CB]"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      <span>{sec.label}</span>
                      {activeSection === sec.id && <ChevronRight size={12} />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* COLUMN 2: Main Article Body */}
          <div className="w-full lg:w-1/2 bg-white border border-gray-150/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-8 min-h-[500px]">

            {/* Top / Main Intro */}
            <section id="top" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-2">
                Leaning Tower of Pisa
              </h2>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed mb-4">
                The Leaning Tower of Pisa (Italian: <i>torre pendente di Pisa</i>), or simply the Tower of Pisa (<i>torre di Pisa</i>), is the campanile, or freestanding bell tower, of Pisa Cathedral. It is known for its nearly four-degree lean, the result of an unstable foundation.
              </p>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed mb-4">
                The tower is one of three structures in Pisa's Cathedral Square (Piazza del Duomo), which includes the cathedral and Pisa Baptistry. Over time, the flawed tower has become one of the most visited tourist attractions in the world as well as an architectural icon of Italy, receiving over 5 million visitors each year.
              </p>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed">
                The height of the tower is 55.86 metres (183 feet 3 inches) from the ground on the low side and 56.67 m (185 ft 11 in) on the high side. The width of the walls at the base is 2.44 m (8 ft 0 in). Its weight is estimated at 14,500 tonnes. The tower has 296 steps; the seventh floor has two fewer steps on the north-facing staircase.
              </p>
            </section>

            {/* Section: Architect */}
            <section id="architect" className="scroll-mt-28">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-2">
                Architect
              </h2>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed mb-4">
                The identity of the architect of the tower is a subject of controversy. The design had long been attributed to a man named Guglielmo and to Bonanno Pisano, the latter a well-known 12th-century resident artist of Pisa known for his bronze casting, particularly in the Pisa Duomo.
              </p>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed">
                A 2001 study seems to indicate Diotisalvi was the original architect, due to the time of construction and affinity with other Diotisalvi works, notably the bell tower of San Nicola and the Baptistery, both in Pisa.
              </p>
            </section>

            {/* Section: Construction */}
            <section id="construction" className="scroll-mt-28">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-2">
                Construction
              </h2>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed mb-4">
                Construction of the tower occurred in three stages over 199 years. On 5 January 1172, Donna Berta di Bernardo, a widow and resident of the house of dell'Opera di Santa Maria, bequeathed sixty soldi to the purchase of stones which still form the base of the bell tower. On 9 August 1173, the foundations of the tower were laid.
              </p>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed">
                The tower began to sink after construction had progressed to the second floor in 1178. This was due to a mere three-metre foundation, set in weak, unstable subsoil. Construction was subsequently halted for the better part of a century, allowing the soil to settle and saving the tower from collapsing.
              </p>
            </section>

            {/* Section: History */}
            <section id="history" className="scroll-mt-28">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-2">
                History following construction
              </h2>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed mb-4">
                In 1272, construction resumed under Giovanni di Simone. In an effort to compensate for the tilt, the engineers built upper floors with one side taller than the other. The bell-chamber was finally added in 1372 by Tommaso di Andrea Pisano.
              </p>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed">
                By 1990, the tilt had reached 5.5 degrees. The structure was closed and stabilized by remedial engineering work between 1993 and 2001, which safely reduced the tilt to 3.97 degrees, guaranteeing its survival for another few centuries.
              </p>
            </section>

            {/* Section: Earthquake survival */}
            <section id="earthquake" className="scroll-mt-28">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-2">
                Earthquake survival
              </h2>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed">
                Despite its delicate tilt, the tower has survived at least four strong earthquakes since 1173. A study reveals that the tower is protected by a phenomenon called dynamic soil-structure interaction (DSSI): the height and stiffness of the tower, combined with the softness of the subsoil, prevents resonance during seismic tremors.
              </p>
            </section>

            {/* Section: Technical information */}
            <section id="technical" className="scroll-mt-28">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-2">
                Technical information
              </h2>
              <ul className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed list-disc list-inside flex flex-col gap-2">
                <li>Ground elevation: about 2 metres above sea level</li>
                <li>Weight: estimated at 14,500 tonnes</li>
                <li>Outer diameter of base: 15.484 metres</li>
                <li>Thickness of walls at the base: 2.44 metres</li>
                <li>Bell chamber bells: 7 bells (tuned to musical major scale notes)</li>
              </ul>
            </section>

            {/* Section: Guinness World Records */}
            <section id="guinness" className="scroll-mt-28">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-2">
                Guinness World Records
              </h2>
              <p className="text-gray-600 font-medium text-[13px] sm:text-sm leading-relaxed">
                The Leaning Tower of Pisa is registered in the Guinness World Records as the most famous leaning monument. In 2010, Guinness certified the Capital Gate tower in Abu Dhabi as the 'World's furthest leaning man-made tower', which features an intentional 18-degree tilt.
              </p>
            </section>

            {/* Section: Gallery */}
            <section id="gallery" className="scroll-mt-28">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-2">
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {galleryItems.map((item, idx) => (
                  <div key={idx} className="group relative rounded-xl overflow-hidden shadow-sm h-[130px] sm:h-[160px]">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex items-end">
                      <span className="text-white text-[10px] font-bold leading-tight">{item.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: References */}
            <section id="references" className="scroll-mt-28 pb-4">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-2">
                References & External Links
              </h2>
              <ol className="text-gray-500 text-[11px] sm:text-xs leading-normal flex flex-col gap-2 mb-6 list-decimal list-inside">
                <li>Leaning Tower of Pisa (Italian: torre pendente di Pisa)</li>
                <li>Piazza del Duomo, Pisa UNESCO Heritage site</li>
                <li>Valente, J. & Diotisalvi, M. (2001). "Pisa Tower Restoration and Architecture".</li>
                <li>Pisa Cathedral Square stabilization reports (1993-2001).</li>
              </ol>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.opapisa.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#0093CB] hover:underline flex items-center gap-1"
                >
                  Official Website of Piazza del Duomo <ArrowRight size={12} />
                </a>
              </div>
            </section>

          </div>

          {/* COLUMN 3: Wikipedia-Style Infobox Card */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-28 z-35 bg-white border border-gray-150/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#0093CB] py-3.5 px-5 text-center">
              <h3 className="text-white font-extrabold text-sm sm:text-base tracking-tight leading-snug">
                Leaning Tower of Pisa
              </h3>
              <span className="text-[#0093CB]/10 bg-white/20 backdrop-blur-md rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase text-white mt-1.5 inline-block">
                Torre pendente di Pisa
              </span>
            </div>

            {/* Infobox Image */}
            <div className="p-4 border-b border-gray-100">
              <img
                src="https://plus.unsplash.com/premium_photo-1661935210970-7be0633a92af?w=600&auto=format&fit=crop&q=100"
                alt="Tower in 2022"
                className="w-full h-auto rounded-lg shadow-sm"
              />
              <span className="text-[10px] text-gray-400 block text-center mt-2 font-medium">
                Leaning Tower of Pisa in 2022
              </span>
            </div>

            {/* Infobox Fields */}
            <div className="px-4 py-2 text-xs flex flex-col gap-3">
              <div>
                <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block">Religion</span>
                <span className="text-gray-700 font-bold text-[11px] block mt-0.5">Catholic Church</span>
              </div>
              <div className="border-t border-gray-50 pt-2.5">
                <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block">Ecclesiastical status</span>
                <span className="text-gray-700 font-bold text-[11px] block mt-0.5">Active</span>
              </div>
              <div className="border-t border-gray-50 pt-2.5">
                <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block">Location</span>
                <span className="text-gray-700 font-bold text-[11px] block mt-0.5">Pisa, Italy</span>
              </div>
              <div className="border-t border-gray-50 pt-2.5">
                <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block">Architects</span>
                <span className="text-gray-700 font-bold text-[11px] block mt-0.5">Diotisalvi (?) / Bonanno Pisano (?)</span>
              </div>
              <div className="border-t border-gray-50 pt-2.5">
                <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block">Style</span>
                <span className="text-gray-700 font-bold text-[11px] block mt-0.5">Romanesque</span>
              </div>
              <div className="border-t border-gray-50 pt-2.5">
                <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block">Groundbreaking</span>
                <span className="text-gray-700 font-bold text-[11px] block mt-0.5">1173</span>
              </div>
              <div className="border-t border-gray-50 pt-2.5">
                <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block">Completed</span>
                <span className="text-gray-700 font-bold text-[11px] block mt-0.5">1372 (654 years ago)</span>
              </div>
              <div className="border-t border-gray-50 pt-2.5">
                <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block">Height (max)</span>
                <span className="text-gray-700 font-bold text-[11px] block mt-0.5">55.86 m (183 ft 3 in)</span>
              </div>
              <div className="border-t border-gray-50 pt-2.5">
                <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block">UNESCO site</span>
                <span className="text-gray-700 font-bold text-[11px] block mt-0.5">Part of Piazza del Duomo (1987)</span>
              </div>
            </div>

            {/* Infobox Interactive OpenStreetMap Frame */}
            <div className="p-4 border-t border-gray-150/80 bg-gray-50">
              <iframe
                src="https://maps.google.com/maps?q=Leaning%20Tower%20of%20Pisa,%20Italy&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="130"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg shadow-inner"
              />
            </div>
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
};

export default PisaDetail;
