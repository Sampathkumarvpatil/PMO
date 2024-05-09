import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import StatusTable from "./components/StatusTable";
import { useSaveDataToS3 } from "./utils/useSaveDataToS3";
import { v4 as uuidv4 } from "uuid";
const Status = ({ sidebarToggle }) => {
  const [statusList, setStatusList] = useState([]);
  const { id } = useParams();
  const { error, saveData, success, isLoading } = useSaveDataToS3();
  const [selectedSprint, setSelectedSprint] = useState(null);

  useEffect(() => {
    let currentSprint = localStorage.getItem("currentSprint");

    if (currentSprint) {
      currentSprint = JSON.parse(currentSprint);
      setSelectedSprint(currentSprint);
      if (currentSprint?.status?.length > 0) {
        const status = currentSprint?.status
          ?.map((sprint) => {
            const status = currentSprint?.tasks?.find(
              (task) => task?.id === sprint?.status?.sprintId
            );
            return {
              id: sprint?.status?.id,
              Available: sprint?.status?.Available,
              sprintId: sprint?.status?.sprintId,
              start_date: sprint?.status?.start_date,
              end_date: sprint?.status?.end_date,
              bug_1: sprint?.status?.bug_1,
              bug_2: sprint?.status?.bug_2,
              Task_desc_1: sprint?.status?.Task_desc_1,
              Task_desc_2: sprint?.status?.Task_desc_2,
              dependencies_1: sprint?.status?.dependencies_1,
              dependencies_2: sprint?.status?.dependencies_2,
              work_completed_1: sprint?.status?.work_completed_1,
              work_completed_2: sprint?.status?.work_completed_2,
              worked_hrs: sprint?.status?.worked_hrs,
              total_worked: sprint?.status?.total_worked,
              remaining_hrs: sprint?.status?.remaining_hrs,
              resource: sprint?.resource_name,
              allocatedResource: status?.allocatedResource,
            };
          })
          .filter((status) => status.sprintId === id);

        setStatusList(status);
      }
    }
  }, [id]); // Include id as a dependency to re-run the effect when it changes

  // Function to handle adding a new status
  const handleAddStatus = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Retrieve existing status data from local storage
    // const storedStatus = JSON.parse(localStorage.getItem("status")) || {};

    // Create a new status object
    const newStatus = {
      id: uuidv4(),
      sprintId: id,
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
      allocatedResource: {},
    };

    // Update the status data in local storage for the current id
    const updatedStatus = {
      ...statusList,
      [id]: [...(statusList[id] || []), newStatus],
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
  const onSubmitHandler = (e) => {
    let currentSprint = localStorage.getItem("currentSprint");
    let currentProject = localStorage.getItem("currentProject");
    if (currentSprint && currentProject) {
      currentSprint = JSON.parse(currentSprint);
      currentProject = JSON.parse(currentProject);
      if (statusList.length > 0) {
        const status = statusList.map((status) => {
          const resource_name = status?.resource;
          const allocatedResource = status.allocatedResource;
          delete status.resource;
          delete status.allocatedResource;
          return {
            resource_name,
            allocatedResource,
            status: { ...status },
          };
        });

        const newSprintData = { ...currentSprint };
        newSprintData["status"] = status;
        const projectData = { ...currentProject };
        const sprintExistIndex = projectData?.sprints?.findIndex(
          (sprint) => sprint?.sprintName === newSprintData?.sprintName
        );
        if (sprintExistIndex >= 0) {
          projectData.sprints[sprintExistIndex] = newSprintData;
        }
        localStorage.setItem("currentSprint", JSON.stringify(newSprintData));
        localStorage.setItem("currentProject", JSON.stringify(projectData));
      }
    }
    saveDataToS3()
      .then((data) => {
        navigate("/list");
      })
      .catch((err) => {
        console.error(err);
      });
    // setTimeout(() => {
    //   navigate("/list");
    // }, 2000);
  };

  const saveDataToS3 = async () => {
    let projectNeedToUpdate = localStorage.getItem("currentProject");
    let currentSprint = localStorage.getItem("currentSprint");

    if (projectNeedToUpdate && currentSprint) {
      currentSprint = JSON.parse(currentSprint);
      projectNeedToUpdate = { ...JSON.parse(projectNeedToUpdate) };
      if (projectNeedToUpdate["sprints"]) {
        const sprintExistIndex = projectNeedToUpdate?.sprints?.findIndex(
          (sprint) => sprint?.sprintName === currentSprint?.sprintName
        );
        if (sprintExistIndex >= 0) {
          projectNeedToUpdate.sprints[sprintExistIndex] = currentSprint;
        } else {
          projectNeedToUpdate?.sprints?.push(currentSprint);
        }
      } else {
        projectNeedToUpdate["sprints"] = [];
        projectNeedToUpdate?.sprints?.push(currentSprint);
      }
      localStorage.setItem(
        "currentProject",
        JSON.stringify(projectNeedToUpdate)
      );
      const key = sessionStorage.getItem("key");
      await saveData(
        projectNeedToUpdate?.baseInfo?.projectName,
        { ...projectNeedToUpdate },
        key
      );
    }
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
