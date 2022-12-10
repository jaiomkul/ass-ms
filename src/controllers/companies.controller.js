const express = require("express");

const Companies = require("../models/company.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const companies = await Companies.find().lean().exec();

    return res.status(200).send({ companies: companies });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const company = await Companies.findById(req.params.id).lean().exec();

    return res.status(201).send(company);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const company = await Companies.create(req.body);

    return res.status(200).send(company);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const company = await Companies.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send(company);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const company = await Companies.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(200).send(company);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
