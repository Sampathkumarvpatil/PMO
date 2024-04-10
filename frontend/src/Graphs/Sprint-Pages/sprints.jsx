import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sprint.css";

const sortSprintData = (data) => {
  return data.sort((a, b) => {
    const sprintNameA = Object.keys(a)[0];
    const sprintNameB = Object.keys(b)[0];
    return sprintNameA.localeCompare(sprintNameB, undefined, { numeric: true });
  });
};
function Sprints({ sidebarToggle }) {
  console.log('sbt',sidebarToggle)
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [startSprint, setStartSprint] = useState();
  const [endSprint, setEndSprint] = useState();
  const [sprintsData, setSprintsData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [numSprints, setNumSprints] = useState(1);
  const [sprintsList, setSprintsList] = useState([]);
  const [selectedSprintData, setSelectedSprintData] = useState([]);
  // Initialize with 1 as default

  useEffect(()=>{
    const selectedProjectName = localStorage.getItem("selectedProjectName");
    const sData = JSON.parse(localStorage.getItem('sprintsData'));
    console.log(sData)
    for(let key in Object.keys(sData[selectedProjectName])){
      // console.log('key',key)
      let sName = Object.keys(sData[selectedProjectName][key])[0]
      // console.log('pname',selectedProjectName)
      // console.log('sname',sName)
      // console.log(sData[selectedProjectName][key][sName])

      const tasks = JSON.parse(localStorage.getItem(`${selectedProjectName}${sName}`))||{}
      sData[selectedProjectName][key][sName]['plannedTasks'] = Object.values(tasks).length

      let tasksCompleted = 0;
      Object.values(tasks).map((it)=>{
        if(it['status'] == 100){
          tasksCompleted++;
        }
      })

      sData[selectedProjectName][key][sName]['tasksCompleted'] = tasksCompleted

      // console.log('----',sData[selectedProjectName][key][sName])
      localStorage.setItem('sprintsData',JSON.stringify(sData))

    }
  },[])


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


        // console.log('sortedSprintData',sortedSprintData)
        // sortedSprintData.forEach((it)=>{
        //   console.log(it)
        // })

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
  }, [startSprint, endSprint, sprintsList, sprintsData]);
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

  const renderSprintsData = () => {
    return selectedSprintData.map((sprint, index) => {
      const data = Object.values(sprint)[0];
      const sprintName = Object.keys(sprint)[0];

      return (
        <tr key={sprintName} className="points border-b-2 border-gray-400 hover:bg-gray-400">
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
      className={` transition-all duration-300 ${sidebarToggle ? 'ml-0' : 'ml-64'}`}
    >
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

            {renderSprintsData()}
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
      
    </div>
  );
}

export default Sprints;
