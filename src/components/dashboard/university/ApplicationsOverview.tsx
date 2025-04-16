import React from "react";
import { FiUsers, FiUserCheck, FiUserX, FiClock } from "react-icons/fi";

interface ApplicationsOverviewProps {
  stats: {
    total: number;
    reviewing: number;
    accepted: number;
    rejected: number;
  };
}

const ApplicationsOverview: React.FC<ApplicationsOverviewProps> = ({ stats }) => {
  const statCards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: <FiUsers className="text-blue-400" />,
      bgClass: "bg-blue-900/20",
    },
    {
      title: "Under Review",
      value: stats.reviewing,
      icon: <FiClock className="text-yellow-400" />,
      bgClass: "bg-yellow-900/20",
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: <FiUserCheck className="text-green-400" />,
      bgClass: "bg-green-900/20",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FiUserX className="text-red-400" />,
      bgClass: "bg-red-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgClass} rounded-xl border border-gray-800 p-6`}
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mr-3">
              {card.icon}
            </div>
            <h3 className="font-orbitron text-lg text-white">{card.title}</h3>
          </div>
          <p className="font-space text-3xl text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ApplicationsOverview; 