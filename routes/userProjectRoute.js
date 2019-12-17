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
    if (!req.body.locationGood) {
      req.body.locationGood = {};
    }
    let locationGood = {
      country: req.body.locationGood.country,
      city: req.body.locationGood.city
    };
    if (!req.body.amount) {
      req.body.amount = {};
    }
    let amount = {
      goodAmount: req.body.amount.goodAmount,
      workAmount: req.body.amount.workAmount,
      notaryAmount: req.body.amount.notaryAmount,
      projectAmount: req.body.amount.projectAmount
    };
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
    if (locationGood.country) {
      userProjectToUpdate.locationGood.country = locationGood.country;
    }
    if (locationGood.city) {
      userProjectToUpdate.locationGood.city = locationGood.city;
    }
    if (amount.good) {
      userProjectToUpdate.amount.good = amount.good;
    }
    if (amount.work) {
      userProjectToUpdate.amount.work = amount.work;
    }
    if (amount.notary) {
      userProjectToUpdate.amount.notary = amount.notary;
    }
    if (amount.project) {
      userProjectToUpdate.amount.project = amount.project;
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

//###################### GET USERPROJECT################
router.get("/userProject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params.id);
    console.log(req.params);
    const existingUserProject = await UserProject.findById(id);

    if (existingUserProject) {
      res.json(existingUserProject);
    } else {
      res.status(404).json({ message: "project not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
