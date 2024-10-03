import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config";
import { instrument } from "@socket.io/admin-ui";
import { connectKafkaProducer } from "./config/kafka.config";
import { consumeMessages } from "./helper";

const PORT = Number(process.env.PORT) || 8080;

const app: Application = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true
  },
  adapter: createAdapter(redis)
});

instrument(io, {
  auth: false,
  mode: "development"
});

setupSocket(io);
export { io };

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api", router);

connectKafkaProducer().catch((err) => {
  console.log("Something went wrong while connecting kafka");
});

consumeMessages('chats').catch((err) => console.log("The consumer messages error is ", err)); 

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
