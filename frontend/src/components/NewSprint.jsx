import React, { useState, useEffect } from "react";
import "./newInputs.css";
import {useNavigate} from "react-router-dom"


const NewSprint = ({sidebarToggle}) => {
  const [mainCompanyArr, setMainCompanyArr] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sprintName, setSprintName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numOfResources, setNumOfResources] = useState("");
  const [SprintCreated, setSprintCreated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    setMainCompanyArr(dataFromLocalStorage);
    if (dataFromLocalStorage.length > 0) {
      setSelectedProject(dataFromLocalStorage[0]);
      setNumOfResources(dataFromLocalStorage[0].resources);
    }
  }, []);

  const handleProjectChange = (e) => {
    const projectName = e.target.value;
    const project = mainCompanyArr.find((p) => p.projectName === projectName);
    setSelectedProject(project);
    setNumOfResources(project.resources);
  };

  const handleCreateSprint = () => {
    

    if (selectedProject) {
      const newSprint = {
        sprintName,
        startDate,
        endDate,
        numOfResources,
      };

      const updatedProject = {
        ...selectedProject,
        sprints: [...(selectedProject.sprints || []), newSprint],
      };

      const updatedMainCompanyArr = mainCompanyArr.map((project) =>
        project.projectName === selectedProject.projectName ? updatedProject : project
      );

      setMainCompanyArr(updatedMainCompanyArr);
      localStorage.setItem("mainCompanyData", JSON.stringify(updatedMainCompanyArr));
      // localStorage.setItem("sprintStartDate", startDate);
      // localStorage.setItem("sprintEndDate", endDate);

      // Reset the form fields
      setSprintName("");
      setStartDate("");
      setEndDate("");
      setNumOfResources("");
    }
    if(!sprintName||!startDate||!endDate) {
      alert('Please fill all the fields')
      return;
      
    }

localStorage.setItem("selectedSprintName", sprintName);
    

    setSprintCreated(true);
    setTimeout(() => {
      navigate("/");

      
    }, 2000);


  };
  
  return (
    <div className={`flex justify-center items-center h-screen bg-gray-100 transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"}`}>
      <div className="w-96 p-6 shadow-lg rounded-md container">
        <h2 className="text-2xl block text-center font-bold mb-14 text-purple-500">
          New Sprint
        </h2>
        <div className="mt-5">
          <label htmlFor="projectName" className="block text-base font-bold mb-2">
            Project Name
          </label>
          <select
            className="w-full p-3 text-base focus:outline-none focus:ring-1 gray-600 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 font-mono"
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
        <div className="mt-5">
          <label htmlFor="sprintName" className="block text-base font-bold mb-2">
            Sprint Name
          </label>
          <input
            type="text"
            id="sprintName"
            value={sprintName}
            onChange={(e) => setSprintName(e.target.value)}
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
            placeholder="Enter Sprint Name"
            required
          />
        </div>
        <div className="mt-5">
          <label htmlFor="numOfResources" className="block text-base font-bold mb-2">
            Number of Resources
          </label>
          <input
            type="number"
            id="numOfResources"
            value={numOfResources}
            onChange={(e) => setNumOfResources(e.target.value)}
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="startDate" className="block text-base font-bold mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="endDate" className="block text-base font-bold mb-2">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
          />
        </div>
        <div className="mt-5 text-center">
          <button onClick={handleCreateSprint} className="border-none font-semibold text-white rounded-lg bg-indigo-500 px-4 py-2" style={{
              background:
                "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
            }}>
            Create Sprint
          </button>
          <div>
            {SprintCreated && (
              <div className="text-green-500 font-bold mt-4 text-center">
              Your Sprint is created!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSprint;
