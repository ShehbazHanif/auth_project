const express = require("express");
const projectRouter = express.Router();
const { createProject, getOpenProjects } = require("../controllers/projectController");

//  User creates a project
projectRouter.post("/create", createProject);

//  Developer views open projects
projectRouter.outer.get("/open", getOpenProjects);

module.exports = projectRouter;
