import React, { useState, useEffect, edit } from "react";

const Resource = ({ heading, item, edit, status }) => {
  const [resource, setResource] = useState("-");
  const [editing, setEditing] = useState(false);
  const selectedProjectName = localStorage.getItem("selectedProjectName");
  const selectedSprintName = localStorage.getItem("selectedSprintName");
  const [resourcesData, setResourcesData] = useState({});

  useEffect(() => {
    const statusList = status?.filter(
      (singleStatus) => singleStatus?.status?.sprintId === item?.id
    );
    const localItem = { ...item };
    // console.log(statusList);
    statusList?.forEach((StatusItem) => {
      localItem[StatusItem?.resource_name] = Number(
        StatusItem?.status?.total_worked ?? 0
      );
    });
    let currentSprint = localStorage.getItem("currentSprint");
    if (currentSprint) {
      currentSprint = JSON.parse(currentSprint);
      if (currentSprint?.tasks?.length > 0) {
        const index = currentSprint?.tasks?.findIndex(
          (task) => task?.id === item.id
        );
        if (index >= 0) {
          setResourcesData(localItem);

          currentSprint.tasks[index] = localItem;
          localStorage.setItem("currentSprint", JSON.stringify(currentSprint));
        }
      }
    }
  }, [status, heading, item]);

  useEffect(() => {
    setResource(resourcesData[`${heading}`]);
  }, [resourcesData, heading]);

  const onChangeHandler = (e) => {
    setResource(e.target.value);
  };
  return (
    <div style={{ width: "100px" }} className="flex justify-center mx-auto">
      {/* R{heading}:   */}
      <br />
      {edit ? (
        <input
          className="border-gray-400 w-full h-full border-2 box-border shadow-md text-center"
          value={resource}
          onChange={(e) => {
            const newResource = e.target.value;
            setResource(newResource);
            let sprint = localStorage.getItem("currentSprint");
            if (sprint) {
              sprint = JSON.parse(sprint);
              const taskInd = sprint?.status?.findIndex(
                (singleStatus) =>
                  singleStatus?.resource_name === heading &&
                  item?.id === singleStatus?.status?.sprintId
              );
              if (sprint?.status[taskInd].status)
                sprint.status[taskInd].status["total_worked"] = newResource;
              localStorage.setItem("currentSprint", JSON.stringify(sprint));
            }

            // storedTasks[item.id][`${heading}`] = newResource;

            // localStorage.setItem(
            //   `${selectedProjectName}${selectedSprintName}`,
            //   JSON.stringify(storedTasks)
            // );
          }}
        />
      ) : (
        <span className="text-emerald-600 font-bold ml-2">{resource}</span>
      )}
    </div>
  );
};

export default Resource;
