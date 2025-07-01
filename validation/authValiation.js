const { z } = require("zod");

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
// Minimum six characters, at least one letter and one number

const signupUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().regex(passwordRegex, "Password must be at least 6 characters long and contain a number."),
});

const signupDeveloperSchema = signupUserSchema.extend({
  skills: z.array(z.string().min(1, "Skill cannot be empty")),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

module.exports = {
  signupUserSchema,
  signupDeveloperSchema,
  loginSchema,
};
