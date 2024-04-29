// import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import HolidayInputs from "./HolidayInputs";
import OptionsBox from "./OptionsBox";
import EditPopup from "./EditPopup";
import LastButtons from "./LastButtons";

const AllocationInput = ({ sidebarToggle }) => {
  // const [allocations, setAllocations] = useState(() => {
  //   const storedAllocations = localStorage.getItem('allocations');
  //   return storedAllocations ? JSON.parse(storedAllocations) : [];
  // });
  const [mainCompanyArr, setMainCompanyArr] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [allocations, setAllocations] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [sumTotalWorkingHours, setSumTotalWorkingHours] = useState(0);
  const [allocationPercentage, setAllocationPercentage] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(null);
  const [optionsPosition, setOptionsPosition] = useState({ top: 0, left: 0 }); // State to manage position of options box
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // const dataFromLocalStorage =
    //   JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    // setMainCompanyArr(dataFromLocalStorage);

    // const savedProjectName = localStorage.getItem("selectedProjectName");
    // const savedSprintName = localStorage.getItem("selectedSprintName");
    // const project = dataFromLocalStorage.find(
    //   (project) => project.projectName === savedProjectName
    // );
    // setSelectedProject(project);
    // const sprint = project?.sprints.find(
    //   (sprint) => sprint.sprintName === savedSprintName
    // );
    // setSelectedSprint(sprint);

    // if (sprint && sprint.allocations) {
    //   setAllocations(sprint.allocations);
    // } else {
    //   setAllocations([]);
    // }
    let currentProject = localStorage.getItem("currentProject");
    let currentSprint = localStorage.getItem("currentSprint");

    if (currentProject && currentSprint) {
      currentProject = JSON.parse(currentProject);
      currentSprint = JSON.parse(currentSprint);
      setSelectedProject(currentProject);
      console.log(currentSprint);
      if (currentSprint?.allocations) {
        setAllocations(currentSprint?.allocations);
      }

      setSelectedSprint(currentSprint);
    }
  }, []);

  const showOptions = (index, mouseEvent) => {
    setOptionsVisible(index === optionsVisible ? null : index);
    if (mouseEvent) {
      setOptionsPosition({
        top: mouseEvent.clientY + window.pageYOffset,
        left: mouseEvent.clientX + window.pageXOffset,
      });
    }
  };
  const editAndClose = (index, name, role, allocationPercentage) => {
    // Your edit functionality here
    const updatedAllocations = [...allocations];
    const editedAllocation = updatedAllocations[index];

    // Update only the values that are changed
    editedAllocation.name = name !== undefined ? name : editedAllocation.name;
    editedAllocation.role = role !== undefined ? role : editedAllocation.role;
    // editedAllocation.allocationPercentage = allocationPercentage !== undefined ? parseInt(allocationPercentage) : editedAllocation.allocationPercentage;
    editedAllocation.hrPerDay =
      allocationPercentage !== undefined
        ? calculateHrPerDay(parseInt(allocationPercentage))
        : editedAllocation.hrPerDay;

    setAllocations(updatedAllocations);

    let currentSprint = localStorage.getItem("currentSprint");
    if (currentSprint) {
      currentSprint = { ...JSON.parse(currentSprint) };
      if (currentSprint?.allocations) {
        currentSprint.allocations = updatedAllocations;
      } else {
        currentSprint["allocations"] = [];
        currentSprint.allocationss.push(updatedAllocations);
      }
      const initialAttendance = currentSprint?.allocations?.map((user) => {
        return {
          name: user?.name,
          role: user?.role,
          attendance: [
            ...getAttendance(
              user?.hrPerDay,
              currentSprint?.startDate,
              currentSprint?.endDate
            ),
          ],
        };
      });
      currentSprint["attendanceData"] = initialAttendance;
      localStorage.setItem("currentSprint", JSON.stringify(currentSprint));
    }

    updateLocalStorage(updatedAllocations);
    setOptionsVisible(null); // Close options after action
    setEditIndex(null);
  };
  const updateLocalStorage = (updatedAllocations) => {
    if (selectedProject && selectedSprint) {
      const updatedMainCompanyArr = mainCompanyArr.map((project) => {
        if (project.projectName === selectedProject.projectName) {
          const updatedSprints = project.sprints.map((sprint) => {
            if (sprint.sprintName === selectedSprint.sprintName) {
              sprint.allocations = updatedAllocations || allocations;
            }
            return sprint;
          });
          project.sprints = updatedSprints;
        }
        return project;
      });
      setMainCompanyArr(updatedMainCompanyArr);
      localStorage.setItem(
        "mainCompanyData",
        JSON.stringify(updatedMainCompanyArr)
      );
    }
  };
  const removeAllocationRow = (index) => {
    const updatedAllocations = [...allocations];
    updatedAllocations.splice(index, 1);
    setAllocations(updatedAllocations);
    let currentSprint = localStorage.getItem("currentSprint");
    if (currentSprint) {
      currentSprint = { ...JSON.parse(currentSprint) };
      if (currentSprint?.allocations) {
        currentSprint.allocations = updatedAllocations;
      } else {
        currentSprint["allocations"] = [];
        currentSprint.allocationss.push(updatedAllocations);
      }
      const initialAttendance = currentSprint?.allocations?.map((user) => {
        return {
          name: user?.name,
          role: user?.role,
          attendance: [
            ...getAttendance(
              user?.hrPerDay,
              currentSprint?.startDate,
              currentSprint?.endDate
            ),
          ],
        };
      });
      currentSprint["attendanceData"] = initialAttendance;
      localStorage.setItem("currentSprint", JSON.stringify(currentSprint));
    }

    // updateMainCompanyArr(updatedAllocations);
  };
  const deleteRow = (index) => {
    removeAllocationRow(index);
    setOptionsVisible(null); // Close options after action
  };
  const calculateHrPerDay = (percentage) => {
    // Your calculation logic for hrPerDay
    // Assuming 8 hours per day
    return (percentage * 8) / 100;
  };
  const closeAll = () => {
    setOptionsVisible(null);
    setEditIndex(null);
  };
  const onEditClick = (index) => {
    setOptionsVisible(null);
    setEditIndex(index);
  };

  const addAllocationRow = () => {
    if (name && role && allocationPercentage) {
      const hrPerDay = calculateHrPerDay(parseInt(allocationPercentage));
      const newRow = {
        name: name,
        role: role,
        allocationPercentage: parseInt(allocationPercentage),
        hrPerDay: hrPerDay,
        sumTotalWorkingHours: sumTotalWorkingHours,
      };
      const updatedAllocations = [...allocations, newRow];
      let currentSprint = localStorage.getItem("currentSprint");
      if (currentSprint) {
        currentSprint = { ...JSON.parse(currentSprint) };
        if (Array.isArray(currentSprint?.allocations)) {
          currentSprint?.allocations?.push(newRow);
        } else {
          currentSprint["allocations"] = [];
          currentSprint.allocations.push(newRow);
        }

        const initialAttendance = currentSprint?.allocations?.map((user) => {
          return {
            name: user?.name,
            role: user?.role,
            attendance: [
              ...getAttendance(
                user?.hrPerDay,
                currentSprint?.startDate,
                currentSprint?.endDate
              ),
            ],
          };
        });
        currentSprint["attendanceData"] = initialAttendance;
        localStorage.setItem("currentSprint", JSON.stringify(currentSprint));
      }

      setAllocations(updatedAllocations);
      setName("");
      setRole("");

      setAllocationPercentage("");
      // updateMainCompanyArr(updatedAllocations);
    }
  };

  // const updateMainCompanyArr = (updatedAllocations) => {
  //   if (selectedProject && selectedSprint) {
  //     const updatedMainCompanyArr = mainCompanyArr.map((project) => {
  //       if (project.projectName === selectedProject.projectName) {
  //         const updatedSprints = project.sprints.map((sprint) => {
  //           if (sprint.sprintName === selectedSprint.sprintName) {
  //             sprint.allocations = updatedAllocations || allocations;
  //           }
  //           return sprint;
  //         });
  //         project.sprints = updatedSprints;
  //       }
  //       return project;
  //     });
  //     setMainCompanyArr(updatedMainCompanyArr);
  //     localStorage.setItem(
  //       "mainCompanyData",
  //       JSON.stringify(updatedMainCompanyArr)
  //     );
  //   }
  // };
  const getAttendance = (hour, start, end) => {
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
      pairs.push({
        date: formattedDate,
        weekday: day,
        hour: day === "Sat" || day === "Sun" ? "0" : hour,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return pairs;
  };
  const getHour = (day, hour) => {
    console.log(day, hour);
    if (day === 0 || day === 6) {
      return 0;
    } else {
      return hour;
    }
  };
  return (
    <div
      className={`transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <div className="flex justify-between">
        <div className="bg-blue-600 text-white rounded-xl p-1.5 pl-4 pr-4 flex items-center w-[19%] mt-8 ml-4">
          <label className="font-bold mr-2">Selected Project:</label>
          <h2 className="text-black rounded-lg pl-3 py-1 bg-white border shadow-xl w-[48%]">
            {selectedProject?.baseInfo?.projectName}
          </h2>

          {/* // onChange={handleProjectChange}
              // value={selectedProject?.projectName || ""} */}
          {/* {mainCompanyArr.map((project) => ( */}
          {/* <option key={project.projectName} value={project.projectName}>
                  {project.projectName}
                </option> */}
          {/* )) */}
          {/* } */}
          {/* </select> */}
        </div>
        <div className="bg-blue-600 text-white rounded-xl p-1.5 pl-4 pr-4 flex items-center w-[19%] mt-8 mr-4">
          <label className="font-bold mr-2">Selected Sprint:</label>
          <h2 className="text-black rounded-lg pl-3 py-1 bg-white border shadow-xl w-[48%]">
            {selectedSprint?.sprintName}
          </h2>

          {/* // onChange={handleProjectChange}
              // value={selectedProject?.projectName || ""} */}
          {/* {mainCompanyArr.map((project) => ( */}
          {/* <option key={project.projectName} value={project.projectName}>
                  {project.projectName}
                </option> */}
          {/* )) */}
          {/* } */}
          {/* </select> */}
        </div>
      </div>
      <h1
        className="mt-4 text-center font-serif capitalize font-bold"
        style={{ fontSize: "20px" }}
      >
        Allocate work hours efficiently and track upcoming holidays to ensure
        seamless project continuity.
      </h1>
      <div className={`grid grid-cols-5 gap-10 mx-2`}>
        <div className="col-span-3 p-2 border border-red-100 my-2 ">
          <div className="flex justify-around gap-1.5 py-8 ">
            <div>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 text-base px-5 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
                type="text"
                placeholder="Employee Name"
              />
            </div>
            <div>
              <input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-400 text-base px-5 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
                type="text"
                placeholder="Employee Role"
              />
            </div>
            <div>
              <input
                id="allocationPercentage"
                value={allocationPercentage}
                onChange={(e) => setAllocationPercentage(e.target.value)}
                className="border border-gray-400 text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
                type="number"
                placeholder="Allocation Percentage"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="flex justify-center items-center  mb-4 px-8 py-1.5 bg-blue-600 text-white font-bold rounded"
              onClick={addAllocationRow}
            >
              Add
            </button>
          </div>
          <TableContainer component={Paper}>
            <Table
              // sx={{ minWidth: 650, maxWidth:800 }}
              aria-label="simple table"
            >
              <TableHead className="bg-gray-300">
                <TableRow>
                  <TableCell
                    style={{
                      borderRight: "1px solid #000",
                      textAlign: "center",
                      width: "11%",
                    }}
                  >
                    Sl No.
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: "1px solid #000",
                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: "1px solid #000",
                      textAlign: "center",
                      width: "29%",
                    }}
                  >
                    Role
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: "1px solid #000",
                      textAlign: "center",
                      width: "20%",
                    }}
                  >
                    Hr/Day
                  </TableCell>
                  <TableCell style={{ textAlign: "center", width: "10%" }}>
                    More
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="border border-gray-200">
                {allocations.map((allocation, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{
                        borderRight: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      style={{
                        borderRight: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      {allocation.name}
                    </TableCell>
                    <TableCell
                      style={{
                        borderRight: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      {allocation.role}
                    </TableCell>
                    {/* <TableCell >{allocation.allocation}</TableCell> */}
                    <TableCell
                      style={{
                        borderRight: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      {allocation.hrPerDay}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <FaEllipsisH
                        size={18}
                        onClick={(mouseEvent) => showOptions(index, mouseEvent)}
                        style={{ cursor: "pointer" }}
                      />
                      {optionsVisible === index && (
                        <OptionsBox
                          onEdit={() => onEditClick(index)}
                          deleteRow={() => deleteRow(index)}
                          position={{
                            top: optionsPosition.top,
                            left: optionsPosition.left,
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="col-span-2 p-2 border border-red-100 my-2">
          <HolidayInputs />
        </div>

        {/* Edit popup */}
        {editIndex !== null && (
          <EditPopup
            index={editIndex}
            editedName={allocations[editIndex].name}
            editedRole={allocations[editIndex].role}
            editedAllocationPercentage={
              allocations[editIndex].allocationPercentage
            }
            onSave={editAndClose}
            onClose={() => closeAll()}
          />
        )}
      </div>
      <LastButtons current={"AllocationInput"} />
    </div>
  );
};
export default AllocationInput;
