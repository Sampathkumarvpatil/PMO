// Home.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { FaUser } from 'react-icons/fa';
import {RiSendPlaneFill} from 'react-icons/ri'

const socket = io.connect('http://localhost:5000');

const Home = ({sidebarToggle}) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [score, setScore] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showTotalHours, setShowTotalHours] = useState(false);
  const [optionsSelected, setOptionsSelected] = useState({}); // State to track options selected by users
  const options = [1, 2, 3, 4, 5];

  const [showForm, setShowForm] = useState(true);
  const [isRoomCreator, setIsRoomCreator] = useState(false); // State to track if current user is room creator

  const selectedProjectName = localStorage.getItem('selectedProjectName')
  const selectedSprintName = localStorage.getItem('selectedSprintName')

  const data = JSON.parse(localStorage.getItem('mainCompanyData'))
  let projectNo;
  for(projectNo in data){
    if(data[projectNo].projectName === selectedProjectName) break;
  }
 
  let sprintNo;
  for(sprintNo in data[projectNo].sprints){
    if(data[projectNo].sprints[sprintNo].sprintName === selectedSprintName) break;
  }
  const allocations = data[projectNo].sprints[sprintNo].allocations || null


  
  const {id} = useParams();
  const taskId = selectedProjectName+selectedSprintName
  
  
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const showHandler = () => {
    setShowTotalHours(!showTotalHours);
    if (isRoomCreator) {
      // Emit an event to the server to inform about the "show" action
      socket.emit('show_total_hours', { roomName });
    }
  };

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const roomNameChangeHandler = (e) => {
    setRoomName(e.target.value);
  };

  const scoreChangeHandler = (val) => {
    if (selectedOption === null) {
      setScore((prev) => {
        if (prev === val || users.length === 0) {
          return prev;
        }

        const scoreDifference = val - prev;
        const newTotalHours = totalHours + scoreDifference;

        setTotalHours(newTotalHours);
        return val;
      });

      socket.emit('score_change', val);
      setSelectedOption(val);

      // Emit selected option to the server
      socket.emit('option_selected', { userName, selectedOption: val, roomName });
    }
  };

  const createRoom = () => {
    socket.emit('create_room', { roomName, userName });
    setIsRoomCreator(true); // Set the user as room creator
    setShowForm(false);
  };

  const joinRoom = () => {
    socket.emit('join_room', { roomName, userName });
    setShowForm(false);
  };

  const sendMessage = () => {
    socket.emit('send_message', { userName, message });
    setMessage('');
  };

  const leaveRoom = () => {
    if (isRoomCreator) {
      // The user is the creator of the room
      socket.emit('session_ended', { roomName });
      socket.emit('leave_room'); // Emit leave_room event for creator
      
      const storedTasks = JSON.parse(localStorage.getItem(`${taskId}`))
      storedTasks[id]['totHours']=totalHours/users.length
      
      localStorage.setItem(`${taskId}`, JSON.stringify(storedTasks));
    } else {
      // The user is not the creator, simply leave the room
      socket.emit('leave_room', { userName, roomName });
    }
    setShowForm(true);
  };
  
  

  useEffect(() => {
    socket.on('update_users', (updatedUsers) => {
      setUsers(updatedUsers);
    });
  
    socket.on('receive_message', (data) => {
      console.log('Received Message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  
    socket.on('update_total_hours', (updatedTotalHours) => {
      setTotalHours(updatedTotalHours);
    });
  
    socket.on('user_left', (leftUserName) => {
      setMessages((prevMessages) => [...prevMessages, { userName: 'System', message: `${leftUserName} has left the room.` }]);
    });

    socket.on('display_total_hours', (updatedTotalHours) => {
      setTotalHours(updatedTotalHours);
    });
  
    socket.on('session_ended_message', () => {
      setShowForm(true); // Show the form again when session ends
      setIsRoomCreator(false); // Reset room creator status
      setRoomName(''); // Reset room name
      setUserName(''); // Reset user name
      setUsers([]); // Reset users list
      setMessages([]); // Reset messages
      setScore(0); // Reset score
      setTotalHours(0); // Reset total hours
      setSelectedOption(null); // Reset selected option
    });

    // Listen for option selected by users
    socket.on('option_selected', ({ userName, selectedOption }) => {
      setOptionsSelected((prev) => ({
        ...prev,
        [userName]: selectedOption,
      }));
    });
  
    return () => {
      socket.off('update_users');
      socket.off('receive_message');
      socket.off('update_total_hours');
      socket.off('user_left');
      socket.off('display_total_hours');
      socket.off('session_ended_message');
      socket.off('option_selected');
    };
  }, []);
  
  const onChangeHandler = (e)=>{
    const storedTasks = JSON.parse(localStorage.getItem(`${taskId}`))
    storedTasks[id]['resource']=e.target.value
      
    localStorage.setItem(`${taskId}`, JSON.stringify(storedTasks));
  }
  return (
      <div className={`flex flex-col h-screen transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"}`}>
      {showForm ? (
        <div className="flex justify-between p-10 mx-auto my-auto rounded-md">
          <div>
            <input
              placeholder="Your Name"
              onChange={userNameChangeHandler}
              className="p-2 m-4 border border-2 border-gray-500 w-[800px] text-[22px]"
            />
            <br />
            <input
              placeholder="Room Name"
              onChange={roomNameChangeHandler}
              className="border border-2 p-2 m-4 border-gray-500 w-[800px] text-[22px]"
            />
            <br />
            <button
              onClick={createRoom}
              className="m-2 bg-black text-[22px] text-white p-4 m-4 rounded-md  border-[2px] border-black
              hover:bg-white hover:text-black"
            >
              Create Room
            </button>
            <button
              onClick={joinRoom}
              className="m-2 bg-blue-600 text-[22px] text-white p-4 m-4 
              rounded-md hover:bg-white hover:text-blue-600 border-[2px] border-blue-600"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
          <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6">
  <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
    Total Hours
  </h1>
  <p className="text-6xl font-semibold text-gray-900 text-center">
    {showTotalHours ? totalHours : "X"}
  </p>
</div>

            {isRoomCreator && (
              <button
                className='mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none'
                onClick={showHandler}
              >
                {showTotalHours ? "Hide Total Hours" : "Show Total Hours"}
              </button>
            )}
          </div>


          <div className='h-[80vh] max-h-[80vh]'>
              <div className='flex justify-between gap-40 m-20'>
              {/* users in room */}
              
              
              <div className='m-10 px-10 w-full border border-gray-400 rounded-lg'>
      <h2 className="text-2xl text-blue-600 mb-4">Users in the Room:</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {users.map((user) => (
          <li
            key={user.userId}
            className="border border-gray-300 rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="text-center">
              <span className="block font-semibold">
                <FaUser className="inline-block mr-2" />
                {user.userName}
              </span>
              <span className="block text-gray-500">
                {isRoomCreator || user.userName === userName
                  ? `Selected: ${optionsSelected[user.userName] || '-'}`
                  : 'Selected: ***'}
              </span>
            </div>
            {/* Add any additional information or actions here */}
          </li>
        ))}
      </ul>
    </div>


              {/* users in room end */}

              {/* chat */}
              
              <div className="flex-grow flex flex-col items-end p-4 border border-gray-400">
      <div className="bg-gray-200 p-4 rounded-md max-h-[350px] overflow-y-auto w-[400px] h-[300px]">
        <h2 className="text-lg font-semibold mb-4">Chat:</h2>
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 flex items-center">
            <FaUser className="text-gray-500 mr-2" />
            <span className="font-semibold">{msg.userName}:</span> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <textarea
          rows="3"
          placeholder="Type your message..."
          onChange={messageChangeHandler}
          value={message}
          className="flex-grow mr-2 px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 overflow-auto"
        ></textarea>
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          <RiSendPlaneFill className="text-xl" />
        </button>
      </div>
    </div>


              {/* chat end */}
            </div>

          </div>
          

          <div className="flex justify-center p-4">
            {options.map((item) => (
              <button
                key={item}
                className="btn-option bg-gray-800 text-white px-6 py-3 mx-2 my-1 rounded-lg text-lg font-semibold focus:outline-none shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
                onClick={() => scoreChangeHandler(item)}
              >
                {item}
              </button>
            ))}
          </div>


          {isRoomCreator ? (
  <div className="flex flex-col items-center">
    Allocate to Resource: 
    <select 
      className="w-[50%] px-4 py-2 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-black"
      name="res" id="resource" onChange={onChangeHandler}
    >
      {allocations.map((item) => (
        <option key={item.name} value={item.name}>{item.name}</option>
      ))}
    </select>
    <button
      className="bg-red-600 text-white text-lg font-semibold rounded-md px-6 py-3 shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      onClick={leaveRoom}
    >
      End Session
    </button> 
  </div>
) : (
  <button
    className="bg-blue-600 text-white text-lg font-semibold rounded-md px-6 py-3 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    onClick={leaveRoom}
  >
    Leave Room
  </button>
)}


          
        </>
      )}
    </div>
  );
};

export default Home;