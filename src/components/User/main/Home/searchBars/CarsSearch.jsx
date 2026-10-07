import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Car, MapPin, Calendar, Clock, CheckSquare, Square } from "lucide-react";
import AutocompleteInput from "./AutocompleteInput";

const CarsSearch = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [differentDropOff, setDifferentDropOff] = useState(false);
  const [driverAge, setDriverAge] = useState(true);
  const [pickup, setPickup] = useState(searchParams.get("pickup") || "");
  const [dropoff, setDropoff] = useState(searchParams.get("dropoff") || "");

  const [pickupDate, setPickupDate] = useState(searchParams.get("pickupDate") || "");
  const [dropoffDate, setDropoffDate] = useState(searchParams.get("dropoffDate") || "");

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      
      {/* Toggles */}
      <div className="flex items-center gap-6 mb-4 px-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div onClick={() => setDifferentDropOff(!differentDropOff)} className="text-gray-500 hover:text-[#005fad] transition-colors">
            {differentDropOff ? <CheckSquare size={18} className="text-[#005fad]" /> : <Square size={18} />}
          </div>
          <span className="text-sm font-bold text-gray-600 group-hover:text-gray-800">Return car to different location</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer group">
          <div onClick={() => setDriverAge(!driverAge)} className="text-gray-500 hover:text-[#005fad] transition-colors">
            {driverAge ? <CheckSquare size={18} className="text-[#005fad]" /> : <Square size={18} />}
          </div>
          <span className="text-sm font-bold text-gray-600 group-hover:text-gray-800">Driver aged 30 - 65?</span>
        </label>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center w-full border-2 border-transparent focus-within:border-blue-500 rounded-lg shadow-sm bg-white overflow-visible transition-all">
        
        {/* Locations Wrapper */}
        <div className="flex-grow flex flex-col md:flex-row relative">
          
          {/* Pick-up */}
          <AutocompleteInput 
            icon={<MapPin size={18} className="text-gray-400 mr-3 shrink-0" />}
            placeholder="Pick-up location"
            value={pickup}
            onChange={setPickup}
            apiEndpoint="https://raw.githubusercontent.com/ashhadulislam/JSON-Airports-India/master/airports.json"
            dataMapper={(data) => data.airports.map(airport => `${airport.IATA_code} - ${airport.airport_name}, ${airport.city_name}`)}
            className="flex-1 min-h-[56px] border-b md:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors"
          />

          {/* Drop-off (Conditional) */}
          {differentDropOff && (
            <AutocompleteInput 
              icon={<MapPin size={18} className="text-gray-400 mr-3 shrink-0" />}
              placeholder="Drop-off location"
              value={dropoff}
              onChange={setDropoff}
              apiEndpoint="https://raw.githubusercontent.com/ashhadulislam/JSON-Airports-India/master/airports.json"
              dataMapper={(data) => data.airports.map(airport => `${airport.IATA_code} - ${airport.airport_name}, ${airport.city_name}`)}
              className="flex-1 min-h-[56px] border-b md:border-b-0 md:border-l border-gray-200 hover:bg-gray-50 transition-colors"
            />
          )}
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-[56px] bg-gray-200"></div>

        {/* Pick-up Date & Time */}
        <div className="flex-[0.8] flex items-center px-4 min-h-[56px] border-b md:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors">
          <Calendar size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex items-center w-full">
            <div className="relative w-[60%] h-full flex flex-col justify-center overflow-hidden min-h-[56px] cursor-pointer">
              {!pickupDate ? (
                <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">Pick-up date</span>
              ) : (
                <span className="text-sm text-gray-800 font-semibold whitespace-nowrap">
                  {new Date(pickupDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              )}
              <input 
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
            </div>
            <div className="w-px h-6 bg-gray-300 mx-2 shrink-0"></div>
            <select className="w-[40%] text-sm outline-none text-gray-800 font-semibold bg-transparent cursor-pointer relative z-30">
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
            </select>
          </div>
        </div>

        {/* Drop-off Date & Time */}
        <div className="flex-[0.8] flex items-center px-4 min-h-[56px] hover:bg-gray-50 transition-colors md:border-l border-gray-200">
          <Calendar size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex items-center w-full">
            <div className="relative w-[60%] h-full flex flex-col justify-center overflow-hidden min-h-[56px] cursor-pointer">
              {!dropoffDate ? (
                <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">Drop-off date</span>
              ) : (
                <span className="text-sm text-gray-800 font-semibold whitespace-nowrap">
                  {new Date(dropoffDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              )}
              <input 
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
            </div>
            <div className="w-px h-6 bg-gray-300 mx-2 shrink-0"></div>
            <select className="w-[40%] text-sm outline-none text-gray-800 font-semibold bg-transparent cursor-pointer relative z-30">
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
            </select>
          </div>
        </div>

      </div>
      
      {/* Search Button Area */}
      <div className="w-full flex justify-end mt-5">
        <button 
          onClick={() => {
            const params = new URLSearchParams();
            params.append("tab", "cars");
            params.append("view", "results");
            if (pickup) params.append("pickup", pickup);
            if (differentDropOff && dropoff) params.append("dropoff", dropoff);
            if (pickupDate) params.append("pickupDate", pickupDate);
            if (dropoffDate) params.append("dropoffDate", dropoffDate);
            
            navigate(`/booking?${params.toString()}`);
          }}
          className="bg-gradient-to-r from-[#005fad] to-[#0070cc] hover:from-[#004a8c] hover:to-[#005fad] text-white font-extrabold text-sm px-10 py-3 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          Search Cars
        </button>
      </div>
    </div>
  );
};

export default CarsSearch;
