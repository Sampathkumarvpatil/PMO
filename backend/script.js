const express = require("express");
const cors = require("cors");
const http = require("http");
// require("dotenv").config();
const { Server } = require("socket.io");
const app = express();
 
app.use(express.json());
app.use(cors());
 
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
 
const rooms = {};
 
io.on("connection", (socket) => {
  socket.on("create", (details) => {
    console.log(details);
    console.log("=============getails===========");
    const roomName = details.desc;
    rooms[roomName] = details;
    console.log(rooms);
    console.log("-----------rooms-------");
    socket.join(roomName);
  });
 
  socket.on("join-room", (roomName) => {
    if (rooms[roomName]) {
      socket.join(roomName);
 
      socket.emit("room-details", rooms[roomName]);
    } else {
      socket.emit("room-not-found");
    }
  });
 
  socket.on("add-div", ({ roomName, section, newDiv }) => {
    console.log(roomName, section, newDiv);
    console.log(rooms);
    if (rooms[roomName]) {
      console.log(roomName, section, newDiv);
      rooms[roomName].sections[section].push(newDiv);
      io.to(roomName).emit("room-details-updated", rooms[roomName]);
 
      io.emit("rooms", rooms);
    }
  });
 
  //-------------------------------------------------
  socket.on("update-div-content", ({ roomName, section, index, content }) => {
    if (rooms[roomName] && rooms[roomName].sections[section]) {
      rooms[roomName].sections[section][index].content = content;
 
      io.to(roomName).emit("room-details-updated", rooms[roomName]);
    }
  });
 
  socket.on("vote-for-div", ({ roomName, section, index }) => {
    if (rooms[roomName] && rooms[roomName].sections[section]) {
      rooms[roomName].sections[section][index].votes += 1;
 
      io.to(roomName).emit("room-details-updated", rooms[roomName]);
    }
  });
});
 
server.listen(8000, () => {
  console.log("Listening to port 8000");
});
