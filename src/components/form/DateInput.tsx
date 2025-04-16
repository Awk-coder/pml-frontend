import React from "react";
import { FiCalendar } from "react-icons/fi";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, required }) => {
  return (
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
        max={new Date().toISOString().split('T')[0]} // Prevents future dates
        required={required}
      />
      <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default DateInput; 