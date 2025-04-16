import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const countryCodes = [
  { code: "+60", country: "MY" },
  { code: "+65", country: "SG" },
  { code: "+62", country: "ID" },
  { code: "+66", country: "TH" },
  { code: "+84", country: "VN" },
  { code: "+63", country: "PH" },
  // Add more country codes as needed
];

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+60");
  const [phoneNumber, setPhoneNumber] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize phone number from value prop
  useEffect(() => {
    if (value) {
      const matchedCode = countryCodes.find(cc => value.startsWith(cc.code));
      if (matchedCode) {
        setCountryCode(matchedCode.code);
        setPhoneNumber(value.slice(matchedCode.code.length));
      } else {
        setPhoneNumber(value);
      }
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/\D/g, '');
    setPhoneNumber(newNumber);
    onChange(`${countryCode}${newNumber}`);
  };

  const handleCountryCodeSelect = (code: string) => {
    setCountryCode(code);
    setIsOpen(false);
    onChange(`${code}${phoneNumber}`);
  };

  return (
    <div className="relative flex" ref={wrapperRef}>
      {/* Country Code Selector */}
      <div className="relative">
        <button
          type="button"
          className="h-full bg-gray-800 border-r-0 border border-gray-700 rounded-l-lg px-3 py-3 font-exo text-white focus:outline-none focus:border-blue-500 flex items-center gap-2 min-w-[90px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {countryCode} <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-[200px] bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-[200px] overflow-y-auto">
            {countryCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-gray-700 text-white font-exo flex items-center gap-2"
                onClick={() => handleCountryCodeSelect(country.code)}
              >
                <span className="text-sm">{country.country}</span>
                <span>{country.code}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="Phone number"
        className="flex-1 bg-gray-900 border border-l-0 border-gray-700 rounded-r-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
        required={required}
      />
    </div>
  );
};

export default PhoneInput; 