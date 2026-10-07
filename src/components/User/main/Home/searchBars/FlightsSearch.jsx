import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plane, Calendar, ChevronDown, ArrowRightLeft } from "lucide-react";
import AutocompleteInput from "./AutocompleteInput";

const FlightsSearch = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [tripType, setTripType] = useState(searchParams.get("tripType") || "round-trip");
  const [origin, setOrigin] = useState(searchParams.get("origin") || "");
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [departDate, setDepartDate] = useState(searchParams.get("departDate") || "");
  const [returnDate, setReturnDate] = useState(searchParams.get("returnDate") || "");

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      
      {/* Trip Type Toggles */}
      <div className="flex items-center gap-6 mb-4 px-2">
        {["round-trip", "one-way", "multi-city"].map((type) => (
          <label key={type} onClick={() => setTripType(type)} className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${tripType === type ? 'border-[#005fad]' : 'border-gray-400 group-hover:border-gray-500'}`}>
              {tripType === type && <div className="w-2 h-2 rounded-full bg-[#005fad]" />}
            </div>
            <span className={`text-sm font-bold capitalize ${tripType === type ? 'text-[#005fad]' : 'text-gray-600 group-hover:text-gray-800'}`}>
              {type.replace("-", " ")}
            </span>
          </label>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center w-full border-2 border-transparent focus-within:border-blue-500 rounded-lg shadow-sm bg-white overflow-visible transition-all">
        
        {/* Origin & Destination Wrapper (with swap button) */}
        <div className="flex-grow flex flex-col md:flex-row relative">
          
          {/* Origin */}
          <AutocompleteInput 
            icon={<Plane size={18} className="text-gray-400 mr-3 shrink-0" />}
            placeholder="Leaving from"
            value={origin}
            onChange={setOrigin}
            apiEndpoint="https://raw.githubusercontent.com/ashhadulislam/JSON-Airports-India/master/airports.json"
            dataMapper={(data) => data.airports.map(airport => `${airport.IATA_code} - ${airport.airport_name}, ${airport.city_name}`)}
            className="flex-1 min-h-[56px] hover:bg-gray-50 transition-colors border-b md:border-b-0 border-gray-200 relative"
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
            icon={<Plane size={18} className="text-gray-400 mr-3 shrink-0" />}
            placeholder="Going to"
            value={destination}
            onChange={setDestination}
            apiEndpoint="https://raw.githubusercontent.com/ashhadulislam/JSON-Airports-India/master/airports.json"
            dataMapper={(data) => data.airports.map(airport => `${airport.IATA_code} - ${airport.airport_name}, ${airport.city_name}`)}
            className="flex-1 min-h-[56px] hover:bg-gray-50 transition-colors border-b md:border-b-0 md:border-l border-gray-200 pl-4 md:pl-8"
          />
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-[56px] bg-gray-200"></div>

        {/* Depart */}
        <div className="flex-[0.7] min-w-[140px] flex items-center px-4 min-h-[56px] border-b md:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden">
          <Calendar size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex flex-col justify-center">
            {!departDate ? (
              <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">Depart</span>
            ) : (
              <span className="text-sm text-gray-800 font-semibold whitespace-nowrap">
                {new Date(departDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>
          <input 
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>

        {/* Return */}
        {tripType !== 'one-way' && (
          <div className={`flex-[0.7] min-w-[140px] flex items-center px-4 min-h-[56px] border-b md:border-b-0 md:border-l border-gray-200 transition-colors cursor-pointer relative overflow-hidden hover:bg-gray-50`}>
            <Calendar size={18} className="text-gray-400 mr-3 shrink-0" />
            <div className="flex flex-col justify-center">
              {!returnDate ? (
                <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">Return</span>
              ) : (
                <span className="text-sm text-gray-800 font-semibold whitespace-nowrap">
                  {new Date(returnDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
            <input 
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
              className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
            />
          </div>
        )}

        {/* Passengers / Class */}
        <div className="w-[180px] flex items-center justify-between px-4 min-h-[56px] cursor-pointer hover:bg-gray-50 transition-colors md:border-l border-gray-200 rounded-b-lg md:rounded-b-none md:rounded-r-lg">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Travelers & Class</span>
            <div className="flex items-center text-sm font-semibold text-gray-800">
              1 Adult, Economy
            </div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

      </div>
      
      {/* Search Button Area */}
      <div className="w-full flex justify-end mt-5">
        <button 
          onClick={() => {
            const params = new URLSearchParams();
            params.append("tab", "flights");
            params.append("view", "results");
            if (origin) params.append("origin", origin);
            if (destination) params.append("destination", destination);
            if (departDate) params.append("departDate", departDate);
            if (returnDate) params.append("returnDate", returnDate);
            params.append("tripType", tripType);
            
            navigate(`/booking?${params.toString()}`);
          }}
          className="bg-gradient-to-r from-[#005fad] to-[#0070cc] hover:from-[#004a8c] hover:to-[#005fad] text-white font-extrabold text-sm px-10 py-3 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          Search Flights
        </button>
      </div>
    </div>
  );
};

export default FlightsSearch;
