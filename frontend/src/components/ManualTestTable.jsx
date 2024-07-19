import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FaEye, FaEdit } from "react-icons/fa";

const ManualTestTable = ({
  testCases,
  handleTestCaseChange,
  getUpdatedTestCases,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [tempTestCase, setTempTestCase] = useState({});
  const [dialogMode, setDialogMode] = useState("");
  const [currentField, setCurrentField] = useState("");

  const headers = [
    "test_case_id",
    "title",
    "description",
    "preconditions",
    "test_steps",
    "expected_results",
    "actual_results",
    "date",
    "status",
    "author",
    "comments",
  ];

  const fieldMap = {
    test_case_id: "test_case_id",
    title: "title",
    description: "description",
    preconditions: "preconditions",
    test_steps: "test_steps",
    expected_results: "expected_results",
    actual_results: "actual_results",
    date: "date",
    status: "status",
    author: "author",
    comments: "comments",
  };

  const handleOpenDialog = (mode, index, field = "") => {
    setDialogMode(mode);
    setCurrentIndex(index);
    setCurrentField(field);
    setTempTestCase({ ...testCases[index] });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentIndex(null);
    setTempTestCase({});
    setCurrentField("");
  };

  const handleSave = () => {
    const ind = testCases?.findIndex(
      (test) => test.test_case_id === tempTestCase.test_case_id
    );
    testCases[ind] = tempTestCase;
    getUpdatedTestCases(testCases);
    // Object.keys(tempTestCase).forEach((field) => {
    //   handleTestCaseChange(currentIndex, field, tempTestCase[field]);
    // });
    handleCloseDialog();
  };

  const handleTempTestCaseChange = (field, value) => {
    setTempTestCase({ ...tempTestCase, [field]: value });
  };

  const getDialogTitle = () => {
    return dialogMode === "view"
      ? `View ${headers.find((header) => fieldMap[header] === currentField)}`
      : "Edit Test Case";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#0A1070] text-white">
            {headers.map((header) => (
              <th
                key={header}
                className="p-2 border border-[#E6E6E6]"
                style={header === "Test Case ID" ? { width: "250px" } : {}}
              >
                <h3 className="px-2 py-1">{header}</h3>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {testCases.map((testCase, index) => (
            <tr
              key={testCase.test_case_id}
              className="border-b border-[#E6E6E6] hover:bg-[#F9FAFF]"
            >
              {Object.keys(testCase).map((field) => (
                <td key={field} className="p-2 border border-[#E6E6E6]">
                  {field === "date" ? (
                    <input
                      type="date"
                      value={testCase[field]}
                      onChange={(e) =>
                        handleTestCaseChange(index, field, e.target.value)
                      }
                      className="w-full p-2"
                    />
                  ) : field === "status" ? (
                    <select
                      value={testCase[field]}
                      onChange={(e) =>
                        handleTestCaseChange(index, field, e.target.value)
                      }
                      className="w-full p-2"
                    >
                      <option value="Passed">Passed</option>
                      <option value="Failed">Failed</option>
                      <option value="Skipped">Skipped</option>
                    </select>
                  ) : field === "test_case_id" ? (
                    <div className="flex justify-between items-center">
                      <textarea
                        value={testCase[field]}
                        onChange={(e) =>
                          handleTestCaseChange(index, field, e.target.value)
                        }
                        className="w-full h-full p-2 resize-none text-center overflow-y-hidden font-bold"
                        rows="1"
                      />
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenDialog("edit", index)}
                        style={{ border: "2px solid orange", height: "35px" }}
                      >
                        <FaEdit style={{ color: "orange", fontSize: "20px" }} />
                      </Button>
                    </div>
                  ) : field === "author" ? (
                    <div className="flex justify-between items-center">
                      <textarea
                        value={testCase[field]}
                        onChange={(e) =>
                          handleTestCaseChange(index, field, e.target.value)
                        }
                        className="w-full h-full p-2 resize-none text-center overflow-y-hidden font-bold"
                        rows="1"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenDialog("view", index, field)}
                        style={{
                          border: "3px solid lightgreen",
                          width: "50%",
                          height: "35px",
                          borderRadius: "15%",
                        }}
                      >
                        <FaEye style={{ color: "green", fontSize: "20px" }} />
                      </Button>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{getDialogTitle()}</DialogTitle>
        <DialogContent>
          {dialogMode === "view" ? (
            <div>
              <strong>
                {headers.find((header) => fieldMap[header] === currentField)}:
              </strong>{" "}
              {tempTestCase[currentField]}
            </div>
          ) : (
            headers.map((header) => {
              const field = fieldMap[header];

              return (
                <TextField
                  key={header}
                  margin="normal"
                  label={header}
                  type={header === "Date" ? "date" : "text"}
                  fullWidth
                  variant="outlined"
                  value={tempTestCase[field] || ""}
                  multiline={
                    header === "comments" ||
                    header === "preconditions" ||
                    header === "description" ||
                    header === "title" ||
                    header === "test_steps" ||
                    header === "expected_results" ||
                    header === "actual_results"
                  }
                  rows={
                    header === "comments" ||
                    header === "preconditions" ||
                    header === "description" ||
                    header === "title" ||
                    header === "test_steps" ||
                    header === "expected_results" ||
                    header === "actual_results"
                      ? 4
                      : 1
                  }
                  onChange={(e) =>
                    handleTempTestCaseChange(field, e.target.value)
                  }
                  select={header === "status"}
                  SelectProps={{
                    native: true,
                  }}
                  InputLabelProps={
                    header === "date"
                      ? {
                          shrink: true,
                        }
                      : {}
                  }
                  inputProps={
                    header === "status"
                      ? {
                          children: (
                            <>
                              <option value="Passed">Passed</option>
                              <option value="Failed">Failed</option>
                              <option value="Skipped">Skipped</option>
                            </>
                          ),
                        }
                      : {}
                  }
                />
              );
            })
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              margin: "0 0 10px 2px",
              padding: "10px 30px",
            }}
          >
            Close
          </Button>
          {dialogMode === "edit" && (
            <Button
              onClick={handleSave}
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                margin: "0 15px 10px 0",
                padding: "10px 30px",
                backgroundColor: "#1976d2",
                color: "white",
              }}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManualTestTable;
