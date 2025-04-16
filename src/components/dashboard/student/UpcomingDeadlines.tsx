import React from "react";
import { FiCalendar, FiBell } from "react-icons/fi";

interface Deadline {
  id: string;
  title: string;
  date: string;
  daysLeft: number;
  type: "application" | "document" | "other";
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ deadlines }) => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 h-full">
      <div className="flex items-center mb-6">
        <FiCalendar className="text-blue-400 mr-2" />
        <h3 className="font-orbitron text-xl text-white">Upcoming Deadlines</h3>
      </div>

      {deadlines.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <FiBell className="text-4xl text-gray-500 mb-4" />
          <p className="text-gray-400 text-center">No upcoming deadlines</p>
        </div>
      ) : (
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="bg-black/20 border border-gray-800 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-space text-white">{deadline.title}</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    deadline.daysLeft <= 3
                      ? "bg-red-900/30 text-red-400"
                      : deadline.daysLeft <= 7
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-blue-900/30 text-blue-400"
                  }`}
                >
                  {deadline.daysLeft} days left
                </span>
              </div>
              <p className="text-gray-400 text-sm">Due: {deadline.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines; 