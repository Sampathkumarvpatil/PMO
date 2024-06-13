import React from "react";
// import { useState } from 'react';
// import Dashboard from './Dashboard';
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export const Main = ({ changeToogle, sidebarToggle, role }) => {
  return (
    <div className="flex">
      <Sidebar
        sidebarToggle={sidebarToggle}
        role={role}
        changeToogle={changeToogle}
      />
      {/* <Dashboard sidebarToggle={sidebarToggle}
      setSidebarToggle = {setSidebarToggle}/> */}
      <Navbar sidebarToggle={sidebarToggle} changeToogle={changeToogle} />

      <Outlet />
    </div>
  );
};
export default Main;
