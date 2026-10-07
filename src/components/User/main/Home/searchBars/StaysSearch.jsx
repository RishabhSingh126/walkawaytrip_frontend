import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User, ChevronDown, MapPin, Calendar } from "lucide-react";
import AutocompleteInput from "./AutocompleteInput";

const StaysSearch = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  
  const [rooms, setRooms] = useState(parseInt(searchParams.get("rooms")) || 1);
  const [adults, setAdults] = useState(parseInt(searchParams.get("adults")) || 2);
  const [children, setChildren] = useState(parseInt(searchParams.get("children")) || 0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const totalGuests = adults + children;

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center w-full border-2 border-transparent focus-within:border-blue-500 rounded-lg shadow-sm bg-white overflow-visible transition-all">
        
        {/* Destination */}
        <AutocompleteInput 
          icon={<MapPin size={18} className="text-gray-400 mr-3 shrink-0" />}
          placeholder="Where are you going?"
          value={destination}
          onChange={setDestination}
          apiEndpoint="https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json"
          dataMapper={(data) => data.map(city => `${city.name}, ${city.country}`)}
          className="flex-grow min-h-[56px] border-b lg:border-b-0 lg:border-r border-gray-200 hover:bg-gray-50 transition-colors"
        />

        {/* Check-in */}
        <div className="flex-[0.7] min-w-[140px] flex items-center px-4 min-h-[56px] border-b lg:border-b-0 lg:border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden">
          <Calendar size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex flex-col justify-center">
            {!checkIn ? (
              <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">Check-in Date</span>
            ) : (
              <span className="text-sm text-gray-800 font-semibold whitespace-nowrap">
                {new Date(checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>
          <input 
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>

        {/* Check-out */}
        <div className="flex-[0.7] min-w-[140px] flex items-center px-4 min-h-[56px] border-b lg:border-b-0 lg:border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden">
          <Calendar size={18} className="text-gray-400 mr-3 shrink-0" />
          <div className="flex flex-col justify-center">
            {!checkOut ? (
              <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">Check-out Date</span>
            ) : (
              <span className="text-sm text-gray-800 font-semibold whitespace-nowrap">
                {new Date(checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>
          <input 
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>

        {/* Guests/Rooms */}
        <div 
          className="relative w-full lg:w-[180px] flex items-center justify-between px-4 min-h-[56px] cursor-pointer hover:bg-gray-50 transition-colors lg:rounded-r-lg outline-none"
          onClick={() => setShowGuestDropdown(!showGuestDropdown)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setShowGuestDropdown(false);
            }
          }}
          tabIndex={0}
        >
          <div className="flex items-center text-sm font-semibold text-gray-800">
            <User size={18} className="text-gray-400 mr-3 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 leading-none">Guests & Rooms</span>
              <span className="leading-none whitespace-nowrap">{rooms} room, {totalGuests} guest{totalGuests !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform duration-200 ${showGuestDropdown ? 'rotate-180' : ''}`} />
          
          {showGuestDropdown && (
            <div className="absolute top-[110%] right-0 w-[280px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 cursor-default" onClick={e => e.stopPropagation()}>
              
              {/* Rooms */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Rooms</h4>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    disabled={rooms <= 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >-</button>
                  <span className="w-4 text-center text-sm font-semibold text-gray-800">{rooms}</span>
                  <button 
                    onClick={() => setRooms(Math.min(9, rooms + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >+</button>
                </div>
              </div>

              {/* Adults */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Adults</h4>
                  <p className="text-xs text-gray-500 font-medium">Ages 13 or above</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >-</button>
                  <span className="w-4 text-center text-sm font-semibold text-gray-800">{adults}</span>
                  <button 
                    onClick={() => setAdults(Math.min(30, adults + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >+</button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Children</h4>
                  <p className="text-xs text-gray-500 font-medium">Ages 0 to 12</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >-</button>
                  <span className="w-4 text-center text-sm font-semibold text-gray-800">{children}</span>
                  <button 
                    onClick={() => setChildren(Math.min(10, children + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >+</button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setShowGuestDropdown(false)}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
      
      {/* Search Button Area */}
      <div className="w-full flex justify-end mt-5">
        <button 
          onClick={() => {
            const params = new URLSearchParams();
            params.append("tab", "stays");
            params.append("view", "results");
            if (destination) params.append("destination", destination);
            if (checkIn) params.append("checkIn", checkIn);
            if (checkOut) params.append("checkOut", checkOut);
            params.append("rooms", rooms);
            params.append("adults", adults);
            params.append("children", children);
            
            navigate(`/booking?${params.toString()}`);
          }}
          className="bg-gradient-to-r from-[#005fad] to-[#0070cc] hover:from-[#004a8c] hover:to-[#005fad] text-white font-extrabold text-sm px-10 py-3 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          Search Stays
        </button>
      </div>
    </div>
  );
};

export default StaysSearch;
