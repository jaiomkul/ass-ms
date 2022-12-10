const express = require("express");

const adsController = require("./controllers/ads.controller");

const companiesController = require("./controllers/companies.controller");

const app = express();

app.use(express.json());

app.use("/ads", adsController);
app.use("/companies", companiesController);

module.exports = app;
