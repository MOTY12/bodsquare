const express = require('express');
const app = express();
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });


// socket io
const socket = io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });



module.exports = {socket, io};

