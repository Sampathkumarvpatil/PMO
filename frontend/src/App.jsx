import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Main from './components/Main';
import NewProject from "./components/NewProject";
import NewSprint from "./components/NewSprint";
import AllocationInput from "./components/AllocationInput";
import AttendanceTable from "./components/AttendanceTable";
import Dashboard from "./components/Dashboard";
import SprintCapacity from "./components/SprintCapacity";
import { useState } from "react";
// import ProjectList from "./components/ProjectList";
// import KpiRoute from "./components/KpiRoute";
import TaskForm from "./components/TaskForm"
import Status from './Status'
import ProjectList from './components/ProjectList'
// import Home from './components/planningPoker/home'
import Home from './components/planningPokker/home'
// import Sprints from './Sprint-Pages/sprints';
import Sprints from './Graphs/Sprint-Pages/sprints'
import ChartComponent from './Graphs/Graphs';
import FunnelChartComponent from './Graphs/funnel';
import CylinderChartComponent from './Graphs/Cylinder';
import ColumnChartComponent from './Graphs/Column';
import GaugeChartComponent from './Graphs/Gauge';
import SprientsColumnChartComponent from './Graphs/Sprientscolunchart';
import SpeedometerChartComponent from './Graphs/Speedoneeter';
import WorkEfficiencyRatiochart from './Graphs/WorkEfficiencyRatiochart';
import Problemdetcationratesprintchart from './Graphs/Problemdetectionratesprints';
import ExtraTaskbysprintsChartComponent from './Graphs/ExtraTaskbysprintsChartComponent';
import CompletionRateOverviewbysprintsComponent from './Graphs/CompletionRateOverviewbysprints';

import BoardHome from "../src/boardcomponent/Home";
import Room from "../src/boardcomponent/Room";
// import Test from "../components/Test";
import Getpdf from "../src/boardcomponent/Getpdf";
import SprintVizualization from "./components/SprintVizualization";



function App() {
  const [sidebarToggle , setSidebarToggle] = useState(true)
 
  const changeToogle = ()=>{
    setSidebarToggle(!sidebarToggle)
  } 
  return (
    <BrowserRouter>
    <Main changeToogle={changeToogle }
    sidebarToggle = {sidebarToggle}
    />
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Dashboard sidebarToggle = {sidebarToggle}/>}/>
        <Route path="/NewProject" element={<NewProject sidebarToggle = {sidebarToggle}/>} />
        <Route path="/NewSprint" element={<NewSprint sidebarToggle = {sidebarToggle}/>} />
        <Route path="/AllocationAndHoliday" element={<AllocationInput sidebarToggle = {sidebarToggle}/>} />
        <Route path="/AttendanceTable" element={<AttendanceTable sidebarToggle = {sidebarToggle}/>} />
        <Route path="/Capacity" element={<SprintCapacity sidebarToggle = {sidebarToggle}/>} />
        <Route path="/Vizualization" element={<SprintVizualization sidebarToggle = {sidebarToggle}/>} />

        {/* <Route path="/:id/Kpi" element={<KpiRoute sidebarToggle = {sidebarToggle}/>} /> */}
        {/* <Route path='/list' element={<ProjectList sidebarToggle = {sidebarToggle}/>}/> */}
        <Route path='/list' element={<TaskForm sidebarToggle = {sidebarToggle}/>} />
        <Route path='/planningpoker/:id' element={<Home sidebarToggle = {sidebarToggle}/>}/>  
        <Route path='/list/status/:id' element={<Status sidebarToggle = {sidebarToggle}/>}/>   

        <Route path="/retrospective" element={<BoardHome sidebarToggle = {sidebarToggle}/>}></Route>
        <Route path="/retrospective/:id" element={<Room sidebarToggle = {sidebarToggle}/>}></Route>
        <Route path="/retrospective/:id/download" element={<Getpdf sidebarToggle = {sidebarToggle}/>}></Route>

        <Route path="/KPI's" element={<Sprints />} />
          <Route path="/sprints" element={<Sprints />} />
          <Route path="/sprints/:sprintId" element={<Sprints />} />
          <Route path="/chart" element={
            <div className={`transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"} flex flex-wrap`}>
              <ChartComponent sidebarToggle = {sidebarToggle}/>
              <FunnelChartComponent sidebarToggle = {sidebarToggle}/>
              <CylinderChartComponent sidebarToggle = {sidebarToggle}/>
              <ColumnChartComponent sidebarToggle = {sidebarToggle}/>
              {/* <GaugeChartComponent/> */}
              {/* <SpeedometerChartComponent/>  */}
            </div>
          } />
          <Route path="/multipleSprintsChart" element={
            <div className={`transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"} flex flex-wrap`}>
             <WorkEfficiencyRatiochart/>
              <Problemdetcationratesprintchart/>
              <ExtraTaskbysprintsChartComponent/>
              <CompletionRateOverviewbysprintsComponent/>
              <SprientsColumnChartComponent/>
              
            </div>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
