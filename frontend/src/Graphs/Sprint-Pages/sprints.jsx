import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sprint.css";

function Sprints({ sidebarToggle }) {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [startSprint, setStartSprint] = useState("Sprint 1");
  const [endSprint, setEndSprint] = useState("Sprint 1");
  const [sprintsData, setSprintsData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [numSprints, setNumSprints] = useState(1); // Initialize with 1 as default

  useEffect(() => {
    const selectedProjectName = localStorage.getItem("selectedProjectName");
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    const selectedProject = dataFromLocalStorage.find(project => project.projectName === selectedProjectName);
    setSelectedProject(selectedProject);
  }, []);

  useEffect(() => {
    const start = parseInt(startSprint.split(" ")[1]);
    const end = parseInt(endSprint.split(" ")[1]);

    const loadedSprintsData = [];
    for (let i = start; i <= end; i++) {
      const storedSprintData = JSON.parse(localStorage.getItem(`sprintData_Sprint ${i}`));
      if (storedSprintData) {
        loadedSprintsData.push(JSON.parse(storedSprintData));
        console.log(loadedSprintsData, "LOOOOAADDDDD")
      } else {
        loadedSprintsData.push({
          id: `Sprint ${i}`,
          sprintNO: i,
          plannedTasks: 0,
          tasksCompleted: 0,
          extraTasksAdded: 0,
          plannedWorkHours: 0,
          workHoursUsed: 0,
          inSprintDefects: 0,
          postSprintDefects: 0,
          descopedTasks: 0,
          totalAvailableWorkHours: 0,
        });
      }
    }
    const selectedProjectName = localStorage.getItem("selectedProjectName");
// To create new Structure
    setSprintsData(loadedSprintsData);
    setNumSprints(loadedSprintsData.length);
    const allSprintKpi = JSON.parse(localStorage.getItem('sprintsData'))|| {}
    allSprintKpi[selectedProjectName]=loadedSprintsData;
    localStorage.setItem("sprintsData", JSON.stringify(allSprintKpi)) // Set the number of sprints based on the loaded data
  }, [startSprint, endSprint]);

  const handleSave = () => {
    const startNumber = parseInt(startSprint.split(" ")[1]);
    const endNumber = parseInt(endSprint.split(" ")[1]);

    if (startNumber > endNumber) {
      alert(
        "The End Sprint date should always be greater than or equal to the Start Sprint date."
      );
      return;
    }

    // localStorage.setItem("AllSprintKpi", loadedSprintsData)
    sprintsData.forEach((sprintData) => {
      localStorage.setItem(
        `sprintData_${sprintData.id}`,
        JSON.stringify(sprintData)
      );
    });
    

    if (startSprint !== endSprint) {
      const selectedSprints = sprintsData.filter((sprintData) => {
        const sprintNumber = sprintData.id
          ? parseInt(sprintData.id.split(" ")[1])
          : 0;
        return sprintNumber >= startNumber && sprintNumber <= endNumber;
      });

      navigate("/multipleSprintsChart", {
        state: {
          selectedSprints,
          startSprint: startSprint,
          endSprint: endSprint,
        },
      });
    } else {
      const singleSprintData = sprintsData[0];
      const completionRate =
        Math.floor(
          (Number(singleSprintData.tasksCompleted) /
            Number(singleSprintData.plannedTasks)) *
            100 *
            1000
        ) / 1000;
      const workEfficiencyRatio =
        Math.floor(
          (Number(singleSprintData.workHoursUsed) /
            Number(singleSprintData.plannedWorkHours)) *
            100 *
            1000
        ) / 1000;
      const inSprintDefectsRatio =
        Math.floor(
          (Number(singleSprintData.inSprintDefects) /
            Number(singleSprintData.tasksCompleted)) *
            100 *
            1000
        ) / 1000;
      const postSprintDefectsRatio =
        Math.floor(
          (Number(singleSprintData.postSprintDefects) /
            Number(singleSprintData.tasksCompleted)) *
            100 *
            1000
        ) / 1000;
      const extraTasksRate =
        Math.floor(
          (Number(singleSprintData.extraTasksAdded) /
            Number(singleSprintData.plannedTasks)) *
            100 *
            1000
        ) / 1000;

      navigate("/chart", {
        state: {
          completionRate,
          plannedTasks: singleSprintData.plannedTasks,
          tasksCompleted: singleSprintData.tasksCompleted,
          workEfficiencyRatio,
          plannedWorkHours: singleSprintData.plannedWorkHours,
          workHoursUsed: singleSprintData.workHoursUsed,
          inSprintDefectsRatio,
          postSprintDefectsRatio,
          extraTasksRate,
          extraTasksAdded: singleSprintData.extraTasksAdded,
          selectedSprint: startSprint,
        },
      });
    }
  };

  const handleInputChange = (sprintIndex, field, value) => {
    const updatedSprintsData = [...sprintsData];
    updatedSprintsData[sprintIndex][field] = value;
    setSprintsData(updatedSprintsData);
  };

  return (
    <div className={` transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"}`}>
      <div className="flex justify-center gap-10 mt-6">
        <div className="dropdown-container1">
          <div className="dropdown">
            <label htmlFor="start-sprint">Start Sprint:</label>
            <select
              id="start-sprint"
              value={startSprint}
              onChange={(e) => setStartSprint(e.target.value)}
            >
              {selectedProject &&
                selectedProject.sprints.map((sprint) => (
                  <option key={sprint.sprintName} value={sprint.sprintName}>
                    {sprint.sprintName}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="dropdown-container2">
          <div className="dropdown">
            <label htmlFor="end-sprint">End Sprint:</label>
            <select
              id="end-sprint"
              value={endSprint}
              onChange={(e) => setEndSprint(e.target.value)}
            >
              {selectedProject &&
                selectedProject.sprints.map((sprint) => (
                  <option key={sprint.sprintName} value={sprint.sprintName}>
                    {sprint.sprintName}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <h1 className="flex justify-center mt-8">Selected Sprints</h1>
      <div className="flex justify-center px-6">
        <table className={`table2 ${editMode ? "editable" : ""}`}>
          <tbody className="table2">
            <tr className="hours">
              <td>Sprint No.</td>
              <td>Planned Tasks</td>
              <td>Tasks Completed</td>
              <td>Extra tasks added</td>
              <td>Descoped Tasks</td>
              <td>Total available work hours</td>
              <td>Planned work hours</td>
              <td>Work hours used</td>
              <td>In-Sprint Defects Identified</td>
              <td>Post-Sprint Defects Identified</td>
            </tr>
            {sprintsData.map((sprintData, index) => (
              <tr key={sprintData.id} className="points">
                <td>{sprintData.id ? sprintData.id.split(" ")[1] : ""}</td>
                <td
                  contentEditable={editMode}
                  onBlur={(e) =>
                    handleInputChange(
                      index,
                      "plannedTasks",
                      parseInt(e.target.textContent) || 0
                    )
                  }
                >
                  {sprintData.plannedTasks}
                </td>
                <td
                  contentEditable={editMode}
                  onBlur={(e) =>
                    handleInputChange(
                      index,
                      "tasksCompleted",
                      parseInt(e.target.textContent) || 0
                    )
                  }
                >
                  {sprintData.tasksCompleted}
                </td>
                <td
                  contentEditable={editMode}
                  onBlur={(e) =>
                    handleInputChange(
                      index,
                      "extraTasksAdded",
                      parseInt(e.target.textContent) || 0
                    )
                  }
                >
                  {sprintData.extraTasksAdded}
                </td>
                <td
                  contentEditable={editMode}
                  onBlur={(e) =>
                    handleInputChange(
                      index,
                      "descopedTasks",
                      parseInt(e.target.textContent) || 0
                    )
                  }
                >
                  {sprintData.descopedTasks}
                </td>
                <td
                  contentEditable={editMode}
                  onBlur={(e) =>
                    handleInputChange(
                      index,
                      "totalAvailableWorkHours",
                      parseInt(e.target.textContent) || 0
                    )
                  }
                >
                  {sprintData.totalAvailableWorkHours}
                </td>
                <td
                  contentEditable={editMode}
                  onBlur={(e) =>
                    handleInputChange(
                      index,
                      "plannedWorkHours",
                      parseInt(e.target.textContent) || 0
                    )
                  }
                >
                  {sprintData.plannedWorkHours}
                </td>
                <td
                  contentEditable={editMode}
                  onBlur={(e) =>
                    handleInputChange(
                      index,
                      "workHoursUsed",
                      parseInt(e.target.textContent) || 0
                    )
                  }
                >
                  {sprintData.workHoursUsed}
                </td>
                <td
                  contentEditable={editMode}
                  onBlur={(e) =>
                    handleInputChange(
                      index,
                      "inSprintDefects",
                      parseInt(e.target.textContent) || 0
                    )
                  }
                >
                  {sprintData.inSprintDefects}
                </td>
                <td
                  contentEditable={editMode}
                  onBlur={(e) =>
                    handleInputChange(
                      index,
                      "postSprintDefects",
                      parseInt(e.target.textContent) || 0
                    )
                  }
                >
                  {sprintData.postSprintDefects}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-10 mx-6 mt-6">
        <div>
          <button
            className="edit-button"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Edit" : "Edit"}
          </button>
        </div>
        <div>
          {editMode && (
            <button className="save-button" onClick={handleSave}>
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <p>Number of sprints: {numSprints}</p>
      </div>
    </div>
  );
}

export default Sprints;
