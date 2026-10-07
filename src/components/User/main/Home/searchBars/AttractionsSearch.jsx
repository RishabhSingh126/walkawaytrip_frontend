import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Calendar, Search } from "lucide-react";
import AutocompleteInput from "./AutocompleteInput";
import { attractionsList } from "./mockData";

const AttractionsSearch = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center w-full border-2 border-transparent focus-within:border-blue-500 rounded-lg shadow-sm bg-white overflow-visible transition-all">
        
        {/* Massive Search Query Input */}
        <AutocompleteInput 
          icon={<Search size={22} className="text-gray-400 mr-3 shrink-0" />}
          placeholder="What are you looking for? (e.g. Eiffel Tower, Museum tickets)"
          value={query}
          onChange={setQuery}
          suggestionsList={attractionsList}
          className="flex-grow min-h-[64px] border-b md:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors"
          inputClassName="text-base"
        />

        {/* Date (Optional) */}
        <div className="w-full md:w-[250px] flex items-center px-5 min-h-[64px] hover:bg-gray-50 transition-colors md:border-l border-gray-200 cursor-text">
          <Calendar size={20} className="text-gray-400 mr-3" />
          <input 
            type="text"
            placeholder="When? (Optional)"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
            className="w-full text-sm outline-none text-gray-800 placeholder-gray-500 font-semibold bg-transparent cursor-pointer"
          />
        </div>

      </div>
      
      {/* Search Button Area */}
      <div className="w-full flex justify-end mt-5">
        <button 
          onClick={() => {
            const params = new URLSearchParams();
            params.append("tab", "attractions");
            params.append("view", "results");
            if (query) params.append("query", query);
            
            navigate(`/booking?${params.toString()}`);
          }}
          className="bg-gradient-to-r from-[#005fad] to-[#0070cc] hover:from-[#004a8c] hover:to-[#005fad] text-white font-extrabold text-sm px-10 py-3 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95 flex items-center gap-2"
        >
          Explore Attractions
        </button>
      </div>
    </div>
  );
};

export default AttractionsSearch;
