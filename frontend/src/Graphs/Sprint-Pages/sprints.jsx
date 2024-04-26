import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sprint.css";
import ProjOptions from "../../components/ProjOptions";

import LastButtons from "../../components/LastButtons";

const sortSprintData = (data) => {
  return data.sort((a, b) => {
    const sprintNameA = Object.keys(a)[0];
    const sprintNameB = Object.keys(b)[0];
    return sprintNameA.localeCompare(sprintNameB, undefined, { numeric: true });
  });
};
function Sprints({ sidebarToggle }) {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [startSprint, setStartSprint] = useState();
  const [endSprint, setEndSprint] = useState();
  const [sprintsData, setSprintsData] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [numSprints, setNumSprints] = useState(1);
  const [sprintsList, setSprintsList] = useState([]);
  const [selectedSprintData, setSelectedSprintData] = useState([]);
  // Initialize with 1 as default

  useEffect(() => {
    const selectedProjectName = localStorage.getItem("selectedProjectName");
    const dataFromLocalStorage =
      JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    const selectedProject = dataFromLocalStorage.find(
      (project) => project.projectName === selectedProjectName
    );
    setSelectedProject(selectedProject);
  }, []);

  useEffect(() => {
    const selectedProjectName = localStorage.getItem("selectedProjectName");

    const sData = JSON.parse(localStorage.getItem("sprintsData"));

    for (let key in Object.keys(sData[selectedProjectName])) {
      let sName = Object.keys(sData[selectedProjectName][key])[0];

      const tasks =
        JSON.parse(localStorage.getItem(`${selectedProjectName}${sName}`)) ||
        {};
      sData[selectedProjectName][key][sName]["plannedTasks"] =
        Object.values(tasks).length;

      let tasksCompleted = 0;
      Object.values(tasks).map((it) => {
        if (it["status"] == 100) {
          tasksCompleted++;
        }
      });

      sData[selectedProjectName][key][sName]["tasksCompleted"] = tasksCompleted;

      const mainCompanyData = JSON.parse(
        localStorage.getItem("mainCompanyData")
      );
      mainCompanyData.map((item) => {
        if (item.projectName == selectedProjectName) {
          item.sprints.map((it) => {
            if (it["sprintName"] == sName) {
              sData[selectedProjectName][key][sName]["workHoursUsed"] =
                it["remaining_hrs"];
              sData[selectedProjectName][key][sName][
                "totalAvailableWorkHours"
              ] = it["final_hrs"];
              sData[selectedProjectName][key][sName]["plannedWorkHours"] =
                it["effective_hrs"];
            }
          });
        }
      });

      localStorage.setItem("sprintsData", JSON.stringify(sData));
    }
  }, []);

  useEffect(() => {
    const selectedProjectName = localStorage.getItem("selectedProjectName");
    // To create new Structure
    let loadedSprintsData = [];

    const allSprintKpi = JSON.parse(localStorage.getItem("sprintsData")) || {};

    if (selectedProject?.projectName && Object.keys(allSprintKpi)?.length > 0) {
      loadedSprintsData = allSprintKpi[selectedProject?.projectName];

      const sprints = Object.keys(loadedSprintsData);
      if (sprints.length > 0) {
        const sortedSprintData = sortSprintData(loadedSprintsData);
        const sprintKeys = sortedSprintData.map(
          (sprint) => Object.keys(sprint)[0]
        );

        setSprintsData(sortedSprintData);
        setSprintsList(sprintKeys);
        setStartSprint(sprintKeys[0]);
        setEndSprint(sprintKeys[0]);
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    if (startSprint && endSprint) {
      const startSprintIndex = sprintsList.findIndex(
        (item) => item === startSprint
      );
      const endSprintIndex = sprintsList.findIndex(
        (item) => item === endSprint
      );

      if (
        startSprintIndex !== -1 &&
        endSprintIndex !== -1 &&
        startSprintIndex <= endSprintIndex
      ) {
        const activeSprints = [];

        for (let i = startSprintIndex; i <= endSprintIndex; i++) {
          activeSprints.push(sprintsData[i]);
        }
        setSelectedSprintData(activeSprints);
      } else {
        setSelectedSprintData([]);
      }
    }
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
      // const selectedSprints = sprintsData.filter((sprintData) => {
      //   const sprintNumber = sprintData.id
      //     ? parseInt(sprintData.id.split(" ")[1])
      //     : 0;
      //   return sprintNumber >= startNumber && sprintNumber <= endNumber;
      // });

      navigate("/multipleSprintsChart", {
        state: {
          selectedSprints: selectedSprintData,
          startSprint,
          endSprint,
        },
      });
    } else {
      const singleSprintData = Object.values(selectedSprintData[0])[0];

      const completionRate =
        singleSprintData.plannedTasks === 0 ||
        singleSprintData.tasksCompleted === 0
          ? 0 // or 100, depending on what you want the completion rate to be when there are no planned tasks
          : Math.floor(
              (Number(singleSprintData.tasksCompleted) /
                Number(singleSprintData.plannedTasks)) *
                100 *
                1000
            ) / 1000;
      const workEfficiencyRatio =
        singleSprintData.plannedWorkHours === 0 ||
        singleSprintData.workHoursUsed === 0
          ? 0
          : Math.floor(
              (Number(singleSprintData.workHoursUsed) /
                Number(singleSprintData.plannedWorkHours)) *
                100 *
                1000
            ) / 1000;
      const inSprintDefectsRatio =
        singleSprintData.tasksCompleted === 0 ||
        singleSprintData.inSprintDefects === 0
          ? 0
          : Math.floor(
              (Number(singleSprintData.inSprintDefects) /
                Number(singleSprintData.tasksCompleted)) *
                100 *
                1000
            ) / 1000;
      const postSprintDefectsRatio =
        singleSprintData.tasksCompleted === 0 ||
        singleSprintData.postSprintDefects === 0
          ? 0
          : Math.floor(
              (Number(singleSprintData.postSprintDefects) /
                Number(singleSprintData.tasksCompleted)) *
                100 *
                1000
            ) / 1000;
      const extraTasksRate =
        singleSprintData.plannedTasks === 0 ||
        singleSprintData.extraTasksAdded === 0
          ? 0
          : Math.floor(
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
    const updatedSprintsData = [...selectedSprintData];

    updatedSprintsData[sprintIndex][
      Object.keys(selectedSprintData[sprintIndex])[0]
    ][field] = value;
    setSelectedSprintData(updatedSprintsData);
    const stateSprintData = [...sprintsData];
    stateSprintData[sprintIndex][
      Object.keys(selectedSprintData[sprintIndex])[0]
    ][field] = value;
    setSprintsData(stateSprintData);
  };

  const renderSprintsData = () => {
    return selectedSprintData.map((sprint, index) => {
      const data = Object.values(sprint)[0];
      const sprintName = Object.keys(sprint)[0];

      return (
        <tr
          key={sprintName}
          className="points border-b-2 border-gray-400 hover:bg-gray-400"
        >
          <td className="m-4 ">{sprintName}</td>
          <td
            className="m-4"
            contentEditable={editMode}
            onBlur={(e) =>
              handleInputChange(
                index,
                "plannedTasks",
                parseInt(e.target.textContent) || 0
              )
            }
          >
            {data.plannedTasks}
          </td>
          <td
            className="m-4 "
            contentEditable={editMode}
            onBlur={(e) =>
              handleInputChange(
                index,
                "tasksCompleted",
                parseInt(e.target.textContent) || 0
              )
            }
          >
            {data.tasksCompleted}
          </td>
          <td
            className="m-4 "
            contentEditable={editMode}
            onBlur={(e) =>
              handleInputChange(
                index,
                "extraTasksAdded",
                parseInt(e.target.textContent) || 0
              )
            }
          >
            {data.extraTasksAdded}
          </td>
          <td
            className="m-4 "
            contentEditable={editMode}
            onBlur={(e) =>
              handleInputChange(
                index,
                "descopedTasks",
                parseInt(e.target.textContent) || 0
              )
            }
          >
            {data.descopedTasks}
          </td>
          <td
            className="m-4 "
            contentEditable={editMode}
            onBlur={(e) =>
              handleInputChange(
                index,
                "totalAvailableWorkHours",
                parseInt(e.target.textContent) || 0
              )
            }
          >
            {data.totalAvailableWorkHours}
          </td>
          <td
            className="m-4 "
            contentEditable={editMode}
            onBlur={(e) =>
              handleInputChange(
                index,
                "plannedWorkHours",
                parseInt(e.target.textContent) || 0
              )
            }
          >
            {data.plannedWorkHours}
          </td>
          <td
            className="m-4 "
            contentEditable={editMode}
            onBlur={(e) =>
              handleInputChange(
                index,
                "workHoursUsed",
                parseInt(e.target.textContent) || 0
              )
            }
          >
            {data.workHoursUsed}
          </td>
          <td
            className="m-4 "
            contentEditable={editMode}
            onBlur={(e) =>
              handleInputChange(
                index,
                "inSprintDefects",
                parseInt(e.target.textContent) || 0
              )
            }
          >
            {data.inSprintDefects}
          </td>
          <td
            className="m-4 p-6"
            contentEditable={editMode}
            onBlur={(e) =>
              handleInputChange(
                index,
                "postSprintDefects",
                parseInt(e.target.textContent) || 0
              )
            }
          >
            {data.postSprintDefects}
          </td>
        </tr>
      );
    });
  };
  return (
    <div
      className={` transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <ProjOptions />
      <div className="flex justify-center gap-10 mt-6">
        <div className="dropdown-container1">
          <div className="dropdown text-xl p-2">
            <label htmlFor="start-sprint">Start Sprint:</label>
            <select
              id="start-sprint"
              value={startSprint}
              onChange={(e) => setStartSprint(e.target.value)}
            >
              {selectedProject &&
                selectedProject.sprints.map((sprint) => (
                  <option
                    key={sprint.sprintName}
                    value={sprint.sprintName}
                    className="text-xl text-center"
                  >
                    {sprint.sprintName}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="dropdown-container2">
          <div className="dropdown text-xl p-2">
            <label htmlFor="end-sprint">End Sprint:</label>
            <select
              id="end-sprint"
              value={endSprint}
              onChange={(e) => setEndSprint(e.target.value)}
            >
              {selectedProject &&
                selectedProject.sprints
                  .filter(
                    (sprint) =>
                      sprintsList.findIndex(
                        (sprintName) => sprintName === sprint.sprintName
                      ) >=
                      sprintsList.findIndex(
                        (sprintName) => sprintName === startSprint
                      )
                  )
                  .map((sprint) => (
                    <option
                      key={sprint.sprintName}
                      value={sprint.sprintName}
                      className="text-xl text-center"
                    >
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
              <th>Sprint No.</th>
              <th>Planned Tasks</th>
              <th>Tasks Completed</th>
              <th>Extra tasks added</th>
              <th>Descoped Tasks</th>
              <th>Total available work hours</th>
              <th>Planned work hours</th>
              <th>Work hours used</th>
              <th>In-Sprint Defects Identified</th>
              <th>Post-Sprint Defects Identified</th>
            </tr>

            {renderSprintsData()}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-10 mx-6 mt-6">
        <div>
          {/* <button
            className="edit-button"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Edit" : "Edit"}
          </button> */}
        </div>
        <div>
          {/* {editMode && (
            <button className="save-button" onClick={handleSave}>
              Submit
            </button>
          )} */}
          {/* <button className="save-button" onClick={handleSave}>
            Submit
          </button> */}
        </div>
      </div>
      <LastButtons current={"Sprints"} handleSave={handleSave} />
    </div>
  );
}

export default Sprints;
