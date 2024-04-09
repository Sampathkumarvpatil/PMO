import React, { useState, useEffect } from "react";
import CeremonyTable from "./CeremonyTable";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CeremonyContainer = ({ startDate, endDate, sprintName, projectName }) => {
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMeetingName, setNewMeetingName] = useState("");
  const [meeting, setMeeting] = useState();

  useEffect(() => {
    
    let projectName = localStorage.getItem("selectedProjectName")
    let sprintName = localStorage.getItem("selectedSprintName")
    let meetingData = localStorage.getItem("meetings")
    let data = [
      { name: "Daily Sync" },
      { name: "Sprint Planning" },
      { name: "Iteration Review" },
      { name: "Cycle Retrospective" },
      { name: "Story Refinement" },
      // Add more meetings as needed
    ]
    if (meetingData === null) {
      let obj = { [projectName]: { [sprintName]: data } };
      localStorage.setItem("meetings", JSON.stringify(obj))
      setMeeting(data)
    } else if (JSON.parse(meetingData)[projectName] === undefined) {
      let meetingData = JSON.parse(localStorage.getItem("meetings"))
      meetingData[projectName] = { [sprintName]: data }
      localStorage.setItem("meetings", JSON.stringify(meetingData))
    } else if (JSON.parse(meetingData)[projectName][sprintName] === undefined) {
      let meetingData = JSON.parse(localStorage.getItem("meetings"))
      let projectData = meetingData[projectName]
      projectData[sprintName] = data
      meetingData[projectName] = projectData
      localStorage.setItem("meetings", JSON.stringify(meetingData))
    } else {
      setMeeting(JSON.parse(localStorage.getItem("meetings"))[projectName][sprintName])
    }
  }, [sprintName,projectName])


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveMeeting = () => {
    if (newMeetingName.trim() !== "") {
      let data = [...meeting, { name: newMeetingName }]
      setMeeting(data);
      setNewMeetingName("");
      let meetingData = JSON.parse(localStorage.getItem("meetings"))
      let projectData = meetingData[projectName]
      projectData[sprintName] = data
      meetingData[projectName] = projectData
      localStorage.setItem("meetings", JSON.stringify(meetingData))
    }
    setOpenDialog(false);
  };

  const updateTotals = (minutes) => {
    const hours = (minutes / 60).toFixed(2);
    setTotalMinutes(minutes);
    setTotalHours(hours);

    localStorage.setItem("TotalCeremonyMinutes", minutes);
    localStorage.setItem("TotalCeremonyHours", hours);
  };

  return (
    <div className="bg-white border-2 border-gray-500 rounded-lg p-4 mt-4 shadow-xl m-1">
      <div className="flex flex-row justify-between items-center">
        <div className="bg-blue-600 text-white rounded-xl px-6 py-2 flex items-center ">
          <label className="font-bold mr-2">Collaborative Time</label>
        </div>
        <div>
          <label className="font-bold text-black mr-16">Sprint Duration:</label>
        </div>
      </div>
      <br />
      <div>
        <CeremonyTable
          startDate={startDate}
          endDate={endDate}
          updateTotals={updateTotals}
          meetings={meeting}
        />
      </div>
      <div className="flex flex-row mt-20">
        <div className="">
          <h1 className="font-bold mr-2 mt-[-10px]">
            Aggregate Planning Time/ <br />
            Team Member(In Minutes)
          </h1>
          <h1 className="font-bold text-green-500 text-2xl">{totalMinutes}</h1>
        </div>
        <div className="ml-20">
          <h1 className="font-bold mr-2 mt-[-10px]">
            Aggregate Planning Time/ <br />
            Team Member(In Hours)
          </h1>
          <h1 className="font-bold text-green-500 text-2xl">
            {Number(totalHours).toFixed(2)}
          </h1>
        </div>
      </div>

      <div className="text-center">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg border-2 border-blue-600 shadow-xl"
          onClick={handleOpenDialog}
        >
          Add Meeting
        </button>
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
          Add Meeting
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Meeting Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newMeetingName}
            onChange={(e) => setNewMeetingName(e.target.value)}
            style={{ margin: "16px 0", fontSize: "1rem", padding: "10px" }}
            InputLabelProps={{
              style: { fontSize: "1.1rem" },
            }}
            inputProps={{
              style: { fontSize: "1.1rem", padding: "10px" },
            }}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleCloseDialog}
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              margin: "10px",
              padding: "10px 30px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveMeeting}
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              margin: "10px",
              padding: "10px 30px",
              backgroundColor: "#1976d2",
              color: "white",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CeremonyContainer;
