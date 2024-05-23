import React, { useEffect, useState } from "react";

export const getInitialDatesWithInitialValues = (start, end) => {
  const dates = {};
  let currentDate = new Date(start);
  const stopDate = new Date(end);

  while (currentDate <= stopDate) {
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    dates[formattedDate] = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const CeremonyTable = ({
  startDate,
  endDate,
  updateTotals,
  selectedSprint,
  projectName,
  setSelectedSprint,
}) => {
  // setCeremonyInput(stateValue);

  const savedProjectName = projectName;
  const savedSprintName = selectedSprint?.sprintName;
  const sprintCopy = JSON.parse(JSON.stringify(selectedSprint));
  const [meetings, setMeeings] = useState([
    "Daily Sync",
    "Sprint Planning",
    "Iteration Review",
    "Cycle Retrospective",
    "Story Refinement",
  ]);

  const [collaborative_time, setCollaboeativeTime] = useState(undefined);
  let spreadTime = { ...collaborative_time };
  const [ceremonyInput, setCeremonyInput] = useState({
    ["Daily Sync"]: {
      ...getInitialDatesWithInitialValues(startDate, endDate),
    },
    ["Sprint Planning"]: {
      ...getInitialDatesWithInitialValues(startDate, endDate),
    },
    ["Iteration Review"]: {
      ...getInitialDatesWithInitialValues(startDate, endDate),
    },
    ["Cycle Retrospective"]: {
      ...getInitialDatesWithInitialValues(startDate, endDate),
    },
    ["Story Refinement"]: {
      ...getInitialDatesWithInitialValues(startDate, endDate),
    },
  });
  useEffect(() => {
    if (Object.keys(selectedSprint?.collaborative_time)?.length > 0) {
      setCeremonyInput(selectedSprint?.collaborative_time);
      updateTotals(getTotalMins(selectedSprint?.collaborative_time || 0));
    } else {
      updateTotals(0);
    }
    if (selectedSprint?.meetings?.length > 0) {
      setMeeings(selectedSprint?.meetings);
    }
  }, [
    selectedSprint?.collaborative_time,
    projectName,
    selectedSprint?.meetings,
  ]);

  // if (meetings && meetings.length > 5) {
  //   for (let i = 5; i < meetings.length; i++) {
  //     let collaborativeTime = selectedSprint?.collaborative_time;

  //     if (
  //       collaborativeTime[meetings[i]] ===
  //       undefined
  //     ) {
  //       ceremonyInput[meetings[i]] = {
  //         ...getInitialDatesWithInitialValues(startDate, endDate),
  //       };

  //       let sprint = collaborativeTime[savedProjectName][savedSprintName];
  //       sprint[meetings[i]] = ceremonyInput[meetings[i]];

  //       collaborativeTime[savedProjectName][savedSprintName] = sprint;

  //       localStorage.setItem(
  //         "collaborative_time",
  //         JSON.stringify(collaborativeTime)
  //       );
  //     }
  //     spreadTime = collaborativeTime;
  //   }
  // }

  useEffect(() => {
    // Get the selected project and sprint from local storage

    let collaborativeData = selectedSprint?.collaborative_time;

    const initializeCeremonyData = (allMeetings, startDate, endDate) => {
      let allCollabData = {};
      allMeetings.forEach((meet) => {
        allCollabData[meet] = {
          ...getInitialDatesWithInitialValues(startDate, endDate),
        };
      });
      return allCollabData;
    };

    if (savedProjectName && savedSprintName && startDate && endDate) {
      if (!collaborativeData || Object.keys(collaborativeData).length === 0) {
        collaborativeData = {
          ...initializeCeremonyData(
            selectedSprint?.meetings,
            startDate,
            endDate
          ),
        };
      }
      const newSprintUpdate = {
        ...selectedSprint,
        collaborative_time: collaborativeData,
      };
      localStorage.setItem("currentSprint", JSON.stringify(newSprintUpdate));
      setCeremonyInput(collaborativeData);
    }
  }, [startDate, endDate]);

  // useEffect(() => {
  //   if (savedProjectName && savedSprintName && collaborative_time) {
  //     const data = collaborative_time?.[savedProjectName]?.[savedSprintName];

  //     const sumValues = {};
  //     if (data) {
  //       for (const key in data) {
  //         sumValues[key] = Object.values(data[key]).reduce(
  //           (acc, val) => acc + Number(val),
  //           0
  //         );
  //       }

  //       const totalSum = Object.values(sumValues).reduce(
  //         (acc, val) => acc + val,
  //         0
  //       );
  //       updateTotals(totalSum);
  //     }
  //   }
  // }, [collaborative_time]);

  const generateDates = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    const stopDate = new Date(end);

    while (currentDate <= stopDate) {
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const dates = generateDates(startDate, endDate);
  const getTotalMins = (data) => {
    let totalSum = 0;

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const obj = data[key];
        for (const dateKey in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, dateKey)) {
            const value = obj[dateKey];
            totalSum += parseInt(value, 10) || 0;
          }
        }
      }
    }
    return totalSum;
  };
  const handleInputChange = (event, meetingIndex, dateIndex) => {
    const value = event.target.value;

    const ceremanyInputCopy = JSON.parse(JSON.stringify(ceremonyInput));
    const meetingName = meetings[meetingIndex];
    const date = dates[dateIndex];
    if (ceremanyInputCopy[meetingName]) {
      ceremanyInputCopy[meetingName][date] = value;
    }
    setCeremonyInput(ceremanyInputCopy);

    setCollaboeativeTime(spreadTime);
    localStorage.setItem(
      "collaborative_time",
      JSON.stringify(ceremanyInputCopy)
    );

    setSelectedSprint({ ...sprintCopy, collaborative_time: ceremanyInputCopy });

    updateTotals(getTotalMins(ceremanyInputCopy));
  };

  return (
    <div className="grid justify-center">
      <div
        className="mt-2 overflow-x-scroll border-2 border-gray-400 rounded flex justify-flex-start"
        style={{
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <table className="border border-collapse-2 border-white rounded-xl bg-gray-100">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-gray-100">Meetings</th>
              {dates.map((date, index) => (
                <th
                  key={index}
                  className="bg-gray-200 border-2 border-white text-center"
                >
                  <div className="flex items-end py-2 vertical-date">
                    {date}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {meetings &&
              meetings.map((meeting, meetingIndex) => (
                <tr key={meeting}>
                  <td className="border-2 border-white text-center px-8 sticky left-0 z-10 bg-gray-200 font-bold">
                    {meeting}
                  </td>
                  {dates.map((date, dateIndex) => {
                    const key = `${meeting}-${date}`;
                    // const value = ceremonyInput[meeting.name][date];
                    // collaborative_time
                    //   ? collaborative_time[selectedProject]?.[selectedSprint]?.[
                    //       meetings[meetingIndex]?.name
                    //     ]?.[date]
                    //   : 0;

                    // inputValues[key] || "";

                    let value = ceremonyInput[meetings[meetingIndex]][date];

                    return (
                      <td key={dateIndex} style={{ textAlign: "left" }}>
                        {" "}
                        {/* Adjust the width as needed */}
                        <input
                          type="number"
                          size="small"
                          value={value}
                          className="py-1.5 border-2 rounded-lg tableCellData font-semibold w-full"
                          onChange={(event) =>
                            handleInputChange(event, meetingIndex, dateIndex)
                          }
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
    </div>
  );
};

export default CeremonyTable;
