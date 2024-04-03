// App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Test() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setReceivedMessage(msg);
      console.log(msg);
      console.log("==========");
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
