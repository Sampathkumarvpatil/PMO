import React, { useState, useEffect } from 'react';
import Resource from './Resource';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Task = ({ item, sr, list, setList,edit }) => {
  const [resources, setResources] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [changeTitle, setChangeTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(item.title); 
  const [totHours,setTotHours] = useState(0);
  const navigate = useNavigate();

  const {taskId} = useParams()

  useEffect(() => {
    console.log(); // Logging the item data whenever it changes
    const storedTasks = JSON.parse(localStorage.getItem(`${taskId}`)) || {};
    const taskToCheck = storedTasks[item.id]
    setTotHours(taskToCheck['totHours'])
  }, []);

  const planningPokerHandler = (id) => {
    navigate(`/${taskId}/planningpoker/${id}`);
  };
  const statusHandler = (id) => {
    navigate(`/${taskId}/status/${id}`);
  };

  const deleteTaskHandler = (id) => {
    // const storedTasks = JSON.parse(localStorage.getItem(`${nameToBeCng}`)) || {};
    // To be checked while changing
    // const taskToDelete = storedTasks[id];
    // delete storedTasks[id];
    // localStorage.setItem(`${taskId}`, JSON.stringify(storedTasks));
    // setList(Object.values(storedTasks));
  };

  const handleTitleEdit = () => {
    setChangeTitle(true);
  };

  const handleTitleSave = (e) => {
    const newTitle = e.target.value; // Store the new title value
    
    // Update the title in the list
    const updatedList = list.map((task) => {
      if (task.id === item.id) {
        return { ...task, title: newTitle }; // Use the new title directly here
      }
      return task;
    });
    
    // Update state with the new list and title change flag
    setList(updatedList);
    setEditableTitle(newTitle)
    
    // Update the title in localStorage
    const storedTasks = JSON.parse(localStorage.getItem(`${taskId}`)) || {};
    storedTasks[item.id]['title'] = newTitle;
    localStorage.setItem(`${taskId}`, JSON.stringify(storedTasks));
};


  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value);
  };

  return (
    <tr className="task-row">
      <td className='p-2 border-solid border-2 border-[#aaa] w-[50px] text-center'>{sr}</td>
      <td className='p-2 border-solid border-2 border-[#aaa] w-[150px]'><span className='text-xs'>{item.id}</span></td>
      <td className='p-2 border-solid border-2 border-[#aaa] w-[250px]'>
        {edit ? (
            <input type='text' 
            value={editableTitle}
            onChange={handleTitleSave} 
            className='border-gray-400 border-2 w-[100px] p-1 box-border shadow-md' />
        ) : (
          <>
            {editableTitle}<br />   
          </>
        )}
      </td>
      <td className='p-2 border-solid border-2 border-[#aaa]'>
        
        { totHours > 0 ? <div className='text-center font-black text-xl'>{totHours} hrs</div> :
          <button onClick={()=>planningPokerHandler(item.id)} className='bg-gray-600 text-white p-2 text-[10px] rounded-md w-20'>Start</button>}
      </td>
      <td className='p-2 border-solid border-2 border-[#aaa]'>
         <button 
          onClick={()=>statusHandler(item.id)}
         className='bg-gray-600 text-white p-2 text-[10px] rounded-md w-20'>Status</button>
      </td>
      {resources.map((resource, index) => (
        <td key={index} className='p-1 border-solid border-2 border-[#aaa] w-[250px]'>
          <Resource heading={resource} item={item} edit={edit}/>
        </td>
      ))}
      <td className='p-2 border-solid border-2 border-[#aaa]'>
        <button 
        className='bg-red-600 text-white text-[14px] rounded-md px-4 py-3 m-2 border-[0.8px] border-red-600 hover:bg-white hover:text-red-600' 
        onClick={() => deleteTaskHandler(item.id)}>Delete Task</button>
      </td>
    </tr>
  );
};

export default Task;
