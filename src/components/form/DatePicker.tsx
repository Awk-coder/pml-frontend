import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handleDateSelect = (date: Date) => {
    onChange(format(date, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={value ? format(new Date(value), "dd MMM yyyy") : ""}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-4 pr-10 py-3 font-exo text-white focus:outline-none focus:border-blue-500 cursor-pointer"
          placeholder="Select date"
          required={required}
        />
        <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[300px] bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <FiChevronLeft className="text-white" />
              </button>
              <span className="font-space text-white">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <FiChevronRight className="text-white" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-sm text-gray-400 py-1">
                  {day}
                </div>
              ))}
              {getDaysInMonth(currentMonth).map((date, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => date && handleDateSelect(date)}
                  className={`
                    text-center py-1 rounded hover:bg-gray-700
                    ${date ? "text-white" : "text-gray-600"}
                    ${date && value === format(date, "yyyy-MM-dd") ? "bg-blue-600" : ""}
                  `}
                  disabled={!date}
                >
                  {date ? format(date, "d") : ""}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker; 