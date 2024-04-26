import http from "node:http";

const server = http.createServer((req, res) => {});

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, id }) => {
    console.log(`${name} joined the chat with id: ${id}`);
    io.emit("join", { name, id, type: "join" });
  });

  socket.on("chat", (message) => {
    const time = new Date().toLocaleTimeString();
    io.emit("chat", { ...message, time, type: "chat" });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
