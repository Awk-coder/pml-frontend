import React from "react";
import { FiTrendingUp, FiUsers, FiDollarSign, FiBarChart } from "react-icons/fi";

interface PerformanceStatsProps {
  stats: {
    totalStudents: number;
    totalApplications: number;
    totalAccepted: number;
    totalEarnings: string;
  };
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: <FiUsers className="text-blue-400" />,
      bgClass: "bg-blue-900/20",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: <FiBarChart className="text-purple-400" />,
      bgClass: "bg-purple-900/20",
    },
    {
      title: "Accepted",
      value: stats.totalAccepted,
      icon: <FiTrendingUp className="text-green-400" />,
      bgClass: "bg-green-900/20",
    },
    {
      title: "Total Earnings",
      value: stats.totalEarnings,
      icon: <FiDollarSign className="text-yellow-400" />,
      bgClass: "bg-yellow-900/20",
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

export default PerformanceStats; 