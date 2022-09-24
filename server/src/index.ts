// basic imports
import http from "http";
import express, { Application } from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
// constants & initializations
dotenv.config();
const PORT = Number(process.env.PORT) || 5000;

const app: Application = express();
const server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
// socket configurations
io.on("connection", (socket) => {
  console.log(`User connected with id ${socket.id}`);
  socket.on("join_room", (data) => {
    // join the user to room using the socket id for that user
    socket.join(data);
    console.log(`user with socket id : ${socket.id} joined the room ${data}`);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
