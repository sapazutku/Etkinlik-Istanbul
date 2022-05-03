import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
app.use("/posts", router);

app.listen(process.env.PORT || 5000);