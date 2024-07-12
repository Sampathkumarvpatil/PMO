import React from "react";

const TestDescTab = () => {
  return (
    
        <div>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full">
        <div className="flex items-center space-x-10">
          <div className="flex flex-col w-1/5">
            <label className="text-gray-700">Project Name:</label>
            <select
              //   value={projectName}
              className="mt-1 border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 "
            >
              {/* <option selected>{projectName ? projectName : "Loading"}</option> */}
              <option>Project Name</option>
            </select>
          </div>
          <div className="flex flex-col w-1/5">
            <label className="text-gray-700">Class Name:</label>
            <select
              //   value={selectedClassName}
              //   onChange={(e) => setSelectedClassName(e.target.value)}
              className="mt-1 block border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 transition ease-in-out duration-200"
            >
              <option value="">Select an option</option>
              {/* {classes &&
                classes?.length > 0 &&
                classes.map((className) => ( */}
              {/* <option value={className}>{className}</option> */}
              <option>Class Name</option>

              {/* ))} */}
            </select>
          </div>
          <div className="flex flex-col w-1/5">
            <label className="text-gray-700">Status:</label>
            <select
              //   value={selectedStatus}
              //   onChange={(e) => setselectedStatus(e.target.value)}
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
              //   value={startDate}
              //   onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 transition ease-in-out duration-200"
            />
          </div>
          <div className="flex flex-col w-1/5">
            <label className="text-gray-700">End Date:</label>
            <input
              type="date"
              //   value={endDate}
              //   onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block border-2 rounded-md shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 transition ease-in-out duration-200"
            />
          </div>
        </div>
        <div className="flex justify-center !mt-2">
          <button
          // onClick={handleSubmit}
          // className={` ${
          //   loading
          //     ? "bg-gray-500 text-gray-500"
          //     : "bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300 "
          // }:  text-white py-2 px-4 rounded-md  focus:outline-none transition ease-in-out duration-200`}
          >
            {/* {loading ? "Fetching Reports.." : "Submit"} */}
            Submit
          </button>
        </div>
      </div>
    </div>
    
  );
};
export default TestDescTab;
