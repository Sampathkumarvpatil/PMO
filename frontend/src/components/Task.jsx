import React, { useState, useEffect } from "react";
import Resource from "./Resource";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Task = ({ item, sr, list, setList, edit }) => {
  // const [resources, setResources] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [resources, setResources] = useState([]);
  const [changeTitle, setChangeTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(item.title);
  const [totHours, setTotHours] = useState(0);
  const [res, setRes] = useState("");
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  // console.log('item',item)

  useEffect(() => {
    let currentProject = localStorage.getItem("currentProject");
    let currentSprint = localStorage.getItem("currentSprint");
    if (currentProject && currentSprint) {
      currentProject = JSON.parse(currentProject);
      currentSprint = JSON.parse(currentSprint);
      setSelectedProject(currentProject);
      setSelectedSprint(currentSprint);
    }
  }, []);

  useEffect(() => {
    const storedTasks = selectedSprint?.status || {};
    if (storedTasks) {
      const taskToCheck = storedTasks[item.id];
      if (taskToCheck?.totHours) setTotHours(taskToCheck["totHours"]);
      if (taskToCheck?.resource) setRes(taskToCheck["resource"]);
    }

    const allStatus = JSON.parse(localStorage.getItem("status"));
    // console.log('allstats',allStatus[item.id])
    if (allStatus) {
      for (let status in allStatus[item.id]) {
        const individual_status = allStatus[item.id][status];
        // console.log(individual_status['w'])
        // const val = parseInt(item[individual_status['resource']])
        if (individual_status["resource"] != "-") {
          item[individual_status["resource"]] = parseInt(
            individual_status["total_worked"]
          );

          // const storedTasks =
          //   JSON.parse(
          //     localStorage.getItem(
          //       `${sele}${selectedSprintName}`
          //     )
          //   ) || {};
          // storedTasks[item.id] = item;
          // localStorage.setItem(
          //   `${selectedProjectName}${selectedSprintName}`,
          //   JSON.stringify(storedTasks)
          // );
        }
      }

      if (allStatus && allStatus[item.id]) {
        Object.values(allStatus[item.id]).map((it) => {
          item["status"] = it["work_completed_2"];
        });
        const storedTasks = selectedSprint?.status;

        storedTasks[item.id] = item;
      } else {
        console.log("No status found for item ID:", item.id);
      }
    }
  }, []);

  // useEffect(() => {
  //   const filteredKeys = Object.keys(item).filter(
  //     (key) =>
  //       key !== "id" &&
  //       key !== "title" &&
  //       key !== "totHours" &&
  //       key != "resource" &&
  //       key != "total" &&
  //       key != "status"
  //   );
  //   setResources(filteredKeys);

  //   let sumHrs = 0;
  //   filteredKeys.map((cur) => {
  //     sumHrs += parseInt(item[cur]);
  //   });
  //   setTotal(sumHrs);

  //   const storedTasks =
  //     JSON.parse(
  //       localStorage.getItem(`${selectedProjectName}${selectedSprintName}`)
  //     ) || {};
  //   console.log("ss", storedTasks);
  //   storedTasks[item.id]["total"] = sumHrs;
  //   console.log("storedTasks[item.id]", storedTasks);
  //   localStorage.setItem(
  //     `${selectedProjectName}${selectedSprintName}`,
  //     JSON.stringify(storedTasks)
  //   );
  // }, []);

  const planningPokerHandler = (id) => {
    // navigate(`/${taskId}/planningpoker/${id}`);
    console.log(id);
    navigate(`/planningpoker/${id}`);
  };
  const statusHandler = (id) => {
    // navigate(`/${taskId}/status/${id}`);
    navigate(`/list/status/${id}`);
  };

  const deleteTaskHandler = (id) => {
    const storedTasks = selectedSprint?.status;
    const taskToDelete = storedTasks[id];
    delete storedTasks[id];
    // localStorage.setItem(
    //   `${selectedProjectName}${selectedSprintName}`,
    //   JSON.stringify(storedTasks)
    // );
    setList(Object.values(storedTasks));
  };

  const handleTitleEdit = () => {
    setChangeTitle(true);
  };

  const handleTitleSave = (e) => {
    const newTitle = e.target.value; // Store the new title value

    // Update the title in the list
    const updatedList = list.map((task) => {
      if (task.id === item.id) {
        return { ...task, title: newTitle }; // Use the new title directly here
      }
      return task;
    });

    // Update state with the new list and title change flag
    setList(updatedList);
    setEditableTitle(newTitle);

    // Update the title in localStorage
    const storedTasks = selectedSprint?.status;
    storedTasks[item.id]["title"] = newTitle;
  };

  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value);
  };

  return (
    <tr className="task-row">
      <td className="p-2 border-solid border-2 border-[#aaa] w-[50px] text-center">
        {sr}
      </td>
      <td className="p-2 border-solid border-2 border-[#aaa] w-[150px]">
        <span className="text-xs">{item.id}</span>
      </td>
      <td className="p-2 border-solid border-2 border-[#aaa] w-[250px] text-center">
        {edit ? (
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleSave}
            className="border-gray-400 border-2 w-[100px] p-1 box-border shadow-md"
          />
        ) : (
          <>
            {editableTitle}
            <br />
          </>
        )}
      </td>
      <td className="p-2 border-solid border-2 border-[#aaa]">
        {totHours > 0 ? (
          <>
            <div className="text-center font-black text-xl mx-auto">
              {totHours} hrs
            </div>
            <h2 className="text-center">
              resource:
              <strong className="text-green-700 font-black">{res}</strong>
            </h2>
          </>
        ) : (
          <button
            onClick={() => planningPokerHandler(item.id)}
            className="bg-gray-600 text-white p-2 text-[10px] rounded-md w-20 hover:text-gray-600 hover:bg-white border-2 border-gray-600
          "
          >
            Start
          </button>
        )}
      </td>
      <td className="p-2 border-solid border-2 border-[#aaa] text-center">
        <button
          onClick={() => statusHandler(item.id)}
          className="bg-gray-600 text-white p-2 text-[10px] rounded-md w-20
         hover:text-gray-600 hover:bg-white border-2 border-gray-600
         "
        >
          {item["status"]}%
        </button>
      </td>
      {resources.map((resource, index) => (
        <td
          key={index}
          className="p-1 border-solid border-2 border-[#aaa] w-[250px]"
        >
          <Resource heading={resource} item={item} edit={edit} />
        </td>
      ))}

      <td className="p-2 border-solid border-2 border-[#aaa] text-center">
        {total} hrs
      </td>

      <td className="p-2 border-solid border-2 border-[#aaa]">
        <button
          className="bg-red-600 text-white text-[14px] rounded-md w-[80%] px-4 py-3 m-2
        border-[0.8px] border-red-600 hover:bg-white hover:text-red-600"
          onClick={() => deleteTaskHandler(item.id)}
        >
          {/* delete icon */}
          <span className="text-lg w-full text-center flex justify-center">
            <MdDelete />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default Task;
