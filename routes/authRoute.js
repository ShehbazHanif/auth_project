const express = require("express");
const authRouter = express.Router();
const {
  signupUser,
  signupDeveloper,
  loginUser,
  loginDeveloper,
} = require("../controllers/authController");
const {signupUserSchema,
  signupDeveloperSchema,
  loginSchema,
  validate} = require("../validation/authValiation")

// 🔐 USER ROUTES
authRouter.post("/signup/user", validate(signupUserSchema), signupUser);
authRouter.post("/login/user", validate(loginSchema),loginUser);

// 🔐 DEVELOPER ROUTES
authRouter.post("/signup/developer",validate(signupDeveloperSchema), signupDeveloper);
authRouter.post("/login/developer",validate(loginSchema), loginDeveloper);

module.exports = authRouter;
