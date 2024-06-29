const stages = require("express").Router();
const db = require("../models");
const { Stage, Event } = db;
const { Op } = require("sequelize");

// FIND ALL STAGES
stages.get("/", async (req, res) => {
  try {
    const allStages = await Stage.findAll({
      order: [["name", "ASC"]],
      where: {
        name: {
          [Op.like]: `%${req.query.name ? req.query.name : ""}%`,
        },
      },
    });
    res.status(200).json(allStages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// FIND SPECIFIC STAGE
stages.get("/:name", async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: { stage_name: req.params.id },
      include: [
        {
          model: Event,
          as: "events",
          where: {
            name: {
              [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
            },
            order: [[{ model: Event, as: "events" }, "date", "ASC"]],
          },
        },
      ],
    });
    if (!foundStage) {
      res.status(404).json({ error: "No stage found with that name." });
      return;
    }
    res.status(200).json(foundStage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE A STAGE
stages.post("/", async (req, res) => {
  try {
    const newStage = await Stage.create(req.body);
    res.status(201).json({
      message: "Stage created!",
      data: newStage,
    });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// UPDATE A STAGE
stages.put("/:id", async (req, res) => {
  try {
    const updatedStage = await Stage.update(req.body, {
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Stage updated!",
      data: updatedStage,
    });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// DELETE A STAGE
stages.delete("/:id", async (req, res) => {
  try {
    const deletedStage = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    if (!deletedStage) {
      res.status(404).json({ error: "No stage found with that id." });
      return;
    }
    res.status(200).json({ message: "Stage deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EXPORT
module.exports = stages;
