import { Server, Socket } from "socket.io";
import prisma from "./config/db.config";
import { produceMessage } from "./helper";

interface customSocket extends Socket {
  room?:string
}

export function setupSocket(io: Server) {

  io.use((socket: customSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if(!room) {
      return next(new Error("Invalid room. Please enter correct room Id"))
    }
    socket.room = room
    next()
  })
 
  io.on("connection", (socket: customSocket) => {
    // join the room

    socket.join(socket.room!) 

    socket.on("message", async (data) => {
      await produceMessage(process.env.KAFKA_TOPIC!, data);
      socket.to(socket.room!).emit("message", data);
    });  

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}
