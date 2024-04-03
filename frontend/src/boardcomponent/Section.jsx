import React, { useState } from "react";
import { socket } from "../utils/socket";
import { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { BsHandThumbsUpFill } from "react-icons/bs";

const Section = ({ roomName, section, divs, colorind }) => {
  const colors = [
    "bg-[#64f590]",
    "bg-[#a7ecf7]",
    "bg-[#e1f7a7]",
    "bg-[#f7ada7]",
    "bg-[#b8a7f7]",
    "bg-[#f8b1e6]"
  ];

  const [divcnt, setDivcnt] = useState([]);

  const addDiv = () => {
    const newDiv = {
      name: `Div${divcnt.length + 1}`,
      content: "",
      votes: 0
    };
    setDivcnt((prev) => [...prev, newDiv]);

    
    socket.emit("add-div", { roomName, section, newDiv });
  };

  const updateContent = (index, content) => {
    const updatedDivs = [...divcnt];
    updatedDivs[index].content = content;
    setDivcnt(updatedDivs);

    
    socket.emit("update-div-content", { roomName, section, index, content });
  };

  const voteForDiv = (index) => {
    const updatedDivs = [...divcnt];
    updatedDivs[index].votes += 1;
    setDivcnt(updatedDivs);

    
    socket.emit("vote-for-div", { roomName, section, index });
  };

  useEffect(() => {
    if (divs?.length > 0) {
      setDivcnt(divs);
    }
  }, [divs]);

  return (
    <div className={`w-1/3 text-center my-10 `}>
      <span className="underline text-2xl font-semibold">{section}</span>
      <br />
      <button
        className={`mx-4 bg-gray-400 m-2 px-2 rounded-md text-white bg-white text-black `}
        onClick={addDiv}
      >
        <span className="text-xl text-black">
          <IoMdAdd />
        </span>
      </button>

      <div className={`flex flex-wrap mx-4 p-4 `}>
        {divcnt.map((item, index) => (
          <div
            key={`${section}-${index}`} // Ensure unique keys
            className={`m-2 p-2 border-[2px] border-gray-200 shadow-md w-[200px] h-[200px] rounded-lg ${colors[colorind]}`}
          >
            <span>{item.name}</span>
            <textarea
              rows={3}
              type="text"
              placeholder="Content"
              className="bg-transparent mt-4 p-1"
              value={item.content}
              onChange={(e) => updateContent(index, e.target.value)}
            />
            <div className="flex items-center justify-center mt-2">
              <BsHandThumbsUpFill
                className="cursor-pointer"
                onClick={() => voteForDiv(index)}
              />
              <span className="ml-2">{item.votes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
