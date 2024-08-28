import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(8080, () => {
  console.log(`Server listening at ${PORT}`);
});
