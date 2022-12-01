const mongoose = require("mongoose");

const Job = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
      unique: true,
    },
    responsibility: {
      type: String,
    },
    requirement: {
      type: String,
    },
    category: {
      type: String,
    },
    salary: {
      type: String,
    },
  },
  { collection: "job-data" }
);

const model = mongoose.model("jobData", Job);

module.exports = model;
