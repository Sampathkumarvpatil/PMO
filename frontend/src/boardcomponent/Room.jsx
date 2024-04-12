import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Section from "./Section";
import { socket } from "../utils/socket";
import ProjOptions from "../components/ProjOptions";
 
const Room = ({ sidebarToggle }) => {
  const location = useLocation();
  const { desc, sections } = location.state || {};
  console.log(location.state);
  const [roomDetails, setRoomDetails] = useState({});
  const [sec, setSec] = useState(sections);
 
  const navigate = useNavigate();
 
  useEffect(() => {
    setSec(sections);
  }, [sections]);
 
  useEffect(() => {
    if (desc) {
      socket.emit("join-room", desc);
      console.log(desc);
      socket.on("room-details", (details) => {
        setRoomDetails(details);
        setSec(details.sections)
      });
 
      socket.on("room-details-updated", (updatedDetails) => {
        console.log(updatedDetails?.sections);
        setSec(updatedDetails?.sections);
        setRoomDetails(updatedDetails);
      });
 
      socket.on("rooms", (updatedDetails) => {
        console.log(updatedDetails);
        setSec(updatedDetails[desc]?.sections);
      });
 
      return () => {
        socket.off("room-details-updated");
      };
    }
  }, [socket, desc]);
 
  const showRoomDetails = () => {
    console.log(roomDetails);
    navigate(`/retrospective/${desc}/download`, {
      state: roomDetails,
    });
  };
 
  return (
    <div className={`text-center p-4 shadow-2xl m-10 transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"}`}>
      <div className="mb-10">
      <ProjOptions />
      </div>
      <div>
      <button
        onClick={showRoomDetails}
        className="my-2 absolute top-9 right-10 bg-blue-500 border-[2px]
      border-blue-400 hover:bg-white hover:text-blue-500 px-4 py-2 text-white rounded-lg mt-14"
      >
        Download Retrospective
      </button>

 
      <div>
        <span className="text-4xl font-bold underline">{desc}</span>
 
        <div className="flex flex-wrap justify-between">
          {Object.keys(sec || {}).map((item, index) => (
            <Section
              key={index}
              roomName={desc}
              section={item}
              divs={sec[item]}
              colorind={index}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};
 
export default Room;
