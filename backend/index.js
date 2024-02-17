// require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
// const userRouter = require("./routes/user")
const PORT = 5000

const model = require("./mongo/user");

const User = model.User;
// const router = require('./router');


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

let newuser = {}
let user;
// User login request
app.post("/login", async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  user = await User.findOne({ email: email });
  console.log(user)
  // console.log(email)
  // console.log(password)

  // if (!email || !password) {
  //     success = false;
  //     res.send({ message: "Please enter valid data" });
  // } else {
  if (user) {
    newuser.email = email;
    const hashPassword = await bcrypt.compare(password, user.password);
    if (hashPassword) {
      res.send({ message: "Login Successfull", user: user, success: true });
    } else {
      success = false;
      res.send({
        message: "Password didn't match",
      });
      // res.sendStatus(401);
    }
  } else {
    // eslint-disable-next-line no-unused-vars
    success = false;
    res.send({ message: "User not registered" });
  }
  // }
});
// User register request
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let success = false;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      success = false;
      res.send({
        message: "User already registerd",
        user: user,
        success: success,
      });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
      const doc = await user.save();
      console.log(doc);
      success = true;
      res.json({
        message: "User registered Successfull, Please Login now...",
        success: success,
      });
    }
  } catch (err) {
    success = false;
    res.send(err);
  }
});






app.listen(PORT, () => {
  console.log("BE started at port 5000");
});