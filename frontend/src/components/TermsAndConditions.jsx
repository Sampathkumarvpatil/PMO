import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          <h1 className="text-3xl flex justify-center underline font-bold mb-4 font-serif text-purple-700">
            TestGenius
          </h1>
          <h3 className="text-2xl font-extrabold mb-3 text-red-600">
            Introduction :
          </h3>
          <p className="mb-10">
            The <span className="font-bold text-yellow-700">"TestGenius"</span>{" "}
            is a powerful tool designed to streamline your automated testing
            process by capturing test results and screenshots, and directly
            uploading detailed reports to TestGenius.ai. You can enjoy the
            following features:
          </p>
          <div className="px-16 mb-10">
            <p className="mb-2">
              •{" "}
              <span className="ml-4 text-lg font-bold text-[#3333CC] ">
                Centralized Reporting
              </span>{" "}
              : All test reports are uploaded to TestGenius.ai, allowing you to
              access them from <br />{" "}
              <span className="pl-7">anywhere at any time.</span>
            </p>
            <p className="mb-2">
              •{" "}
              <span className="ml-4 text-lg font-bold text-[#3333CC]">
                Historical Data Access{" "}
              </span>{" "}
              : You can view reports from the past, even up to 10 years ago,
              with just one click.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="ml-4 text-lg text-[#3333CC]">
                Project-Based Organization{" "}
              </span>{" "}
              : Easily filter and view all automated test executions under a
              specific project.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="ml-4 text-lg text-[#3333CC]">
                Date Range Filtering{" "}
              </span>{" "}
              : See which projects were executed within a specific date range.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="ml-4 text-lg text-[#3333CC]">
                Class-Level Insights{" "}
              </span>{" "}
              : Drill down to view detailed statistics on the number of tests
              passed, failed, and skipped, <br />{" "}
              <span className="pl-7">
                complete with screenshots and error messages.
              </span>
            </p>
            <p className="mb-2">
              •{" "}
              <span className="ml-4 text-lg text-[#3333CC]">
                Sophisticated KPIs{" "}
              </span>{" "}
              : Access advanced key performance indicators (KPIs) such as test
              execution time, defect <br />{" "}
              <span className="pl-7">
                density, pass/fail trends over time, and more.
              </span>
            </p>
          </div>
          <h3 className="text-xl mb-8 underline">Step-by-Step Instructions</h3>
          <div>
            <div className="mb-10">
              <p className="mb-3 text-lg text-red-600">
                1. Download and Add the External Jar File
              </p>
              <div className="">
                <p className="mb-3 text-lg pl-10">Download the Jar File</p>
                <div className="px-16">
                  <p className="mb-4">
                    • Download the{" "}
                    <span className="text-lg text-yellow-700">
                      "TestGeniusListener.jar"
                    </span>{" "}
                    file from:{" "}
                    <a
                      className="underline text-purple-700"
                      href="https://testgeniusjar.s3.amazonaws.com/TestGenius.jar"
                    >
                      Download TestGeniusListener.jar
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-3 text-lg pl-10">
                  Add the Jar to Your Project
                </p>
                <div className="px-16">
                  <p className="mb-3 text-[#3333CC]">
                    1. Open Your Project Properties:
                  </p>
                  <div className="pl-12 mb-4">
                    <p className="text-sm">
                      • <span>Right-click</span> on your project in your IDE
                      (e.g., Eclipse).
                    </p>
                    <p>
                      • <span className="text-sm">Select</span>{" "}
                      <span className="text-yellow-700">"Properties"</span>.
                    </p>
                  </div>
                  <p className="mb-3 text-[#3333CC]">
                    2. Add the External Jar:
                  </p>
                  <div className="pl-5 mb-8">
                    <img
                      className="pl-4 mb-6"
                      src="../1st_IntroPage_Img.png"
                      alt=""
                    />

                    <div className="pl-12">
                      <p className="mb-2">
                        • Go to{" "}
                        <span className="text-lg text-yellow-700">
                          {" "}
                          "Java Build Path" → "Libraries"
                        </span>
                        .
                      </p>
                      <p className="mb-2">
                        • Click{" "}
                        <span className="text-lg text-yellow-700">
                          "Add External JARs"
                        </span>
                        .
                      </p>
                      <p className="">
                        • Browse and select the downloaded{" "}
                        <span className="text-lg text-yellow-700">
                          "TestGenius.jar"
                        </span>{" "}
                        file.
                      </p>
                    </div>
                  </div>
                  <p className="mb-3 text-[#3333CC]">3. Export the Jar:</p>
                  <div className="pl-5">
                    <img
                      className="pl-4 mb-6"
                      src="../2nd_IntroPage_Img.png"
                      alt=""
                    />
                    <div className="pl-12">
                      <p className="mb-2">
                        • Go to the{" "}
                        <span className="text-lg text-yellow-700">
                          {" "}
                          "Other and Export"
                        </span>{" "}
                        tab.
                      </p>
                      <p className="mb-2">
                        • Check the checkbox next to the{" "}
                        <span className="text-lg text-yellow-700">
                          "TestGeniusListener.jar"
                        </span>{" "}
                        file to include it in the build path.
                      </p>
                      <p className="">
                        • Click{" "}
                        <span className="text-lg text-yellow-700">"Apply"</span>{" "}
                        and then{" "}
                        <span className="text-lg text-[#3333CC]">"OK"</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <p className="mb-6 text-lg text-red-600">
                2. Update Your Test Class
              </p>
              <div className="pl-16 mb-8">
                <p className="mb-4">
                  1.{" "}
                  <span className="text-[#3333CC] text-lg">
                    Import the Listener
                  </span>
                  : Add the following import statement at the top of your test
                  class: <br />{" "}
                  <span className="text-lg pl-8">
                    "import Listener. TestGeniusListener"
                  </span>
                </p>
                <p>
                  2.{" "}
                  <span className="text-lg text-[#3333CC]">
                    Annotate the Class with the Listener :
                  </span>
                </p>
                <p className="pl-8">
                  Add the{" "}
                  <span className="text-lg text-yellow-700">@Listeners</span>{" "}
                  annotation to your test class:
                </p>
              </div>
              <p className="text-lg mb-2 pl-32">
                @Listeners (TestGeniusListener.class)
              </p>
              <div className="pl-40">
                <div
                  className="mb-8 code-container"
                  style={{ border: "1px solid black", padding: "10px" }}
                >
                  <code className="code">
                    public class YourTestClass &#123; <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;// Your test methods <br />
                    &#125;
                  </code>
                </div>
              </div>
              <p className="text-lg mb-3 pl-32" style={{ fontWeight: "800" }}>
                Here is a very concise example:
              </p>
              <div className="pl-40">
                <div
                  className="mb-4 code-container"
                  style={{ border: "1px solid black", padding: "10px" }}
                >
                  <code className="code">
                    package pages;
                    <br />
                    import org.testng.annotations.Listeners;
                    <br />
                    import Listener.TestGeniusListener;
                    <br />
                    <br />
                    @Listeners(TestGeniusListener.class) // &lt;-- Add this line
                    <br />
                    public class ExampleTest &#123;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;// Your test methods or other code
                    <br />
                    &#125;
                  </code>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <p className="text-lg mb-3 text-red-600">
                3. Update Your testng.xml File
              </p>
              <p className="mb-3 pl-16">
                Add the following listener configuration to your{" "}
                <span className="text-lg text-yellow-700">"testng.xml"</span>{" "}
                file to integrate{" "}
                <span className="text-lg text-yellow-700">
                  "TestGeniusListener":
                </span>
              </p>
              <div className="pl-24">
                <div
                  className="mb-4"
                  style={{ border: "1px solid black", padding: "10px" }}
                >
                  <code className="code">
                    {
                      '<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">'
                    }
                    <br />
                    {'<suite name="Suite" verbose="1">'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{"<listeners>"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {'<listener class-name="Listener.TestGeniusListener"/>'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{"</listeners>"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{'<test name="Test">'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      '<parameter name="projectName" value="Enter your project name here"/>'
                    }
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"<classes>"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {'<class name="pages.ExampleTest"/>'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"</classes>"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{"</test>"}
                    <br />
                    {"</suite>"}
                  </code>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <p className="text-lg mb-3 text-red-600">
                4. Add Necessary Dependencies to pom.xml
              </p>
              <p className="mb-3 pl-16">
                Add the following dependencies{" "}
                <span className="text-lg text-yellow-700">
                  "AWS SDK", "slf4j API" and "SLF4J"
                </span>{" "}
                Simple binding to your{" "}
                <span className="text-lg text-yellow-700">"pom.xml"</span> file
                to ensure all required libraries are included with your other
                existing libraries like{" "}
                <span className="underline">selenium</span>,{" "}
                <span className="underline">Testing</span> etc.
              </p>
              <div className="pl-24">
                <div
                  className="mb-4 code-container"
                  style={{ border: "1px solid black", padding: "10px" }}
                >
                  <code className="code">
                    &lt;dependencies&gt;
                    <br />
                    &nbsp;&nbsp;&lt;!-- AWS SDK for Java --&gt;
                    <br />
                    &nbsp;&nbsp;&lt;dependency&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;com.amazonaws&lt;/groupId&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;aws-java-sdk&lt;/artifactId&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;1.12.505&lt;/version&gt;
                    <br />
                    &nbsp;&nbsp;&lt;/dependency&gt;
                    <br />
                    &nbsp;&nbsp;&lt;!-- SLF4J API --&gt;
                    <br />
                    &nbsp;&nbsp;&lt;dependency&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.slf4j&lt;/groupId&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;slf4j-api&lt;/artifactId&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;1.7.32&lt;/version&gt;
                    <br />
                    &nbsp;&nbsp;&lt;/dependency&gt;
                    <br />
                    &nbsp;&nbsp;&lt;!-- SLF4J Simple Binding --&gt;
                    <br />
                    &nbsp;&nbsp;&lt;dependency&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.slf4j&lt;/groupId&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;slf4j-simple&lt;/artifactId&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;1.7.32&lt;/version&gt;
                    <br />
                    &nbsp;&nbsp;&lt;/dependency&gt;
                    <br />
                    &lt;/dependencies&gt;
                  </code>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-4 code-container">
                <h2 className="text-xl mb-3 underline text-red-600">Summary</h2>
                <div className="summary-text">
                  <p className="mb-6">
                    By following these steps, you will successfully integrate
                    the <span className="text-yellow-700">"Test Genius"</span>{" "}
                    into your TestNG project. This setup will enable automatic
                    capture of test results and screenshots, and the upload of
                    detailed reports to TestGenius.ai.
                  </p>
                  <p className="text-[#3333CC] text-lg mb-4">
                    With TestGenius.ai, you can:
                  </p>
                  <div className="pl-8 mb-20">
                    <p className="mb-1">
                      &#8226; View reports from any time, even up to 10 years
                      ago, with a single click.
                    </p>
                    <p className="mb-1">
                      &#8226; Filter reports by project to see all automation
                      executions under a specific project.
                    </p>
                    <p className="mb-1">
                      &#8226; Filter by date range to see what projects were
                      executed within a specific period.
                    </p>
                    <p className="mb-1">
                      &#8226; Drill down to view detailed class-level insights,
                      including the number of tests passed, failed, and skipped,{" "}
                      <br />
                      <span className="pl-3">
                        {" "}
                        along with screenshots and error messages.
                      </span>
                    </p>
                    <p className="mb-1">
                      &#8226; Access sophisticated KPIs such as:
                    </p>
                    <div className="pl-8">
                      <p>
                        <span className=" text-purple-700">
                          - Test Execution Time
                        </span>{" "}
                        &nbsp;: Monitor how long each test takes to run.
                      </p>
                      <p>
                        <span className=" text-purple-700">
                          - Defect Density
                        </span>{" "}
                        &nbsp;: Track the number of defects found per test run.
                      </p>
                      <p>
                        <span className=" text-purple-700">
                          - Pass/Fail Trends
                        </span>{" "}
                        &nbsp;: Analyze trends in test results over time to
                        identify patterns.
                      </p>
                      <p>
                        <span className=" text-purple-700">
                          - Resource Utilization
                        </span>{" "}
                        &nbsp; : Measure the efficiency and utilization of
                        testing resources.
                      </p>
                      <p>
                        <span className=" text-purple-700">- Error Rate</span>{" "}
                        &nbsp;: Determine the frequency of errors and their
                        types.
                      </p>
                    </div>
                  </div>

                  <p className="text-red-700">
                    For any further assistance or queries, please contact our
                    support team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <label
              htmlFor="project-dropdown"
              className="font-weight: 800 text-gray-700 mt-2"
            >
              Project Name :
            </label>
            <input
              type="text"
              id="project-name"
              value={projectName}
              onChange={handleInputChange}
              className=" p-2 rounded"
              style={{ border: "2px solid black" }}
              placeholder="Enter your project name"
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
          <div className="flex justify-center">
            <button
              onClick={handleButtonClick}
              className={` py-2 px-10 rounded ${
                isChecked
                  ? "bg-blue-500 text-white"
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
