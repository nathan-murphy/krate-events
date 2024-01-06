const express = require("express");
const samplePotluckRSVPs = require("../potluck-rsvp/samplePotluckRsvps");

module.exports = potluckRsvpRouter = express.Router();
potluckRsvpRouter.use(express.json());

potluckRsvpRouter.get("/:id/status/:status", (req, res) => {
  let rsvps = samplePotluckRSVPs.filter((s) => {
    return (
      s.potluckId.toString() == req.params.id && s.rsvp == req.params.status
    );
  });
  res.status(200).send(rsvps);
});
