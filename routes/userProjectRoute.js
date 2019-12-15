const express = require("express");
const router = express.Router();
const sanitize = require("../configuration/sanitize");
console.log(sanitize);

const UserProject = require("../Models/UserProject");
//################### UserProject Create #########
router.post("/userProject/create", async (req, res) => {
  try {
    const newUserProject = new UserProject({
      typeGood: sanitize.typeGood[req.body.typeGood]
    });
    if (!newUserProject.typeGood) {
      res.json({ message: "invalid request" });
      return;
    }
    const project = await newUserProject.save();
    res.json({ message: "new userProject created", id: project._id });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//################ UserProject Update ##########
router.post("/userProject/update", async (req, res) => {
  try {
    let id = req.query.id;
    let typeGood = req.body.typeGood;
    let stateGood = req.body.stateGood;
    let usageGood = req.body.usageGood;
    let userSituation = req.body.userSituation;
    let locationGood = req.body.locationGood;
    let goodAmount = req.body.goodAmount;
    let workAmount = req.body.workAmount;
    let notaryAmount = req.body.notaryAmount;
    let projectAmount = req.body.projectAmount;
    let userEmail = req.body.userEmail;
    let userProjectToUpdate = await UserProject.findById(id);
    if (typeGood) {
      userProjectToUpdate.typeGood = typeGood;
    }
    if (stateGood) {
      userProjectToUpdate.stateGood = stateGood;
    }
    if (usageGood) {
      userProjectToUpdate.usageGood = usageGood;
    }
    if (userSituation) {
      userProjectToUpdate.userSituation = userSituation;
    }
    if (locationGood) {
      userProjectToUpdate.locationGood = locationGood;
    }
    if (goodAmount) {
      userProjectToUpdate.goodAmount = goodAmount;
    }
    if (workAmount) {
      userProjectToUpdate.workAmount = workAmount;
    }
    if (notaryAmount) {
      userProjectToUpdate.notaryAmount = notaryAmount;
    }
    if (projectAmount) {
      userProjectToUpdate.projectAmount = projectAmount;
    }
    if (userEmail) {
      userProjectToUpdate.userEmail = userEmail;
    }
    await userProjectToUpdate.save();
    res.json(userProjectToUpdate);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
