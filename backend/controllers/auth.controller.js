import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookies from "../lib/utils.js";


// Controller to handle user signup
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body; // Extract user data from request body

  try {
    // Validate that all required fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Enforce minimum password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Validate email format using basic regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if a user with the same email already exists in the database
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate salt and hash the password for secure storage
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance with hashed password
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // If user instance created successfully
    if (newUser) {
      await newUser.save(); // Save new user to the database

      // Send back user data (without password) and HTTP 201 Created status
      res.status(201).json({
        userId: newUser._id,
        fullname: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      // Fallback: invalid user data (should rarely happen)
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    // Log unexpected errors and return server error
    console.error("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verified user: generate JWT token
    generateTokenAndSetCookies(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signout = async (req, res) => {
  try {
    const token = req.cookies?.auth_token; // assuming cookie-parser middleware
    if (!token) {
      return res.status(400).json({ message: "Already logged out" });
    }

    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: "strict",
    });

    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    console.error("Error in signout controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json(req.user);
};


export const updateProfile = async (req, res) => {
  try {
    const { fullName, branch } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (branch !== undefined) user.branch = branch;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        branch: user.branch,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
