const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", (_, res) => {
  User.find()
    .then((docs) => res.status(200).send(docs))
    .catch((err) => res.status(500).send(err));
});

userRouter.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((doc) => {
      console.log("sending data");
      res.status(200).send(doc);
    })
    .catch((err) => res.status(500).send(err));
});

userRouter.post("/", (req, res) => {
  bcrypt.hash(req.body.password, 3).then((hash) => {
    const user = new User(req.body);
    user.password = hash;
    user
      .save()
      .then(() => {
        user.password = null;
        res.status(201).send(user);
      })
      .catch((err) => res.status(500).send(err));
  });
});

userRouter.post("/login", (req, res) => {
  console.log(req.body)
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
        "krate-murphington-events",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

userRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const user = new User(req.body);

  User.updateOne({ _id: id }, user)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send(err));
});

userRouter.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => User.find().then((docs) => res.status(202).send(docs)))
    .catch((err) => res.status(400).send(err));
});
