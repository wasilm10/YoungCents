// src/components/Buttons/HomeBtn.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const HomeBtn = ({ to = '/', label = 'Back to Homepage', className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100 transition ${className}`}
    >
      <AiOutlineHome className="text-xl" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default HomeBtn;
