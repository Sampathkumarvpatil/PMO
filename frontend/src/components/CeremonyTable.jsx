import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
 
const CeremonyTable = ({ startDate, endDate, updateTotals, meetings }) => {
  const [inputValues, setInputValues] = useState({});
  const [Totaceremonyminute, setTotaceremonyminute] = useState(0);
  const [totalceremonyhour, setTotalceremonyhour] = useState(0);
  const [mainCompanyArr, setMainCompanyArr] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
 
  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    setMainCompanyArr(dataFromLocalStorage);
 
    // Get the selected project and sprint from local storage
    const savedProjectName = localStorage.getItem("selectedProjectName");
    const savedSprintName = localStorage.getItem("selectedSprintName");
    const project = dataFromLocalStorage.find(project => project.projectName === savedProjectName);
    setSelectedProject(project);
 
    // Check if project exists and get the selected sprint
    if (project) {
      const sprint = project.sprints.find(sprint => sprint.sprintName === savedSprintName);
      setSelectedSprint(sprint);
 
      // Set input values for the selected sprint
      if (sprint && sprint.inputValues) {
        setInputValues(sprint.inputValues);
      } else {
        setInputValues({});
      }
 
      // Retrieve saved values from local storage based on project and sprint
      const savedValues = JSON.parse(localStorage.getItem(`inputValues_${savedProjectName}_${savedSprintName}`) || '{}');
      setInputValues(savedValues);
      const savedTotaceremonyminute = localStorage.getItem(`Totaceremonyminute_${savedProjectName}_${savedSprintName}`);
      const savedTotalceremonyhour = localStorage.getItem(`totalceremonyhour_${savedProjectName}_${savedSprintName}`);
     
      setTotaceremonyminute(savedTotaceremonyminute ? parseInt(savedTotaceremonyminute) : 0);
      setTotalceremonyhour(savedTotalceremonyhour ? parseInt(savedTotalceremonyhour) : 0);
    }
  }, [startDate, endDate]);
 
  const calculateTotals = () => {
    // Calculate Totaceremonyminute and totalceremonyhour based on inputValues
    // You need to implement your own logic here based on your requirements
    let totalMinute = 0;
    Object.values(inputValues).forEach(value => {
      totalMinute += parseInt(value);
    });
    setTotaceremonyminute(totalMinute);
 
    // You can convert minutes to hours if needed
    setTotalceremonyhour(totalMinute / 60);
 
    // Store the updated Totaceremonyminute and totalceremonyhour in local storage
    const savedProjectName = selectedProject?.projectName;
    const savedSprintName = selectedSprint?.sprintName;
    localStorage.setItem(`Totaceremonyminute_${savedProjectName}_${savedSprintName}`, totalMinute);
    localStorage.setItem(`totalceremonyhour_${savedProjectName}_${savedSprintName}`, totalMinute / 60);
 
    updateTotals({ Totaceremonyminute: totalMinute, totalceremonyhour: totalMinute / 60 });
  };
 
  useEffect(() => {
    calculateTotals();
  }, [inputValues]);
 
  const generateDates = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    const stopDate = new Date(end);
 
    while (currentDate <= stopDate) {
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
 
    return dates;
  };
 
  const dates = generateDates(startDate, endDate);
 
  const handleInputChange = (event, meetingIndex, dateIndex) => {
    const value = event.target.value;
    const key = `${meetings[meetingIndex].name}-${dates[dateIndex]}`;
 
    const updatedValues = { ...inputValues, [key]: value };
    setInputValues(updatedValues);
 
    const savedProjectName = localStorage.getItem("selectedProjectName");
    const savedSprintName = localStorage.getItem("selectedSprintName");
    localStorage.setItem(`inputValues_${savedProjectName}_${savedSprintName}`, JSON.stringify(updatedValues));
    updateTotals(updatedValues);
  };
 
  return (
    <div className='mt-2 overflow-x-scroll  border-2 border-gray-400 rounded' style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      <table className="border border-collapse-2 border-white rounded-xl bg-gray-100">
        <thead >
          <tr>
            <th className="sticky left-0 z-10 bg-gray-100">
              Meetings
            </th>
            {dates.map((date, index) => (
              <th key={index} className="bg-gray-200 border-2 border-white text-center">
                <div className="flex items-end py-2 vertical-date">
                  {date}
                </div>
              </th>
            ))}
          </tr>
        </thead>
 
        <tbody>
          {meetings.map((meeting, meetingIndex) => (
            <tr key={meeting.name}>
              <td className="border-2 border-white text-center px-8 sticky left-0 z-10 bg-gray-200 font-bold">
                {meeting.name}
              </td>
              {dates.map((date, dateIndex) => {
                const key = `${meeting.name}-${date}`;
                const value = inputValues[key] || '';
                return (
                  <td key={dateIndex} style={{ textAlign: 'left' }}> {/* Adjust the width as needed */}
                    <input
                      type="number"
                      size="small"
                      value={value}
                      className="py-1.5 border-2 rounded-lg tableCellData font-semibold w-full"
                      onChange={(event) => handleInputChange(event, meetingIndex, dateIndex)}
                    // InputProps={{
                    //     style: { fontSize: '0.8rem', padding: '1px', textAlign: 'left' },
                    // }}
                    />
                  </td>
 
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default CeremonyTable;