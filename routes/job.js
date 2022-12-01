const express = require("express");
const Router = express.Router();
const Job = require("../models/jobs.model");
Router.post("/addjob", async (req, res) => {
  try {
    const newJob = new Job({
      name: req.body.name,
      overview: req.body.overview,
      responsibility: req.body.responsibility,
      requirement: req.body.requirement,
      category: req.body.category,
      salary: req.body.salary,
    });
    await newJob.save();
    res.status(200).send(newJob);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

Router.get("/", async (req, res) => {
  try {
    const alljob = await Job.find();
    res.status(200).send(alljob);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

Router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const job = await Job.findOne({ _id: req.params.id });
    if (job) {
      await Job.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: "job is deleted",
      });
    } else {
      res.status(404).send({ message: "job is not found with this id" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

Router.put("/edit/:id", async (req, res) => {
  try {
    const selectedJob = await Job.findOne({ _id: req.params.id });
    if (selectedJob) {
      await Job.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            overview: req.body.overview,
            responsibility: req.body.responsibility,
            requirement: req.body.requirement,
            category: req.body.category,
            salary: req.body.salary,
          },
        }
      );
      res.status(200).send({
        message: "Job is updated",
      });
    } else {
      res.status(404).send({ message: "Job is not found with this id" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = Router;
