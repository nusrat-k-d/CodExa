const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/User");

const problemMap = {
  "Arrays": "https://leetcode.com/problems/two-sum/",
  "Strings": "https://leetcode.com/problems/valid-anagram/",
  "Dynamic Programming": "https://leetcode.com/problems/climbing-stairs/",
  "Graphs": "https://leetcode.com/problems/number-of-islands/",
  "Trees": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
};

router.post("/", async (req, res) => {
  const { username } = req.body;

  if (!username || typeof username !== "string" || username.trim() === "") {
    return res.status(400).json({ error: "Username is required." });
  }

  try {
    // 🔥 Fetch from LeetCode
    const response = await axios.post("https://leetcode.com/graphql", {
      
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            tagProblemCounts {
              advanced {
                tagName
                problemsSolved
              }
              intermediate {
                tagName
                problemsSolved
              }
              fundamental {
                tagName
                problemsSolved
              }
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
      variables: { username: username.trim() },
    });

    const userData = response.data?.data?.matchedUser;


    if (!userData) {
      return res.status(404).json({ error: "User not found or has no public data on LeetCode." });
    }

    const stats = userData.submitStats?.acSubmissionNum || [];

    let easy = 0, medium = 0, hard = 0, total = 0;

    stats.forEach((item) => {
      if (item.difficulty === "Easy") easy = item.count || 0;
      if (item.difficulty === "Medium") medium = item.count || 0;
      if (item.difficulty === "Hard") hard = item.count || 0;
      if (item.difficulty === "All") total = item.count || 0;
    });

    const tags = userData.tagProblemCounts || {};
    
    let weakTopics = [];
    
    // Safely combine all tags
    const allTags = [
      ...(tags.fundamental || []),
      ...(tags.intermediate || []),
      ...(tags.advanced || []),
    ];
    
    allTags.forEach((tag) => {
      if (tag.problemsSolved < 5) {
        weakTopics.push(tag.tagName);
      }
    });

    // 📅 Date
    const today = new Date().toISOString().split("T")[0];

    // 🔍 Find or create user
    let user = await User.findOne({ username });

    if (!user) {
      user = new User({
        username,
        history: [],
      });
    }

    // 🏆 Benchmark (approx industry standard)
    const benchmark = {
      total: 300,
      medium: 150,
      hard: 50,
    };
    let comparison = [];

    if (total < benchmark.total) {
      comparison.push(`You solved ${total}, top candidates solve ~${benchmark.total}`);
    } else {
      comparison.push(`Great job! Your total solved (${total}) meets the standard.`);
    }
    
    if (medium < benchmark.medium) {
      comparison.push(`Medium problems are low (${medium}/${benchmark.medium})`);
    } else {
       comparison.push(`Solid effort on Medium problems!`);
    }
    
    if (hard < benchmark.hard) {
      comparison.push(`Hard problems are low (${hard}/${benchmark.hard})`);
    }

    let percentile = 0;
    percentile += Math.min((total / benchmark.total) * 40, 40);
    percentile += Math.min((medium / benchmark.medium) * 40, 40);
    percentile += Math.min((hard / benchmark.hard) * 20, 20);
    
    percentile = Math.round(percentile);

    let percentileMessage = "";
    if (percentile > 80) {
      percentileMessage = "You are ahead of most candidates 🚀";
    } else if (percentile > 50) {
      percentileMessage = "You are at average level 📈";
    } else {
      percentileMessage = "You are behind most candidates — push harder 💪";
    }

    // ✅ Avoid duplicate entry
    const alreadyExists = user.history.find((h) => h.date === today);

    if (!alreadyExists) {
      user.history.push({
        date: today,
        easy,
        medium,
        hard,
        total,
      });
    } else {
       // Update today's entry if it already exists
       alreadyExists.easy = easy;
       alreadyExists.medium = medium;
       alreadyExists.hard = hard;
       alreadyExists.total = total;
    }

    await user.save();

    // 🔥 STREAK CALCULATION
    let streak = 0;
    const dates = user.history
      .map((h) => h.date)
      .sort((a, b) => new Date(b) - new Date(a));

    let currentDateStr = today;
    for (let i = 0; i < dates.length; i++) {
        if (dates[i] === currentDateStr) {
            streak++;
            const d = new Date(currentDateStr);
            d.setDate(d.getDate() - 1);
            currentDateStr = d.toISOString().split("T")[0];
        } else {
           if (i === 0) {
              const yesterday = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);
              if (dates[0] === yesterday.toISOString().split("T")[0]) {
                  streak++;
                  currentDateStr = yesterday.toISOString().split("T")[0];
                  const d = new Date(currentDateStr);
                  d.setDate(d.getDate() - 1);
                  currentDateStr = d.toISOString().split("T")[0];
                  continue; 
              }
           }
           break;
        }
    }


    // 🧠 Suggestions
    let suggestions = [];
    if (total < 50) suggestions.push("You lack problem exposure. Solve 3 problems daily.");
    if (medium < 30) suggestions.push("Shift focus to Medium problems (core of interviews).");
    if (hard === 0) suggestions.push("Start 1 Hard problem weekly to build thinking depth.");
    if (easy > medium + 20) suggestions.push("You are staying in your comfort zone (Easy problems).");
    if (streak < 3) suggestions.push("Your consistency is weak. Build a daily habit.");
    if (suggestions.length === 0) suggestions.push("You are doing great! Keep up the good work.");

    // 📊 Placement Score
    let score = 0;
    score += Math.min((total / 300) * 40, 40);
    score += Math.min((medium / 150) * 30, 30);
    score += Math.min((hard / 50) * 20, 20);
    score += Math.min(streak * 2, 10);
    score = Math.round(score);

    let level = "Beginner";
    if (score >= 80) level = "Expert 🏆";
    else if (score >= 60) level = "Placement Ready 🚀";
    else if (score >= 40) level = "Intermediate 📈";

    // 🎯 Daily Plan
    let dailyPlan = [];
    if (score < 40) {
      dailyPlan = ["Solve 2 Easy + 1 Medium", "Revise Arrays & Hashing"];
    } else if (score < 60) {
      dailyPlan = ["Solve 2 Medium + 1 Hard", "Focus on Trees / Graphs"];
    } else {
      dailyPlan = ["Solve 3 Medium or 1 Hard", "Mock interview practice"];
    }

    let recommendations = [];
    weakTopics.slice(0, 3).forEach((topic) => {
      if (problemMap[topic]) {
        recommendations.push({
          topic,
          link: problemMap[topic],
        });
      } else {
        recommendations.push({
          topic,
          link: `https://leetcode.com/tag/${topic.toLowerCase().replace(/ /g, "-")}/`,
        });
      }
    });
    
    res.json({
      easy,
      medium,
      hard,
      total,
      suggestions,
      history: user.history,
      streak,
      score,
      level,
      dailyPlan,
      weakTopics,
      recommendations,
      comparison,
      percentile,
      percentileMessage,
    });

  } 
  // catch (err) {
  //   console.error("Analyze API Error:", err.message);
  //   res.status(500).json({ error: "Failed to fetch data from LeetCode or Internal Server Error" });
  // }
  catch (err) {
  console.log("FULL ERROR:");
  console.log(JSON.stringify(err.response?.data, null, 2));

  console.error("Analyze API Error:", err.message);

  res.status(500).json({
    error: "Failed to fetch data from LeetCode or Internal Server Error"
  });
}
});

module.exports = router;