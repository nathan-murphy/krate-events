import * as express from "express";
import * as mongodb from "mongodb";

import { samplePotluckRSVPs } from "./samplePotluckRsvps";

export const potluckRsvpRouter = express.Router();
potluckRsvpRouter.use(express.json());

potluckRsvpRouter.get("/:id/status/:status", (req, res) => {
  let rsvps = samplePotluckRSVPs.filter((s) => {
    return (
      s.potluckId.toString() == req.params.id && s.rsvp == req.params.status
    );
  });
  res.status(200).send(rsvps);
});
