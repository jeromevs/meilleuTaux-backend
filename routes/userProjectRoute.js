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
    const newUserProject = new UserProject({
      typeGood: req.body.typeGood,
      stateGood: req.body.stateGood,
      usageGood: req.body.usageGood,
      userSituation: req.body.userSituation,
      locationGood: {
        country: req.body.locationGood.country,
        city: req.body.locationGood.city
      },
      amount: {
        good: req.body.amount.good,
        work: req.body.amount.work,
        notary: req.body.amount.notary,
        project: req.body.amount.project
      },
      userEmail: req.body.userEmail,
      fileId: req.body.fileId
    });
    const project = await newUserProject.save();
    const data = {
      from: "Mailgun Sandbox <postmaster@" + DOMAIN + ">",
      to: newUserProject.userEmail,
      subject: "Votre dossier Meilleur Taux: " + newUserProject.fileId,
      text:
        "Bonjour," +
        "\n" +
        "Nous vous confirmons la reception de votre demande  sous le numero: " +
        newUserProject.fileId +
        "\n\n" +
        "Type du bien: " +
        newUserProject.typeGood +
        "\n" +
        "L'etat du bien: " +
        newUserProject.stateGood +
        "\n" +
        "Votre situation locative actuelle: " +
        newUserProject.userSituation +
        "\n" +
        "Le montant de votre future acquisition: " +
        newUserProject.amount.good +
        " €" +
        "\n" +
        "Le montant des travaux: " +
        newUserProject.amount.work +
        " €" +
        "\n" +
        "Le montant des frais de notaire estimes: " +
        newUserProject.amount.notary +
        " €" +
        "\n" +
        "Pour un budget total de: " +
        newUserProject.amount.project +
        " €" +
        "\n" +
        "Localise a: " +
        newUserProject.locationGood.city +
        "\n" +
        "L'equipe de meilleur taux se tient a votre disposition pour toute question supplementaire," +
        "\n" +
        "A tres bientot."
    };
    mg.messages().send(data, function(error, body) {
      console.log(body);
      console.log(error);
    });
    if (project) {
      res
        .status(201)
        .json({ message: "userProject saved", fileId: req.body.fileId });
    } else {
      res.status(400).json({ message: "invalid format" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
//###################### GET ALL USERPROJECTS################
router.get("/userProjects", async (req, res) => {
  try {
    const existingUserProjects = await UserProject.find();

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

//################ POST USERPROJECT DELETE #############
router.post("/userProject/delete/:fileId", async (req, res) => {
  try {
    const userProjectToDelete = await UserProject.findOne({
      fileId: req.params.fileId
    });

    if (userProjectToDelete) {
      await userProjectToDelete.remove();
      res.json({ success: "userProject successfully deleted" });
    } else {
      res.status(404).json({ message: "project not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
