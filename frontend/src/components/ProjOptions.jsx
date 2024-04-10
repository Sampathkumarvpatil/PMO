import React, { useState, useEffect } from 'react';

const ProjOptions = () => {
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
    const sprint = selectedProject.sprints.find(
      (s) => s.sprintName === sprintName
    );
    setSelectedSprint(sprint);
    localStorage.setItem("selectedSprintName", sprintName);

    // Stored the date in the local storage
    localStorage.setItem("sprintStartDate", sprint.startDate);
    localStorage.setItem("sprintEndDate", sprint.endDate);
  };

  return (
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
  );
};

export default ProjOptions;
