// import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";

const HolidayInputs = () => {
  const [allHolidaysArr, setAllHolidaysArr] = useState([]);
  // const [allHolidaysArr, setAllHolidaysArr] = useState([]);
  const [holidayDate, setHolidayDate] = useState("");
  const [occasion, setOccasion] = useState("");

  const addHolidayRow = () => {
    if (holidayDate && occasion) {
      const newHolidayRow = {
        holidayDate: holidayDate,
        occasion: occasion,
      };
      let currentSprint = localStorage.getItem("currentSprint");
      if (currentSprint) {
        currentSprint = { ...JSON.parse(currentSprint) };
        if (currentSprint?.holidays) {
          currentSprint?.holidays?.push(newHolidayRow);
        } else {
          currentSprint["holidays"] = [];
          currentSprint.holidays.push(newHolidayRow);
        }
        localStorage.setItem("currentSprint", JSON.stringify(currentSprint));
      }
      setAllHolidaysArr([...allHolidaysArr, newHolidayRow]);
      setHolidayDate("");
      setOccasion("");
    }
  };
  useEffect(() => {
    localStorage.setItem("AllHolidays", JSON.stringify(allHolidaysArr));
  }, [allHolidaysArr]);

  useEffect(() => {
    let currentSprint = localStorage.getItem("currentSprint");
    if (currentSprint) {
      currentSprint = { ...JSON.parse(currentSprint) };
      if (currentSprint?.holidays) {
        setAllHolidaysArr(currentSprint?.holidays);
      }
    }
  }, []);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addHolidayRow();
    }
  };
  return (
    <div>
      <div className="flex justify-around gap-1 py-8">
        <div>
          <input
            id="holidayDate"
            value={holidayDate}
            onChange={(e) => setHolidayDate(e.target.value)}
            className="border border-gray-400 w-48 text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
            type="date"
          />
        </div>
        <div>
          <input
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            onKeyDown={handleKeyPress}
            className="border border-gray-400 w-48 text-base px-2 py-2 focus:outline-none focus:ring-1 gray-600 rounded-lg"
            type="text"
            placeholder="Occasion"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="flex justify-center items-center mx-48 mb-4 px-8 py-1.5 bg-blue-600 text-white font-bold rounded"
          onClick={addHolidayRow}
        >
          Add
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table
          // sx={{ minWidth: 450 }}
          aria-label="simple table"
        >
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell
                style={{ borderRight: "1px solid #000", textAlign: "center" }}
              >
                Holiday
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>Occasion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="border border-gray-200">
            {allHolidaysArr.map((holiday, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ borderRight: "1px solid #000", textAlign: "center" }}
                >
                  {holiday.holidayDate}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {holiday.occasion}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HolidayInputs;
