import express from "express";
import User from "../db/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Post from "../db/posts.js";
import mongoose from "mongoose";

const userRouter = express.Router();

// Login Page
userRouter.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    if (!user)
      return res.status(401).json({
        title: "Login failed",
        error: "Kullanıcı Bulunamadı",
      });
    // incorrect password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "Login failed",
        error: "Hatalı Parola",
      });
    }
    // if all is good then create a token and send to frontend
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      title: "Login successful",
      token: token,
    });
  });
});

// grabbing user info
userRouter.get("/", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    // token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "User info",
        user: {
          email: user.email,
          name: user.name,
          saved: user.saved,
        },
      });
    });
  });
});

// Register Page
userRouter.post("/signup", (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "Email kullanmda",
      });
    }
    return res.status(200).json({
      title: "success",
    });
  });
});

// get user like
userRouter.get("/like", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    // token is valid

    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "User likes",
        user: {
          saved: user.saved,
        },
      });
    });
  });
});

userRouter.post("/like/:id", (req, res, next) => {
  console.log(req.params.id);
  let token = req.headers.token;
  //console.log(token);
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });

    console.log("here");
    //if (err) return console.log("user eşleşmedi");
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      user.saved.push(req.params.id);
      user.save((err) => {
        if (err) return console.log(err);
        return res.status(200).json({
          title: "success",
        });
      }
      );
    }
    );
  });
});


export default userRouter;
