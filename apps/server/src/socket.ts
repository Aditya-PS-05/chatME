import { Server } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("The socket connected...", socket.id);

    socket.on("message", (data) => {
      console.log("Server side message", data);

      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}
