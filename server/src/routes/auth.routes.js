const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/login", (req, res) => {
  let fetchedUser;
  User.findOne({ email: new RegExp(req.body.email, "i") })
    .then((user) => {
      if (!user) {
        console.log("no user found!");
        res
          .status(401)
          .json({ message: "We don't recognize the email address given." });
      } else {
        fetchedUser = user;
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (!result) {
            res.status(401).json({ message: "Wrong password!" });
          } else {
            const token = jwt.sign(
              { email: fetchedUser.email, userId: fetchedUser._id },
              process.env.JWT_TOKEN,
              { expiresIn: "1h" }
            );
            res
              .status(200)
              .json({ token: token, expiresIn: 3600, userId: fetchedUser._id });
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
