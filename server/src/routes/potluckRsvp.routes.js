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
    fetchedRsvps.forEach(userId => {
      builtRsvps.push({
        userId: userId,
        rsvp: req.params.status,
        recipe: ''
      })
    });
    res.status(200).send(builtRsvps);
  });
});
