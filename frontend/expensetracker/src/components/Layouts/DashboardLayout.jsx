// src/components/Layouts/DashboardLayout.jsx
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu"; // ✅ Now matches default export

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  console.log("User context:", user); // ✅ Debugging support

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {/* Show layout only if user exists */}
      {user ? (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500">Loading user...</div>
      )}
    </div>
  );
};

export default DashboardLayout;
