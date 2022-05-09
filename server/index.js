import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router.js";
import mongoose from "mongoose";
import ibbRouter from "./router/ibbRouter.js";
import userRouter from "./router/userRouter.js";
const app = express();
app.use(cors());
app.use(express.json());


dotenv.config();
app.use("/posts", router);
app.use("/park", ibbRouter);
app.use(
  "/user",
  userRouter,
  cors({
    origin: "http://localhost:5000/",
  })
);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("connected to mongoDB"))
    .catch((err) => console.log(err));
});