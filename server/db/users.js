// post Schema for mongoDB
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: password,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  saved:{
    type: Array,
    required: false,
  }
});

const User = mongoose.model("User", userSchema);

export default User;
