import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const OptionsBox = ({ index, editAndClose, deleteRow, position,onEdit ,optionsVisible}) => {
  return (
    <div className="options-container" >
    <div className="options-box"style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        boxShadow: "0px 2px 5px 4px rgba(2, 0, 0, 0.1)",
        backgroundColor: "white",
        padding: "8px",
        zIndex: 9999 
      }}>
      <button className=" flex gap-2 option optionEdit" onClick={() =>
         onEdit(index)
         }>

        <FaEdit className="text-xl mb-2 mt-0.5"/>
        <h4 className="text-lg mb-2">Edit</h4>
      </button>
      <button className="flex gap-2 option optionDelete" onClick={() => deleteRow(index)}>
        <FaTrash className="text-xl mb-2 mt-0.5"/>
        <h4 className="text-lg mb-2">Delete</h4>
      </button>
    </div>
  </div> 
  );
};
export default OptionsBox;
