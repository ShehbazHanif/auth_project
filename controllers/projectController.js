const Project = require("../models/projectModel");

// 🎯 Create a new project (by User)
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
    res.status(500).json({ success: false, message: "Project creation failed", error: err.message });
  }
};

// 📂 Get all open projects (for Developer)
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
    res.status(500).json({ success: false, message: "Failed to fetch projects", error: err.message });
  }
};

module.exports = {
  createProject,
  getOpenProjects,
};
