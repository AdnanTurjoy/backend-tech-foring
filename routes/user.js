const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const saltRounds = 10;

Router.post("/jwt-token", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    console.log(user.name);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    } else {
      return res
        .status(200)
        .send({ id: user._id, name: user.name, email: user.email });
    }
  } catch (err) {
    return res.status(401).send({ error: "Invalid token" });
  }
});

Router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  console.log(name, email);
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ error: "User already exists" });
  }
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return res.status(500).send({ error: "Internal server error" });
    }
    try {
      const newUser = await User.create({ name, email, password: hash });
      return res.status(201).send({ user: newUser });
    } catch (err) {
      return res.status(500).send({ error: "Internal server error" });
    }
  });
});

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      return res.status(500).send({ error: "Internal server error" });
    }
    if (!result) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    return res.status(200).send({ token });
  });
});

module.exports = Router;
