const mongoose = require("mongoose");

const companiesSchema = new mongoose.Schema(
  {
    matchId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Companies = mongoose.model("company", companiesSchema);

module.exports = Companies;
