const mongoose = require("mongoose");

const potluckRsvpSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rsvp: { type: String },
  recipe: { type: String },
});

const potluckSchema = mongoose.Schema({
  dateAndTime: {
    type: {
      startDate: { type: Date },
      startTime: { type: String },
    },
  },
  address: { type: String },
  details: {
    type: {
      theme: { type: String },
      description: { type: String },
    },
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hosts: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  invited: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  rsvps: { type: [potluckRsvpSchema] },
});

module.exports = mongoose.model("Potluck", potluckSchema);
