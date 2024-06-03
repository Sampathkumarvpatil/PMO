import TestIcons from "./TestIcons";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function FailedTest({ sidebarToggle }) {
  const [openDialog, setOpenDialog] = useState(false);
  const location = useLocation();
  const reportData = location?.state?.report;
  const [data, setData] = useState(null);
  console.log(location);
  useEffect(() => {
    console.log(reportData);
    if (reportData) {
      setData(reportData);
    }
  }, [reportData]);

  console.log(data);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const { data } = useFetchTestReport();
  return (
    <div
      className={`transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <div className="grid grid-cols-[5%,94%] justify-between">
        <div style={{ backgroundColor: "#e2e3f3" }}>
          <TestIcons data={data} />
        </div>

        <table className="p-5 m-5">
          <tr>
            <th colSpan={3} className="p-2 m-2">
              <div className="flex items-center justify-center gap-3">
                <h3 className="font-bold text-neutral-700 text-xl">
                  {data?.body?.project_name} -
                </h3>
                <h3 className="font-semibold text-gray-600">
                  {data?.body?.class_name}
                </h3>
              </div>
            </th>
          </tr>
          <tr className="p-2 m-2">
            <th className="p-2 m-2">
              <h3
                className="rounded-lg inline-block px-2 py-1"
                style={{ backgroundColor: "#aee7ae", color: "green" }}
              >
                TIMESTAMP
              </h3>
            </th>
            <th className="p-2 m-2">
              <h3
                className="ml-2 rounded-lg inline-block px-2 py-1"
                style={{ backgroundColor: "#aee7ae", color: "green" }}
              >
                SCREENSHOT
              </h3>
            </th>
            <th className="p-2 m-2">
              <h3
                className="ml-2 rounded-lg inline-block px-2 py-1"
                style={{ backgroundColor: "#aee7ae", color: "green" }}
              >
                DETAILS
              </h3>
            </th>
          </tr>

          {data?.body?.failed_results?.map((failCase) => (
            <tr key={failCase?.method_name} className="p-2 m-2">
              <td className="p-2 m-2 w-auto">
                <h1 className="px-4 py-0 pt-4">
                  Method name: {failCase?.method_name}
                </h1>

                <h1 className="px-4 py-0">Timestamp: {failCase?.timestamp}</h1>
                {/* <div style={{ padding: "0px 18px" }}>
                  <ExecutionTimeGraph
                    data={{
                      method_name: failCase?.method_name,
                      execution_time: failCase?.execution_time,
                      status: failCase?.status,
                    }}
                  />
                </div> */}
                <p className="p-2 m-2 mt-0 text-orange-900">
                  Executed Time: {failCase?.execution_time}
                </p>
              </td>
              <td className="p-2 m-2 ">
                <div style={{ borderRight: "1px solid" }}>
                  <img
                    src={`data:image/png;base64,${failCase?.screenshot}`}
                    width={700}
                    style={{ height: "350px" }}
                    className="ml-2 px-2 py-4"
                    alt={failCase?.method_name}
                  ></img>
                </div>
              </td>

              <td className="p-2 m-2">
                <div className="py-4">
                  <div key={failCase?.method_name}>
                    <div className="flex flex-row ml-4 mt-3">
                      <h3>MethodName : {failCase.method_name}</h3>
                    </div>
                    <div
                      className="flex flex-row justify-center items-center ml-4 my-2 rounded-lg"
                      style={{ backgroundColor: "#edcbed", width: "50%" }}
                    >
                      <h3
                        className="px-1 py-2 text-lg cursor-pointer"
                        style={{ color: "purple" }}
                        onClick={handleOpenDialog}
                      >
                        Exception
                      </h3>
                      <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        fullWidth
                      >
                        <div className="flex flex-row justify-between">
                          <DialogTitle
                            className="!pb-0 !pt-3"
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              textAlign: "center",
                            }}
                          >
                            Exception
                          </DialogTitle>
                          <button
                            className=" bg-red-600 rounded-full text-white mt-2 mr-8"
                            onClick={handleCloseDialog}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-10"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            {/* <FaPlusCircle className=" flex justify-end text-xl" onClick={onClose}/> */}
                          </button>
                        </div>
                        <DialogContent>
                          <textArea rows={20} cols={60}>
                            {failCase.exception}
                          </textArea>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default FailedTest;
