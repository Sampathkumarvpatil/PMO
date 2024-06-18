// App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const SOCKET_URL =
  process.env.HOST_BASE_URL + process.env.PLANNING_POKER_HOST_PORT;
const socket = io(SOCKET_URL);

function Test() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setReceivedMessage(msg);
    });

    // return () => {
    //   socket.off("message");
    // };
  }, [message]);

  const sendMessage = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <p>Received Message: {receivedMessage}</p>
    </div>
  );
}

export default Test;
