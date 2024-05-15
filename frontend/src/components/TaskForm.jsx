import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";
import { usePDF } from "react-to-pdf";
import ProjOptions from "./ProjOptions";
import LastButtons from "./LastButtons";

const TaskForm = ({ sidebarToggle }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  // getting all project details and and based on names need to show the project list
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

  // const selectedSprintName = localStorage.getItem("selectedSprintName");
  // const companyData = localStorage.getItem("mainCompanyData");

  // const data =
  //   companyData && companyData !== "undefined"
  //     ? JSON.parse(companyData ?? {})
  //     : null;
  // let projectNo;
  // for (projectNo in data) {
  //   if (
  //     data &&
  //     projectNo &&
  //     data[projectNo]?.projectName ===
  //       selectedProject?.baseInfo?.selectedProject
  //   )
  //     break;
  // }

  // let sprintNo;
  // if (sprintNo && data && projectNo) {
  //   for (sprintNo in data[projectNo]?.sprints) {
  //     if (
  //       projectNo &&
  //       data &&
  //       data[projectNo]?.sprints[sprintNo]?.sprintName === selectedSprintName
  //     )
  //       break;
  //   }
  // }

  const allocations = selectedSprint?.allocations || null;

  const res = allocations?.map((item) => item.name) || [];

  const [list, setList] = useState([]);
  const thrs = {};
  let totHours = 0;

  allocations?.map((item) => {
    thrs[item["name"]] = item["sumTotalWorkingHours"];
    totHours += item["sumTotalWorkingHours"];
  });

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  // const thrs = {1: 230, 2: 230, 3: 230, 4: 230, 5: 230, 6: 230, 7: 230, 8: 230};

  // res.map((item)=>{
  //   thrs[item]= 230
  //   totHours += thrs[item]
  // })
  thrs["total"] = totHours;

  const [tremaining, setTremaining] = useState({ ...thrs });
  const [edit, setEdit] = useState(false);

  // const { taskId } = useParams();

  useEffect(() => {
    const storedTasks = selectedSprint?.status || [];
    const taskList = selectedSprint?.tasks || [];
    if (taskList?.length > 0) {
      setList(taskList);
    }

    const updatedTremaining = { ...thrs }; // Create a copy of tremaining
    // console.log(updatedTremaining);
    // const workedHours = storedTasks.map((task) => {
    //   return { [task.resource_name]: task.status.total_worked };
    // });
    // Object.values(storedTasks).forEach((task) => {
    //   for (const key in updatedTremaining) {
    //     updatedTremaining[key] -= task[key] || 0;
    //   }
    // });
    // const remainingHrs = storedTasks?.map((task) => {
    //   return { updatedTremaining[task.resource_name]: task?.status?.total_worked };
    // });
    let initialTotalCompletedTask = 0;
    storedTasks?.forEach((singleTask) => {
      if (
        singleTask?.status?.work_completed_2 == 100 ||
        singleTask?.status?.work_completed_1 == 100
      ) {
        initialTotalCompletedTask += 1;
      }
    });

    if (storedTasks?.length > 0) {
      storedTasks.forEach((task) => {
        updatedTremaining[task.resource_name] =
          Number(updatedTremaining[task.resource_name]) -
            Number(task?.status?.total_worked ?? "0") || 0;
      });
      let total = updatedTremaining[Object.keys(updatedTremaining)[0]];
      Object.keys(updatedTremaining).forEach((key, i) => {
        if (i > 0) {
          if (key !== "total") {
            total += updatedTremaining[key];
          }
        }
      });
      updatedTremaining["total"] = total;
      const sprint = { ...selectedSprint };
      // sprint["totalAvailableWorkHours"] = total;
      sprint["tasksCompleted"] = initialTotalCompletedTask;
      // setSelectedSprint(sprint);
      localStorage.setItem("currentSprint", JSON.stringify(sprint));
    }

    setTremaining(updatedTremaining);
  }, [selectedSprint]);

  const handleAddTask = () => {
    const newTask = { id: uuidv4(), title: "New Task" };
    res.map((item) => {
      newTask[item] = 0;
    });
    newTask["totHours"] = 0;
    newTask["resource"] = "-";
    newTask["total"] = 0;
    newTask["status"] = 0;

    setList([...list, newTask]);

    let sprint = localStorage.getItem("currentSprint");

    if (sprint) {
      sprint = JSON.parse(sprint);
      sprint["plannedTasks"] += 1;
      if (sprint?.tasks?.length > 0) {
        sprint.tasks.push(newTask);
      } else {
        sprint["tasks"] = [newTask];
      }
      setSelectedSprint(sprint);
      localStorage.setItem("currentSprint", JSON.stringify(sprint));
    }
  };

  const cellStyle = {
    width: "150px", // Adjust width as needed
  };

  useEffect(() => {
    if (thrs && tremaining) {
      let sprint = localStorage.getItem("currentSprint");
      if (sprint) {
        sprint = JSON.parse(sprint);
        sprint["workHoursUsed"] = thrs["total"] - tremaining["total"];
        localStorage.setItem("currentSprint", JSON.stringify(sprint));
      }
    }
  }, [thrs, tremaining]);

  return (
    <div
      className={`transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <ProjOptions />
      <div className="flex justify-end"></div>
      <table
        className="p-2 text-[18px] border-collapse border-2 border-[#aaa] m-2"
        ref={targetRef}
      >
        <thead>
          <tr>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            >
              Available
            </td>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            >
              Hours:
            </td>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            ></td>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            ></td>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            ></td>

            {Object.values(thrs).map((item, index) => (
              <td
                key={index}
                style={cellStyle}
                className="p-2 border-solid border-2 border-[#aaa] bg-gray-300 text-center text-blue-700"
              >
                {item}
              </td>
            ))}
            <td
              style={cellStyle}
              className="p-2 border-solid border-2 border-[#aaa] bg-gray-300"
            ></td>
          </tr>

          <tr className="m-2 sticky top-0">
            <th
              style={cellStyle}
              className="p-2 border-solid border-2 border-[#aaa] bg-gray-300"
            >
              Sr
            </th>
            <th
              style={cellStyle}
              className="p-2 border-solid border-2 border-[#aaa] bg-gray-300"
            >
              Task ID
            </th>
            <th
              style={cellStyle}
              className="p-2 border-solid border-2 border-[#aaa] bg-gray-300"
            >
              Title
            </th>
            <th
              style={cellStyle}
              className="p-2 border-solid border-2 border-[#aaa] bg-gray-300"
            >
              Planning Poker
            </th>
            <th
              style={cellStyle}
              className="p-2 border-solid border-2 border-[#aaa] bg-gray-300"
            >
              Status
            </th>

            {res.map((item, index) => (
              <th
                key={index}
                style={cellStyle}
                className="p-2 border-solid border-2 border-[#aaa] bg-gray-300"
              >
                {item}
              </th>
            ))}
            <th
              style={cellStyle}
              className="p-2 border-solid border-2 border-[#aaa] bg-gray-300"
            >
              Total Hours
            </th>
            <th
              style={cellStyle}
              className="p-2 border-solid border-2 border-[#aaa] bg-gray-300"
            >
              Delete Task
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <Task
              key={item.id}
              item={item}
              sr={index + 1}
              list={list}
              setList={setList}
              edit={edit}
            />
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            >
              Remaining{" "}
            </td>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            >
              Hours:
            </td>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            ></td>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            ></td>
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            ></td>

            {Object.values(tremaining).map((item, index) => (
              <td
                style={cellStyle}
                key={index}
                className="p-2 border-solid border-2 border-[#aaa] bg-gray-300 text-center text-red-600"
              >
                {item}
              </td>
            ))}
            <td
              style={cellStyle}
              className="p-2 border-solid  border-[#aaa] bg-gray-300"
            ></td>
          </tr>
        </tfoot>
      </table>

      <div className="flex justify-between">
        <div>
          <button
            className="bg-blue-600 border-2 border-blue-600 text-white text-[14px] rounded-md px-4 py-3 m-2 hover:bg-white hover:text-blue-600"
            onClick={handleAddTask}
          >
            Add Task
          </button>

          <button
            className="bg-blue-600 text-white text-[14px] border-2 border-blue-600 rounded-md px-4 py-3 m-2 hover:bg-white hover:text-blue-600"
            onClick={() => setEdit(!edit)}
          >
            {edit ? "Save" : "Edit"}
          </button>
        </div>

        <button
          onClick={() => toPDF()}
          className="bg-blue-600 border-2 border-blue-600 text-white text-[14px] rounded-md px-4 py-3 m-2 hover:bg-white hover:text-blue-600"
        >
          Download PDF
        </button>
      </div>

      <LastButtons current={"TaskForm"} />
    </div>
  );
};

export default TaskForm;
