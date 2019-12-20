const express = require("express");
const mailgun = require("mailgun-js");

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

const router = express.Router();
const sanitize = require("../configuration/sanitize");
const shortid = require("shortid");
console.log(sanitize);

const UserProject = require("../Models/UserProject");
//################### UserProject Save #########
router.post("/userProject/save", async (req, res) => {
  try {
    req.body.fileId = shortid.generate();
    const newUserProject = new UserProject(req.body);
    const project = await newUserProject.save();
    const data = {
      from: "Mailgun Sandbox <postmaster@" + DOMAIN + ">",
      to: req.body.userEmail,
      subject: "hello",
      text: `Testing some Mailgun awesomness!` + req.body.typeGood
    };
    mg.messages().send(data, function(error, body) {
      console.log(body);
    });
    if (project) {
      res
        .status(201)
        .json({ message: "userProject saved", fileId: req.body.fileId });
    } else {
      res.status(400).json({ message: "invalid format" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//###################### GET ALL USERPROJECTS################
router.get("/userProjects", async (req, res) => {
  try {
    const existingUserProjects = await UserProject.find().toArray();

    if (existingUserProjects) {
      res.json(existingUserProjects);
    } else {
      res.status(404).json({ message: "project not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//###################### GET USERPROJECT################
router.get("/userProject/:fileId", async (req, res) => {
  try {
    const existingUserProject = await UserProject.findOne({
      fileId: req.params.fileId
    });

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
