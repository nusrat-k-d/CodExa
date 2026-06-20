require("dotenv").config();
console.log("JWT Secret:", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const analyzeRoute = require("./routes/analyze");
const authRoute = require("./routes/auth");
const analysisRoute = require("./routes/analysis");

app.use("/analyze", analyzeRoute);
app.use("/auth", authRoute);
app.use("/analysis", analysisRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

