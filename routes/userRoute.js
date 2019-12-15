const express = require("express");
const router = express.Router();

const User = require("../Models/User");
const UserProject = require("../Models/UserProject");
//################# User Create##########
router.post("/user/create", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      userEmail: req.body.userEmail
    });
    if (existingUser === null) {
      const newUser = new User({
        userEmail: req.body.userEmail
      });
      await newUser.save();
      res.json("user created");
    } else {
      res.json({
        error: { message: "user already exists" }
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
