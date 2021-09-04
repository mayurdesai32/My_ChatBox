require('dotenv').config({ path: './config.env' });
const express = require('express');
const path = require('path');
const socket = require('socket.io');

// for app setup
const app = express();

//for static file
const staticpath = path.join(__dirname, '../frontend_js');
app.use(express.static(staticpath));

// for server
const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// for socket setup

const io = socket(server);

io.on('connection', (socket) => {
  console.log(`made socket connection ${socket.id}`);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});

// app.use(express.json());
