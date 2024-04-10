import React, { useState, useEffect } from "react";
import LastButtons from "./LastButtons";
import "./newInputs.css";
import SprintCapacity from "./SprintCapacity";
import SprintVizualization from "./SprintVizualization";

const AttendanceTable = ({ sidebarToggle }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [storedAllocationsData, setStoredAllocationsData] = useState([]);
  const [dateWeekdayPairs, setDateWeekdayPairs] = useState([]);
  const [mainCompanyData, setMainCompanyData] = useState([]);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showGraph,setShowGraph]= useState(true)


  useEffect(() => {
    // Retrieve stored attendance data and allocations data
    const storedData = JSON.parse(localStorage.getItem("attendanceData")) || [];
    setSelectedValues(storedData);

    // Retrieve selected project and sprint from local storage
    const selectedProjectName = localStorage.getItem("selectedProjectName");
    const selectedSprintName = localStorage.getItem("selectedSprintName");

    // Fetch main company data from localStorage
    const mainCompanyData = JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    setMainCompanyData(mainCompanyData);

    // Find the selected project and sprint
    const selectedProjectData = mainCompanyData.find(project => project.projectName === selectedProjectName);
    setSelectedProject(selectedProjectData);
    const selectedSprintData = selectedProjectData?.sprints.find(sprint => sprint.sprintName === selectedSprintName);
    setSelectedSprint(selectedSprintData);

    if (selectedSprintData && selectedProjectData) {
      // Set storedAllocationsData based on the selected sprint's allocations
      setStoredAllocationsData(selectedSprintData.allocations || []);

      // Generate date-weekday pairs based on the selected sprint's start and end dates
      const dateWeekdayPairs = generateDateWeekdayPairs(selectedSprintData.startDate, selectedSprintData.endDate);
      setDateWeekdayPairs(dateWeekdayPairs);
    }
  }, []);

  // Generate an array of objects, each containing a date and its corresponding weekday
  const generateDateWeekdayPairs = (start, end) => {
    const pairs = [];
    let currentDate = new Date(start);
    const stopDate = new Date(end);

    while (currentDate <= stopDate) {
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      pairs.push({ date: formattedDate, weekday: day });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return pairs;
  };

  // Handle changes in attendance selection
  const handleSelectChange = (index, date, value) => {
    // Update selectedValues state
    const updatedValues = [...selectedValues];
    const existingIndex = updatedValues.findIndex(
      (item) => item.name === storedAllocationsData[index].name && item.date === date
    );
  
    if (existingIndex !== -1) {
      updatedValues[existingIndex].selectedValue = value;
    } else {
      updatedValues.push({
        name: storedAllocationsData[index].name,
        date,
        selectedValue: value,
      });
    }
  
    setSelectedValues(updatedValues);
    localStorage.setItem("attendanceData", JSON.stringify(updatedValues));
  
    // Update main company data with selected values for the current sprint
    if (selectedProject && selectedSprint) {
      const updatedMainCompanyData = mainCompanyData.map((project) => {
        if (project.projectName === selectedProject.projectName) {
          const updatedSprints = project.sprints.map((sprint) => {
            if (sprint.sprintName === selectedSprint.sprintName) {
              // Create a new array with updated values for the current sprint
              const existingSelectedValues = sprint.selectedValues || [];
              const updatedSelectedValues = existingSelectedValues.filter(
                (item) => item.name !== storedAllocationsData[index].name || item.date !== date
              );
              updatedSelectedValues.push({
                name: storedAllocationsData[index].name,
                date,
                selectedValue: value,
              });
              return {
                ...sprint,
                selectedValues: updatedSelectedValues,
              };
            }
            return sprint;
          });
          return {
            ...project,
            sprints: updatedSprints,
          };
        }
        return project;
      });
      setMainCompanyData(updatedMainCompanyData);
      localStorage.setItem("mainCompanyData", JSON.stringify(updatedMainCompanyData));
    }
  };
  // Render attendance selection options for each date
  const renderAttendanceOptions = (index, pair) => {
    const selectedValue =
      selectedValues.find(
        (item) => item.name === storedAllocationsData[index].name && item.date === pair.date
      )?.selectedValue || "";

    let backgroundColor = "";
    let textColor = "";
    let defaultValue = "8"; // Default value for non-Saturdays and Sundays

    // Convert pair.date to a Date object
    const currentDate = new Date(pair.date);

    // Check if it's Saturday (6) or Sunday (0)
    if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
      defaultValue = "0"; // Set default value to "0" for Saturdays and Sundays
      backgroundColor = "gray"; // Set background color to gray for Saturdays and Sundays
      textColor = "black";
    } else {
      if (selectedValue === "0") {
        backgroundColor = "red";
        textColor = "white"; // Absent
      } else if (selectedValue === "4") {
        backgroundColor = "blue";
        textColor = "white"; // Half-day
      }
    }

    return (
      <td key={`${index}-${pair.date}`} style={{ width: "2%", padding: "0px" }}
        className=" border-2 tableCellData"
      >
        <select
          value={selectedValue || defaultValue} // Set default value based on the day of the week
          onChange={(event) =>
            handleSelectChange(index, pair.date, event.target.value)
          }
          style={{
            backgroundColor,
            width: '100%'
          }}
          className="rounded font-semibold py-1.5"
        >
          <option value="0">A (Absent)</option>
          <option value="8">P (Present)</option>
          <option value="4">H (Half-Day)</option>
        </select>
      </td>
    );
  };

  return (
    <div className={`transition-all duration-300   ${sidebarToggle ? "ml-2" : "ml-64"}`}>
      <div className="py-1 mt-16 mx-2 overflow-x-scroll border-4 border-gray-400 rounded-lg ">

        <table className="border border-collapse-2 border-white rounded-xl bg-gray-100">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-gray-200">Days</th>
              <th className="sticky left-28 z-10 bg-gray-200"></th>

              {dateWeekdayPairs.map((pair, index) => (
                <th key={index} className="bg-gray-100 border-2 border-white text-center">
                  <div className="flex items-end py-1 vertical-date1">
                    {pair.weekday}
                  </div>
                </th>
              ))}
            </tr>
            <tr>
              <th className="border-2 border-white sticky left-0 z-10 bg-gray-100 font-mono ">Team <br />Members</th>
              <th className="border-2 border-white sticky left-28 z-10 bg-gray-100 font-mono">Roles</th>
              {dateWeekdayPairs.map((pair, index) => (
                <th key={index} className="bg-gray-300 border-2 border-white whitespace-nowrap text-center">
                  <div className="flex items-center py-2 vertical-date">
                    {pair.date}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {storedAllocationsData.map((row, rowIndex) => (
              <tr key={row.name} className={`${rowIndex % 2 === 0 ? 'bg-green-50' : 'bg-gray-200'}`}>
                <td className="border-2 border-white text-center px-8 sticky left-0 z-10 bg-gray-100 font-bold">{row.name}</td>
                <td className="border-2 border-white px-6 text-center sticky left-28 z-10 bg-gray-100 font-semibold">{row.role}</td>
                {dateWeekdayPairs.map((pair, pairIndex) => (
                  <React.Fragment key={pairIndex}>
                    {renderAttendanceOptions(rowIndex, pair)}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <div className="my-20 border-t-2 border-gray-300">
        <SprintCapacity showGraph={showGraph} setShowGraph = {setShowGraph}/>
      </div>
      
      <div className="my-20 border-t-2 border-gray-300">
        <SprintVizualization showGraph={showGraph} setShowGraph = {setShowGraph}/>
      </div>

      <LastButtons current={'AttendanceTable'}/>
    </div>

  );
};
export default AttendanceTable;
