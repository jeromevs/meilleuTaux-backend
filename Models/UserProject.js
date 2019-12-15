const mongoose = require("mongoose");

const UserProject = mongoose.model("UserProject", {
  typeGood: String,
  stateGood: String,
  usageGood: String,
  userSituation: String,
  locationGood: Number,
  goodAmount: Number,
  workAmount: Number,
  notaryAmount: Number,
  projectAmount: Number,
  userEmail: String,
  userProjectCreateAt: Date
});

module.exports = UserProject;
