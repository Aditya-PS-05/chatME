import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket";

const PORT = process.env.PORT || 8080;

const app: Application = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupSocket(io);
export { io };

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
