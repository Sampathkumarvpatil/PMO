require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { join } = require("path");

const server = http.createServer();
const app = express();
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = {};
const rm = {};
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("create_room", (data) => {
    const roomName = data.roomName;
    const userName = data.userName;

    socket.join(roomName);
    socket.room = roomName;
    socket.userName = userName;

    if (!rooms[roomName]) {
      rooms[roomName] = {
        totalHours: 0,
        users: [],
        optionsSelected: {}, // Object to store options selected by users
      };
    }

    rooms[roomName].users.push({
      userId: socket.id,
      userName: userName,
    });

    io.to(roomName).emit("update_users", rooms[roomName].users);
    io.to(roomName).emit("update_total_hours", rooms[roomName].totalHours);

    console.log(`${userName} created and joined room ${roomName}`);
  });

  socket.on("join_room", (data) => {
    const roomName = data.roomName;
    const userName = data.userName;

    if (!rooms[roomName]) {
      return;
    }

    socket.join(roomName);
    socket.room = roomName;
    socket.userName = userName;

    rooms[roomName].users.push({
      userId: socket.id,
      userName: userName,
    });

    io.to(roomName).emit("update_users", rooms[roomName].users);
    io.to(roomName).emit("update_total_hours", rooms[roomName].totalHours);

    console.log(`${userName} joined room ${roomName}`);
  });

  socket.on("send_message", (data) => {
    io.to(socket.room).emit("receive_message", {
      userName: socket.userName,
      message: data.message,
    });
  });

  socket.on("score_change", (newScore) => {
    if (rooms[socket.room]) {
      rooms[socket.room].totalHours += newScore;
      io.to(socket.room).emit(
        "update_total_hours",
        rooms[socket.room].totalHours
      );
    }
  });

  socket.on("show_total_hours", (data) => {
    const roomName = data.roomName;
    const totalHours = rooms[roomName]?.totalHours || 0;
    io.to(roomName).emit("display_total_hours", totalHours);
  });

  socket.on("session_ended", (data) => {
    const roomName = data.roomName;
    if (rooms[roomName]) {
      io.to(roomName).emit("session_ended_message", "Poker session has ended.");
      delete rooms[roomName]; // Remove the room from the rooms object
    }
  });

  socket.on("leave_room", () => {
    if (socket.room && rooms[socket.room]) {
      const disconnectedUser = rooms[socket.room].users.find(
        (user) => user.userId === socket.id
      );

      if (disconnectedUser) {
        io.to(socket.room).emit("user_left", disconnectedUser.userName);

        rooms[socket.room].users = rooms[socket.room].users.filter(
          (user) => user.userId !== socket.id
        );
        io.to(socket.room).emit("update_users", rooms[socket.room].users);
        io.to(socket.room).emit(
          "update_total_hours",
          rooms[socket.room].totalHours
        );
      }

      console.log(`User Disconnected: ${socket.id}`);
    }
  });

  // Listen for option selected by users
  socket.on("option_selected", ({ userName, selectedOption, roomName }) => {
    if (rooms[roomName]) {
      rooms[roomName].optionsSelected[userName] = selectedOption;
      io.to(roomName).emit("option_selected", { userName, selectedOption });
    }
  });

  socket.on("create-r-room", (details) => {
    const roomName = details.desc;
    rm[roomName] = details;
    console.log(roomName, "===============>details=> ", details);
    socket.join(roomName);
  });

  socket.on("join-rroom", (roomName) => {
    if (rm[roomName]) {
      socket.join(roomName);
      console.log("jpoined room========> ", roomName, rm);
      socket.emit("rroom-details", rm[roomName]);
    } else {
      socket.emit("room-not-found");
    }
  });

  socket.on("add-div", ({ roomName, section, newDiv }) => {
    if (rm[roomName]) {
      rm[roomName].sections[section].push(newDiv);
      console.log("rm=>>>", rm);
      io.to(roomName).emit("rroom-details-updated", rm[roomName]);

      io.emit("rooms", rm);
    }
  });

  //-------------------------------------------------
  socket.on("update-div-content", ({ roomName, section, index, content }) => {
    if (rm[roomName] && rm[roomName].sections[section]) {
      rm[roomName].sections[section][index].content = content;

      io.to(roomName).emit("rroom-details-updated", rm[roomName]);
    }
  });

  socket.on("vote-for-div", ({ roomName, section, index }) => {
    if (rm[roomName] && rm[roomName].sections[section]) {
      rm[roomName].sections[section][index].votes += 1;

      io.to(roomName).emit("rroom-details-updated", rm[roomName]);
    }
  });
});

console.log(process.env.PLANNING_POKER_HOST_PORT);
server.listen(Number(process.env.PLANNING_POKER_HOST_PORT ?? 5000), () => {
  console.log("Server Started");
});
