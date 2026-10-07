import React, { useState, useEffect, useRef } from "react";

const AutocompleteInput = ({ 
  icon, 
  placeholder, 
  value, 
  onChange, 
  suggestionsList = [], 
  apiEndpoint,
  dataMapper,
  className = "",
  inputClassName = ""
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [internalSuggestions, setInternalSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Fetch data if apiEndpoint is provided (runs ONLY once when apiEndpoint is set)
  useEffect(() => {
    if (apiEndpoint) {
      setLoading(true);
      fetch(apiEndpoint)
        .then((res) => res.json())
        .then((data) => {
          if (dataMapper) {
            setInternalSuggestions(dataMapper(data));
          } else {
            setInternalSuggestions(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching autocomplete data", err);
          setLoading(false);
        });
    }
  }, [apiEndpoint]); // ONLY depend on apiEndpoint. Do NOT add dataMapper or it will re-fetch on every render if inline.

  // Handle static suggestions if no API is provided
  useEffect(() => {
    if (!apiEndpoint && suggestionsList) {
      setInternalSuggestions(suggestionsList);
    }
  }, [apiEndpoint, suggestionsList]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Filter suggestions whenever value changes
  useEffect(() => {
    if (value.trim() === "") {
      setFilteredSuggestions(internalSuggestions.slice(0, 5)); // Show top 5 defaults if empty
    } else {
      const lowercasedValue = value.toLowerCase();
      const filtered = internalSuggestions.filter(item => 
        item.toLowerCase().includes(lowercasedValue)
      );
      setFilteredSuggestions(filtered.slice(0, 50)); // Limit to 50 for performance
    }
  }, [value, internalSuggestions]);

  return (
    <div ref={wrapperRef} className={`relative flex items-center px-4 ${className}`}>
      {icon}
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        className={`w-full text-sm outline-none text-gray-800 placeholder-gray-500 font-semibold bg-transparent ${inputClassName}`}
      />

      {loading && showDropdown && (
        <div className="absolute left-0 top-full w-full min-w-[250px] bg-white border border-gray-200 shadow-xl rounded-xl z-[100] mt-2 py-3 px-4 text-sm text-gray-500 font-medium text-center">
          Loading suggestions...
        </div>
      )}

      {!loading && showDropdown && filteredSuggestions.length > 0 && (
        <div className="absolute left-0 top-full w-full min-w-[250px] bg-white border border-gray-200 shadow-xl rounded-xl z-[100] max-h-60 overflow-y-auto mt-2 py-1">
          {filteredSuggestions.map((suggestion, index) => (
            <div 
              key={index}
              onClick={() => {
                onChange(suggestion);
                setShowDropdown(false);
              }}
              className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm font-semibold text-gray-700 transition-colors border-b border-gray-50 last:border-b-0 flex items-center"
            >
              <span className="text-gray-400 mr-2 text-lg">•</span>
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {!loading && showDropdown && filteredSuggestions.length === 0 && value.trim() !== "" && (
        <div className="absolute left-0 top-full w-full min-w-[250px] bg-white border border-gray-200 shadow-xl rounded-xl z-[100] mt-2 py-3 px-4 text-sm text-gray-500 font-medium text-center">
          No matches found
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
