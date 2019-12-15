const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/meilleurtaux", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./Models/UserProject");

const userProjectRoutes = require("./routes/userProjectRoute");
app.use(userProjectRoutes);

app.listen(3000, () => {
  console.log("Server Ready");
});
