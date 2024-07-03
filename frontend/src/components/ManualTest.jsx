import React, { useState, useEffect } from 'react';
import ManualTestTable from './ManualTestTable';
import { FaArrowCircleDown, FaPlus } from 'react-icons/fa';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import TestDescTab from './TestDescTab';

const ManualTest = ({ sidebarToggle }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [localProjectDetails, setLocalProjectDetails] = useState({
    projectName: '',
    className: '',
    author: '',
  });
  const [projects, setProjects] = useState([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('projectsData'));
    if (savedData) {
      setProjects(savedData);
    }
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
      projectName: '',
      className: '',
      author: '',
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
    const newTestCase = {
      id: `TC_${projects[projectIndex].testCases.length + 1}`,
      title: '',
      preconditions: '',
      steps: '',
      expectedResults: '',
      actualResults: '',
      date: '',
      status: '',
      author: '',
      comments: '',
    };
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].testCases.push(newTestCase);
    setProjects(updatedProjects);
  };

  const handleTestCaseChange = (projectIndex, testCaseIndex, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].testCases[testCaseIndex][field] = value;
    setProjects(updatedProjects);
  };

  const handleSubmit = () => {
    // Save to localStorage
    localStorage.setItem('projectsData', JSON.stringify(projects));
    setSubmitted(true);
  };

  return (
    <div className={`transition-all duration-300 ${sidebarToggle ? 'ml-0' : 'ml-64'}`}>
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
        {visibility && <div><TestDescTab /></div>}
        {projects.map((project, projectIndex) => (
          <div key={projectIndex} className="mb-6">
            <h2 className="text-xl font-bold text-center">{project.projectName}</h2>
            <ManualTestTable
              testCases={project.testCases}
              handleTestCaseChange={(testCaseIndex, field, value) =>
                handleTestCaseChange(projectIndex, testCaseIndex, field, value)
              }
            />
            <div className="flex justify-center gap-6 mt-6">
              <button
                className="flex justify-center gap-3 bg-[#0A1070] px-6 py-3 rounded-lg hover:bg-[#0e1793]"
                onClick={() => handleAddTestCase(projectIndex)}
              >
                <h3 className="text-white">ADD TEST CASE</h3>
                <FaPlus className="text-white mt-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-6">
        <button
          className="flex justify-center gap-3 bg-[#0A1070] px-6 py-3 rounded-lg hover:bg-[#0e1793]"
          onClick={handleOpenDialog}
        >
          <h3 className="text-white">ADD PROJECT</h3>
          <FaPlus className="text-white mt-0.5" />
        </button>
        <button
          className="flex justify-center gap-3 bg-[#4CAF50] px-6 py-3 rounded-lg hover:bg-[#4CAF50]"
          onClick={handleSubmit}
        >
          <h3 className="text-white">SUBMIT</h3>
        </button>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>
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
            onChange={(e) => handleLocalProjectDetailsChange('projectName', e.target.value)}
            style={{ margin: '16px 0', fontSize: '1rem', padding: '10px' }}
            InputLabelProps={{ style: { fontSize: '1.1rem' } }}
            inputProps={{ style: { fontSize: '1.1rem', padding: '10px' } }}
          />
          <TextField
            margin="normal"
            label="Class Name"
            type="text"
            fullWidth
            variant="outlined"
            value={localProjectDetails.className}
            onChange={(e) => handleLocalProjectDetailsChange('className', e.target.value)}
            style={{ margin: '16px 0', fontSize: '1rem', padding: '10px' }}
            InputLabelProps={{ style: { fontSize: '1.1rem' } }}
            inputProps={{ style: { fontSize: '1.1rem', padding: '10px' } }}
          />
          <TextField
            margin="normal"
            label="Author"
            type="text"
            fullWidth
            variant="outlined"
            value={localProjectDetails.author}
            onChange={(e) => handleLocalProjectDetailsChange('author', e.target.value)}
            style={{ margin: '16px 0', fontSize: '1rem', padding: '10px' }}
            InputLabelProps={{ style: { fontSize: '1.1rem' } }}
            inputProps={{ style: { fontSize: '1.1rem', padding: '10px' } }}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button
            onClick={handleCloseDialog}
            style={{
              fontWeight: 'bold',
              fontSize: '1rem',
              margin: '10px',
              padding: '10px 30px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveDetails}
            style={{
              fontWeight: 'bold',
              fontSize: '1rem',
              margin: '10px',
              padding: '10px 30px',
              backgroundColor: '#1976d2',
              color: 'white',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManualTest;
