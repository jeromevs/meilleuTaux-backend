require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./Models/UserProject");

const userProjectRoutes = require("./routes/userProjectRoute");
app.use(userProjectRoutes);

app.listen(4000, () => {
  console.log("Server Ready");
});
