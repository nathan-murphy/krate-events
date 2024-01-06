const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


module.exports = authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/login", (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "auth failed" });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(402).json({ message: "auth failed" });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, id: fetchedUser._id },
        process.env.JWT_TOKEN,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, expiresIn: 3600 });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});
