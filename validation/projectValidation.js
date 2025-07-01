const { z } = require("zod");

const projectSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  techStack: z.array(z.string().min(1)),
  estimatedBudget: z.number().min(0),
});

module.exports = { projectSchema };
