import React, { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Users, Loader2 } from "lucide-react";

const BusesSearch = ({ onSearch }) => {
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);

  // Origin State & City
  const [originState, setOriginState] = useState("");
  const [originCities, setOriginCities] = useState([]);
  const [originCity, setOriginCity] = useState("");
  const [loadingOriginCities, setLoadingOriginCities] = useState(false);

  // Destination State & City
  const [destState, setDestState] = useState("");
  const [destCities, setDestCities] = useState([]);
  const [destCity, setDestCity] = useState("");
  const [loadingDestCities, setLoadingDestCities] = useState(false);

  const [journeyDate, setJourneyDate] = useState(new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(1);

  // Fetch all states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/locations/india");
        const data = await res.json();
        
        if (data.success) {
          if (data.isFallback) {
            // Flatten fallback data for states
            setStates(data.data.map(d => d.state));
            // Store full fallback locally to avoid more calls if in fallback mode
            window.__fallbackLocationData = data.data; 
          } else {
            setStates(data.states);
          }
        }
      } catch (error) {
        console.error("Failed to fetch states", error);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch Origin Cities when Origin State changes
  useEffect(() => {
    if (!originState) {
      setOriginCities([]);
      setOriginCity("");
      return;
    }
    
    const fetchCities = async () => {
      setLoadingOriginCities(true);
      try {
        // Check if we are using fallback data globally
        if (window.__fallbackLocationData) {
          const stateData = window.__fallbackLocationData.find(d => d.state === originState);
          setOriginCities(stateData ? stateData.cities : []);
        } else {
          const res = await fetch(`http://localhost:4000/api/locations/cities?state=${encodeURIComponent(originState)}`);
          const data = await res.json();
          if (data.success) {
            setOriginCities(data.cities);
          }
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      } finally {
        setLoadingOriginCities(false);
      }
    };
    
    fetchCities();
  }, [originState]);

  // Fetch Dest Cities when Dest State changes
  useEffect(() => {
    if (!destState) {
      setDestCities([]);
      setDestCity("");
      return;
    }
    
    const fetchCities = async () => {
      setLoadingDestCities(true);
      try {
        if (window.__fallbackLocationData) {
          const stateData = window.__fallbackLocationData.find(d => d.state === destState);
          setDestCities(stateData ? stateData.cities : []);
        } else {
          const res = await fetch(`http://localhost:4000/api/locations/cities?state=${encodeURIComponent(destState)}`);
          const data = await res.json();
          if (data.success) {
            setDestCities(data.cities);
          }
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      } finally {
        setLoadingDestCities(false);
      }
    };
    
    fetchCities();
  }, [destState]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ originCity, destCity, journeyDate, passengers, type: 'bus' });
    }
  };

  return (
    <form onSubmit={handleSearchClick} className="w-full flex flex-col md:flex-row gap-4 items-end">
      
      {/* From Section */}
      <div className="flex-1 w-full bg-gray-50 p-3 rounded-2xl border border-gray-200">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><MapPin size={12}/> Leaving From</label>
        <div className="flex flex-col gap-2">
          {/* State */}
          <select 
            value={originState} 
            onChange={(e) => setOriginState(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-blue-500 text-sm font-semibold text-gray-800 transition-colors"
          >
            <option value="">Select State</option>
            {loadingStates ? <option disabled>Loading States...</option> : states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {/* City */}
          <select 
            value={originCity}
            onChange={(e) => setOriginCity(e.target.value)}
            disabled={!originState || loadingOriginCities}
            className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-blue-500 text-sm font-semibold text-gray-800 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
          >
            <option value="">Select City / Place</option>
            {loadingOriginCities ? <option disabled>Fetching cities...</option> : originCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* To Section */}
      <div className="flex-1 w-full bg-gray-50 p-3 rounded-2xl border border-gray-200">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><MapPin size={12}/> Going To</label>
        <div className="flex flex-col gap-2">
          {/* State */}
          <select 
            value={destState} 
            onChange={(e) => setDestState(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-blue-500 text-sm font-semibold text-gray-800 transition-colors"
          >
            <option value="">Select State</option>
            {loadingStates ? <option disabled>Loading States...</option> : states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {/* City */}
          <select 
            value={destCity}
            onChange={(e) => setDestCity(e.target.value)}
            disabled={!destState || loadingDestCities}
            className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-blue-500 text-sm font-semibold text-gray-800 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
          >
            <option value="">Select City / Place</option>
            {loadingDestCities ? <option disabled>Fetching cities...</option> : destCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Date & Passengers */}
      <div className="flex flex-col gap-3 flex-shrink-0 min-w-[200px]">
        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center gap-2 relative overflow-hidden cursor-pointer min-h-[44px]">
          <Calendar size={18} className="text-blue-500 shrink-0" />
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-800 font-bold whitespace-nowrap">
              {journeyDate ? new Date(journeyDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Select Date'}
            </span>
          </div>
          <input 
            type="date"
            value={journeyDate} 
            onChange={(e) => setJourneyDate(e.target.value)} 
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
            min={new Date().toISOString().split('T')[0]}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>
        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center gap-2">
          <Users size={18} className="text-blue-500" />
          <select 
            value={passengers} 
            onChange={(e) => setPassengers(e.target.value)}
            className="bg-transparent w-full outline-none font-bold text-gray-800 text-sm cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Seat{n > 1 ? 's' : ''}</option>)}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button 
        type="submit"
        disabled={!originCity || !destCity}
        className="h-full min-h-[92px] px-8 rounded-2xl font-extrabold flex flex-col items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest text-[14px] bg-gradient-to-r from-blue-600 to-[#3a7bd5] hover:from-blue-700 hover:to-[#2c65b5] text-white shadow-[0_10px_25px_rgba(58,123,213,0.4)] hover:shadow-[0_15px_35px_rgba(58,123,213,0.5)] hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        <Search size={22} />
        Search Buses
      </button>

    </form>
  );
};

export default BusesSearch;
