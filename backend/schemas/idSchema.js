const { z } = require("zod");

const userIDSchema = z.object({
  userID: z.number().int().positive(),
});

module.exports = userIDSchema;
