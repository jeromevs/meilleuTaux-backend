const mongoose = require("mongoose");

const User = mongoose.model("User", {
  userEmail: String
});

module.exports = User;
