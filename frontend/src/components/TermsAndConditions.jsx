import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetInstructionsSteps from "./Stepper";

const TermsAndConditions = ({ sidebarToggle }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleButtonClick = () => {
    if (isChecked) {
      navigate(`/TestsReports/${projectName}`);
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white px-16 py-6 rounded-lg shadow-lg max-w-6xl w-full">
          <div className="flex items-center justify-center sticky">
            <img src="./logo.png" alt="Logo" width={70} height="auto" />
          </div>

          <h3 className="text-3xl leading-6 font-bold mb-3 text-[#105AED] font-[Georama]">
            Introduction :
          </h3>
          <p className="mb-10 font-medium">
            The <span className="font-semibold">"TestGenius"</span> is a
            powerful tool designed to streamline your automated testing process
            by capturing test results and screenshots, and directly uploading
            detailed reports to TestGenius.ai. You can enjoy the following
            features:
          </p>
          <ol className="mb-10 text-base font-normal">
            <li className="mb-5">
              <span className="font-semibold text-[#101131] ">
                1. CENTRALIZED REPORTING
              </span>{" "}
              : All test reports are uploaded to TestGenius.ai, allowing you to
              access them from <br /> <span>anywhere at any time.</span>
            </li>
            <li className="mb-5">
              <span className="font-semibold text-[#101131]">
                2. HISTORICAL DATA ACCESS
              </span>{" "}
              : You can view reports from the past, even up to 10 years ago,
              with just one click.
            </li>
            <li className="mb-5">
              <span className=" font-semibold text-[#101131]">
                3. PROJECT-BASED ORGANIZATION{" "}
              </span>{" "}
              : Easily filter and view all automated test executions under a
              specific project.
            </li>
            <li className="mb-5">
              <span className=" font-semibold text-[#101131]">
                4. DATE RANGE FILTERING
              </span>{" "}
              : See which projects were executed within a specific date range.
            </li>
            <li className="mb-5">
              <span className=" font-semibold text-[#101131]">
                5. CLASS-LEVEL INSIGHTS{" "}
              </span>{" "}
              : Drill down to view detailed statistics on the number of tests
              passed, failed, and skipped, <br />{" "}
              <span>complete with screenshots and error messages.</span>
            </li>
            <li className="mb-5">
              <span className=" font-semibold text-[#101131]">
                6. SOPHISTICATED KPIS
              </span>
              : Access advanced key performance indicators (KPIs) such as test
              execution time, defect <br />{" "}
              <span>density, pass/fail trends over time, and more.</span>
            </li>
          </ol>
          <h3 className="text-3xl mb-2 font-semibold text-[#105AED]">
            Step-by-Step Instructions
          </h3>
          <div>
            <GetInstructionsSteps />

            <div>
              <div className="mb-4 code-container">
                <h2 className="text-3xl mb-3  font-semibold text-[#105AED]">
                  Summary
                </h2>
                <div className="summary-text">
                  <p className="mb-6 font-medium">
                    By following these steps, you will successfully integrate
                    the Test Genius into your TestNG project. This setup will
                    enable automatic capture of test results and screenshots,
                    and the upload of detailed reports to TestGenius.ai.
                  </p>
                  <p className="uppercase font-semibold  mb-2">
                    With TestGenius.ai, you can:
                  </p>
                  <div className="pl-8 mb-20">
                    <p className="mb-1">
                      <span className="text-[#105AED]">&#8226;</span> View
                      reports from any time, even up to 10 years ago, with a
                      single click.
                    </p>
                    <p className="mb-1">
                      <span className="text-[#105AED]">&#8226;</span> Filter
                      reports by project to see all automation executions under
                      a specific project.
                    </p>
                    <p className="mb-1">
                      <span className="text-[#105AED]">&#8226;</span> Filter by
                      date range to see what projects were executed within a
                      specific period.
                    </p>
                    <p className="mb-1">
                      <span className="text-[#105AED]">&#8226;</span> Drill down
                      to view detailed class-level insights, including the
                      number of tests passed, failed, and skipped, <br />
                      <span className="pl-3">
                        {" "}
                        along with screenshots and error messages.
                      </span>
                    </p>
                    <p className="mb-1">
                      <span className="text-[#105AED]">&#8226;</span> Access
                      sophisticated KPIs such as:
                    </p>
                    <div className="pl-8 my-3">
                      <p className="my-2">
                        <span className=" text-[#0A1070] font-medium">
                          1. Test Execution Time
                        </span>
                        <br />
                        <span className="text-[#105AED] ml-3">
                          &#8226;
                        </span>{" "}
                        Monitor how long each test takes to run.
                      </p>
                      <p className="my-2">
                        <span className="text-[#0A1070] font-medium">
                          2. Defect Density
                        </span>{" "}
                        <br />
                        <span className="text-[#105AED] ml-3">
                          &#8226;
                        </span>{" "}
                        Track the number of defects found per test run.
                      </p>
                      <p className="my-2">
                        <span className=" text-[#0A1070] font-medium">
                          3. Pass/Fail Trends
                        </span>{" "}
                        <br />
                        <span className="text-[#105AED] ml-3">
                          &#8226;
                        </span>{" "}
                        Analyze trends in test results over time to identify
                        patterns.
                      </p>
                      <p className="my-2">
                        <span className=" text-[#0A1070] font-medium">
                          4. Resource Utilization
                        </span>{" "}
                        <br />
                        <span className="text-[#105AED] ml-3">
                          &#8226;
                        </span>{" "}
                        Measure the efficiency and utilization of testing
                        resources.
                      </p>
                      <p className="my-2">
                        <span className=" text-[#0A1070] font-medium">
                          5. Error Rate
                        </span>{" "}
                        <br />
                        <span className="text-[#105AED] ml-3">
                          &#8226;
                        </span>{" "}
                        Determine the frequency of errors and their types.
                      </p>
                    </div>
                  </div>

                  <p className="text-[#FC5125] font-medium">
                    For any further assistance or queries, please contact our
                    support team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <label htmlFor="project-dropdown" className="  mt-2 font-medium">
              Project Name :
            </label>
            <input
              type="text"
              id="project-name"
              value={projectName}
              onChange={handleInputChange}
              className="p-2 rounded w-[15rem] min-w-28"
              style={{ border: "2px solid black" }}
              placeholder="Enter your project name here"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="terms-checkbox" className="text-gray-700">
              I agree to the Terms and Conditions
            </label>
          </div>
          <div className="flex justify-left">
            <button
              onClick={handleButtonClick}
              className={` py-1 px-4 rounded uppercase font-medium text-sm ${
                isChecked
                  ? "bg-[#105AED] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isChecked}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
