const { z } = require("zod");

const bidSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  developerId: z.string().min(1, "Developer ID is required"),
  bidAmount: z.number().min(1, "Bid amount must be greater than 0"),
  message: z.string().optional(),
});

module.exports = { bidSchema };
