const express = require("express");

const Ads = require("../models/ads.model");

const Companies = require("../models/company.model");

const router = express.Router();

router.get("/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const ads = await Ads.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "matchId",
          as: "alldocs",
        },
      },
      {
        $unwind: "$alldocs",
      },
      {
        $project: {
          companyId: 1,
          primaryText: 1,
          headline: 1,
          description: 1,
          imageUrl: 1,
          name: "$alldocs.name",
          url: "$alldocs.url",
        },
      },
      {
        $match: {
          $or: [
            { primaryText: { $regex: searchTerm, $options: "i" } },
            { headline: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
            { name: { $regex: searchTerm, $options: "i" } },
          ],
        },
      },
    ]).exec();

    return res.status(200).send({ ads: ads });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const ads = await Ads.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "matchId",
          as: "alldocs",
        },
      },
      {
        $unwind: "$alldocs",
      },
      {
        $project: {
          companyId: 1,
          primaryText: 1,
          headline: 1,
          description: 1,
          imageUrl: 1,
          name: "$alldocs.name",
          url: "$alldocs.url",
        },
      },
    ]).exec();

    return res.status(200).send({ ads: ads });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const ads = await Ads.find().lean().exec();

    return res.status(200).send({ ads: ads });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id).lean().exec();

    return res.status(201).send(ad);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const ad = await Ads.create(req.body);

    return res.status(200).send(ad);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const ad = await Ads.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send(ad);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ad = await Ads.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(ad);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
