import TestIcons from "./TestIcons";
import React, { useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { useFetchTestReport } from "../utils/useFetchTestReport";
import ExecutionTimeGraph from "../Graphs/ExecutionTimeGraph";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function FailedTest({ sidebarToggle }) {
    const { data } = useFetchTestReport();
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    // const { data } = useFetchTestReport();
    return (
        <div
            className={`transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"
                }`}
        >
            <div className="grid grid-cols-[5%,94%] justify-between">
                <div style={{ backgroundColor: '#e2e3f3' }}>
                    <TestIcons />
                </div>
                <div className="grid grid-cols-[38%,47%,15%] mt-4 px-4">
                    <div style={{ borderRight: '1px solid' }}>
                        <h3 className="rounded-lg inline-block px-2 py-1" style={{ backgroundColor: '#aee7ae', color: 'green' }}>TIMESTAMP</h3>
                        <h1 className="px-4 py-4" >7:55:28 AM</h1>
                        <div style={{ padding: "0px 18px" }}>
                            <ExecutionTimeGraph data={data} />
                        </div>
                    </div>
                    <div style={{ borderRight: '1px solid' }}>
                        <h3 className="ml-2 rounded-lg inline-block px-2 py-1" style={{ backgroundColor: '#aee7ae', color: 'green' }}>SCREENSHOT</h3>
                        <img src="../dummy_img.png" width={700} style={{ height: '350px' }} className="ml-2 px-4 py-8"></img>
                    </div>
                    <div>
                        <h3 className="ml-2 rounded-lg inline-block px-2 py-1" style={{ backgroundColor: '#aee7ae', color: 'green' }}>DETAILS</h3>
                        <div className="py-4">
                            <div className="flex flex-row ml-4 mt-3">
                                <h3>ProjectName :</h3>
                                <p>&nbsp;PMO</p>
                            </div>
                            <div className="flex flex-row ml-4 mt-3">
                                <h3>ClassName&nbsp;&nbsp;&nbsp;&nbsp; :</h3>
                                <p>&nbsp;Data</p>
                            </div>
                            <div className="flex flex-row ml-4 mt-3">
                                <h3>MethodName :</h3>
                                <p>&nbsp;Hello</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center ml-4 my-2 rounded-lg" style={{ backgroundColor: '#edcbed', width: '50%' }}>
                            <h3 className="px-1 py-2 text-lg cursor-pointer" style={{ color: 'purple' }} onClick={handleOpenDialog} >Exception</h3>
                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                fullWidth
                            >
                                <div className="flex flex-row justify-between">
                                    <DialogTitle
                                        className="!pb-0 !pt-3"
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "1.5rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Exception
                                    </DialogTitle>
                                    <button className=" bg-red-600 rounded-full text-white mt-2 mr-8" onClick={handleCloseDialog}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        {/* <FaPlusCircle className=" flex justify-end text-xl" onClick={onClose}/> */}

                                    </button>
                                </div>
                                <DialogContent>
                                    <textArea rows={10} cols={60} >
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde obcaecati, culpa officiis est aliquid molestiae repudiandae. Nobis ipsam eos, sunt cum praesentium eius tenetur numquam a laborum, consequatur eligendi porro?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis animi et vitae nostrum nobis rem vel, cum amet aliquid rerum sint maxime error dolor itaque iure. Voluptas minima quo laboriosam!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde obcaecati, culpa officiis est aliquid molestiae repudiandae. Nobis ipsam eos, sunt cum praesentium eius tenetur numquam a laborum, consequatur eligendi porro?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis animi et vitae nostrum nobis rem vel, cum amet aliquid rerum sint maxime error dolor itaque iure. Voluptas minima quo laboriosam!
                                    </textArea>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FailedTest;