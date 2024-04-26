import React, { useState,useEffect,edit} from 'react'
import { useParams } from 'react-router-dom';

const Resource = ({heading,item,edit}) => {
  const [resource, setResource] = useState('-');
  const [editing, setEditing] = useState(false)
  const selectedProjectName = localStorage.getItem('selectedProjectName')
  const selectedSprintName = localStorage.getItem('selectedSprintName')
  
  // const {taskId} = useParams()
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`${selectedProjectName}${selectedSprintName}`)) || {};
    setResource(storedTasks[item.id][`${heading}`])
  }, []);

  const onChangeHandler = (e)=>{  
    setResource(e.target.value)
  }
  return (
    <div style={{ width: '100px' }} className='flex justify-center mx-auto'>
         {/* R{heading}:   */}
         <br />
          {
          
            <input 
            className='border-none w-full h-full border-2 box-border text-center'
            value={resource}
            onChange={(e)=>{
              const newResource = e.target.value
              const storedTasks = JSON.parse(localStorage.getItem(`${selectedProjectName}${selectedSprintName}`)) || {};
              storedTasks[item.id][`${heading}`]=newResource
              
              localStorage.setItem(`${selectedProjectName}${selectedSprintName}`, JSON.stringify(storedTasks));
              setResource(newResource)
            }}
            />
            
           
           }
    </div>
  )
}

export default Resource;