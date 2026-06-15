const express = require("express");
const bcrypt = require("bcryptjs");
const AuthUser = require("../models/AuthUser");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields exist
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Check if email already exists
    const existingUser = await AuthUser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new AuthUser({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server Error",
    });
  }
});



const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    
  try {
    const { email, password } = req.body;

    const user = await AuthUser.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await AuthUser.findById(req.user.userId)
      .select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({
      error: "Server Error",
    });
  }
});

module.exports = router;