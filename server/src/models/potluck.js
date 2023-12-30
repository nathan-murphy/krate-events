const mongoose = require("mongoose");

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
  hosts: { type: String },
  rsvps: { type: String },
});

module.exports = mongoose.model("Potluck", potluckSchema);
