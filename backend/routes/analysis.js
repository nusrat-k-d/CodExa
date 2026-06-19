const express = require("express");
const router = express.Router();

const Analysis = require("../models/Analysis");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/save", authMiddleware, async (req, res) => {
  try {
    const analysis = new Analysis({
      userId: req.user.userId,

      leetcodeUsername: req.body.leetcodeUsername,

      easy: req.body.easy,
      medium: req.body.medium,
      hard: req.body.hard,
      total: req.body.total,

      score: req.body.score,
      level: req.body.level,
      streak: req.body.streak,
      percentile: req.body.percentile,

      suggestions: req.body.suggestions,
      weakTopics: req.body.weakTopics,
      recommendations: req.body.recommendations,
      dailyPlan: req.body.dailyPlan,
    });

    await analysis.save();

    res.status(201).json({
      message: "Analysis saved successfully",
      analysis,
    });

  } catch (err) {
    console.log("SAVE ANALYSIS ERROR:");
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/my-reports", authMiddleware, async (req, res) => {
  try {
    const reports = await Analysis.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(reports);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server Error",
    });
  }
});


router.get("/progress", authMiddleware, async (req, res) => {
  try {
    const progress = await Analysis.find({
      userId: req.user.userId,
    })
      .select("score total percentile createdAt leetcodeUsername")
      .sort({ createdAt: 1 });

    res.json(progress);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

module.exports = router;