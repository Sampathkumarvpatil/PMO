import React, { useState, useEffect } from 'react';
import LastButtons from './LastButtons';

const FileUpload = ({sidebarToggle}) => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const selectedProjectName = localStorage.getItem('selectedProjectName')
  const selectedSprintName = localStorage.getItem('selectedSprintName')
  // Load uploaded files from local storage when component mounts
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || {};
    const reqFiles = storedFiles[`${selectedProjectName}${selectedSprintName}`]
    if (reqFiles) {
      setUploadedFiles(reqFiles);
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
        const newUploadedFiles = [...uploadedFiles, { name: file.name, content: fileContent }];
        setUploadedFiles(newUploadedFiles);
        const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles'))||{};
        storedFiles[`${selectedProjectName}${selectedSprintName}`] = newUploadedFiles
        localStorage.setItem('uploadedFiles', JSON.stringify(storedFiles));
      };
      reader.readAsDataURL(file);
      setFile(null);
      alert('File uploaded successfully!');
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleOpenFile = (content) => {
    window.open(content, '_blank');
  };

  return (
    <div className={`flex flex-col justify-center transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"} ${sidebarToggle ? "w-[100%]" : "w-[75%]"}`}>
      <h2 className="text-2xl text-center my-4 text-[30px] font-bold">Upload Files</h2>
      <div className="flex justify-center items-center my-4">
        <input type="file" onChange={handleFileChange} className="bg-gray-200 p-2 rounded-md mr-2" />
        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
      </div>
      <div className="mt-4 flex flex-col justify-center p-4">
        {uploadedFiles.map((uploadedFile, index) => (
          <div key={index} className="bg-gray-100 p-4 my-2 flex justify-between items-center border-b-2 px-20
          shadow-xl border-r-2 border-gray-400 rounded-lg">
            <p className="text-gray-700">{`File ${index + 1}:`}</p>
            <p className='text-gray-700'>{uploadedFile.name}</p>
            <button onClick={() => handleOpenFile(uploadedFile.content)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Open</button>
          </div>
        ))}
      </div>
      <LastButtons current={'FileUpload'} />
    </div>
  );
};

export default FileUpload;
