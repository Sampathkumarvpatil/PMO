import React, { useState, useEffect } from "react";
import LastButtons from "./LastButtons";
import "./newInputs.css";

const SprintCapacity = ({ showGraph, setShowGraph }) => {
  const [storedAllocationsData, setStoredAllocationsData] = useState([]);
  const [dateWeekdayPairs, setDateWeekdayPairs] = useState([]);
  const [totalCeremonyHours, setTotalCeremonyHours] = useState(0);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [total, setTotal] = useState(0); // Define the state for total

  const selectedProjectName = localStorage.getItem("selectedProjectName");
  const selectedSprintName = localStorage.getItem("selectedSprintName");

  useEffect(() => {
    const mainCompanyData =
      JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    const selectedProjectName = localStorage.getItem("selectedProjectName");
    const selectedSprintName = localStorage.getItem("selectedSprintName");

    const project = mainCompanyData.find(
      (project) => project.projectName === selectedProjectName
    );
    const sprint = project?.sprints.find(
      (sprint) => sprint.sprintName === selectedSprintName
    );

    setSelectedProject(project);
    setSelectedSprint(sprint);

    if (sprint) {
      if (!sprint.allocations) {
        alert("Allocations data is not available. Please check your data.");
        return;
      }

      setStoredAllocationsData(sprint.allocations || []);
      setDateWeekdayPairs(
        generateDateWeekdayPairs(sprint.startDate, sprint.endDate)
      );
      // Fetch TotalCeremonyHours from localStorage
      const ceremonyHours = localStorage.getItem("TotalCeremonyHours");
      setTotalCeremonyHours(ceremonyHours ? parseFloat(ceremonyHours) : 0);

      // Calculate the effective total
      const effectiveTotal = calculateEffectiveTotal();
      setTotal(effectiveTotal); // Set the state for the effective total
    }
    console.log("Consoled the use Effect");
    setShowGraph(!showGraph);
  }, []);

  const generateDateWeekdayPairs = (start, end) => {
    const pairs = [];
    let currentDate = new Date(start);
    const stopDate = new Date(end);

    while (currentDate <= stopDate) {
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const day = currentDate.toLocaleDateString("en-US", { weekday: "short" });
      pairs.push({ date: formattedDate, weekday: day });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return pairs;
  };

  const renderAttendanceOptions = (index, pair) => {
    const selectedValue = selectedSprint?.selectedValues?.find(
      (value) =>
        value.name === storedAllocationsData[index].name &&
        value.date === pair.date
    );
    let allocationPercentage = storedAllocationsData[index].hrPerDay;
    let cellValue = selectedValue
      ? selectedValue.selectedValue
      : storedAllocationsData[index].hrPerDay;
    if (allocationPercentage === 4 && selectedValue?.selectedValue) {
      cellValue = cellValue / 2;
    }
    // Default value is 8 (Present)

    // Convert pair.date to a Date object
    const currentDate = new Date(pair.date);

    // Check if it's Saturday (6) or Sunday (0)
    if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
      // If attendance data is available for Saturday or Sunday, set the cellValue accordingly
      cellValue = selectedValue ? selectedValue.selectedValue : 0; // Default to Absent for Saturdays and Sundays
    }

    const isWeekend = currentDate.getDay() === 6 || currentDate.getDay() === 0;

    const backgroundColor =
      cellValue === "0"
        ? "red" // Red background color for absent days
        : cellValue === "4"
          ? "blue"
          : cellValue === 4
            ? "blue" // Blue background color for half-day
            : cellValue === "8"
              ? "inherit"
              : isWeekend
                ? "gray" // Gray background color for Saturdays and Sundays
                : "inherit"; // Default background color

    const textColor = isWeekend
      ? cellValue === "8"
        ? "black"
        : "white"
      : cellValue === "0"
        ? "white"
        : cellValue === "4"
          ? "white"
          : cellValue === 4
            ? "white"
            : "black";

    return (
      <td
        align="center"
        key={`${index}-${pair.date}`}
        style={{ backgroundColor: backgroundColor, color: textColor }}
        className="px-4 py-1.5 border-2 rounded-lg tableCellData font-semibold"
      >
        {cellValue}
      </td>
    );
  };

  const calculateTotal = (i) => {
    let grandTotal = 0;
    grandTotal += calculateSubTotal(i);
    grandTotal -= Number(totalCeremonyHours); // Subtract TotalCeremonyHours from the total
    return grandTotal;
  };

  const calculateSubTotal = (rowIndex) => {
    const selectedSprintName = localStorage.getItem('selectedSprintName')
    const selectedProjectName = localStorage.getItem('selectedProjectName')
    let subTotal = 0;
    const atData = JSON.parse(localStorage.getItem("attendanceData"))
    let attendanceData = []
    if(atData && atData[`${selectedProjectName}${selectedSprintName}`]){
      attendanceData = atData[`${selectedProjectName}${selectedSprintName}`]
    }
    // const attendanceData =
    //   JSON.parse(localStorage.getItem("attendanceData"))[`${selectedProjectName}${selectedSprintName}`] || [];
    const row = storedAllocationsData[rowIndex];
    // console.log('storedAllocationsData[rowIndex]',storedAllocationsData[rowIndex].name)

    for (const datePair of dateWeekdayPairs) {
      const date = datePair.date;
      const currentDate = new Date(date);
      const mainCompanyData = JSON.parse(
        localStorage.getItem("mainCompanyData")
      );
      if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
        const attendance = attendanceData.find(
          (item) => item.name === row?.name && item.date === date
        );

        if (attendance && attendance.selectedValue !== "0") {
          subTotal += parseInt(attendance.selectedValue);
        }
      } else {
        const attendance = attendanceData.find(
          (item) => item.name === row?.name && item.date === date
        );

        let cellValue = storedAllocationsData[rowIndex].hrPerDay; // Default value is (Present)
        let allocationPercentage = storedAllocationsData[rowIndex].hrPerDay;

        if (attendance) {
          if (attendance.selectedValue === "0") {
            cellValue = 0; // Absent
          } else if (attendance.selectedValue === "4") {
            cellValue = 4; // Half-day
          }
        }

        if (allocationPercentage === 4 && attendance?.selectedValue == "4") {
          cellValue = cellValue / 2;
        }

        subTotal += cellValue;
      }
    }

    let mainCompanyData =
      JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    storedAllocationsData[rowIndex]["sumTotalWorkingHours"] = subTotal;
    // Update the specific storedAllocationsData object within mainCompanyData
    mainCompanyData = mainCompanyData.map((project) => {
      if (project.projectName === selectedProject.projectName) {
        return {
          ...project,
          sprints: project.sprints.map((sprint) => {
            if (sprint.sprintName === selectedSprint.sprintName) {
              return {
                ...sprint,
                allocations: storedAllocationsData,
              };
            }
            return sprint;
          }),
        };
      }
      return project;
    });

    // console.log(storedAllocationsData[rowIndex]);
    localStorage.setItem("mainCompanyData", JSON.stringify(mainCompanyData));
    // localStorage.setItem()
    return subTotal;
  };

  const calculateEffectiveTotal = () => {
    let grandTotal = 0;
    for (let i = 0; i < storedAllocationsData.length; i++) {
      grandTotal += calculateTotal(i);
      grandTotal = Number(grandTotal.toFixed(2));
      console.log(grandTotal)
    }

    localStorage.setItem("effectiveHours", grandTotal);

    let mainCompanyData = JSON.parse(localStorage.getItem("mainCompanyData"));

    if (mainCompanyData && Array.isArray(mainCompanyData)) {
      mainCompanyData = mainCompanyData.map((project) => {
        if (project.projectName === selectedProjectName) {
          return {
            ...project,
            sprints: project.sprints.map((sprint) => {
              if (sprint.sprintName === selectedSprintName) {
                return {
                  ...sprint,
                  effective_hrs: grandTotal,
                };
              }
              return sprint;
            }),
          };
        }
        return project;
      });

      localStorage.setItem("mainCompanyData", JSON.stringify(mainCompanyData));
    }
    return grandTotal;
  };
  const calculateGrandTotal = () => {
    let grandTotal = 0;
    for (let i = 0; i < storedAllocationsData.length; i++) {
      grandTotal += calculateTotal(i);
    }
    grandTotal += storedAllocationsData.length * totalCeremonyHours;
    localStorage.setItem("finalHours", grandTotal);

    let mainCompanyData = JSON.parse(localStorage.getItem("mainCompanyData"));

    if (mainCompanyData && Array.isArray(mainCompanyData)) {
      mainCompanyData = mainCompanyData.map((project) => {
        if (project.projectName === selectedProjectName) {
          return {
            ...project,
            sprints: project.sprints.map((sprint) => {
              if (sprint.sprintName === selectedSprintName) {
                return {
                  ...sprint,
                  final_hrs: grandTotal,
                };
              }
              return sprint;
            }),
          };
        }
        return project;
      });
      // Update localStorage with the modified mainCompanyData
      localStorage.setItem("mainCompanyData", JSON.stringify(mainCompanyData));
    } else {
      console.error("mainCompanyData is null or not an array");
    }

    return grandTotal;
  };
  return (
    <div className={``}>
      <div className="mt-8 mx-2 overflow-x-scroll border-4 border-gray-400 rounded-lg">
        <div style={{ width: 'fit-content' }}>
          <table className="min-w-max border border-collapse-2 border-white rounded-xl bg-gray-100">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-gray-200">Days</th>
                <th className="sticky left-28 z-10 bg-gray-200"></th>
                {dateWeekdayPairs.map((pair, index) => (
                  <th
                    key={index}
                    className="bg-gray-100 border-2 border-white text-center"
                  >
                    <div className="flex items-end py-1 vertical-date1">
                      {pair.weekday}
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border-2 border-white sticky left-0 z-10 bg-gray-100 font-mono">
                  Team <br />
                  Members
                </th>
                <th className="border-2 border-white sticky left-28 z-10 bg-gray-100 font-mono">
                  Roles
                </th>
                {dateWeekdayPairs.map((pair, index) => (
                  <th
                    key={index}
                    className="bg-gray-300 border-2 border-white whitespace-nowrap text-center"
                  >
                    <div className="flex items-center py-2 vertical-date">
                      {pair.date}
                    </div>
                  </th>
                ))}
                <th className="border-2 border-white px-2 sticky top-0 bg-gray-100 z-20">
                  Total Hours
                </th>
                <th className="border-2 border-white px-2 sticky top-0 bg-gray-100 z-20">
                  Net Available <br /> Time <br /> post meeting
                </th>
              </tr>
            </thead>
            <tbody>
              {storedAllocationsData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${rowIndex % 2 === 0 ? "bg-green-50" : "bg-gray-200"
                    }`}
                >
                  <td className="border-2 border-white text-center px-8 sticky left-0 z-10 bg-gray-100 font-bold">
                    {row.name}
                  </td>
                  <td className="border-2 border-white px-6 text-center sticky left-28 z-10 bg-gray-100 font-semibold">
                    {row.role}
                  </td>
                  {dateWeekdayPairs.map((pair, pairIndex) => (
                    <React.Fragment key={pairIndex}>
                      {renderAttendanceOptions(rowIndex, pair)}
                    </React.Fragment>
                  ))}
                  <td className="border-2 border-white text-center font-mono">
                    {calculateTotal(rowIndex) + totalCeremonyHours}
                  </td>
                  <td className="border-2 border-white text-center font-mono">
                    {calculateTotal(rowIndex)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="min-w-max flex justify-between mt-2 ml-2 bg-gray-200 py-3 rounded-lg">
            <div className="bg-green-600 text-white rounded-lg py-2  ml-2 font-mono text-lg w-60 text-center sticky left-0 z-11">
              <h4 className>Grand Total</h4>
            </div>
            <div className="flex justify-center items-center gap-3 mr-4">
              <div className="bg-green-600 px-5 py-2 rounded-lg text-white font-mono w-24 text-center">
                <h4>{calculateGrandTotal()}</h4>
              </div>
              <div className="bg-green-600 px-5 py-2 rounded-lg text-white font-mono w-24 text-center">
                <h4>{calculateEffectiveTotal()}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintCapacity;
