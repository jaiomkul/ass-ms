const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema(
  {
    companyId: { type: Number, required: true, unique: true },
    primaryText: { type: String, required: true },
    headline: { type: String, required: true },
    description: { type: String },
    CTA: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Ads = mongoose.model("ad", adsSchema);

module.exports = Ads;
