const mongoose = require("mongoose");

const UserProject = mongoose.model("UserProject", {
  typeGood: String,
  stateGood: String,
  usageGood: String,
  userSituation: String,
  locationGood: {
    country: String,
    city: String
  },
  amount: {
    good: Number,
    work: Number,
    notary: Number,
    project: Number
  },
  userEmail: String,
  userProjectCreateAt: Date
});

module.exports = UserProject;
