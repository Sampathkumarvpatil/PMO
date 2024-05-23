import React, { useState, useEffect, useContext } from "react";
// import Navbar from "./Navbar";
import { FaCalendarDay, FaClock, FaSquarespace } from "react-icons/fa";
import "../Sidebar.css";
import CeremonyContainer from "./CeremonyContainer";
import LastButtons from "./LastButtons";

import { useGetS3Folders } from "../utils/useGetS3Folders";
// import AttendanceTable from "./AttendenceTable";
// import { Link } from 'react-router-dom';

const Dashboard = ({ sidebarToggle }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [sprintData, setSprintData] = useState(null);
  const {
    data: s3FoldersData,
    error: getFolderErrror,
    fetchData: fetchS3Folders,
  } = useGetS3Folders(); // getting all project details and and based on names need to show the project list
  const [availableProjects, setAvailableProjects] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const key = sessionStorage.getItem("key");
      await fetchS3Folders(key);
    };
    fetchFolders();
  }, []);

  useEffect(() => {
    if (
      s3FoldersData &&
      s3FoldersData?.length > 0 &&
      Array.isArray(s3FoldersData)
    ) {
      const parsedProjectData = s3FoldersData.map((file) => {
        return JSON.parse(file?.Content);
      });

      setSelectedProject(parsedProjectData[0]);
      localStorage.setItem(
        "currentProject",
        JSON.stringify(parsedProjectData[0])
      );

      if (parsedProjectData[0]?.sprints?.length > 0) {
        setSprintData(parsedProjectData[0]?.sprints);
        setSelectedSprint(parsedProjectData[0]?.sprints[0]);
        localStorage.setItem(
          "currentSprint",
          JSON.stringify(parsedProjectData[0]?.sprints[0])
        );
      } else {
        localStorage.setItem("currentSprint", JSON.stringify(null));
      }

      setAvailableProjects(parsedProjectData);
    }
  }, [s3FoldersData]);

  const handleProjectChange = async (e) => {
    const projectName = e.target.value;
    const project = availableProjects.find(
      (p) => p?.baseInfo?.projectName === projectName
    );
    setSelectedProject(project);
    localStorage.setItem("currentProject", JSON.stringify(project));

    if (
      project?.sprints &&
      project.sprints.length > 0 &&
      Array.isArray(project.sprints)
    ) {
      setSprintData(project?.sprints);
      setSelectedSprint(project?.sprints[0]);
      localStorage.setItem(
        "currentSprint",
        JSON.stringify(project?.sprints[0])
      );
    } else {
      setSprintData(null);
      setSelectedSprint(null);
      localStorage.setItem("currentSprint", "");
    }
    // localStorage.setItem("selectedProjectName", projectName);
    // const jsonResponse = await fetchData(projectName);
    // if (jsonResponse) {
    //   setDbProject(jsonResponse);
    // } else return;
  };

  const handleSprintChange = (e) => {
    const sprintName = e.target.value;

    const sprint = selectedProject?.sprints.find(
      (s) => s.sprintName === sprintName
    );
    setSelectedSprint(sprint);
    localStorage.setItem("currentSprint", JSON.stringify(sprint));
    localStorage.setItem("selectedSprintName", sprintName);

    //stored the date in the localstorage
    // localStorage.setItem("sprintStartDate", sprint.startDate);
    // localStorage.setItem("sprintEndDate", sprint.endDate);
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
              value={selectedProject?.baseInfo.projectName || ""}
            >
              {availableProjects.map((project) => (
                <option
                  key={project?.baseInfo?.projectName}
                  value={project?.baseInfo?.projectName}
                >
                  {project?.baseInfo?.projectName}
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
              {sprintData?.map((sprint) => (
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
              <b>
                Project Name: {selectedProject?.baseInfo?.projectName || "N/A"}
              </b>
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
      {selectedProject?.baseInfo?.projectName && selectedSprint?.sprintName && (
        <div>
          <CeremonyContainer
            projectName={selectedProject?.baseInfo?.projectName}
            selectedSprint={selectedSprint}
            setSelectedSprint={(newSprint) => {
              localStorage.setItem("currentSprint", JSON.stringify(newSprint));
              setSelectedSprint(newSprint);
            }}
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
