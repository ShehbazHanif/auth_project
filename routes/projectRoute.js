const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { projectSchema } = require("../validation/projectValidation");
const {
  createProject,
  getOpenProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// ========== CREATE NEW PROJECT ==========
router.post("/",validate(projectSchema), createProject);

// ========== GET ALL OPEN PROJECTS ==========
router.get("/", getOpenProjects);


// ========== UPDATE PROJECT ==========
router.patch("/:id", updateProject);

// ========== DELETE PROJECT ==========
router.delete("/:id", deleteProject);

module.exports = router;
