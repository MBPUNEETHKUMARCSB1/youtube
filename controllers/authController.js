const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, username: user.username, id: user._id },
      "hibro",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        token,
        user: { username: user.username, email: user.email, id: user._id },
      });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};
