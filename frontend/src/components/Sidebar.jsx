import React from "react";
import "../Sidebar.css";
import { Link } from "react-router-dom";

import {
  FaFolderOpen,
  FaTable,
  FaCalendarDay,
  FaCheckSquare,
  FaList,
  FaProjectDiagram,
  FaChartBar,
  FaFileUpload,
} from "react-icons/fa";
const Sidebar = ({ sidebarToggle, role }) => {
  return (
    <div
      className={`${sidebarToggle ? " hidden " : " block "}w-80 fixed h-full`}
    >
      <div>
        <img
          className="w-64 ml-10 mt-5"
          src="https://emp.infogen-labs.com/img/logo.png"
          alt=""
        />
      </div>

      <ul className="mt-3 ml-3 font-bold">
        {/* <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
          <Link to="/LoginOrSignup" className="px-3">
            <FaUser className="inline-block w-6 h-6 mr-2 -mt-2"></FaUser>
            Login/SignUp
          </Link>
        </li> */}
        {role === "Account Manager/Project Manager" && (
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
            <Link to="/" className="px-3">
              <FaFolderOpen className="inline-block w-6 h-6 mr-2 -mt-2"></FaFolderOpen>
              Add New Project/Sprint
            </Link>
          </li>
        )}
        {role === "Account Manager/Project Manager" && (
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
            <Link to="/TermsAndConditions" className="px-3">
              <FaFolderOpen className="inline-block w-6 h-6 mr-2 -mt-2"></FaFolderOpen>
              TestGenius Instructions
            </Link>
          </li>
        )}
        {role === "Account Manager/Project Manager" && (
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
            <Link to="/TestsReports" className="px-3">
              <FaFolderOpen className="inline-block w-6 h-6 mr-2 -mt-2"></FaFolderOpen>
              TestGenius Reports
            </Link>
          </li>
        )}

        {role === "Account Manager/Project Manager" && (
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
            <Link to="/TestResult" className="px-3">
              <FaFolderOpen className="inline-block w-6 h-6 mr-2 -mt-2"></FaFolderOpen>
              Test Result
            </Link>
          </li>
        )}

        {/* <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
          <Link to="/NewSprint" className="px-3">
            <FaRegFileArchive className="inline-block w-6 h-6 mr-2 -mt-2"></FaRegFileArchive>
            Add New Sprint
          </Link>
        </li> */}
        {role === "Account Manager/Project Manager" && (
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
            <Link to="/Dashboard" className="px-3">
              <FaTable className="inline-block w-6 h-6 mr-2 -mt-2"></FaTable>
              Sprint Ceremony Organiser
            </Link>
          </li>
        )}
        {role === "Account Manager/Project Manager" && (
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
            <Link to="/AllocationAndHoliday" className="px-3">
              <FaCalendarDay className="inline-block w-6 h-6 mr-2 -mt-2"></FaCalendarDay>
              Hours & Holidays
            </Link>
          </li>
        )}
        {role === "Account Manager/Project Manager" && (
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-4 leftBtn">
            <Link to="/AttendanceTable" className="px-3">
              <FaCheckSquare className="inline-block w-6 h-6 mr-2 -mt-2"></FaCheckSquare>
              Sprint Attendence/Capacity
            </Link>
          </li>
        )}

        {/* <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
          <Link to="/Capacity" className="px-3">
            <FaList className="inline-block w-6 h-6 mr-2 -mt-2"></FaList>
            Team Capacity Overview
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
          <Link to="/Vizualization" className="px-3">
            <FaChartPie className="inline-block w-6 h-6 mr-2 -mt-2"></FaChartPie>
            Sprint Capacity Visualization
          </Link>
        </li> */}
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
          <Link to="/list" className="px-3">
            <FaProjectDiagram className="inline-block w-6 h-6 mr-2 -mt-2"></FaProjectDiagram>
            Sprint Status
          </Link>
        </li>
        {role === "Account Manager/Project Manager" && (
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
            <Link to="/KPI's" className="px-3">
              <FaChartBar className="inline-block w-6 h-6 mr-2 -mt-2"></FaChartBar>
              Sprint KPI's
            </Link>
          </li>
        )}

        <li className=" rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
          <Link to="/uploadFile" className="px-3">
            <FaList className="inline-block w-6 h-6 mr-2 -mt-2"></FaList>
            Upload Files
          </Link>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2 leftBtn">
          <Link to="/retrospective" className="px-3">
            <FaList className="inline-block w-6 h-6 mr-2 -mt-2"></FaList>
            Sprint Retrospective
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
