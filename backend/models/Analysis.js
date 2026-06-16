const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },

    leetcodeUsername: String,

    easy: Number,
    medium: Number,
    hard: Number,
    total: Number,

    score: Number,
    level: String,
    streak: Number,
    percentile: Number,

    suggestions: [String],
    weakTopics: [String],

    recommendations: [
      {
        topic: String,
        link: String,
      },
    ],

    dailyPlan: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analysis", analysisSchema);