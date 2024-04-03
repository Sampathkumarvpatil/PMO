import React from 'react'
import Task from '../src/components/Task'
import Home from '../src/components/planningPoker/home'

import { Route,Routes } from 'react-router-dom'
import TaskForm from '../src/components/TaskForm'
import Status from '../src/Status'
import ProjectList from '../src/components/ProjectList'
const Router = () => {
  return (
    <Routes>
        <Route path='/list' element={<ProjectList />}/>
        <Route path='/list/:taskId' element={<TaskForm />} />
        <Route path='/:taskId/planningpoker/:id' element={<Home />}/>  
        <Route path='/:taskId/status/:id' element={<Status />}/>        
    </Routes>
  )
}

export default Router