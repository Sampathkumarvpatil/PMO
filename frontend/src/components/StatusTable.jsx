import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const StatusTable = ({ sr, stat, onStatusChange }) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxAreaHeight, setMaxAreaHeight] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [allocations, setAllocations] = useState([]);
  const [textValues, setTextValues] = useState({
    bug_1: "",
    bug_2: "",
    Task_desc_1: "",
    Task_desc_2: "",
    dependencies_1: "",
    dependencies_2: "",
  });
  const [hrsWorked, setHrsWorked] = useState(0);
  const [hrsAllocated, setHrsAllocated] = useState(0);
  const textAreaRefs = useRef([]);
  const { id } = useParams();
  useEffect(() => {
    let currentProject = localStorage.getItem("currentProject");
    let currentSprint = localStorage.getItem("currentSprint");
    if (currentProject && currentSprint) {
      currentProject = JSON.parse(currentProject);
      currentSprint = JSON.parse(currentSprint);

      if (currentSprint?.allocations) {
        setAllocations(currentSprint?.allocations);
      }

      if (id && currentSprint?.tasks.length > 0) {
        if (stat) {
          const resource = stat?.resource;
          // console.log(resource);
          // console.log(stat);
          // console.log(
          //   resource && Object.keys(stat?.allocatedResource ?? {}).length > 0
          // );
          if (
            resource &&
            Object.keys(stat?.allocatedResource ?? {}).length > 0
          ) {
            // console.log("im here");
            // console.log(stat["allocatedResource"][resource]);
            setHrsAllocated(stat["allocatedResource"][resource] ?? 0);
          }
        }
      }
      if (id && currentSprint?.status?.length > 0) {
        const status = currentSprint?.status?.find(
          (status) => status?.status?.id === id
        );
        if (status && status?.status?.total_worked) {
          setHrsWorked(status?.status?.total_worked);
        }
      }
      setSelectedProject(currentProject);
      setSelectedSprint(currentSprint);
    }
  }, [id, stat]);

  // const allStatus = JSON.parse(localStorage.getItem("status"));

  // const taskId =
  //   selectedProject?.baseInfo?.projectName + selectedSprint?.sprintName;
  // const storedTasks = JSON.parse(localStorage.getItem(`${taskId}`));

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "total_worked") {
      setHrsWorked(value);
    }

    const updatedStatus = { ...stat, [name]: value };
    if (name === "work_completed_2") {
      const sprint = { ...selectedSprint };

      const taskIndex = sprint?.tasks?.findIndex((task) => task?.id === id);
      if (taskIndex >= 0) {
        sprint.tasks[taskIndex]["status"] = value;

        setSelectedSprint(sprint);
        localStorage.setItem("currentSprint", JSON.stringify(sprint));
      }
    }
    onStatusChange(updatedStatus);

    setTextValues({ ...textValues, [name]: value });
    updateTextAreaHeight(e.target); // Update textarea height when text changes
  };

  useEffect(() => {
    const currentMaxHeight = textAreaRefs.current.reduce((acc, ref) => {
      return Math.max(acc, ref ? ref.offsetTop : 0);
    }, 0);
    setMaxHeight(currentMaxHeight);

    const currentMaxAreaHeight = textAreaRefs.current.reduce((acc, ref) => {
      return Math.max(acc, ref ? ref.offsetHeight : 0);
    }, 0);
    setMaxAreaHeight(currentMaxAreaHeight);
  }, [stat]);

  useEffect(() => {
    // Set initial textarea heights based on content length
    textAreaRefs.current.forEach((textarea) => {
      updateTextAreaHeight(textarea);
    });
  }, []);

  const updateTextAreaHeight = (textarea) => {
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match content
  };

  // const data = JSON.parse(localStorage.getItem("mainCompanyData"));
  // let projectNo;
  // for (projectNo in data) {
  //   if (data[projectNo].projectName === selectedProjectName) break;
  // }

  // let sprintNo;
  // for (sprintNo in data[projectNo].sprints) {
  //   if (data[projectNo].sprints[sprintNo].sprintName === selectedSprintName)
  //     break;
  // }

  const onChangeHandler = (e) => {
    stat["resource"] = e.target.value;
    const task = selectedSprint.tasks.find((task) => task?.id === id);
    if (task) {
      const resource = e.target.value;

      if (resource && Object.keys(task?.allocatedResource ?? {}).length > 0) {
        if (
          Object.keys(task?.allocatedResource ?? {}).includes(e.target.value)
        ) {
          setHrsAllocated(task["allocatedResource"][resource] ?? 0);
        }
      }
    }
    // const allStatus = JSON.parse(localStorage.getItem("status"));

    // allStatus[`${id}`][sr - 1] = stat;
    // localStorage.setItem("status", JSON.stringify(allStatus));
  };

  return (
    <tr key={stat.id} className="m-2">
      <td className="border-2 border-gray-400 p-2 text-center">{sr}</td>

      <td className="border-2 border-gray-400 p-2 text-center">
        <select name="res" id="resource" onChange={onChangeHandler}>
          <option value={stat["resource"]}>{stat["resource"]}</option>
          {allocations?.map((item) => (
            <option value={`${item.name}`}>{item.name}</option>
          ))}
        </select>
      </td>
      <td className="border-2 border-gray-400 p-2 text-sm">
        <input
          type="date"
          value={stat.start_date}
          name="start_date"
          onChange={handleChange}
        />
      </td>
      <td className="border-2 border-gray-400 p-2 text-sm">
        <input
          type="date"
          value={stat.end_date}
          name="end_date"
          onChange={handleChange}
        />
      </td>

      <td className="border-2 border-gray-400 p-2">
        <div className="flex flex-col gap-10">
          <textarea
            ref={(el) => (textAreaRefs.current[0] = el)}
            rows={5}
            cols={5}
            style={{
              height: "auto",
              minHeight: `${maxAreaHeight}px`,
              resize: "none",
              overflow: "hidden",
            }} // Disable textarea resizing and hide overflow
            value={stat.bug_1}
            name="bug_1"
            onChange={handleChange}
            className="text-center"
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset the height to auto
              e.target.style.height = e.target.scrollHeight + "px"; // Set the height to match the content
            }}
          />

          <div className="flex flex-col gap-[2px] w-full ">
            <div
              className={`border-[2px] border-gray-600 h-1 bg-gray-400 rounded-lg`}
              style={{ top: `${maxHeight / 20}px` }}
            ></div>
            <div
              className={`border-[2px] border-gray-600 h-1 bg-gray-400 rounded-lg`}
              style={{ top: `${maxHeight / 20}px` }}
            ></div>
          </div>

          <textarea
            rows={5}
            cols={5}
            style={{
              height: "auto",
              minHeight: "5em",
              resize: "none",
              overflow: "hidden",
            }} // Disable textarea resizing and hide overflow
            value={stat.bug_2}
            name="bug_2"
            className="text-center"
            onChange={handleChange}
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset the height to auto
              e.target.style.height = e.target.scrollHeight + "px"; // Set the height to match the content
            }}
          />
        </div>
      </td>

      <td className="border-2 border-gray-400 p-2 w-[120%] h-full">
        <div className="flex flex-col gap-10 mt-4">
          <textarea
            ref={(el) => (textAreaRefs.current[1] = el)}
            id="taskDescTextarea"
            cols={5}
            rows={5}
            type="text"
            style={{
              height: "auto",
              minHeight: `${maxAreaHeight}px`,
              resize: "none",
              overflow: "hidden",
            }}
            value={stat.Task_desc_1}
            name="Task_desc_1"
            className="p-2 w-full h-full text-center"
            onChange={handleChange}
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset the height to auto
              e.target.style.height = e.target.scrollHeight + "px"; // Set the height to match the content
            }}
          />

          <div className="flex flex-col gap-[2px] w-full ">
            <div
              className={`border-[2px] border-gray-600 h-1 bg-gray-400 rounded-lg`}
              style={{ top: `${maxHeight / 20}px` }}
            ></div>
            <div
              className={`border-[2px] border-gray-600 h-1 bg-gray-400 rounded-lg`}
              style={{ top: `${maxHeight / 20}px` }}
            ></div>
          </div>
          <textarea
            id="taskDescTextarea"
            cols={5}
            rows={5}
            type="text"
            style={{
              height: "auto",
              minHeight: "5em",
              resize: "none",
              overflow: "hidden",
            }}
            value={stat.Task_desc_2}
            name="Task_desc_2"
            className="p-2 w-full h-full text-center"
            onChange={handleChange}
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset the height to auto
              e.target.style.height = e.target.scrollHeight + "px"; // Set the height to match the content
            }}
          />
        </div>
      </td>
      <td className="border-2 border-gray-400 p-2">
        <div className="flex flex-col gap-10">
          <textarea
            ref={(el) => (textAreaRefs.current[2] = el)}
            rows={5}
            cols={5}
            className="text-center"
            style={{
              height: "auto",
              minHeight: `${maxAreaHeight}px`,
              resize: "none",
              overflow: "hidden",
            }} // Disable textarea resizing and hide overflow
            value={stat.dependencies_1}
            name="dependencies_1"
            onChange={handleChange}
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset the height to auto
              e.target.style.height = e.target.scrollHeight + "px"; // Set the height to match the content
            }}
          />

          <div className="flex flex-col gap-[2px] w-full ">
            <div
              className={`border-[2px] border-gray-600 h-1 bg-gray-400 rounded-lg`}
              style={{ top: `${maxHeight / 20}px` }}
            ></div>
            <div
              className={`border-[2px] border-gray-600 h-1 bg-gray-400 rounded-lg`}
              style={{ top: `${maxHeight / 20}px` }}
            ></div>
          </div>
          <textarea
            rows={5}
            cols={5}
            className="text-center"
            style={{
              height: "auto",
              minHeight: "5em",
              resize: "none",
              overflow: "hidden",
            }} // Disable textarea resizing and hide overflow
            value={stat.dependencies_2}
            name="dependencies_2"
            onChange={handleChange}
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset the height to auto
              e.target.style.height = e.target.scrollHeight + "px"; // Set the height to match the content
            }}
          />
        </div>
      </td>
      <td className="border-2 border-gray-400">
        <div className="flex flex-col gap-20 text-center justify-center">
          <div
            className={`text-center w-full h-[100px] p-6 ${
              stat.work_completed_1 < 40
                ? "bg-red-400"
                : stat.work_completed_1 < 90
                ? "bg-yellow-400"
                : "bg-green-400"
            }`}
          >
            <input
              type="number"
              value={stat.work_completed_1}
              name="work_completed_1"
              onChange={handleChange}
              className={`text-center w-full ${
                stat.work_completed_1 < 40
                  ? "bg-red-400"
                  : stat.work_completed_1 < 90
                  ? "bg-yellow-400"
                  : "bg-green-400"
              }`}
            />
            %
          </div>

          <div
            className={`text-center w-full h-[100px] p-6 ${
              stat.work_completed_2 < 40
                ? "bg-red-400"
                : stat.work_completed_2 < 90
                ? "bg-yellow-400"
                : "bg-green-400"
            }`}
          >
            <input
              type="number"
              value={stat.work_completed_2}
              name="work_completed_2"
              onChange={handleChange}
              className={`text-center w-full ${
                stat.work_completed_2 < 40
                  ? "bg-red-400"
                  : stat.work_completed_2 < 90
                  ? "bg-yellow-400"
                  : "bg-green-400"
              }`}
            />
            %
          </div>
        </div>
      </td>
      <td className="border-2 border-gray-400 p-2">
        {/* <input
          type="number"
          value={stat.worked_hrs}
          name="worked_hrs"
          onChange={handleChange}
        />{" "} */}
        {/* {JSON.stringify(hrsAllocated)} */}
        {hrsAllocated} hrs
      </td>

      <td className="border-2 border-gray-400 p-2">
        <input
          type="number"
          value={stat.total_worked}
          name="total_worked"
          onChange={handleChange}
        />{" "}
        hrs
      </td>
      <td className="border-2 border-gray-400 p-2">
        {/* <input
          type="number"
          value={stat.remaining_hrs}
          name="remaining_hrs"
          onChange={handleChange}
        />{" "} */}
        {hrsAllocated - stat.total_worked} hrs
      </td>
    </tr>
  );
};

export default StatusTable;
