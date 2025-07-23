const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password, fathermail, fatherpassword } = req.body;

  // Validate required fields
  if (!fullName || !email || !password || !fathermail || !fatherpassword) {
    return res.status(400).json({ 
      message: "All fields are required (fullName, email, password, fathermail, fatherpassword)" 
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }

  if (!emailRegex.test(fathermail)) {
    return res.status(400).json({ message: "Please provide a valid father email address" });
  }

  // Password strength validation
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  if (fatherpassword.length < 6) {
    return res.status(400).json({ message: "Father password must be at least 6 characters long" });
  }

  try {
    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if user with father email already exists
    const existingFatherMail = await User.findOne({ fathermail });
    if (existingFatherMail) {
      return res.status(400).json({ message: "Father email already in use" });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      fathermail,
      fatherpassword,
    });

    // Return user info without passwords
    const userResponse = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      fathermail: user.fathermail,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(500).json({ 
      message: "Server error during registration", 
      error: err.message 
    });
  }
};

// Login User (with option to login with either main or father credentials)
exports.loginUser = async (req, res) => {
  const { email, password, loginType } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    let user;
    let isValidPassword = false;

    // Check if login type is specified (main or father)
    if (loginType === "father") {
      // Login with father credentials
      user = await User.findOne({ fathermail: email });
      if (user) {
        isValidPassword = await user.compareFatherPassword(password);
      }
    } else {
      // Default: login with main credentials
      user = await User.findOne({ email });
      if (user) {
        isValidPassword = await user.comparePassword(password);
      }
    }

    if (!user || !isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Return user info without passwords
    const userResponse = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      fathermail: user.fathermail,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      token: generateToken(user._id),
      loginType: loginType || "main",
    });

  } catch (err) {
    res.status(500).json({ 
      message: "Server error during login", 
      error: err.message 
    });
  }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -fatherpassword");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User info retrieved successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Error fetching user info", 
      error: err.message 
    });
  }
};
