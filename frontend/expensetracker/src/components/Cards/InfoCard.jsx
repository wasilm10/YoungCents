// src/components/Cards/InfoCard.jsx
import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-md`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-gray-500 text-sm">{label}</h6>
        <span className="text-xl font-semibold text-gray-800">${value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
