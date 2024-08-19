const { z, ZodError } = require("zod");

const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      const data = source === "body" ? req.body : req.query;
      schema.parse(data);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ errors: err.errors });
      }
      next(err);
    }
  };

module.exports = validate;
