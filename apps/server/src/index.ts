import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
