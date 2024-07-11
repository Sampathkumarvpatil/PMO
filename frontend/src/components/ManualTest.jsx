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

const ManualTest = ({ sidebarToggle }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [localProjectDetails, setLocalProjectDetails] = useState({
    projectName: "",
    className: "",
    author: "",
  });
  const [projects, setProjects] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [addingTestCase, setAddingTestCase] = useState(false);
  const [newTestCase, setNewTestCase] = useState({
    id: "",
    title: "",
    preconditions: "",
    steps: "",
    expectedResults: "",
    actualResults: "",
    date: "",
    status: "",
    author: "",
    comments: "",
  });
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  useEffect(() => {
    // const savedData = JSON.parse(localStorage.getItem("projectsData"));
    // if (savedData) {
    //   setProjects(savedData);
    // }
  }, []);

  const toggleOpen = () => {
    setVisibility(!visibility);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setLocalProjectDetails({
      projectName: "",
      className: "",
    });
  };

  const handleSaveDetails = () => {
    const newProject = {
      ...localProjectDetails,
      testCases: [],
    };
    setProjects([...projects, newProject]);
    handleCloseDialog();
  };

  const handleLocalProjectDetailsChange = (field, value) => {
    setLocalProjectDetails({ ...localProjectDetails, [field]: value });
  };

  const handleAddTestCase = (projectIndex) => {
    setSelectedProjectIndex(projectIndex);
    setAddingTestCase(true);
    setNewTestCase({
      id: "",
      title: "",
      preconditions: "",
      steps: "",
      expectedResults: "",
      actualResults: "",
      date: "",
      status: "",
      author: "",
      comments: "",
    });
  };

  const handleCloseAddTestCaseDialog = () => {
    setAddingTestCase(false);
  };

  const handleSaveNewTestCase = () => {
    const newTestCaseWithId = {
      ...newTestCase,
      id: `TC_${projects[selectedProjectIndex].testCases.length + 1}`,
    };

    const updatedProjects = [...projects];
    updatedProjects[selectedProjectIndex].testCases.push(newTestCaseWithId);
    setProjects(updatedProjects);

    handleCloseAddTestCaseDialog();
  };

  const handleTestCaseChange = (projectIndex, testCaseIndex, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].testCases[testCaseIndex][field] = value;
    setProjects(updatedProjects);
  };

  const handleSubmit = () => {
    // localStorage.setItem("projectsData", JSON.stringify(projects));
    console.log("ProjectsData after Submit", JSON.stringify(projects));

    setSubmitted(true);
  };

  return (
    <div className={`transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"}`}>
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
            <TestDescTab />
          </div>
        )}
        {projects.map((project, projectIndex) => (
          <div key={projectIndex} className="mb-6">
            {!visibility && (
              <div>
                <h2 className="text-xl font-bold text-center mt-4 mb-4">
                  Project Name: {project.projectName}
                </h2>
              </div>
            )}

            <ManualTestTable
              testCases={project.testCases}
              handleTestCaseChange={(testCaseIndex, field, value) =>
                handleTestCaseChange(projectIndex, testCaseIndex, field, value)
              }
            />
            <div className="flex justify-center gap-6 mt-10">
              <button
                className="flex justify-center gap-3 bg-[#848484] px-20 py-3 rounded-lg hover:bg-[#757576]"
                onClick={() => handleAddTestCase(projectIndex)}
              >
                <h3 className="text-white">ADD TEST CASE</h3>
                <FaPlus className="text-white mt-0.5" />
              </button>
            </div>
          </div>
        ))}
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
          Add Project
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            value={localProjectDetails.projectName}
            onChange={(e) =>
              handleLocalProjectDetailsChange("projectName", e.target.value)
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
            value={localProjectDetails.className}
            onChange={(e) =>
              handleLocalProjectDetailsChange("className", e.target.value)
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
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.title}
            multiline
            rows={8}
            onChange={(e) => setNewTestCase({ ...newTestCase, title: e.target.value })}
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
            onChange={(e) => setNewTestCase({ ...newTestCase, preconditions: e.target.value })}
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
            onChange={(e) => setNewTestCase({ ...newTestCase, steps: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Expected Results"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.expectedResults}
            multiline
            rows={8}
            onChange={(e) => setNewTestCase({ ...newTestCase, expectedResults: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Actual Results"
            type="text"
            fullWidth
            variant="outlined"
            value={newTestCase.actualResults}
            multiline
            rows={8}
            onChange={(e) => setNewTestCase({ ...newTestCase, actualResults: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newTestCase.date}
            onChange={(e) => setNewTestCase({ ...newTestCase, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <InputLabel>Status</InputLabel>
          <Select
            value={newTestCase.status}
            onChange={(e) => setNewTestCase({ ...newTestCase, status: e.target.value })}
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
            onChange={(e) => setNewTestCase({ ...newTestCase, author: e.target.value })}
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
            onChange={(e) => setNewTestCase({ ...newTestCase, comments: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTestCaseDialog}>Cancel</Button>
          <Button onClick={handleSaveNewTestCase} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManualTest;
