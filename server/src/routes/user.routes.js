const express = require("express");
const bcrypt = require("bcrypt");
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
  bcrypt.hash(req.body.password, 3).then((hash) => {
    
    if(req.body.permissions.canRSVPFor == "")
      delete req.body.permissions.canRSVPFor

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

userRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  let updates = req.body;

  // make sure password is never updated accidentally
  try {
    delete updates.password;
  } catch {
    // do nothing
  }
  User.findByIdAndUpdate(id, updates, { new: true })
    .then(updated => { res.status(201).send(updated) })
    .catch((err) => {
      console.error(err); res.status(500).send(err);
    });
});

userRouter.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => User.find().then((docs) => res.status(202).send(docs)))
    .catch((err) => res.status(400).send(err));
});
