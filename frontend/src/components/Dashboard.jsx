import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
import { FaCalendarDay, FaClock, FaSquarespace } from "react-icons/fa";
import "../Sidebar.css";
import CeremonyContainer from "./CeremonyContainer";
import LastButtons from "./LastButtons";
// import AttendanceTable from "./AttendenceTable";
// import { Link } from 'react-router-dom';

const Dashboard = ({ sidebarToggle }) => {
  const [mainCompanyArr, setMainCompanyArr] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);

  useEffect(() => {
    const savedProjectName = localStorage.getItem("selectedProjectName");
    const savedSprintName = localStorage.getItem("selectedSprintName");
    const dataFromLocalStorage =
      JSON.parse(localStorage.getItem("mainCompanyData")) || [];

    setMainCompanyArr(dataFromLocalStorage);

    if (dataFromLocalStorage.length > 0) {
      const selectedProject =
        dataFromLocalStorage.find(
          (project) => project.projectName === savedProjectName
        ) || dataFromLocalStorage[0];

      setSelectedProject(selectedProject);

      if (selectedProject.sprints && selectedProject.sprints.length > 0) {
        const selectedSprint =
          selectedProject.sprints.find(
            (sprint) => sprint.sprintName === savedSprintName
          ) || selectedProject.sprints[0];

        setSelectedSprint(selectedSprint);
      }
    }
  }, []);
  useEffect(() => {
    if (selectedSprint?.sprintName)
      localStorage.setItem("selectedSprintName", selectedSprint?.sprintName);
  }, [selectedSprint?.sprintName]);

  const handleProjectChange = (e) => {
    const projectName = e.target.value;
    const project = mainCompanyArr.find((p) => p.projectName === projectName);
    setSelectedProject(project);
    localStorage.setItem("selectedProjectName", projectName);
  };

  const handleSprintChange = (e) => {
    const sprintName = e.target.value;
    console.log(sprintName);
    console.log("object");
    const sprint = selectedProject.sprints.find(
      (s) => s.sprintName === sprintName
    );
    setSelectedSprint(sprint);
    localStorage.setItem("selectedSprintName", sprintName);

    //stored the date in the localstorage
    localStorage.setItem("sprintStartDate", sprint.startDate);
    localStorage.setItem("sprintEndDate", sprint.endDate);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      {/* <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} /> */}

      <div className="border border-gray-900 rounded-xl pb-4 m-1">
        <div className="flex flex-row justify-between mx-4 my-8 ">
          <div className="bg-blue-600 text-white rounded-xl p-1.5 pl-4 pr-4 flex items-center">
            <label className="font-bold mr-2">Project:</label>
            <select
              className="text-black rounded-lg px-9 py-1 bg-white border shadow-xl"
              onChange={handleProjectChange}
              value={selectedProject?.projectName || ""}
            >
              {mainCompanyArr.map((project) => (
                <option key={project.projectName} value={project.projectName}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>
          <div className="absolute top-24 right-4">
            <label className="font-bold text-black mr-2">Select Sprint:</label>
            <select
              className="text-black rounded-lg p-2 bg-white border shadow-xl"
              onChange={handleSprintChange}
              value={selectedSprint?.sprintName || ""}
            >
              {selectedProject?.sprints?.map((sprint) => (
                <option key={sprint.sprintName} value={sprint.sprintName}>
                  {sprint.sprintName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-[32%,32%,32%] justify-between mt-16 mx-4">
          <div
            className="flex flex-row justify-evenly items-center rounded-xl"
            style={{ backgroundColor: "lightblue" }}
          >
            <div
              className="p-2 rounded-full"
              style={{ backgroundColor: "#ba61fd" }}
            >
              <FaSquarespace size={18} color="white" />
            </div>
            <div className="flex justify-start items-center mr-16">
              <b>Project Name: {selectedProject?.projectName || "N/A"}</b>
            </div>
          </div>
          <div
            className="flex flex-row justify-evenly items-center rounded-xl"
            style={{ backgroundColor: "lightblue" }}
          >
            <div
              className="p-2 rounded-full"
              style={{ backgroundColor: "#feb72e" }}
            >
              <FaCalendarDay size={18} color="white" />
            </div>
            <div className="flex justify-start items-center mr-16">
              <b>No. of Resources: {selectedSprint?.numOfResources || "N/A"}</b>
            </div>
          </div>
          <div
            className="flex flex-row justify-evenly items-center py-3 rounded-xl"
            style={{ backgroundColor: "lightblue" }}
          >
            <div
              className="p-2 rounded-full"
              style={{ backgroundColor: "#1ed98c" }}
            >
              <FaClock size={18} color="white" />
            </div>
            <div className="flex justify-start items-center mr-16">
              <b>Sprint Name: {selectedSprint?.sprintName || "N/A"}</b>
            </div>
          </div>
        </div>
      </div>
      {selectedProject?.projectName && selectedSprint?.sprintName && (
        <div>
          <CeremonyContainer
            startDate={selectedSprint.startDate}
            endDate={selectedSprint.endDate}
            projectName={selectedProject.projectName}
            sprintName={selectedSprint.sprintName}
          />

          {/* <AttendanceTable
      startDate={selectedSprint.startDate}
      endDate={selectedSprint.endDate}
    /> */}
          <div className="text-center mt-8">
            <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-xl border-2 border-gray-300 shadow-xl">
              Reset Cermony
            </button>
          </div>
        </div>
      )}

      <LastButtons current={"Dashboard"} />
    </div>
  );
};

export default Dashboard;
