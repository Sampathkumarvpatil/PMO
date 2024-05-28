import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchClasses } from "../utils/useFetchClasses";
import { useFetchTestReport } from "../utils/useFetchTestReport";

const TestsReports = ({ sidebarToggle }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [selectedStatus, setselectedStatus] = useState("");
  const { data: classes, classesFetchError, fetchClasses } = useFetchClasses();
  const { error: reportFetchError, fetchReport } = useFetchTestReport();

  const { projectName } = useParams();

  useEffect(() => {
    if (projectName) {
      const fetchClassNames = async () => {
        await fetchClasses(projectName);
      };
      fetchClassNames();
    }
  }, [projectName]);

  useEffect(() => {
    if (classes) {
      setSelectedClassName(classes[0]);
    }
  }, [classes]);
  const handleSubmit = async () => {
    // Handle form submission logic
    if (projectName && selectedClassName) {
      await fetchReport({
        project_name: projectName,
        class_name: selectedClassName,
        status: selectedStatus,
        startDate,
        endDate,
      });
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <div className="bg-gray-100 min-h-screen">
        <div className="flex justify-center w-full pt-32">
          <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-7xl space-y-10 mx-4">
            <div className="flex items-center space-x-10">
              <div className="flex flex-col w-1/5">
                <label className="text-gray-700">Project Name:</label>
                <select
                  value={projectName}
                  className="mt-1 border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 "
                >
                  <option selected>
                    {projectName ? projectName : "Loading"}
                  </option>
                </select>
              </div>
              <div className="flex flex-col w-1/5">
                <label className="text-gray-700">Class Name:</label>
                <select
                  value={selectedClassName}
                  onChange={(e) => setSelectedClassName(e.target.value)}
                  className="mt-1 block border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 transition ease-in-out duration-200"
                >
                  <option value="">Select an option</option>
                  {classes &&
                    classes?.length > 0 &&
                    classes.map((className) => (
                      <option value={className}>{className}</option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col w-1/5">
                <label className="text-gray-700">Status:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setselectedStatus(e.target.value)}
                  className="mt-1 block border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 transition ease-in-out duration-200"
                >
                  <option value="">Select an option</option>
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                  <option value="Skipped">Skipped</option>
                </select>
              </div>
              <div className="flex flex-col w-1/5">
                <label className="text-gray-700">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 transition ease-in-out duration-200"
                />
              </div>
              <div className="flex flex-col w-1/5">
                <label className="text-gray-700">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 transition ease-in-out duration-200"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className={`${
                  !selectedClassName
                    ? "bg-gray-500"
                    : "bg-blue-500 hover:bg-blue-600"
                }  text-white py-2 px-4 rounded-md  focus:outline-none focus:ring focus:ring-blue-300 transition ease-in-out duration-200`}
                disabled={!selectedClassName}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsReports;
