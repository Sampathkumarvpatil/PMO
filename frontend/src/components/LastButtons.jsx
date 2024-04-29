import React from "react";
import "./newInputs.css";
import { useNavigate } from "react-router-dom";
import "./lastButtons.css";
import { useSaveDataToS3 } from "../utils/useSaveDataToS3";

const LastButtons = ({ current }) => {
  const navigate = useNavigate();
  const { error, saveData, success, isLoading } = useSaveDataToS3();

  const back = () => {
    if (current === "Dashboard") {
      navigate("/");
    } else if (current === "AllocationInput") {
      navigate("/Dashboard");
    } else if (current === "AttendanceTable") {
      navigate("/AllocationAndHoliday");
    } else if (current === "TaskForm") {
      navigate("/AttendanceTable");
    } else if (current === "Sprints") {
      navigate("/list");
    } else if (current === "FileUpload") {
      navigate("/KPI's");
    }
  };
  const next = () => {
    if (current === "Dashboard") {
      navigate("/AllocationAndHoliday");
    } else if (current === "AllocationInput") {
      navigate("/AttendanceTable");
    } else if (current === "AttendanceTable") {
      navigate("/list");
    } else if (current === "TaskForm") {
      navigate("/KPI's");
    } else if (current === "Sprints") {
      navigate("/uploadFile");
    } else if (current === "FileUpload") {
      navigate("/");
    }
  };
  const handleSavebtnClick = async () => {
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
      const key = sessionStorage.getItem("key");
      await saveData(
        projectNeedToUpdate?.baseInfo?.projectName,
        { ...projectNeedToUpdate },
        key
      );
    }
  };
  return (
    <>
      <div className="flex justify-center items-center mt-8 gap-9">
        <div>
          <button
            className="animated-button2"
            onClick={() => back()}
            disabled={isLoading}
          >
            <svg
              viewBox="0 0 24 24"
              class="arr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.8284 10.9999L14.1924 5.63589L12.7782 4.22168L5 11.9999L12.7782 19.778L14.1924 18.3638L8.8284 12.9999H21V10.9999H8.8284Z"></path>
            </svg>
            <span class="text">Back</span>
            <span class="circle"></span>
            <svg
              viewBox="0 0 24 24"
              class="arr-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.8284 10.9999L14.1924 5.63589L12.7782 4.22168L5 11.9999L12.7782 19.778L14.1924 18.3638L8.8284 12.9999H21V10.9999H8.8284Z"></path>
            </svg>
          </button>
        </div>
        <div>
          <button
            className="text-white font-bold py-2 px-4 w-40 rounded-xl border-2 border-gray-300 shadow-xl "
            style={{
              background:
                "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
            }}
            onClick={handleSavebtnClick}
            disabled={isLoading}
          >
            Save
          </button>
        </div>

        <div>
          <button
            className="animated-button"
            onClick={() => next()}
            disabled={isLoading}
          >
            <svg
              viewBox="0 0 24 24"
              class="arr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span class="text">Next</span>
            <span class="circle"></span>
            <svg
              viewBox="0 0 24 24"
              class="arr-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="text-black text-center">
          Saving your data please wait...
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      {success && (
        <div className="text-green-500 text-center">
          Data saved successfully...
        </div>
      )}
    </>
  );
};

export default LastButtons;
