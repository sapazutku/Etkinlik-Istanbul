// post Schema for mongoDB
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  saved: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
