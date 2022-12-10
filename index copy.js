require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect(process.env.DB);
};

//SCHEMA

const adsSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
  primaryText: { type: String, required: true },
  headline: { type: String, required: true },
  description: { type: String, required: true },
  CTA: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Ads = mongoose.model("ad", adsSchema);

//CRud Operation

app.get("/ads", async (req, res) => {
  try {
    const ads = await Ads.find().lean().exec();

    return res.status(200).send({ ads: ads });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

app.post("/ads", async (req, res) => {
  try {
    const ad = await Ads.create(req.body);

    return res.status(201).send(ad);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }

  console.log("listening on port 8080");
});
