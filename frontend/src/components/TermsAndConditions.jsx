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
      navigate("/TestsReports");
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
          <h1 className="text-2xl flex justify-center underline font-bold mb-4">
            Test Genius
          </h1>
          <h3 className="text-xl font-bold mb-3">Introduction</h3>
          <p className="mb-20">
            The <span className="font-bold">"Test Genius"</span> is a powerful
            tool designed to streamline your automated testing process by
            capturing test results and screenshots, and directly uploading
            detailed reports to TestGenius.ai. You can enjoy the following
            features:
          </p>
          <div className="px-16 mb-16">
            <p className="mb-2">
              • <span className="ml-4 text-lg">Centralized Reporting</span> :
              All test reports are uploaded to TestGenius.ai, allowing you to
              access them from <br />{" "}
              <span className="pl-7">anywhere at any time.</span>
            </p>
            <p className="mb-2">
              • <span className="ml-4 text-lg">Historical Data Access </span> :
              You can view reports from the past, even up to 10 years ago, with
              just one click.
            </p>
            <p className="mb-2">
              •{" "}
              <span className="ml-4 text-lg">Project-Based Organization </span>{" "}
              : Easily filter and view all automated test executions under a
              specific project.
            </p>
            <p className="mb-2">
              • <span className="ml-4 text-lg">Date Range Filtering </span> :
              See which projects were executed within a specific date range.
            </p>
            <p className="mb-2">
              • <span className="ml-4 text-lg">Class-Level Insights </span> :
              Drill down to view detailed statistics on the number of tests
              passed, failed, and skipped, <br />{" "}
              <span className="pl-7">
                complete with screenshots and error messages.
              </span>
            </p>
            <p className="mb-2">
              • <span className="ml-4 text-lg">Sophisticated KPIs </span> :
              Access advanced key performance indicators (KPIs) such as test
              execution time, defect <br />{" "}
              <span className="pl-7">
                density, pass/fail trends over time, and more.
              </span>
            </p>
          </div>
          <h3 className="text-xl font-bold mb-12 underline">
            Step-by-Step Instructions
          </h3>
          <div>
            <div className="mb-10">
              <p className="mb-6 text-lg">
                1. Download and Add the External Jar File
              </p>
              <div className="">
                <p className="mb-3 text-lg">Download the Jar File</p>
                <div className="px-16">
                  <p className="mb-4">
                    • Download the{" "}
                    <span className="text-lg">"TestGeniusListener.jar"</span>{" "}
                    file from our website:{" "}
                    <a className="underline text-blue-700" href="https://testgeniusjar.s3.amazonaws.com/TestGenius.jar">
                      Download TestGeniusListener.jar
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-3 text-lg">Add the Jar to Your Project</p>
                <div className="px-16">
                  <p className="mb-3">1. Open Your Project Properties:</p>
                  <div className="pl-12 mb-8">
                    <p className="text-sm">
                      • <span>Right-click</span> on your project in your IDE
                      (e.g., Eclipse).
                    </p>
                    <p>
                      • <span className="text-sm">Select</span> "Properties".
                    </p>
                  </div>
                  <p className="mb-3">2. Add the External Jar:</p>
                  <div className="pl-5 mb-12">
                    {/* <img src="../assets/JavaBuildPath.png" alt="" /> */}
                    <img
                      className="mb-6"
                      src="../assets/JavaBuildPath.png"
                      alt=""
                    />
                    <div className="pl-4">
                      <p className="mb-2">
                        • Go to{" "}
                        <span className="text-lg">
                          {" "}
                          "Java Build Path" → "Libraries"
                        </span>
                        .
                      </p>
                      <p className="mb-2">
                        • Click{" "}
                        <span className="text-lg">"Add External JARs"</span>.
                      </p>
                      <p className="">
                        • Browse and select the downloaded{" "}
                        <span className="text-lg">"TestGenius.jar"</span> file.
                      </p>
                    </div>
                  </div>
                  <p className="mb-3">3. Export the Jar:</p>
                  <div className="pl-5">
                    {/* <img src="../assets/JavaBuildPath.png" alt="" /> */}
                    <img
                      className="mb-6"
                      src="https://www.unco.edu/college-bound-colorado/images/group-friends-jumping.jpg"
                      alt=""
                    />
                    <div className="pl-4">
                      <p className="mb-2">
                        • Go to the{" "}
                        <span className="text-lg"> "Other and Export"</span>{" "}
                        tab.
                      </p>
                      <p className="mb-2">
                        • Check the checkbox next to the{" "}
                        <span className="text-lg">
                          "TestGeniusListener.jar"
                        </span>{" "}
                        file to include it in the build path.
                      </p>
                      <p className="">
                        • Click <span className="text-lg">"Apply"</span> and
                        then <span className="text-lg">"OK"</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-14">
              <p className="mb-6 text-lg">2. Update Your Test Class</p>
              <div className="pl-16 mb-8">
                <p className="mb-8">
                  1. Import the Listener: Add the following import statement at
                  the top of your test class: <br />{" "}
                  <span className="text-lg">
                    "import Listener. TestGeniusListener"
                  </span>
                </p>
                <p>
                  2.{" "}
                  <span className="text-lg">
                    Annotate the Class with the Listener
                  </span>
                  : <br />
                  Add the @Listeners annotation to your test class:
                </p>
              </div>
              <p className="text-lg mb-2">
                @Listeners (TestGeniusListener.class)
              </p>
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
              <p className="text-lg mb-3" style={{ fontWeight: "800" }}>
                Here is a very concise example:
              </p>
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
            <div className="mb-16">
              <p className="text-lg mb-3">3. Update Your testng.xml File</p>
              <p className="mb-3">
                Add the following listener configuration to your{" "}
                <span className="text-lg">"testng.xml"</span> file to integrate{" "}
                <span className="text-lg">"TestGeniusListener":</span>
              </p>
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
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"<classes>"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {'<class name="pages.ExampleTest"/>'}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"</classes>"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{"</test>"}
                  <br />
                  {"</suite>"}
                </code>
              </div>
            </div>
            <div className="mb-20">
              <p>4. Add Necessary Dependencies to pom.xml</p>
              <p className="mb-3">
                Add the following dependencies{" "}
                <span className="text-lg">
                  "AWS SDK", "slf4j API" and "SLF4J"
                </span>{" "}
                Simple binding to your{" "}
                <span className="text-lg">"pom.xml"</span> file to ensure all
                required libraries are included with your other existing
                libraries like selenium, Testng etc.
              </p>
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
            <div>
              <div className="mb-4 code-container">
                <h2 className="text-lg mb-3 underline">Summary</h2>
                <div className="summary-text">
                  <p>
                    By following these steps, you will successfully integrate
                    the Test Genius into your TestNG project. This setup will
                    enable automatic capture of test results and screenshots,
                    and the upload of detailed reports to TestGenius.ai.
                  </p>
                  <p>With TestGenius.ai, you can:</p>
                  <div className="pl-8 mb-20">
                    <p>
                      &#8226; View reports from any time, even up to 10 years
                      ago, with a single click.
                    </p>
                    <p>
                      &#8226; Filter reports by project to see all automation
                      executions under a specific project.
                    </p>
                    <p>
                      &#8226; Filter by date range to see what projects were
                      executed within a specific period.
                    </p>
                    <p>
                      &#8226; Drill down to view detailed class-level insights,
                      including the number of tests passed, failed, and skipped,
                      along with screenshots and error messages.
                    </p>
                    <p>&#8226; Access sophisticated KPIs such as:</p>
                    <div className="pl-8">
                      <p>
                        - Test Execution Time: Monitor how long each test takes
                        to run.
                      </p>
                      <p>
                        - Defect Density: Track the number of defects found per
                        test run.
                      </p>
                      <p>
                        - Pass/Fail Trends: Analyze trends in test results over
                        time to identify patterns.
                      </p>
                      <p>
                        - Resource Utilization: Measure the efficiency and
                        utilization of testing resources.
                      </p>
                      <p>
                        - Error Rate: Determine the frequency of errors and
                        their types.
                      </p>
                    </div>
                  </div>

                  <p>
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
              className="w-full p-2 border rounded"
              placeholder="Enter your project name"
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
              className={` py-2 px-10 rounded ${isChecked  ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!isChecked }
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
