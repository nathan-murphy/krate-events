const express = require("express");
const Potluck = require("../models/potluck");
const checkAuth = require("../middleware/check-auth");

module.exports = potluckRsvpRouter = express.Router();
potluckRsvpRouter.use(express.json());
potluckRsvpRouter.use(checkAuth)

potluckRsvpRouter.get("/:potluckId/status/:status", (req, res) => {
  let fetchedRsvps = [];

  Potluck.findOne({ _id: req.params.potluckId }).then((potluck) => {
    fetchedRsvps = potluck.rsvps.filter(
      (rsvp) => req.params.status == rsvp.rsvp
    );
    res.status(200).send(fetchedRsvps);
  });
});

potluckRsvpRouter.put("/batch/:potluckId", (req, res) => {
  let rsvps = [];
  req.body.forEach(rsvp => {
    rsvps.push(
      {
        userId: rsvp.userId ? rsvp.userId : req.userData.userId,
        rsvp: rsvp.rsvp,
        recipe: rsvp.recipe,
      }
    )
  })
  const filter = { _id: req.params.potluckId };
  Potluck.findOne(filter).then((potluck) => {
    rsvps.forEach(rsvpToUpdate => {
      const rsvpIndex = potluck.rsvps.findIndex(
        (rsvpAsFound) => rsvpAsFound.userId == rsvpToUpdate.userId
      );
      potluck.rsvps[rsvpIndex] = rsvpToUpdate;
    })

    Potluck.updateOne(filter, potluck)
      .then((_) => res.status(200).send(rsvps))
      .catch((err) => console.log(err));
  });
});

potluckRsvpRouter.put("/:potluckId", (req, res) => {
  const newRsvp = {
    userId: req.body.userId ? req.body.userId : req.userData.userId,
    rsvp: req.body.rsvp,
    recipe: req.body.recipe,
  };
  const filter = { _id: req.params.potluckId };
  Potluck.findOne(filter).then((potluck) => {
    const rsvpIndex = potluck.rsvps.findIndex(
      (rsvp) => rsvp.userId == newRsvp.userId
    );
    potluck.rsvps[rsvpIndex] = newRsvp;
    Potluck.updateOne(filter, potluck)
      .then((_) => res.status(200).send(newRsvp))
      .catch((err) => console.log(err));
  });
});
