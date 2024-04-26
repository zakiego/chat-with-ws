import http from "node:http";
import type { Chat, Join } from "@/lib/type";

const server = http.createServer((req, res) => {});

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (data: Chat | Join) => {
    if (data.type === "chat") {
      const time = new Date().toLocaleTimeString();
      io.emit("message", { ...data, time });
      return;
    }
    if (data.type === "join") {
      console.log(`User ${data.name} joined with id ${data.id}`);
      io.emit("message", data);
      return;
    }

    console.error("Invalid event type", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(5331, () => {
  console.log("WebSocket server listening on port 5331");
});
