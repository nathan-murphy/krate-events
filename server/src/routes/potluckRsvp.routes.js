const express = require("express");
const Potluck = require("../models/potluck");

module.exports = potluckRsvpRouter = express.Router();
potluckRsvpRouter.use(express.json());

potluckRsvpRouter.get("/:potluckId/status/:status", (req, res) => {
  let fetchedRsvps = [];

  Potluck.findOne({ _id: req.params.potluckId }).then((doc) => {
    if (req.params.status == "pending") {
      fetchedRsvps = doc.invited;
    } else {
      fetchedRsvps = doc.rsvps.filter((rsvp) => req.params.status == rsvp.rsvp);
    }
    const builtRsvps = [];
    fetchedRsvps.forEach((userId) => {
      builtRsvps.push({
        userId: userId,
        rsvp: req.params.status,
        recipe: "",
      });
    });
    res.status(200).send(builtRsvps);
  });
});

potluckRsvpRouter.put("/:potluckId", (req, res) => {
  // todo: get the user ID of the person submitted this request from the Authentication header
  const newRsvp = { userId: "", ...req.body };
  const filter = { _id: req.params.potluckId };

  // todo: update the RSVP array
  Potluck.findOne(filter).then((doc) => {
    console.log(newRsvp)
    doc.rsvps = [newRsvp]
    console.log(JSON.stringify(doc))
    Potluck.updateOne(filter, doc).catch(err => console.log(err))
  });

  res.status(200).send(newRsvp);
});
