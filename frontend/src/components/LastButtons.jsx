import React from 'react'
import './newInputs.css'
import { useNavigate } from 'react-router-dom'

const LastButtons = ({ current }) => {
  const navigate = useNavigate()

  const back = () => {
    if (current === "Dashboard") {
      return;
    } else if (current === "AllocationInput") {
      navigate("/");
    } else if (current === "AttendanceTable") {
      navigate("/AllocationAndHoliday");
    } else if (current === "TaskForm") {
      navigate("/AttendanceTable");
    } else if (current === "Sprints") {
      navigate("/list");
    }
  }
  const next = () => {
    if (current === "Dashboard") {
      navigate("/AllocationAndHoliday");
    } else if (current === "AllocationInput") {
      navigate("/AttendanceTable");
    } else if (current === "AttendanceTable") {
      navigate("/list");
    } else if (current === "TaskForm") {
      navigate("/KPI's");
    } else if (current === "Sprints") {
      // navigate("/retrospective");
      return
      // } else if (current === "Home") {
      //   return
    }
  }
  return (
    <>

      <div className="flex justify-center items-center mt-8 gap-9">
        <div>
          <button
            className="hoverss text-white font-bold py-2 px-4 w-40 rounded-xl border-2 border-gray-300 shadow-xl"
            style={{
              background:
                "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
            }}
            onClick={() => back()}
          >
            Back
          </button>
        </div>
        <div>
          <button
            className="hoverss text-white font-bold py-2 px-4 w-40 rounded-xl border-2 border-gray-300 shadow-xl"
            style={{
              background:
                "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
            }}
          >
            Save
          </button>
        </div>

        <div>
          <button
            className="hoverss text-white font-bold py-2 px-4 w-40 rounded-xl border-2 border-gray-300 shadow-xl"
            style={{
              background:
                "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
            }}
            onClick={() => next()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default LastButtons