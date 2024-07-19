import React, { useState, useEffect } from "react";
import ManualTestTable from "./ManualTestTable";
import { FaArrowCircleDown, FaPlus } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import TestDescTab from "./TestDescTab";

import { useFetchManualTests } from "../utils/useFetchManualtestData";
import { useFetchManualClasses } from "../utils/useFetchManualClasses";
import { useSaveManualTestDataToS3 } from "../utils/useSaveManualTestData";

const ManualTest = ({ sidebarToggle }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [newProjectData, setNewProjectData] = useState({
    newClassName: "",
    newProjectName: "",
  });
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");

  const {
    data: classNames,
    fetchClasses,
    loading: classesLoading,
  } = useFetchManualClasses();
  const { fetchTests, data, loading: testDataLoading } = useFetchManualTests();
  const { error, isLoading, saveManualTestData, success } =
    useSaveManualTestDataToS3();
  const [addingTestCase, setAddingTestCase] = useState(false);
  const [classes, setClasses] = useState([]);
  const [testData, setTestData] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [newTestCase, setNewTestCase] = useState({
    test_case_id: "",
    title: "",
    description: "",
    preconditions: "",
    test_steps: "",
    expected_results: "",
    actual_results: "",
    date: "",
    status: "",
    author: "",
    comments: "",
  });
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  useEffect(() => {
    if (data) {
      //   setTestData([
      //     {
      //       test_case_id: "TC001",
      //       title: "Heelo im your title",
      //       description: "Test Login Functionality",
      //       preconditions: "User is registered",
      //       test_steps:
      //         "1. Open login page\n2. Enter credentials\n3. Click login",
      //       expected_results: "User is logged in successfully",
      //       actual_results: "User is logged in successfully",
      //       date: "2024-07-01",
      //       status: "Passed",
      //       author: "Tester1",
      //       comments: "Test passed without any issues",
      //     },
      //   ]);
      //   console.log(data);
      // }
      if (data?.test_cases.length > 0) {
        const mappedTestsData = data?.test_cases?.map((test) => {
          return {
            test_case_id: test["test_case_id"],
            title: test["title"],
            description: test["description"],
            preconditions: test["preconditions"],
            test_steps: test["test_steps"],
            expected_results: test["expected_results"],
            actual_results: test["actual_results"],
            date: test["date"],
            status: test["status"],
            author: test["author"],
            comments: test["comments"],
          };
        });
        setTestData(mappedTestsData);
      }
    }
  }, [data]);

  // useEffect(() => {
  //   const savedData = JSON.parse(localStorage.getItem("projectsData"));
  //   if (savedData) {
  //     setProjects(savedData);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (classNames?.length === 0) {
  //     setClasses([]);
  //     console.log("im here in if....");
  //   } else {
  //     console.log("im herein else....");
  //     setClasses([...classNames]);
  //   }
  // }, [classNames, fetchClasses]);

  // useEffect(() => {
  //   if (projectName) {
  //     const fetchClassNames = async () => {
  //       await fetchClasses(projectName);
  //       await fetchTests({
  //         project_name: projectName,
  //         class_name: localProjectDetails.projectName,
  //         status: selectedStatus,
  //         startDate,
  //         endDate,
  //       });
  //     };
  //     fetchClassNames();
  //   }
  // }, [projectName]);

  // const handleFetchSubmit = async () => {
  //   // Handle form submission logic
  //   if (projectName) {
  //     await fetchTests({
  //       project_name: projectName,
  //       class_name: selectedClassName,
  //       status: selectedStatus,
  //       startDate,
  //       endDate,
  //     });
  //   }
  // };

  const toggleOpen = () => {
    setVisibility(!visibility);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewProjectData({
      newClassName: "",
      newProjectName: "",
    });
  };

  const handleSaveDetails = async () => {
    let newClassName = newProjectData.newClassName;
    const newProjectName = newProjectData.newProjectName;
    setSelectedProject(newProjectName);

    setSelectedClassName(newClassName);
    if (projectName === newProjectName) {
      // console.log("hiii");
      setClasses((prevClasses) => [...prevClasses, newClassName]);
    } else {
      // console.log("hello");
      setClasses([newClassName]);
    }
    setProjectName(newProjectName);
    // const data = {
    //   project_name: newProjectData.newProjectName,
    //   class_name: newProjectData.newClassName,
    //   test_case_id: "",
    //   title: "",
    //   description: "",
    //   preconditions: "",
    //   test_steps: "",
    //   expected_results: "",
    //   actual_results: "",
    //   date: "",
    //   status: "",
    //   author: "",
    //   comments: "",
    // };
    // await saveManualTestData(data);
    handleCloseDialog();
  };

  const handleAddTestCase = (projectIndex) => {
    setSelectedProjectIndex(projectIndex);
    setAddingTestCase(true);
    setNewTestCase({
      test_case_id: "",
      title: "",
      description: "",
      preconditions: "",
      test_steps: "",
      expected_results: "",
      actual_results: "",
      date: "",
      status: "",
      author: "",
      comments: "",
    });
  };

  const handleCloseAddTestCaseDialog = () => {
    setAddingTestCase(false);
  };

  const handleSaveNewTestCase = async () => {
    const newTestCaseWithId = {
      ...newTestCase,
      project_name: selectedProject,
      class_name: selectedClassName,
      test_case_id: `TC_${testData.length + 1}`,
    };
    await saveManualTestData({ ...newTestCaseWithId });
    // console.log(newTestCaseWithId);
    setTestData([
      ...testData,
      { ...newTestCase, test_case_id: `TC_${testData.length + 1}` },
    ]);
    handleCloseAddTestCaseDialog();
  };

  const handleTestCaseChange = (projectIndex, testCaseIndex, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].testCases[testCaseIndex][field] = value;
    setProjects(updatedProjects);
  };

  const handleSubmit = async () => {
    // localStorage.setItem("projectsData", JSON.stringify(projects));
    const data = {
      project_name: selectedProject,
      class_name: selectedClassName,
      test_cases: [...testData],
    };
    await saveManualTestData(data);
    // console.log("ProjectsData after Submit", JSON.stringify(projects));
  };

  const handleTestDataFetch = async ({
    selectedClass,
    startDate,
    endDate,
    status,
  }) => {
    setSelectedClassName(selectedClass);
    await fetchTests({
      project_name: projectName,
      class_name: selectedClass,
      status,
      start_date: startDate,
      end_date: endDate,
    });
  };
  const handleProjectSubmit = async () => {
    setSelectedProject(projectName);
    const class_data = await fetchClasses(projectName);
    setClasses(class_data);
  };
  return (
    <div
      className={`transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <div className="justify-center w-full pt-2">
        <div className="flex justify-center">
          {visibility ? (
            <FaArrowCircleDown
              size={25}
              strokeWidth={2.5}
              className="transition-transform cursor-pointer"
              onClick={toggleOpen}
            />
          ) : (
            <FaArrowCircleDown
              size={25}
              strokeWidth={2.5}
              className="transition-transform cursor-pointer transform rotate-180"
              onClick={toggleOpen}
            />
          )}
        </div>

        {visibility && (
          <div className="mb-10">
            <TestDescTab
              classes={classes}
              onSubmit={handleTestDataFetch}
              projectName={projectName}
              selectedClassName={selectedClassName}
              handleProjecNameSubmit={handleProjectSubmit}
              setProjectName={(pname) => setProjectName(pname)}
              loading={testDataLoading}
            />
          </div>
        )}

        <div className="mb-6">
          {!visibility && (
            <div>
              <h2 className="text-xl font-bold text-center mt-4 mb-4">
                Project Name: {projectName}
              </h2>
            </div>
          )}

          <ManualTestTable
            testCases={testData}
            getUpdatedTestCases={(data) => setTestData(data)}
            handleTestCaseChange={(testCaseIndex, field, value) => {
              // handleTestCaseChange(projectIndex, testCaseIndex, field, value)
            }}
          />
          <div className="flex justify-center gap-6 mt-10">
            <button
              className="flex justify-center gap-3 bg-[#848484] px-20 py-3 rounded-lg hover:bg-[#757576]"
              onClick={() => handleAddTestCase()}
            >
              <h3 className="text-white">ADD TEST CASE</h3>
              <FaPlus className="text-white mt-0.5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-1 mt-4">
          <button
            className="flex justify-center gap-3 bg-[#1993f0] px-2 py-3 rounded-lg hover:bg-[#696fc6]"
            onClick={handleOpenDialog}
          >
            <h3 className="text-white">ADD PROJECT</h3>
            <FaPlus className="text-white mt-0.5" />
          </button>
          <button
            className="bg-[#4CAF50] px-12 py-3 rounded-lg hover:bg-[#219424]"
            onClick={handleSubmit}
          >
            <h3 className="text-white">SUBMIT</h3>
          </button>
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          Add Class
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newProjectData.newProjectName}
            onChange={(e) =>
              setNewProjectData((prevData) => ({
                ...prevData,
                newProjectName: e.target.value,
              }))
            }
            style={{ margin: "5px 0", fontSize: "1rem", padding: "10px" }}
            InputLabelProps={{ style: { fontSize: "1.1rem" } }}
            inputProps={{ style: { fontSize: "1.1rem", padding: "10px" } }}
          />
          <TextField
            margin="normal"
            label="Class Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newProjectData.newClassName}
            onChange={(e) =>
              setNewProjectData((prevData) => ({
                ...prevData,
                newClassName: e.target.value,
              }))
            }
            style={{ margin: "5px 0", fontSize: "1rem", padding: "10px" }}
            InputLabelProps={{ style: { fontSize: "1.1rem" } }}
            inputProps={{ style: { fontSize: "1.1rem", padding: "10px" } }}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveDetails}
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              margin: "0 2px 10px 0",
              padding: "10px 30px",
              backgroundColor: "#1976d2",
              color: "white",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addingTestCase}
        onClose={handleCloseAddTestCaseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Test Case</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.title}
            multiline
            rows={8}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="normal"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.description}
            multiline
            rows={8}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, description: e.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Preconditions"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.preconditions}
            multiline
            rows={8}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, preconditions: e.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Steps"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.steps}
            multiline
            rows={8}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, test_steps: e.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Expected Results"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.expected_results}
            multiline
            rows={8}
            onChange={(e) =>
              setNewTestCase({
                ...newTestCase,
                expected_results: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            label="Actual Results"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.actual_results}
            multiline
            rows={8}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, actual_results: e.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newTestCase.date}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, date: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
          />
          <InputLabel>Status</InputLabel>
          <Select
            value={newTestCase.status}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, status: e.target.value })
            }
            fullWidth
            variant="outlined"
            style={{ marginBottom: "15px" }}
          >
            <MenuItem value="Pass">Pass</MenuItem>
            <MenuItem value="Fail">Fail</MenuItem>
            <MenuItem value="Skipped">Skipped</MenuItem>
          </Select>
          <TextField
            margin="normal"
            label="Author"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.author}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, author: e.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Comments"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.comments}
            multiline
            rows={8}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, comments: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTestCaseDialog}>Cancel</Button>
          <Button onClick={handleSaveNewTestCase} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManualTest;
