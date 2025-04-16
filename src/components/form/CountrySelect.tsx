import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

// Full list of countries
const countries = [
  { code: "MY", name: "Malaysia" },
  { code: "SG", name: "Singapore" },
  { code: "ID", name: "Indonesia" },
  { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" },
  { code: "PH", name: "Philippines" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "IN", name: "India" },
  // Add all other countries...
].sort((a, b) => a.name.localeCompare(b.name));

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, required, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCountry = countries.find(country => country.name === value);

  return (
    <div className={`relative ${className || ''}`} ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500 flex items-center justify-between"
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {selectedCountry?.name || "Select nationality"}
        </span>
        <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          {/* Search Box */}
          <div className="p-2 border-b border-gray-700">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries..."
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 font-exo text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.name);
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-700 font-exo
                  ${value === country.name ? 'bg-blue-600 text-white' : 'text-white'}`}
              >
                {country.name}
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <div className="px-4 py-2 text-gray-400 text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelect; 