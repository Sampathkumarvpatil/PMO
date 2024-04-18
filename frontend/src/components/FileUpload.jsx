import React, { useState, useEffect } from "react";
import LastButtons from "./LastButtons";

const FileUpload = ({ sidebarToggle }) => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileDescriptions, setFileDescriptions] = useState([]);
  const selectedProjectName = localStorage.getItem("selectedProjectName");
  const selectedSprintName = localStorage.getItem("selectedSprintName");

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || {};
    const reqFiles = storedFiles[`${selectedProjectName}${selectedSprintName}`];
    if (reqFiles) {
      setUploadedFiles(reqFiles);
      setFileDescriptions(reqFiles.map((file) => file.description || ""));
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const newUploadedFiles = [
          ...uploadedFiles,
          { name: file.name, content: fileContent, description: "" },
        ];
        setUploadedFiles(newUploadedFiles);
        setFileDescriptions([...fileDescriptions, ""]);
        const storedFiles =
          JSON.parse(localStorage.getItem("uploadedFiles")) || {};
        storedFiles[`${selectedProjectName}${selectedSprintName}`] =
          newUploadedFiles;
        localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles));
      };
      reader.readAsDataURL(file);
      setFile(null);
      alert("File uploaded successfully!");
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleOpenFile = (content) => {
    window.open(content, "_blank");
  };

  const handleDescriptionChange = (index, event) => {
    const updatedDescriptions = [...fileDescriptions];
    updatedDescriptions[index] = event.target.value;
    setFileDescriptions(updatedDescriptions);
    updateStoredFiles(uploadedFiles, updatedDescriptions);
  };

  const updateStoredFiles = (files, descriptions) => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || {};
    storedFiles[`${selectedProjectName}${selectedSprintName}`] = files.map(
      (file, index) => ({
        ...file,
        description: descriptions[index],
      })
    );
    localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles));
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);

    const updatedDescriptions = [...fileDescriptions];
    updatedDescriptions.splice(index, 1);
    setFileDescriptions(updatedDescriptions);

    updateStoredFiles(updatedFiles, updatedDescriptions);
  };

  return (
    <div
      className={`flex flex-col justify-center transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      } ${sidebarToggle ? "w-[100%]" : "w-[75%]"}`}
    >
      <h2 className="text-2xl text-center my-4 text-[30px] font-bold">
        Upload Files
      </h2>
      <div className="flex justify-center items-center my-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="bg-gray-200 p-2 rounded-md mr-2"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Upload
        </button>
      </div>
      <div className="mt-4 flex flex-col justify-center p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-gray-200 p-4 text-left text-center">Sr. no.</th>
              <th className="bg-gray-200 p-4 text-left text-center">File</th>
              <th className="bg-gray-200 p-4 text-left text-center">
                Description
              </th>
              <th className="bg-gray-200 p-4 text-left text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((uploadedFile, index) => (
              <tr
                key={index}
                className="bg-gray-100 border-b-2 border-gray-400"
              >
                <td className="p-4 text-center">{`${index + 1}:`}</td>
                <td className="p-4 text-center">{` ${uploadedFile.name}`}</td>
                <td className="p-4 text-center">
                  <textarea
                    cols={40}
                    rows={3}
                    type="text"
                    value={fileDescriptions[index]}
                    onChange={(event) => handleDescriptionChange(index, event)}
                    className="bg-gray-200 p-2 rounded-md mr-2"
                    placeholder="Enter description"
                  />
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleOpenFile(uploadedFile.content)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleDeleteFile(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LastButtons current={"FileUpload"} />
    </div>
  );
};

export default FileUpload;
