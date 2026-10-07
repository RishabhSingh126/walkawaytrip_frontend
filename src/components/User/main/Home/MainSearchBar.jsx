import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plane, Building, Car, Map, Compass, MessageSquare, User, ChevronDown, Train, Ship, MapPin } from "lucide-react";
import StaysSearch from "./searchBars/StaysSearch";
import FlightsSearch from "./searchBars/FlightsSearch";
import TrainsSearch from "./searchBars/TrainsSearch";
import CarsSearch from "./searchBars/CarsSearch";
import CruisesSearch from "./searchBars/CruisesSearch";
import HolidaysSearch from "./searchBars/HolidaysSearch";
import AttractionsSearch from "./searchBars/AttractionsSearch";
import BusesSearch from "./searchBars/BusesSearch";
import { Bus } from "lucide-react";

const MainSearchBar = ({ hideHero }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Stays");
  const [destination, setDestination] = useState("");

  const tabs = [
    { id: "Stays", label: "Stays", route: "/hotel", icon: <Building size={14} className="inline" /> },
    { id: "Flights", label: "Flights", route: "/flights", icon: <Plane size={14} className="inline" /> },
    { id: "Trains", label: "Trains", route: "/trains", icon: <Train size={14} className="inline" /> },
    { id: "Buses", label: "Buses", route: "/buses", icon: <Bus size={14} className="inline" /> },
    { id: "Car rentals", label: "Car rentals", route: "/cars", icon: <Car size={14} className="inline" /> },
    { id: "Cruises", label: "Cruises", route: "/cruises", icon: <Ship size={14} className="inline" /> },
    { id: "Holidays", label: "Holidays", route: "/holidays", icon: <Compass size={14} className="inline" /> },
    { id: "Attractions", label: "Attractions", route: "/attractions", icon: <MapPin size={14} className="inline" /> },
  ];

  // Sync tab with URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/hotel") || path.includes("/stays")) setActiveTab("Stays");
    else if (path.includes("/flights")) setActiveTab("Flights");
    else if (path.includes("/trains")) setActiveTab("Trains");
    else if (path.includes("/buses")) setActiveTab("Buses");
    else if (path.includes("/cars")) setActiveTab("Car rentals");
    else if (path.includes("/cruises")) setActiveTab("Cruises");
    else if (path.includes("/holidays")) setActiveTab("Holidays");
    else if (path.includes("/attractions")) setActiveTab("Attractions");
    else setActiveTab("Stays");
  }, [location.pathname]);

  // Auto-scroll to search bar section on specific routes
  const prevPathRef = React.useRef(null);
  useEffect(() => {
    const path = location.pathname;
    const serviceRoutes = ["/hotel", "/flights", "/trains", "/buses", "/cars", "/cruises", "/holidays", "/attractions", "/stays"];
    const isCurrentService = serviceRoutes.some(r => path.includes(r));
    const isPrevService = prevPathRef.current && serviceRoutes.some(r => prevPathRef.current.includes(r));
    
    if (isCurrentService && !isPrevService) {
      // Small timeout to ensure ScrollToTop finishes first
      setTimeout(() => {
        const element = document.getElementById("search-bar-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
    
    prevPathRef.current = path;
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.route);
  };

  const handleSearch = (data) => {
    const selectedTab = tabs.find(t => t.id === activeTab);
    if (selectedTab) {
      const tabMap = {
        "Stays": "stays",
        "Flights": "flights",
        "Trains": "trains",
        "Buses": "buses",
        "Car rentals": "cars",
        "Cruises": "cruises",
        "Holidays": "holidays",
        "Attractions": "attractions"
      };

      const params = new URLSearchParams();
      params.append("tab", tabMap[activeTab] || "stays");
      params.append("view", "results");

      if (data && typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, value);
          }
        });
      }

      navigate(`/booking?${params.toString()}`);
    }
  };

  return (
    <div id="main-search-bar-container" className="relative md:absolute mx-auto md:left-1/2 md:bottom-0 w-[95%] max-w-[1100px] md:transform md:-translate-x-1/2 translate-y-4 md:translate-y-[55%] z-30 scroll-mt-6 -mt-8 md:mt-0">
      
      {/* Dark overlay behind tabs (optional visual match for the dark band behind tabs) */}
      <div className="absolute top-[-30px] left-[-5%] right-[-5%] h-[50px] bg-black/40 z-[-1] blur-md pointer-events-none rounded-t-full opacity-50"></div>

      <div className="flex flex-col w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
        
        {/* Tabs Row (Individual White Boxes) */}
        <div className="flex flex-wrap items-end gap-1 px-2 sm:px-6 pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div key={tab.id} className="relative group">
                <button
                  onClick={() => handleTabClick(tab)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-bold whitespace-nowrap rounded-t-md transition-all ${
                    isActive 
                      ? "bg-white text-[#0f62fe] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] h-auto min-h-[44px]" 
                      : "bg-white/95 text-gray-500 hover:text-gray-800 hover:bg-white h-auto min-h-[40px] mt-1"
                  }`}
                >
                  <div className="shrink-0">{tab.icon}</div>
                  <span className="truncate max-w-[65px] sm:max-w-none">{tab.label}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Main White Container */}
        <div className="bg-white rounded-b-lg rounded-tr-lg shadow-xl w-full p-4 sm:p-5 relative z-10 min-h-[140px] flex items-center">
          
          {activeTab === "Stays" && <StaysSearch onSearch={handleSearch} />}
          {activeTab === "Flights" && <FlightsSearch onSearch={handleSearch} />}
          {activeTab === "Trains" && <TrainsSearch onSearch={handleSearch} />}
          {activeTab === "Buses" && <BusesSearch onSearch={handleSearch} />}
          {activeTab === "Car rentals" && <CarsSearch onSearch={handleSearch} />}
          {activeTab === "Cruises" && <CruisesSearch onSearch={handleSearch} />}
          {activeTab === "Holidays" && <HolidaysSearch onSearch={handleSearch} />}
          {activeTab === "Attractions" && <AttractionsSearch onSearch={handleSearch} />}

        </div>
      </div>
    </div>
  );
};

export default MainSearchBar;
