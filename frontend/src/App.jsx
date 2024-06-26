import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import NewProject from "./components/NewProject";
// import NewSprint from "./components/NewSprint";
import AllocationInput from "./components/AllocationInput";
import AttendanceTable from "./components/AttendanceTable";
import Dashboard from "./components/Dashboard";
import TestResult from "./components/TestResult";
import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import Status from "./Status";
// import Home from './components/planningPoker/home'
import Home from "./components/planningPokker/home";
// import Sprints from './Sprint-Pages/sprints';
import Sprints from "./Graphs/Sprint-Pages/sprints";

import BoardHome from "../src/boardcomponent/Home";
import Room from "../src/boardcomponent/Room";
// import Test from "../components/Test";
import Getpdf from "../src/boardcomponent/Getpdf";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
// import FileUpload from "./components/FileUpload";
import ProjectContext from "./utils/ProjectContext";
import TermsAndConditions from "./components/TermsAndConditions";
import TestsReports from "./components/TestsReports";
import FailedTest from "./components/FailedTest";
import Chart from "./components/Chart";
import MultipleGraph from "./components/MultipleGraph";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  // const [displayPmo, setDisplayPmo] = useState(false);
  const [project, setProject] = useState({});
  const [role, setRole] = useState(null);
  const changeToogle = () => {
    setSidebarToggle(!sidebarToggle);
  };
  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);
  }, []);
  const buttonClick = () => {
    const userRole = sessionStorage.getItem("role");
    if (userRole) setRole(userRole);

    // setDisplayPmo(true);
  };

  return (
    <BrowserRouter>
      {/* {!displayPmo ? <LoginPage buttonClick={buttonClick}
    />  : <></>} */}
      <ProjectContext.Provider value={{ project, setProject }}>
        {role ? (
          <Main
            changeToogle={changeToogle}
            sidebarToggle={sidebarToggle}
            role={role}
          />
        ) : null}
        {/* {displayPmo ? <Routes> */}
        <Routes>
          {/* <Route path="/login" element={<LoginPage buttonClick={buttonClick} />}/>
        <Route path="/signup" element={<SignupPage />} /> */}
          {role ? (
            <>
              {/* <Route path="/" element={<Main />} /> */}
              {role === "Account Manager/Project Manager" && (
                <>
                  <Route
                    path="/"
                    element={<NewProject sidebarToggle={sidebarToggle} />}
                  />
                  <Route
                    path="/Dashboard"
                    element={<Dashboard sidebarToggle={sidebarToggle} />}
                  />

                  {/* <Route path="/LoginOrSignup" element={<LoginPage sidebarToggle = {sidebarToggle}/>} /> */}
                  {/* <Route path="/signup" element={<SignupPage sidebarToggle = {sidebarToggle}/>} /> */}

                  {/* <Route path="/NewSprint" element={<NewSprint sidebarToggle = {sidebarToggle}/>} /> */}
                  <Route
                    path="/AllocationAndHoliday"
                    element={<AllocationInput sidebarToggle={sidebarToggle} />}
                  />

                  <Route
                    path="/AttendanceTable"
                    element={<AttendanceTable sidebarToggle={sidebarToggle} />}
                  />
                  <Route
                    path="/KPI's"
                    element={<Sprints sidebarToggle={sidebarToggle} />}
                  />
                  <Route
                    path="/sprints"
                    element={<Sprints sidebarToggle={sidebarToggle} />}
                  />
                  <Route
                    path="/sprints/:sprintId"
                    element={<Sprints sidebarToggle={sidebarToggle} />}
                  />
                  <Route
                    path="/chart"
                    element={<Chart sidebarToggle={sidebarToggle} />}
                  />
                  <Route
                    path="/multipleSprintsChart"
                    element={<MultipleGraph sidebarToggle={sidebarToggle} />}
                  />
                </>
              )}

              {/* <Route path="/:id/Kpi" element={<KpiRoute sidebarToggle = {sidebarToggle}/>} /> */}
              {/* <Route path='/list' element={<ProjectList sidebarToggle = {sidebarToggle}/>}/> */}
              <Route
                path="/list"
                element={<TaskForm sidebarToggle={sidebarToggle} />}
              />
              <Route
                path="/planningpoker/:id"
                element={<Home sidebarToggle={sidebarToggle} />}
              />
              <Route
                path="/list/status/:id"
                element={<Status sidebarToggle={sidebarToggle} />}
              />

              <Route
                path="/retrospective"
                element={<BoardHome sidebarToggle={sidebarToggle} />}
              ></Route>
              <Route
                path="/retrospective/:id"
                element={<Room sidebarToggle={sidebarToggle} />}
              ></Route>
              <Route
                path="/retrospective/:id/download"
                element={<Getpdf sidebarToggle={sidebarToggle} />}
              ></Route>
              <Route
                path="/TermsAndConditions"
                element={<TermsAndConditions sidebarToggle={sidebarToggle} />}
              />

              <Route
                path="/TestsReports/:projectName"
                element={<TestsReports sidebarToggle={sidebarToggle} />}
              ></Route>
              <Route
                path="/TestsReports/:projectName/FailedTest"
                element={<FailedTest sidebarToggle={sidebarToggle} />}
              ></Route>

              <Route
                path="/FailedTest"
                element={<FailedTest sidebarToggle={sidebarToggle} />}
              />
              <Route
                path="/TestResult"
                element={<TestResult sidebarToggle={sidebarToggle} />}
              />
              {/* <Route
                path="/uploadFile"
                element={<FileUpload sidebarToggle={sidebarToggle} />}
              /> */}
            </>
          ) : (
            <>
              <Route
                path="*"
                element={<LoginPage buttonClick={buttonClick} />}
              />
              <Route path="/signup" element={<SignupPage />} />
            </>
          )}
        </Routes>
        {/* : null} */}
      </ProjectContext.Provider>
    </BrowserRouter>
  );
}

export default App;
