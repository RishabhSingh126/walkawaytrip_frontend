import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Train, Calendar, ChevronDown, ArrowRightLeft } from "lucide-react";
import AutocompleteInput from "./AutocompleteInput";

const TrainsSearch = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [origin, setOrigin] = useState(searchParams.get("origin") || "");
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  
  const [ticketQuota, setTicketQuota] = useState(searchParams.get("ticketQuota") || "General");
  const [showQuotaDropdown, setShowQuotaDropdown] = useState(false);
  const quotas = ["General", "Ladies", "Tatkal", "Premium Tatkal", "Senior Citizen", "Divyangjan"];

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center w-full border-2 border-transparent focus-within:border-blue-500 rounded-lg shadow-sm bg-white overflow-visible transition-all">
        
        {/* Origin & Destination Wrapper (with swap button) */}
        <div className="flex-grow flex flex-col md:flex-row relative">
          
          {/* Origin */}
          <AutocompleteInput 
            icon={<Train size={18} className="text-gray-400 mr-3 shrink-0" />}
            placeholder="From Station"
            value={origin}
            onChange={setOrigin}
            apiEndpoint="https://raw.githubusercontent.com/apurbadebnath/indianrlystations/master/station_list.json"
            dataMapper={(data) => data.map(station => `${station.station_code} - ${station.station}, ${station.state}`)}
            className="flex-1 min-h-[56px] border-b md:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors relative"
          />

          {/* Swap Button (Absolute positioned in the middle on desktop) */}
          <button 
            onClick={handleSwap}
            className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-sm p-1.5 rounded-full hover:bg-gray-100 hover:scale-110 transition-all text-gray-500 hover:text-blue-600"
          >
            <ArrowRightLeft size={14} />
          </button>

          {/* Destination */}
          <AutocompleteInput 
            icon={<Train size={18} className="text-gray-400 mr-3 shrink-0" />}
            placeholder="To Station"
            value={destination}
            onChange={setDestination}
            apiEndpoint="https://raw.githubusercontent.com/apurbadebnath/indianrlystations/master/station_list.json"
            dataMapper={(data) => data.map(station => `${station.station_code} - ${station.station}, ${station.state}`)}
            className="flex-1 min-h-[56px] border-b md:border-b-0 md:border-l border-gray-200 hover:bg-gray-50 transition-colors pl-4 md:pl-8"
          />
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-[56px] bg-gray-200"></div>

        {/* Date of Journey */}
        <div className="flex-[0.6] flex items-center px-4 min-h-[56px] border-b md:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden">
          <Calendar size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex flex-col justify-center">
            {!date ? (
              <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">Date of Journey</span>
            ) : (
              <span className="text-sm text-gray-800 font-semibold whitespace-nowrap">
                {new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>

        {/* Ticket Quota */}
        <div 
          className="relative w-[190px] flex items-center justify-between px-4 min-h-[56px] cursor-pointer hover:bg-gray-50 transition-colors md:border-l border-gray-200 rounded-b-lg md:rounded-b-none md:rounded-r-lg outline-none"
          onClick={() => setShowQuotaDropdown(!showQuotaDropdown)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setShowQuotaDropdown(false);
            }
          }}
          tabIndex={0}
        >
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Quota</span>
            <div className="flex items-center text-sm font-semibold text-gray-800">
              {ticketQuota}
            </div>
          </div>
          <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showQuotaDropdown ? "rotate-180" : ""}`} />
          
          {showQuotaDropdown && (
            <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
              {quotas.map((quota, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTicketQuota(quota);
                    setShowQuotaDropdown(false);
                  }}
                >
                  {quota}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      
      {/* Search Button Area */}
      <div className="w-full flex justify-end mt-5">
        <button 
          onClick={() => {
            const params = new URLSearchParams();
            params.append("tab", "trains");
            params.append("view", "results");
            if (origin) params.append("origin", origin);
            if (destination) params.append("destination", destination);
            if (date) params.append("date", date);
            if (ticketQuota) params.append("ticketQuota", ticketQuota);
            
            navigate(`/booking?${params.toString()}`);
          }}
          className="bg-gradient-to-r from-[#005fad] to-[#0070cc] hover:from-[#004a8c] hover:to-[#005fad] text-white font-extrabold text-sm px-10 py-3 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          Search Trains
        </button>
      </div>
    </div>
  );
};

export default TrainsSearch;
