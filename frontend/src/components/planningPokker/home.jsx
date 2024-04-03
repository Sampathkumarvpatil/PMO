import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

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
  const options = [1, 2, 3, 4, 5];

  const [showForm, setShowForm] = useState(true);
  const [isRoomCreator, setIsRoomCreator] = useState(false); // State to track if current user is room creator

  const {taskId,id} = useParams();
  
  
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
  
    return () => {
      socket.off('update_users');
      socket.off('receive_message');
      socket.off('update_total_hours');
      socket.off('user_left');
      socket.off('display_total_hours');
      socket.off('session_ended_message');
    };
  }, []);
  

  return (
    <div className={`flex flex-col h-screen transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"}`}>
      {showForm ? (
        <div className="flex justify-between p-10 mx-auto my-auto rounded-md">
          <div>
            <input
              placeholder="Your Name"
              onChange={userNameChangeHandler}
              className="p-2 m-4 border-2 border-gray-500 w-[800px] text-[22px]"
            />
            <br />
            <input
              placeholder="Room Name"
              onChange={roomNameChangeHandler}
              className=" border-2 p-2 m-4 border-gray-500 w-[800px] text-[22px]"
            />
            <br />
            <button
              onClick={createRoom}
              className=" bg-black text-[22px] text-white p-4 m-4 rounded-md  border-[2px] border-black
              hover:bg-white hover:text-black"
            >
              Create Room
            </button>
            <button
              onClick={joinRoom}
              className=" bg-blue-600 text-[22px] text-white p-4 m-4 
              rounded-md hover:bg-white hover:text-blue-600 border-[2px] border-blue-600"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <div className='w-full text-center bg-slate-300'>
              <h1 className="text-6xl flex-grow m-10">Total Hours: {showTotalHours ? totalHours : "X"}</h1>
            </div>
            {isRoomCreator && <button className='bg-gray-600 text-white p-3 rounded-lg w-[100px] mt-2
            hover:bg-white hover:text-gray-600 border-2 border-gray-600'
            onClick={showHandler}
            >
              Disclose Total Hours</button>}
          </div>

          <div className='h-[80vh] max-h-[80vh]'>
              <div className='flex justify-between gap-40 m-20'>
              {/* users in room */}
              <div className='m-10 px-10 w-full border-r-2 border-gray-400'>
                <h2 className="text-2xl text-blue-600">Users in the Room:</h2>
                <ul className="flex flex-wrap gap-2">
                  {users.map((user) => (
                    <li
                      key={user.userId}
                      className="border-solid border-2 border-black-200 h-[50px] m-2 text-center rounded bg-gray-200 p-2"
                    >
                      {user.userName}
                    </li>
                  ))}
                </ul>
              </div>

              {/* users in room end */}

              {/* chat */}
              <div className="flex-grow flex items-end p-4 border-2 border-gray-400">
                <div className="bg-gray-200 p-4 rounded-md max-h-[350px] overflow-y-auto">
                  <h2 className="text-lg mb-2">Chat:</h2>
                  {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                      <strong>{msg.userName}:</strong> {msg.message}
                    </div>
                  ))}
                  <div className="flex items-center w-[300px] h-[50px]">
                    <input
                      placeholder="Type your message..."
                      onChange={messageChangeHandler}
                      value={message}
                      className="border-solid border-2 p-2 border-black-200 mr-2 flex-grow"
                      style={{ overflow: 'hidden' }}
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-black text-white p-2 rounded-md"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          

          <div className="flex justify-center p-4">
            {options.map((item) => (
              <div
                key={item}
                className="h-15 text-center bg-black text-white m-1 mx-4 p-4 text-lg rounded-md cursor-pointer"
                onClick={() => scoreChangeHandler(item)}
              >
                {item}
              </div>
            ))}
          </div>

          {isRoomCreator ? ( // Conditionally render the End Poker button
            <button
              className="bg-red-600 text-white text-[14px] rounded-md px-4 py-3 m-2"
              onClick={leaveRoom}
            >
              End Poker
            </button> 
            
          ) : 
              (
                <button
              className="bg-red-600 text-white text-[14px] rounded-md px-4 py-3 m-2"
              onClick={leaveRoom}
            >
              Leave room
            </button>
              )
          }

          
        </>
      )}
    </div>
  );
};

export default Home;