import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';
import { usePDF } from 'react-to-pdf';
import { useParams } from 'react-router-dom';

const TaskForm = ({sidebarToggle}) => {
  const [list, setList] = useState([]);
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const thrs = {1: 230, 2: 230, 3: 230, 4: 230, 5: 230, 6: 230, 7: 230, 8: 230};
  const [tremaining, setTremaining] = useState({...thrs});
  const [edit, setEdit] = useState(false)
  
  const {taskId} = useParams()
 

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`${taskId}`)) || {};
    setList(Object.values(storedTasks));
  
    const updatedTremaining = { ...tremaining }; // Create a copy of tremaining

    Object.values(storedTasks).forEach(task => {
      for (const key in updatedTremaining) {
        updatedTremaining[key] -= task[key] || 0;
      }
    });

    setTremaining(updatedTremaining); 

    
  }, []);
  

  

  const handleAddTask = () => {
    const newTask = { id: uuidv4(), title: 'New Task', 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 'totHours':0 };
    const storedTasks = JSON.parse(localStorage.getItem(`${taskId}`)) || {}; // Retrieve tasks from local storage, use object instead of array
    storedTasks[newTask.id] = newTask; // Set the new task with its id as the key
    localStorage.setItem(`${taskId}`, JSON.stringify(storedTasks)); // Save the updated object back to local storage
    setList([...list, newTask]);
  };
  
  
  

  const cellStyle = {
    width: '150px', // Adjust width as needed
  };

  

  

  return (
    <div className={`overflow-x-scroll ${
      sidebarToggle ? "ml-0" : "ml-64"
    } transition-all duration-300`}>
      <div className='flex justify-end'>
      
      </div>
      <table className='p-2 text-[18px] border-collapse border-2 border-[#aaa] m-2' ref={targetRef}>
      <thead>
            <tr>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'>Available</td>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'>Hours:</td>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'></td>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'></td>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'></td>
              {Object.values(thrs).map((item,index)=>
                <td key={index} style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300 text-center text-blue-700'>
                  {item}</td>
              )}
              <td style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'></td>
            </tr>
        

        
            <tr className='m-2 sticky top-0'>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>Sr</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>Task ID</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>Title</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>Planning Poker</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>Status</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>r1</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>r2</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>r3</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>r4</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>r5</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>r6</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>r7</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>r8</th>
              <th style={cellStyle} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300'>Delete Task</th>
            </tr>
          </thead>
          <tbody >
            {list.map((item, index) => (
              <Task key={item.id} item={item} sr={index + 1}  list={list} setList={setList} edit={edit}/>
            ))}
          </tbody>

        <tfoot>
          <tr>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'>Remaining </td>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'>Hours:</td>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'></td>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'></td>
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'></td>
              {Object.values(tremaining).map((item,index)=>
                  <td style={cellStyle} key={index} className='p-2 border-solid border-2 border-[#aaa] bg-gray-300 text-center text-red-600'>
                    {item}</td>
                )}
              <td style={cellStyle} className='p-2 border-solid  border-[#aaa] bg-gray-300'></td>
          </tr>
        </tfoot>


      </table>

      <div className='flex justify-between'>
        <div>
          <button className='bg-blue-600 border-2 border-blue-600 text-white text-[14px] rounded-md px-4 py-3 m-2 hover:bg-white hover:text-blue-600' 
        onClick={handleAddTask}>
          Add Task
        </button>

        <button 
          className='bg-blue-600 text-white text-[14px] border-2 border-blue-600 rounded-md px-4 py-3 m-2 hover:bg-white hover:text-blue-600' 
          onClick={()=>setEdit(!edit)}
        >
          {edit ? "Save" : "Edit"}
        </button>
        </div>

        <div>
        <button onClick={() => toPDF()} className=' bg-blue-600 border-2 border-blue-600 text-white text-[14px] rounded-md px-4 py-3 m-2 hover:bg-white hover:text-blue-600'>
        Download PDF
      </button>
        </div>
      </div>
      
      
    </div>
  );
};

export default TaskForm;
