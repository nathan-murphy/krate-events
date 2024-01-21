const express = require("express");
const Potluck = require("../models/potluck");
const checkAuth = require("../middleware/check-auth");

module.exports = potluckRouter = express.Router();
potluckRouter.use(express.json());
potluckRouter.use(checkAuth)

potluckRouter.get("/", (req, res) => {
  Potluck.find(getVisiblePotluckQuery(req.userData.userId))
    .then((docs) => res.status(200).send(docs))
    .catch((err) => console.log(err));
});

potluckRouter.get("/:id", (req, res) => {
  Potluck.findOne({ _id: req.params.id }).then((doc) => {
    res.status(200).send(doc);
  });
});

potluckRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const potluck = new Potluck(req.body);

  Potluck.updateOne({ _id: id, hosts: req.userData.userId }, potluck)
    .then((potluck) => res.status(200).send(potluck))
    .catch((err) => res.status(400).send(err));
});

potluckRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const query = {
    _id: id,
    hosts: req.userData.userId,
  };
  Potluck.deleteOne(query).then((result) => {
    if (result.deletedCount > 0) res.status(200).send({ message: "Deleted" });
    else res.status(401).send("Not Authorized");
  });
});

potluckRouter.post("/", (req, res) => {
  const pendingRSVPs = [];
  req.body.invited.forEach((invitedUserId) => {
    pendingRSVPs.push({
      userId: invitedUserId,
      rsvp: "pending",
      recipe: "",
    });
  });
  const potluck = new Potluck({
    dateAndTime: req.body.dateAndTime,
    address: req.body.address,
    details: req.body.details,
    createdBy: req.userData.userId,
    invited: req.body.invited,
    hosts: req.body.hosts,
    rsvps: pendingRSVPs,
  });
  potluck.save();
  console.log(req.userData);
  res.status(201);
});

function getVisiblePotluckQuery(userId) {
  return {
    $or: [{ createdBy: userId }, { hosts: userId }, { invited: userId }],
  };
}
