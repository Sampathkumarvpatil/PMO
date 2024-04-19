import React, { useEffect, useState } from "react";
import "./newInputs.css";
import NewSprint from "./NewSprint";
import { useSaveDataToS3 } from "../utils/useSaveDataToS3";
const NewProject = ({ sidebarToggle }) => {
  const [mainCompanyArr, setMainCompanyArr] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [buName, setBuName] = useState("");
  const [resourcesTotalNumber, setResourcesTotalNumber] = useState("");
  const [projectCreated, setProjectCreated] = useState(false);
  const [refreshSprint, setRefreshSprint] = useState(true);
  const { error, saveData, success } = useSaveDataToS3();

  useEffect(() => {
    const dataFromLocalStorage =
      JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    setMainCompanyArr(dataFromLocalStorage);
  }, []);

  const handleCreateProject = () => {
    let existingProject = mainCompanyArr.find(
      (project) => project.projectName === projectName
    );

    if (existingProject) {
      existingProject.companyName = companyName;
      existingProject.buName = buName;
      existingProject.resources = resourcesTotalNumber;
    } else {
      let newProject = {
        companyName: companyName,
        projectName: projectName,
        buName: buName,
        resources: resourcesTotalNumber,
      };
      mainCompanyArr.push(newProject);
    }

    setCompanyName("");
    setProjectName("");
    setBuName("");
    setResourcesTotalNumber("");

    localStorage.setItem("mainCompanyData", JSON.stringify(mainCompanyArr));
    if (!companyName || !projectName || !buName || !resourcesTotalNumber) {
      alert("Please fill all the fields");
      return;
    }

    setProjectCreated(true);

    localStorage.setItem("selectedProjectName", projectName);
    setRefreshSprint(!refreshSprint);
    // setTimeout(() => {
    //   navigate("/NewSprint");
    // }, 2000);
  };

  return (
    <div
      className={`flex justify-around mt-16 transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <div className={`flex justify-center items-center`}>
        <div className="w-96 p-6 shadow-lg rounded-md container">
          <h2 className="text-2xl block text-center font-bold mb-14 text-purple-500">
            New Project
          </h2>
          <div className="mt-5">
            <label
              htmlFor="companyName"
              className="block text-base font-bold mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
              placeholder="Enter Company Name"
              required
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="projectName"
              className="block text-base font-bold mb-2"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
              placeholder="Enter Project Name"
              required
            />
          </div>
          <div className="mt-5">
            <label htmlFor="buName" className="block text-base font-bold mb-2">
              BU Name
            </label>
            <input
              type="text"
              id="buName"
              value={buName}
              onChange={(e) => setBuName(e.target.value)}
              className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
              placeholder="Enter BU Name"
              required
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="resourcesTotalNumber"
              className="block text-base font-bold mb-2"
            >
              Number of Resources
            </label>
            <input
              type="number"
              id="resourcesTotalNumber"
              value={resourcesTotalNumber}
              onChange={(e) => setResourcesTotalNumber(e.target.value)}
              className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
              placeholder="Enter No. of Resources"
              required
            />
          </div>

          <div className="mt-5 text-center">
            <button
              onClick={handleCreateProject}
              className="text-white font-bold py-2 px-4 w-40 rounded-xl border-2 border-gray-300 shadow-xl"
              style={{
                background:
                  "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
                transition: "background-color 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background =
                  "linear-gradient(0deg, rgba(253,187,45,1) 0%, rgba(34,193,195,1) 100%)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)")
              }
            >
              Create Project
            </button>
          </div>
          {projectCreated && (
            <div className="text-green-500 font-bold mt-4 text-center">
              Your project is created!
            </div>
          )}
        </div>
      </div>
      <NewSprint refreshSprint={refreshSprint} />
    </div>
  );
};

export default NewProject;
