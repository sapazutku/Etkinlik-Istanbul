// post Schema for mongoDB
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    unique: true,
    type: String,
  },
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
