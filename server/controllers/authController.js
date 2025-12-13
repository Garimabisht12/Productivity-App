import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "user exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPass
    });

    await user.save();
    res.status(201).json({ message: "registered", username });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error registering", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Not Found" });

    // Use bcrypt.compare in production, plain text check is insecure
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({message: 'wrong pass'});

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5h" });
    const username = user.username;
    res.status(200).json({ message: "logged in", token, username });
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message });
  }
};
