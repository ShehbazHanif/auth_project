const Project = require("../models/projectModel");
const handleError = require("../utils/errorHandling");

// ========== CREATE PROJECT ==========
const createProject = async (req, res) => {
  try {
    const { userId, title, description, techStack, estimatedBudget } = req.body;

    const techArray = techStack.split(',').map((tech) => tech.trim());

    const newProject = await Project.create({
      userId,
      title,
      description,
      techStack: techArray,
      estimatedBudget,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== GET ALL OPEN PROJECTS ==========
const getOpenProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "open" }).populate("userId", "name email");

    res.json({
      success: true,
      message: "Open projects fetched successfully",
      count: projects.length,
      projects,
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== UPDATE PROJECT ==========
const updateProject = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.techStack && typeof updates.techStack === "string") {
      updates.techStack = updates.techStack.split(',').map(t => t.trim());
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      project: updated,
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== DELETE PROJECT ==========
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

module.exports = {
  createProject,
  getOpenProjects,
  updateProject,
  deleteProject,
};
