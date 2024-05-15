import React, { useState, useEffect } from "react";
import { useGetS3Folders } from "../utils/useGetS3Folders";

const ProjOptions = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [sprintData, setSprintData] = useState(null);
  const [availableProjects, setAvailableProjects] = useState([]);

  const {
    data: s3FoldersData,
    error: getFolderErrror,
    fetchData: fetchS3Folders,
  } = useGetS3Folders();

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
      let currentProject = localStorage.getItem("currentProject");
      let currentSprint = localStorage.getItem("currentSprint");

      if (currentProject && currentSprint) {
        currentProject = JSON.parse(currentProject);
        currentSprint = JSON.parse(currentSprint);
        setSelectedProject(currentProject);
        setSelectedSprint(currentSprint);
      } else {
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
      }

      setAvailableProjects(parsedProjectData);
    }
  }, [s3FoldersData]);

  const handleProjectChange = (e) => {
    const projectName = e.target.value;
    const project = availableProjects?.find(
      (p) => p?.baseInfo.projectName === projectName
    );
    setSelectedProject(project);
    localStorage.setItem("currentProject", JSON.stringify(project));
    window.location.reload();
  };

  const handleSprintChange = (e) => {
    const sprintName = e.target.value;
    const sprint = selectedProject.sprints.find(
      (s) => s.sprintName === sprintName
    );
    setSelectedSprint(sprint);
    localStorage.setItem("currentSprint", JSON.stringify(sprint));

    // Stored the date in the local storage
    localStorage.setItem("sprintStartDate", sprint.startDate);
    localStorage.setItem("sprintEndDate", sprint.endDate);
    window.location.reload();
  };

  return (
    <div className="flex flex-row justify-between mx-4 my-8 ">
      <div className="bg-blue-600 text-white rounded-xl p-1.5 pl-4 pr-4 flex items-center">
        <label className="font-bold mr-2">Project: </label>
        <select
          className="text-black rounded-lg px-9 py-1 bg-white border shadow-xl"
          onChange={handleProjectChange}
          value={selectedProject?.baseInfo?.projectName || ""}
        >
          {Array.isArray(availableProjects) &&
            availableProjects?.map((project) => (
              <option
                key={project?.baseInfo?.projectName}
                value={project?.baseInfo?.projectName}
              >
                {project?.baseInfo?.projectName}
              </option>
            ))}
        </select>
      </div>
      <div className="absolute top-24 right-4 bg-blue-600 text-white rounded-xl p-1.5 pl-4 pr-4 flex items-center">
        <label className="font-bold text-black mr-2 text-white">
          Select Sprint:
        </label>
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
  );
};

export default ProjOptions;
