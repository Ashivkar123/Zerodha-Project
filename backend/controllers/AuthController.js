const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const jwt = require("jsonwebtoken");

// --- Signup Function ---
module.exports.Signup = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { email, password, username, createdAt } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Email, password, and username are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Let the model handle hashing
    const user = await User.create({
      email,
      username,
      password,
      createdAt: createdAt || new Date(),
    });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });

  } catch (error) {
    console.error("Signup Error:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already in use." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// --- Login Function ---
module.exports.Login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    console.log("\n--- Login Attempt Debug ---");
    console.log("  Received Identifier:", identifier);
    console.log("  Received Password (plaintext):", password);
    console.log("---------------------------");

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Email/username and password are required." });
    }

    // Search user by email OR username
    const user = await User.findOne({ 
      $or: [ { email: identifier }, { username: identifier } ]
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect email/username or password." });
    }

    const isMatch = await user.comparePassword(password);
    console.log("  bcrypt.compare result (auth):", isMatch);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect email/username or password." });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: (process.env.JWT_COOKIE_EXPIRES_DAYS || 7) * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      token, // optional, if you want frontend to receive token here
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// --- User Verification Function ---
module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};
