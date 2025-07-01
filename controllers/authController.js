const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const handleError = require("../utils/errorHandling");

const User = require("../models/userModel");
const Developer = require("../models/developerUser");

// ========== USER SIGNUP ==========
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== DEVELOPER SIGNUP ==========
const signupDeveloper = async (req, res) => {
  try {
    const { name, email, password, skills } = req.body;

    const existing = await Developer.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Developer already exists." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const skillArray = skills.split(",").map(skill => skill.trim());

    const developer = await Developer.create({
      name,
      email,
      password: hashed,
      skills: skillArray,
    });

    res.status(201).json({
      success: true,
      message: "Developer registered successfully",
      data: { id: developer._id, name: developer.name, email: developer.email },
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== USER LOGIN ==========
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid password" });

    const token = generateToken(user._id, user.email, user.name);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== DEVELOPER LOGIN ==========
const loginDeveloper = async (req, res) => {
  try {
    const { email, password } = req.body;

    const developer = await Developer.findOne({ email });
    if (!developer) return res.status(404).json({ success: false, message: "Developer not found" });

    const match = await bcrypt.compare(password, developer.password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid password" });

    const token = generateToken(developer._id, developer.email, developer.name);

    res.json({
      success: true,
      message: "Login successful",
      token,
      developer: { id: developer._id, name: developer.name, email: developer.email },
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== UPDATE USER ==========
const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "User updated successfully",
      data: updated,
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== UPDATE DEVELOPER ==========
const updateDeveloper = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.skills && typeof body.skills === "string") {
      body.skills = body.skills.split(",").map(skill => skill.trim());
    }

    const updated = await Developer.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Developer updated successfully",
      data: updated,
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== DELETE USER ==========
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== DELETE DEVELOPER ==========
const deleteDeveloper = async (req, res) => {
  try {
    await Developer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Developer deleted successfully" });
  } catch (err) {
    handleError(res, err, 500);
  }
};

module.exports = {
  signupUser,
  signupDeveloper,
  loginUser,
  loginDeveloper,
  updateUser,
  updateDeveloper,
  deleteUser,
  deleteDeveloper,
};
