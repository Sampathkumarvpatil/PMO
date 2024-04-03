import React, { useState } from "react";

const EditPopup = ({ index, editedName, editedRole, editedAllocationPercentage, onSave, onClose }) => {
  const [name, setName] = useState(editedName);
  const [role, setRole] = useState(editedRole);
  const [allocationPercentage, setAllocationPercentage] = useState(editedAllocationPercentage);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-end">
        <button className=" bg-red-600 rounded-full p-0.5 text-white" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
{/* <FaPlusCircle className=" flex justify-end text-xl" onClick={onClose}/> */}

        </button>
        </div>
        <h2 className="text-lg font-bold mb-4">Edit Employee Data</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Edit Employee Name" className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full" />
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Edit Employee Role" className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full" />
        <input type="number" value={allocationPercentage} onChange={(e) => setAllocationPercentage(e.target.value)} placeholder="Edit Allocation%" className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full" />
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => onSave(index, name, role, allocationPercentage)}>Save</button>
      </div>
    </div>
  );
};

export default EditPopup;
