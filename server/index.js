import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router.js";
import mongoose from "mongoose";


const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
app.use("/posts", router);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("connected to mongoDB"))
    .catch((err) => console.log(err));
});