const mongoose = require("mongoose");

const potluckRsvpSchema = mongoose.Schema({
  userId: { type: String },
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
  invited: { type: [String] },
  rsvps: { type: [potluckRsvpSchema] },
});

module.exports = mongoose.model("Potluck", potluckSchema);
