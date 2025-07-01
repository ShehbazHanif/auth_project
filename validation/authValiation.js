// validators/authSchemas.js
const { z } = require("zod");

const signupUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const signupDeveloperSchema = signupUserSchema.extend({
  skills: z.array(z.string()),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
};

module.exports = {
  signupUserSchema,
  signupDeveloperSchema,
  loginSchema,
  validate
};
