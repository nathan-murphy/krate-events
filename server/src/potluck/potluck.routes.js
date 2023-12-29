const express = require("express");
const Potluck = require("../models/potluck");

module.exports = potluckRouter = express.Router();
potluckRouter.use(express.json());

potluckRouter.get("/", (_, res) => {
  Potluck.find()
    .then((documents) => {
      res.status(200).send(documents);
    })
    .catch((err) => {
      console.log(err);
    });
});

potluckRouter.get("/:id", (req, res) => {
  Potluck.findOne({ _id: req.params.id }).then((doc) => {
    res.status(200).send(doc);
  });
});

potluckRouter.delete("/:id", (req, res) => {
  Potluck.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result)
    res.status(200);
  });
});

potluckRouter.post("/", (req, res) => {
  const potluck = new Potluck({
    dateAndTime: req.body.dateAndTime,
    address: req.body.address,
    details: req.body.details,
  });
  potluck.save();
  res.status(201);
});
