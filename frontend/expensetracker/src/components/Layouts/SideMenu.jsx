// src/components/Layouts/SideMenu.jsx
import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === '/logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  return (
    <div className="w-full h-screen px-4 py-6 bg-white border-r">
      <h5 className="text-lg font-semibold mb-6 text-gray-800">
        {user?.fullName || ''}
      </h5>
      {SIDE_MENU_DATA.map((item, index) => {
        const isActive = activeMenu === item.label;
        return (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 py-3 px-6 rounded-lg mb-2 text-[15px] transition-all duration-200
              ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
