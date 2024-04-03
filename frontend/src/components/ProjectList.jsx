import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const ProjectList = ({sidebarToggle}) => {
  const [list, setList] = useState(() => {
    // Retrieve projects from local storage, or default to an empty array if no data is found
    const savedProjects = JSON.parse(localStorage.getItem('tasks'));
    return savedProjects || [];
  });

  const navigate = useNavigate();
  // Update local storage whenever the list changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(list));
  }, [list]);

  const addProject = () => {
    const newProject = { name: `Project${list.length + 1}`, id: uuidv4() };
    setList([...list, newProject]);
  };

  const handleNameChange = (id, newName) => {
    setList(list.map(project => 
      project.id === id ? { ...project, name: newName } : project
    ));
  };

  const onClickHandler = (id)=>{
    navigate(`/${id}`)
  }

  return (
    <div className={`transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"}`}>
      {list.map(project => (
        <div 
        key={project.id} 
        className='border-b-2 border-gray-400 p-4 m-2 shadow-md rounded-lg'
        onClick={()=>{onClickHandler(project.id)}}
        >
          <input
            type='text'
            value={project.name}
            onChange={e => handleNameChange(project.id, e.target.value)}
            className='text-lg font-medium focus:outline-none'
          />
          <br />
          <span className='text-[14px]'>Id: {project.id}</span>  
        </div>
      ))}

      <button 
        className='bg-blue-600 border-2 w-full border-blue-600 text-white text-[14px] rounded-md px-4 py-3  hover:bg-white hover:text-blue-600' 
        onClick={addProject} 
      >
        Add project 
      </button>
    </div>
  );
};

export default ProjectList;

