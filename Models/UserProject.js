const mongoose = require("mongoose");

const UserProject = mongoose.model("UserFile", {
  typeGood: String,
  stateGood: String,
  usageGood: String,
  userSituation: String,
  locationGood: Number,
  goodAmount: Number,
  workAmount: Number,
  notaryAmount: Number,
  projectAmount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = UserProject;
