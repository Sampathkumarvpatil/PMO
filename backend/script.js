require("dotenv").config();

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
    const roomName = details.desc;
    rooms[roomName] = details;

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
    if (rooms[roomName]) {
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
console, log(process.env.RETROSPECTIVE_HOST_PORT);
server.listen(Number(process.env.RETROSPECTIVE_HOST_PORT), () => {
  console.log(`Listening to port ${process.env.RETROSPECTIVE_HOST_PORT}`);
});
