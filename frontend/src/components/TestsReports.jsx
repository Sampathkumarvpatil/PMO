import React, { useState } from "react";

const TestsReports = ({ sidebarToggle }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [dropdown3, setDropdown3] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic
    console.log({ dropdown1, dropdown2, dropdown3, startDate, endDate });
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
                  value={dropdown1}
                  onChange={(e) => setDropdown1(e.target.value)}
                  className="mt-1 border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 "
                >
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
              <div className="flex flex-col w-1/5">
                <label className="text-gray-700">Class Name:</label>
                <select
                  value={dropdown2}
                  onChange={(e) => setDropdown2(e.target.value)}
                  className="mt-1 block border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 transition ease-in-out duration-200"
                >
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
              <div className="flex flex-col w-1/5">
                <label className="text-gray-700">Status:</label>
                <select
                  value={dropdown3}
                  onChange={(e) => setDropdown3(e.target.value)}
                  className="mt-1 block border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 transition ease-in-out duration-200"
                >
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
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
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition ease-in-out duration-200"
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
