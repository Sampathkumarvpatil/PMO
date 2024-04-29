import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import StatusTable from "./components/StatusTable";

const Status = ({ sidebarToggle }) => {
  const [statusList, setStatusList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const storedStatus = JSON.parse(localStorage.getItem("status")) || {};
    const statusObjects = storedStatus[id] || [];
    setStatusList(statusObjects);
  }, [id]); // Include id as a dependency to re-run the effect when it changes

  // Function to handle adding a new status
  const handleAddStatus = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Retrieve existing status data from local storage
    const storedStatus = JSON.parse(localStorage.getItem("status")) || {};

    // Create a new status object
    const newStatus = {
      id: uuidv4(),
      Available: 0,
      start_date: formattedDate,
      end_date: formattedDate,
      bug_1: "-",
      bug_2: "-",
      Task_desc_1: "-",
      Task_desc_2: "-",
      dependencies_1: "-",
      dependencies_2: "-",
      work_completed_1: 0,
      work_completed_2: 0,
      worked_hrs: 0,
      total_worked: 0,
      remaining_hrs: 0,
      resource: "-",
    };

    // Update the status data in local storage for the current id
    const updatedStatus = {
      ...storedStatus,
      [id]: [...(storedStatus[id] || []), newStatus],
    };
    localStorage.setItem("status", JSON.stringify(updatedStatus));

    // Update state
    setStatusList(updatedStatus[id]);
  };

  // Function to handle status changes
  const handleStatusChange = (updatedStatus) => {
    // Update the status list state

    const updatedStatusList = statusList.map((status) => {
      if (status.id === updatedStatus.id) {
        return updatedStatus;
      }
      return status;
    });
    setStatusList(updatedStatusList);

    // Retrieve existing status data from local storage
    const storedStatus = JSON.parse(localStorage.getItem("status")) || {};

    // Update the status data in local storage for the current id
    const updatedStatusData = { ...storedStatus, [id]: updatedStatusList };

    localStorage.setItem("status", JSON.stringify(updatedStatusData));
  };
  const navigate = useNavigate();
  const onSubmitHandler = () => {
    let currentSprint = localStorage.getItem("currentSprint");
    if (currentSprint) {
      console.log(currentSprint);
      console.log(statusList);
      currentSprint = JSON.parse(currentSprint);
      if (statusList.length > 0) {
        const status = statusList.map((status) => {
          const resource_name = status?.resource;
          delete status.resource;
          return {
            resource_name,
            status: { ...status },
          };
        });

        const newSprintData = { ...currentSprint };
        newSprintData["status"] = status;
        localStorage.setItem("currentSprint", JSON.stringify(newSprintData));
      }
    }
    setTimeout(() => {
      navigate("/list");
    }, 2000);
  };

  return (
    <div
      className={`overflow-x-scroll transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <table className="p-2 text-[18px] border-collapse border-2 border-[#aaa] m-2 max-w-screen">
        <thead>
          <tr>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300">
              sr no.
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300">
              Resource
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300">
              Start Date
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300">
              End Date
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300 ">
              EPIC /US/Bug Description
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300 ">
              Task Description
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300">
              Any Blocks/Dependencies
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300">
              Percentage of work compeleted
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300">
              No of Hours Allocated
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300">
              Total hours worked/Task
            </td>
            <td className="p-2 border-solid border-2 border-[#aaa] bg-gray-300">
              Remaining Hours
            </td>
          </tr>
        </thead>
        <tbody>
          {statusList.map((stat, index) => (
            <StatusTable
              sr={index + 1}
              key={stat.id}
              stat={stat}
              onStatusChange={handleStatusChange}
            />
          ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        <button
          className="bg-blue-600 border-2 border-blue-600 text-white text-[14px] rounded-md px-4 py-3 m-2 mt-7 hover:bg-white hover:text-blue-600"
          onClick={handleAddStatus}
        >
          Add Task
        </button>

        <button
          className="bg-blue-600 border-2 border-blue-600 text-white text-[14px] rounded-md px-4 py-3 m-2 mt-7 hover:bg-white hover:text-blue-600"
          onClick={onSubmitHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Status;
