const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User({ email, password });
    await user.save();
    console.log(user._id);
    const token = jwt.sign({ userID: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    res.status(422).send(err);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(`email: ${email}, password:${password}`);
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "you must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Invalid email or password" });
  }

  try {
    await user.comparedPassword(password);
    const token = jwt.sign({ userID: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: "Invalid email or password" });
  }
});

module.exports = router;
