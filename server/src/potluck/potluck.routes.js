const express = require("express");
const Potluck = require("../models/potluck");
const samplePotlucks = require("./samplePotlucks");

module.exports = potluckRouter = express.Router();
potluckRouter.use(express.json());

let allPotlucks = samplePotlucks;

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

potluckRouter.post("/", (req, res) => {
  const potluck = new Potluck({
    dateAndTime: {
      startDate: req.body.dateAndTime.startDate,
      startTime: req.body.dateAndTime.startTime,
    },
    address: req.body.address,
    details: req.body.details,
  });
  potluck.save();
  console.log(potluck);
  allPotlucks.push(req.body);
  res.sendStatus(201);
});
