import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChange
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
      />
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar; 