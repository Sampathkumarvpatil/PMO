import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Download and Add the External Jar File",
    description: (
      <div className="mb-10">
        <div className="">
          <div className="px-16">
            <p className="mb-4">
              <span className="text-[#105AED]">• </span> Download the{" "}
              <span className="">TestGeniusListener.jar </span> file from:{" "}
              <a
                className="underline text-[#105AED] font-light"
                href="https://testgeniusjar.s3.amazonaws.com/TestGenius+.jar"
              >
                Download TestGeniusListener.jar
              </a>
            </p>
          </div>
        </div>
        <div>
          <p className="mb-3 text-lg pl-10 font-semibold text-[#414141]">
            Add the Jar to Your Project
          </p>
          <div className="px-16">
            <p className="mb-3 text-[#0A1070] font-medium">
              1. Open Your Project Properties:
            </p>
            <div className="pl-12 mb-4">
              <p className="">
                <span className="text-[#105AED]">•</span>{" "}
                <span>Right-click</span> on your project in your IDE (e.g.,
                Eclipse).
              </p>
              <p>
                <span className="text-[#105AED]"> •</span>{" "}
                <span className="">Select Properties</span>
              </p>
            </div>
            <p className="mb-3 text-[#0A1070] font-medium">
              2. Add the External Jar:
            </p>
            <div className=" mb-8 flex items-start justify-center gap-3">
              <div className="pl-12">
                <p className="mb-2">
                  <span className="text-[#105AED]">• </span>Go to{" "}
                  <span className="">Java Build Path → Libraries.</span>
                </p>
                <p className="mb-2">
                  <span className="text-[#105AED]">• </span>{" "}
                  <span className=" ">Click Add External JARs.</span>
                </p>
                <p className="">
                  <span className="text-[#105AED]">• </span>{" "}
                  <span className="">
                    Browse and select the downloaded TestGenius.jar
                  </span>{" "}
                  file.
                </p>
              </div>
              <img
                className="pl-4 mb-6"
                src="../1st_IntroPage_Img.png"
                width="50%"
                height="auto"
                alt=""
              />
            </div>
            <p className="mb-3 text-[#0A1070] font-medium">
              3. Export the Jar:
            </p>
            <div className=" flex items-start justify-center gap-3">
              <div className="pl-12">
                <p className="mb-2">
                  <span className="text-[#105AED]">• </span> Go to the{" "}
                  <span className="font-semibold"> Order and Export </span>
                  tab.
                </p>
                <p className="mb-2">
                  <span className="text-[#105AED]">•</span> Check the checkbox
                  next to the
                  <span className="font-semibold">
                    {" "}
                    TestGeniusListener.jar{" "}
                  </span>
                  file to include it in the build path.
                </p>
                <p className="">
                  <span className="text-[#105AED]">• </span> Click
                  <span className="font-semibold"> Apply</span> and then
                  <span className="font-semibold"> OK</span>.
                </p>
              </div>
              <img
                className="pl-4 mb-6"
                src="../2nd_IntroPage_Img.png"
                alt=""
                width="50%"
                height="auto"
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Update Your Test Class",
    description: (
      <div className="mb-10">
        <div className="pl-16 mb-8">
          <p className="mb-4 text-[#0A1070] font-medium">
            1. <span className="">Import the Listener</span>: Add the following
            import statement at the top of your test class: <br />{" "}
            <span className="text-black pl-8">
              <span className="text-[#105AED]">• </span> import
              Listener.TestGeniusListener
            </span>
          </p>
          <p>
            2.{" "}
            <span className="text-[#0A1070] font-medium">
              Annotate the Class with the Listener :
            </span>
          </p>
          <p className="pl-8">
            <span className="text-[#105AED]">• </span> Add the{" "}
            <span className="">@Listeners</span> annotation to your test class:
          </p>
        </div>
        <p className=" mb-1 pl-32">@Listeners (TestGeniusListener.class)</p>
        <div className="pl-40">
          <div
            className="mb-8 "
            style={{ padding: "10px", border: "1px solid black" }}
          >
            <code className="text-sm">
              public class YourTestClass &#123; <br />
              &nbsp;&nbsp;&nbsp;&nbsp;// Your test methods <br />
              &#125;
            </code>
          </div>
        </div>
        <p className=" mb-3 pl-32 text-[#0A1070] font-medium">
          Here is a very concise example:
        </p>
        <div className="pl-40">
          <div
            className="mb-4 "
            style={{
              padding: "10px",
              paddingTop: "2px",
              border: "1px solid black",
            }}
          >
            <code className="text-sm ">
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
    ),
  },
  {
    label: "Update Your testng.xml File",
    description: (
      <div className="mb-10">
        <p className="mb-3 pl-16">
          Add the following listener configuration to your{" "}
          <span className="font-semibold"> testng.xml</span> file to integrate{" "}
          <span className="font-semibold"> TestGeniusListener:</span>
        </p>
        <div className="pl-24">
          <div className="mb-4 text-sm border border-black p-[10px]">
            <code className="">
              {'<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">'}
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
    ),
  },
  {
    label: "Add Necessary Dependencies to pom.xml",
    description: (
      <div className="mb-10">
        <p className="mb-3 pl-16">
          Add the following dependencies AWS SDK, slf4j API and SLF4J Simple
          binding to your pom.xml file to ensure all required libraries are
          included with your other existing libraries like selenium, Testing
          etc.
        </p>
        <div className="pl-24">
          <div className="mb-4 text-sm border border-black p-[10px]">
            <code>
              &lt;dependencies&gt;
              <br />
              <span className="font-semibold">
                &nbsp;&nbsp;&lt;!-- AWS SDK for Java --&gt;
              </span>
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
              &lt;/dependencies&gt;
            </code>
          </div>
        </div>
      </div>
    ),
  },
];

export default function GetInstructionsSteps() {
  return (
    <Box sx={{ maxWidth: "screen" }}>
      <Stepper orientation="vertical">
        {steps.map((step) => (
          <Step key={step.label} expanded>
            <StepLabel
              sx={{
                fontWeight: 600,
              }}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
