const express = require("express");
const sampleUsers = require("./sampleUsers");
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
    .then((doc) => res.status(200).send(doc))
    .catch((err) => res.status(500).send(err));
});

userRouter.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(201))
    .catch((err) => res.status(500).send(err));
});

userRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;

  User.updateOne({ _id: id }, user)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send(err));
});

userRouter.delete("/:id", (req, res) => {
  console.log(`deleting: ${req.params.id}`);
  User.deleteOne({ _id: req.params.id })
    .then(() => User.find().then((docs) => res.status(202).send(docs)))
    .catch((err) => res.status(400).send(err));
});
