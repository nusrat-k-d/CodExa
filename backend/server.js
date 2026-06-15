require("dotenv").config();
console.log("JWT Secret:", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const analyzeRoute = require("./routes/analyze");
app.use("/analyze", analyzeRoute);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/codexa")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

