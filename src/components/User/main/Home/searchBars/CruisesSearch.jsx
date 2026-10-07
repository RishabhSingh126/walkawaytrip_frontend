import React from "react";
import { useNavigate } from "react-router-dom";
import { Ship, Anchor, Calendar, Clock, ChevronDown } from "lucide-react";

const CruisesSearch = ({ onSearch }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center w-full border-2 border-transparent focus-within:border-blue-500 rounded-lg shadow-sm bg-white overflow-hidden transition-all">
        
        {/* Destination */}
        <div className="flex-grow flex items-center px-4 min-h-[56px] border-b md:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
          <Ship size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 mt-1">Going to</span>
            <select className="w-full text-sm outline-none text-gray-800 font-semibold bg-transparent cursor-pointer pb-1 appearance-none">
              <option>Any Destination</option>
              <option>Caribbean</option>
              <option>Mediterranean</option>
              <option>Alaska</option>
              <option>Europe</option>
            </select>
          </div>
          <ChevronDown size={16} className="text-gray-400 pointer-events-none" />
        </div>

        {/* Departure Port */}
        <div className="flex-grow flex items-center px-4 min-h-[56px] border-b md:border-b-0 md:border-l border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
          <Anchor size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 mt-1">Departing from</span>
            <select className="w-full text-sm outline-none text-gray-800 font-semibold bg-transparent cursor-pointer pb-1 appearance-none">
              <option>Any Port</option>
              <option>Miami, FL</option>
              <option>Barcelona, Spain</option>
              <option>Seattle, WA</option>
            </select>
          </div>
          <ChevronDown size={16} className="text-gray-400 pointer-events-none" />
        </div>

        {/* Departure Month */}
        <div className="flex-[0.8] flex items-center px-4 min-h-[56px] border-b md:border-b-0 md:border-l border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
          <Calendar size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 mt-1">Departure Month</span>
            <select className="w-full text-sm outline-none text-gray-800 font-semibold bg-transparent cursor-pointer pb-1 appearance-none">
              <option>Any Month</option>
              <option>October 2026</option>
              <option>November 2026</option>
              <option>December 2026</option>
            </select>
          </div>
          <ChevronDown size={16} className="text-gray-400 pointer-events-none" />
        </div>

        {/* Duration */}
        <div className="flex-[0.8] flex items-center px-4 min-h-[56px] hover:bg-gray-50 transition-colors cursor-pointer md:border-l border-gray-200">
          <Clock size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 mt-1">Duration</span>
            <select className="w-full text-sm outline-none text-gray-800 font-semibold bg-transparent cursor-pointer pb-1 appearance-none">
              <option>Any Duration</option>
              <option>1-2 Nights</option>
              <option>3-5 Nights</option>
              <option>6-9 Nights</option>
              <option>10+ Nights</option>
            </select>
          </div>
          <ChevronDown size={16} className="text-gray-400 pointer-events-none" />
        </div>

      </div>
      
      {/* Search Button Area */}
      <div className="w-full flex justify-end mt-5">
        <button 
          onClick={() => {
            const params = new URLSearchParams();
            params.append("tab", "cruises");
            params.append("view", "results");
            navigate(`/booking?${params.toString()}`);
          }}
          className="bg-gradient-to-r from-[#005fad] to-[#0070cc] hover:from-[#004a8c] hover:to-[#005fad] text-white font-extrabold text-sm px-10 py-3 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95 flex items-center gap-2"
        >
          Search Cruises
        </button>
      </div>
    </div>
  );
};

export default CruisesSearch;
