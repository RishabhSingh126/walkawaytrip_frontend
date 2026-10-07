import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PARTNERS_DATA = [
  {
    name: "Cairns, Australia",
    title: (
      <>
        Explore the <span className="italic font-black">Great Barrier Reef</span>
        <br />
        and experience tropical luxury.
      </>
    ),
    subtitle: "Visit Cairns & Tropical North Queensland",
    destLabel: "Cairns",
    price: "₹1,74,300.00",
    tag: "Great Barrier Reef",
    logo: (
      <div className="bg-[#0073c2] text-white font-extrabold text-[8px] sm:text-[9px] px-2.5 py-1.5 rounded-sm shadow-xs uppercase tracking-wider leading-none">
        Queensland
        <span className="block text-[5px] sm:text-[6px] text-white/80 tracking-widest mt-0.5 font-bold">AUSTRALIA'S HOLIDAY FEELING</span>
      </div>
    ),
    url: "https://www.thomascook.in/campaigns/international-holidays/cairns-queensland-australia?src=jma-Cairns",
    img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1000&auto=format&fit=crop&q=80",
    bgColor: "#e0f2fe", // sky-100
    themeClass: "from-sky-950 via-sky-850 to-sky-950",
    textClass: "text-sky-900",
    subTextClass: "text-sky-700/90",
    insets: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=80"
    ]
  },
  {
    name: "Jet Boating",
    title: (
      <>
        Queensland, <span className="italic font-black">Australia</span>
        <br />
        The Adventure Begins Here!
      </>
    ),
    subtitle: "Experience Gold Coast Jet Boating & More",
    destLabel: "Queensland",
    price: "₹1,83,700.00",
    tag: "Jet Boating",
    logo: (
      <div className="bg-[#0073c2] text-white font-extrabold text-[8px] sm:text-[9px] px-2.5 py-1.5 rounded-sm shadow-xs uppercase tracking-wider leading-none">
        Queensland
        <span className="block text-[5px] sm:text-[6px] text-white/80 tracking-widest mt-0.5 font-bold">AUSTRALIA'S HOLIDAY FEELING</span>
      </div>
    ),
    url: "https://www.thomascook.in/campaigns/international-holidays/queensland-australia-jma?src=jma-Queensland",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1000&auto=format&fit=crop&q=80",
    bgColor: "#e6f4ff", // light blue
    themeClass: "from-blue-950 via-blue-850 to-blue-950",
    textClass: "text-blue-900",
    subTextClass: "text-blue-700/90",
    insets: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=150&auto=format&fit=crop&q=80"
    ]
  },
  {
    name: "Malaysia Truly Asia",
    title: (
      <>
        Explore Malaysia's <span className="italic font-black">new Places &</span>
        <br />
        thrilling experiences!
      </>
    ),
    subtitle: "Visit MalaysiaTrulyAsia 2026",
    destLabel: "Malaysia",
    price: "₹64,900.00",
    tag: "Kuala Lumpur City",
    logo: (
      <div className="bg-[#d2232a] text-white font-extrabold text-[8px] sm:text-[9px] px-2.5 py-1.5 rounded-sm shadow-xs uppercase tracking-wider leading-none flex flex-col items-center">
        <span>Malaysia</span>
        <span className="text-[5px] text-yellow-300 font-bold tracking-widest mt-0.5">TRULY ASIA 2026</span>
      </div>
    ),
    url: "https://www.thomascook.in/campaigns/international-holidays/malaysia-jma?src=jma-Malaysia",
    img: "https://images.unsplash.com/photo-1608477667173-5b0dfa8476e2?w=600&auto=format&fit=crop&q=80",
    bgColor: "#fffbeb", // amber-50
    themeClass: "from-amber-950 via-amber-850 to-amber-950",
    textClass: "text-amber-900",
    subTextClass: "text-amber-700/90",
    insets: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=150",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=150"
    ]
  },
  {
    name: "Scalo Milano, Italy",
    title: (
      <>
        Turn your <span className="italic font-black">European holiday</span>
        <br />
        into a <span className="italic font-black">shopping spree worth remembering.</span>
      </>
    ),
    subtitle: "Visit Scalo Milano Outlet & More",
    destLabel: "Italy",
    price: "₹2,01,000.00",
    tag: "Scalo Milano Outlet & More",
    logo: (
      <div className="bg-[#ffe600] text-black font-extrabold text-[8px] sm:text-[9px] px-2.5 py-1.5 rounded-sm shadow-xs uppercase tracking-wider leading-none text-center">
        Scalo Milano
        <span className="block text-[5px] text-black/75 tracking-wider mt-0.5 font-bold">OUTLET & MORE</span>
      </div>
    ),
    url: "https://www.thomascook.in/campaigns/international-holidays/scalomilano-jma?src=jma-Scalo-Milano",
    img: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=1000&auto=format&fit=crop&q=80",
    bgColor: "#0284c7", // sky blue Milano background color
    themeClass: "from-sky-950 via-sky-850 to-sky-950",
    textClass: "text-white", // white text on sky blue
    subTextClass: "text-white/95",
    insets: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1738610612578-7c31a08c54b4?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    name: "Melbourne, Australia",
    title: (
      <>
        Melbourne & Victoria's <span className="italic font-black">Scenic Routes</span>
        <br />
        Every bit different.
      </>
    ),
    subtitle: "Inspiring Journeys Across Victoria State",
    destLabel: "Melbourne",
    price: "₹1,48,600.00",
    tag: "Great Ocean Road",
    logo: (
      <div className="bg-black text-white font-extrabold text-[8px] sm:text-[9px] px-2.5 py-1.5 rounded-sm shadow-xs uppercase tracking-wider leading-none text-center">
        Melbourne
        <span className="block text-[5px] text-white/80 tracking-widest mt-0.5 font-bold">EVERY BIT DIFFERENT</span>
      </div>
    ),
    url: "https://www.thomascook.in/campaigns/international-holidays/melbourne?src=jma-melbourne",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1000&auto=format&fit=crop&q=80",
    bgColor: "#f3f4f6", // gray-100
    themeClass: "from-gray-950 via-gray-850 to-gray-950",
    textClass: "text-gray-900",
    subTextClass: "text-gray-700/90",
    insets: [
      "https://images.unsplash.com/photo-1768737676971-1534dbbe2a37?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=150&auto=format&fit=crop&q=80"
    ]
  },
  {
    name: "Mauritius Island",
    title: (
      <>
        Discover Mauritius' <span className="italic font-black">White Sands</span>
        <br />
        and turquoise lagoons.
      </>
    ),
    subtitle: "Luxury Beachfront Lagoon Villa Escape",
    destLabel: "Mauritius",
    price: "₹98,500.00",
    tag: "Ile aux Cerfs Lagoon",
    logo: (
      <div className="bg-[#00a88f] text-white font-extrabold text-[8px] sm:text-[9px] px-2.5 py-1.5 rounded-sm shadow-xs uppercase tracking-wider leading-none text-center">
        Mauritius
        <span className="block text-[5px] text-white/85 tracking-widest mt-0.5 font-bold">PARADISE ISLAND</span>
      </div>
    ),
    url: "https://www.thomascook.in/campaigns/international-holidays/mauritius?src=jma-Mauritius",
    img: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=1000&auto=format&fit=crop&q=80",
    bgColor: "#e6fffa", // teal-50
    themeClass: "from-teal-950 via-teal-850 to-teal-950",
    textClass: "text-teal-900",
    subTextClass: "text-teal-700/90",
    insets: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=150&auto=format&fit=crop&q=80"
    ]
  }
];

const Testimonials = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(3); // Start on Milan slide
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slide width configuration
  const slideWidth = isMobile ? 85 : 75; // percentage width
  const stagePadding = isMobile ? 7.5 : 12.5; // percentage padding on sides

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? PARTNERS_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === PARTNERS_DATA.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, isMobile]);

  // Translate offset calculation to center active slide
  const translateOffset = -currentIndex * slideWidth + stagePadding;

  return (
    <section className="bg-white py-14 px-0 w-full overflow-hidden relative">
      {/* Centered Campaign Header Section */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <span className="text-[10px] font-black text-[#f15a22] uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded border border-orange-100 inline-block mb-2">
          Campaign Partnerships
        </span>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight leading-none">
          Tourism Board Campaigns
        </h2>
        <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed max-w-xl mx-auto">
          Approved special destination plans crafted in collaboration with international board bureaus.
        </p>
      </div>

      {/* Main Carousel Wrapper */}
      <div className="relative w-full">
        {/* Stage Viewport */}
        <div className="w-full overflow-hidden py-4">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translate3d(${translateOffset}%, 0px, 0px)` }}
          >
            {PARTNERS_DATA.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={idx}
                  style={{ width: `${slideWidth}%` }}
                  className={`shrink-0 px-2.5 transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-45 scale-[0.97]"
                    }`}
                >
                  {/* Slide Main Container */}
                  <div
                    className="relative w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden flex flex-col sm:flex-row shadow-md border border-gray-150 aspect-[4/3] sm:aspect-[1665/681] text-left"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    {/* Left: Image Box */}
                    <div className="w-full sm:w-[50%] h-[50%] sm:h-full relative overflow-hidden shrink-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover cursor-pointer hover:scale-[1.02] transition-all duration-500"
                        onClick={() => navigate("/booking")}
                      />
                      {/* Left Gradient Face (Fades to text box color) */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent hidden sm:block z-10 pointer-events-none"
                        style={{
                          background: `linear-gradient(to right, transparent 65%, ${item.bgColor} 100%)`
                        }}
                      />

                      {/* Inset Thumbnails (Milano/Queensland style) */}
                      {item.insets && item.insets.length >= 2 && (
                        <div className="absolute bottom-4 left-4 flex gap-2 z-20">
                          {item.insets.map((thumbUrl, tIdx) => (
                            <div
                              key={tIdx}
                              className="w-14 sm:w-18 h-10 sm:h-12 rounded-lg overflow-hidden border-2 border-white shadow-md transform hover:scale-105 transition-transform duration-205 cursor-pointer"
                              onClick={() => navigate("/booking")}
                            >
                              <img src={thumbUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Location Tag */}
                      <div className="absolute top-4 left-4 bg-black/45 backdrop-blur-xs text-white text-[9px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 z-20 pointer-events-none">
                        <MapPin size={9} />
                        <span>{item.tag}</span>
                      </div>
                    </div>

                    {/* Right: Text Information Panel */}
                    <div className="flex-grow flex flex-col justify-center p-6 sm:p-8 lg:p-12 relative z-10">
                      {/* Official Partner Logo (e.g. Yellow Square for Scalo Milano) */}
                      <div className="absolute top-4 sm:top-6 right-6 text-right">
                        {item.logo}
                      </div>

                      {/* Main Title & Slogan */}
                      <div className="mt-4 sm:mt-0">
                        <h3 className={`text-sm sm:text-xl lg:text-2xl font-semibold tracking-tight leading-snug ${item.textClass}`}>
                          {item.title}
                        </h3>
                        <p className={`text-xs sm:text-sm lg:text-base font-extrabold mt-1 sm:mt-2.5 leading-snug ${item.subTextClass}`}>
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Double-Box Pricing Badge (MMT / Thomas Cook Style) */}
                      <div className="mt-5 flex items-center flex-wrap rounded-lg overflow-hidden border border-black/5 w-fit shadow-xs">
                        <div className="bg-white px-3.5 py-2 text-[10px] sm:text-xs font-extrabold text-blue-900 leading-none">
                          {item.destLabel} Holidays starting
                        </div>
                        <div className="bg-[#ffe600] px-3.5 py-2 text-[10px] sm:text-xs font-black text-blue-950 leading-none">
                          @ {item.price}
                        </div>
                      </div>

                      {/* Outbound Link */}
                      <button
                        onClick={() => navigate("/booking")}
                        className={`mt-5 sm:mt-7 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0 p-0 text-left ${item.textClass}`}
                      >
                        <span>Book Campaign Holidays</span>
                        <ExternalLink size={10} />
                      </button>

                      {/* T&C apply notice (Printed vertically on the right edge) */}
                      <span className="absolute bottom-6 right-3 text-[8px] text-gray-400 font-bold uppercase tracking-wider origin-bottom-right -rotate-90 hidden sm:block">
                        *T&C Apply
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-[8%] sm:left-[10%] top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-800 shadow-md border border-gray-150 transition-all active:scale-90 hover:scale-105 z-20 cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-[8%] sm:right-[10%] top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-800 shadow-md border border-gray-150 transition-all active:scale-90 hover:scale-105 z-20 cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Slide Index Dot Indicators */}
      <div className="flex justify-center mt-6 gap-1.5">
        {PARTNERS_DATA.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${currentIndex === i ? "bg-[#f15a22] w-4" : "bg-gray-250 hover:bg-gray-350"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
