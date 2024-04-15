import React, { useEffect, useState } from "react";

const getInitialDatesWithInitialValues = (start, end) => {
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


const CeremonyTable = ({ startDate, endDate, updateTotals, meetings }) => {
  
 // setCeremonyInput(stateValue);
 const savedProjectName = localStorage.getItem("selectedProjectName");
 const savedSprintName = localStorage.getItem("selectedSprintName");

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
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


  if(meetings && meetings.length>5) {
    for(let i=5;i<meetings.length;i++){
      let collaborativeTime = JSON.parse(localStorage.getItem("collaborative_time"))
      const savedProjectName = localStorage.getItem("selectedProjectName");
      const savedSprintName = localStorage.getItem("selectedSprintName");
      if(collaborativeTime[savedProjectName][savedSprintName][meetings[i].name] ===undefined){ 
    
    ceremonyInput[meetings[i].name] = {...getInitialDatesWithInitialValues(startDate, endDate)}
    

    let sprint = collaborativeTime[savedProjectName][savedSprintName]
    sprint[meetings[i].name] = ceremonyInput[meetings[i].name]

    collaborativeTime[savedProjectName][savedSprintName] = sprint


    localStorage.setItem("collaborative_time",JSON.stringify(collaborativeTime))
    
      }
      spreadTime = collaborativeTime
  }
}


  useEffect(() => {
    // Get the selected project and sprint from local storage
    const savedProjectName = localStorage.getItem("selectedProjectName");
    const savedSprintName = localStorage.getItem("selectedSprintName");
    if (savedProjectName && savedSprintName) {
      setSelectedProject(savedProjectName);
      setSelectedSprint(savedSprintName);
    }

    const localCollaborativeTime = localStorage.getItem("collaborative_time");
    let parsedCollaborativeTime;
    if (localCollaborativeTime) {
      parsedCollaborativeTime = JSON.parse(localCollaborativeTime);
    }
   

    const initializeCeremonyData = (startDate, endDate) => ({
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

    const updateLocalStorage = (data) => {
      localStorage.setItem("collaborative_time", JSON.stringify(data));
    };

    if (savedProjectName && savedSprintName && startDate && endDate) {
      let collaborativeData = parsedCollaborativeTime || {};

      if (!collaborativeData[savedProjectName]) {
        console.log("im if nothing..");
        collaborativeData[savedProjectName] = {
          [savedSprintName]: initializeCeremonyData(startDate, endDate),
        };
      } else if (!collaborativeData[savedProjectName][savedSprintName]) {
        console.log("im here if something but no sprint added...");
        collaborativeData[savedProjectName] = {
          [savedSprintName]: initializeCeremonyData(startDate, endDate),
          ...collaborativeData[savedProjectName],
        };
      }

      setCeremonyInput(collaborativeData[savedProjectName][savedSprintName]);
      console.log("savedSprintn name", savedSprintName);
      updateLocalStorage(collaborativeData);
    } else {
      console.log("hello in ddd in");
      setCeremonyInput(
        parsedCollaborativeTime[savedProjectName][savedSprintName]
      );
    }

    if (localCollaborativeTime && localCollaborativeTime !== undefined) {
      setCollaboeativeTime(JSON.parse(localCollaborativeTime));
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const selected_project = localStorage.getItem("selectedProjectName");
    const selected_sprint = localStorage.getItem("selectedSprintName");

    if (selected_project && selected_sprint && collaborative_time) {
      const data = collaborative_time?.[selected_project]?.[selected_sprint];

      const sumValues = {};
      console.log("im your spring data", data);
      if (data) {
        for (const key in data) {
          sumValues[key] = Object.values(data[key]).reduce(
            (acc, val) => acc + Number(val),
            0
          );
        }

        const totalSum = Object.values(sumValues).reduce(
          (acc, val) => acc + val,
          0
        );
        console.log("im calculating your total");
        updateTotals(totalSum);
      }
    }
    console.log("im called");
  }, [collaborative_time]);

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

  const handleInputChange = (event, meetingIndex, dateIndex) => {
    const value = event.target.value;
    const key = `${meetings[meetingIndex].name}-${dates[dateIndex]}`;
    console.log("meetingIndex:", meetingIndex);
    console.log("dateIndex:", dateIndex);
    console.log("Meeting:", meetings[meetingIndex]);
    console.log("Date:", dates[dateIndex]);
    setCeremonyInput((prevCeremonyInput) => {
      // Create a deep copy of the state
      const updatedCeremonyInput = JSON.parse(
        JSON.stringify(prevCeremonyInput)
      );

      // Update the value
      const meetingName = meetings[meetingIndex].name;
      const date = dates[dateIndex];
      if (updatedCeremonyInput[meetingName]) {
        updatedCeremonyInput[meetingName][date] = value;
      }

      // Return the updated state
      return updatedCeremonyInput;
    });
    // const stateValue = { ...ceremonyInput };
    // console.log(stateValue?.[meetings[meetingIndex].name]?.[dates[dateIndex]]);
    // if (stateValue)
    //   stateValue[meetings[meetingIndex].name][dates[dateIndex]] = value;

   
    if (
      collaborative_time &&
      savedProjectName &&
      savedSprintName &&
      key &&
      (value === 0 || value) &&
      spreadTime[savedProjectName]
    ) {
      console.log("project name:", spreadTime[savedProjectName]);
      console.log("coming name of sprint", savedSprintName);
      console.log("sprint name", spreadTime[savedProjectName][savedSprintName]);
      console.log("meeting name:", meetings[meetingIndex].name);
      console.log("date index", dates[dateIndex]);
      spreadTime[savedProjectName][savedSprintName][
        meetings[meetingIndex].name
      ][dates[dateIndex]] = value;

      setCollaboeativeTime(spreadTime);
      localStorage.setItem("collaborative_time", JSON.stringify(spreadTime));
    }
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
                <div className="flex items-end py-2 vertical-date">{date}</div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {meetings && meetings.map((meeting, meetingIndex) => (
            <tr key={meeting.name}>
              <td className="border-2 border-white text-center px-8 sticky left-0 z-10 bg-gray-200 font-bold">
                {meeting.name}
              </td>
              {dates.map((date, dateIndex) => {
                const key = `${meeting.name}-${date}`;
                // const value = ceremonyInput[meeting.name][date];
                // collaborative_time
                //   ? collaborative_time[selectedProject]?.[selectedSprint]?.[
                //       meetings[meetingIndex]?.name
                //     ]?.[date]
                //   : 0;

                // inputValues[key] || "";

                let value = ceremonyInput[meetings[meetingIndex].name][
                  date
                ]

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
