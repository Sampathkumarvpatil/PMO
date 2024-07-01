import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Section from "./Section";
import { socket } from "../utils/socket";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Room = ({ sidebarToggle }) => {
  const location = useLocation();
  const { desc, sections } = location.state || {};
  const { id } = useParams();
  const [role, setRole] = useState("");
  const [roomDetails, setRoomDetails] = useState({});
  const [sec, setSec] = useState(sections);

  const navigate = useNavigate();

  useEffect(() => {
    setSec(sections);
  }, [sections]);

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);
  }, []);
  useEffect(() => {
    if (id) {
      socket.on("connect", () => {
        console.log("Socket connected!");
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });
      socket.emit("join-rroom", id);

      socket.on("rroom-details", (details) => {
        console.log(details);
        setRoomDetails(details);
        setSec(details.sections);
      });

      socket.on("rroom-details-updated", (updatedDetails) => {
        setSec(updatedDetails?.sections);
        setRoomDetails(updatedDetails);
      });

      socket.on("rrooms", (updatedDetails) => {
        setSec(updatedDetails[id]?.sections);
      });

      return () => {
        socket.off("rroom-details-updated");
      };
    }
  }, [id]);

  const showRoomDetails = () => {
    navigate(`/retrospective/${id}/download`, {
      state: roomDetails,
    });
  };

  const saveRoomDetails = () => {
    alert("data saved successfully");
    const selectedProject = localStorage.getItem("selectedProjectName");
    const selectedSprint = localStorage.getItem("selectedSprintName");
    const data = JSON.parse(localStorage.getItem("retrospective")) || {};
    data[selectedProject + selectedSprint] = roomDetails;
    localStorage.setItem("retrospective", JSON.stringify(data));
  };
  console.log(role);
  return (
    <div
      className={`text-center p-4 shadow-2xl min-h-[100vh] transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      {/* <div className="mb-10">
      <ProjOptions />
      </div> */}
      <div>
        <div>
          <span className="text-4xl font-bold underline">{id}</span>

          <div className="flex flex-wrap justify-between">
            {Object.keys(sec || {}).map((item, index) => (
              <Section
                key={index}
                roomName={id}
                section={item}
                divs={sec[item]}
                colorind={index}
              />
            ))}
          </div>
        </div>
      </div>

      {role === "Account Manager/Project Manager" && (
        <>
          <button
            onClick={saveRoomDetails}
            className=" bg-blue-500 border-[2px]
      border-blue-400 hover:bg-white hover:text-blue-500 px-4 py-2 text-white rounded-lg mt-14"
          >
            Save
          </button>

          <button
            onClick={showRoomDetails}
            className="my-2 mx-4 bg-blue-500 border-[2px]
      border-blue-400 hover:bg-white hover:text-blue-500 px-4 py-2 text-white rounded-lg mt-14"
          >
            Download Retrospective Pdf
          </button>
        </>
      )}
    </div>
  );
};

export default Room;
