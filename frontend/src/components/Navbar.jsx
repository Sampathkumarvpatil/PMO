import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ sidebarToggle, changeToogle }) => {
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div
      className={`${
        sidebarToggle ? "ml-0" : "ml-64"
      }  w-full bg-gray-800 px-4 py-4 flex justify-between transition-all duration-300`}
    >
      <div className="flex items-center text-xl">
        <FaBars
          className="text-white me-4 cursor-pointer"
          onClick={() => changeToogle()}
        />
        <span className="text-white font-semibold">PMO</span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="relative">
          <button className="text-white group" onClick={logout}>
            <FaSignOutAlt className="w-6 h-6 mt-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
