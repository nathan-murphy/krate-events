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

userRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.users.updateOne(query, { $set: user });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an user: ID ${id}.`);
    } else if (!result.matchedCount) {
      res.status(404).send(`Failed to find an user: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an user: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

userRouter.delete("/:id", (req, res) => {
  console.log(`deleting: ${req.params.id}`);
  User.deleteOne({ _id: req.params.id })
    .then(() => User.find().then((docs) => res.status(202).send(docs)))
    .catch((err) => res.status(400).send(err));
});
