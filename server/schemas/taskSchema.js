const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(60).required().label("Task Title").messages({
    "any.required": "{{#label}} is a mandatory field and cannot be left blank.",
    "string.min": "{{#label}} should have at least {{#limit}} characters long.",
    "string.max": "{{#label}} cannot be more than {{#limit}} characters long.",
  }),
  description: Joi.string().optional(),
  completed: Joi.boolean().default(false),
  dueDate: Joi.date().iso().optional().messages({
    "date.base": '"dueDate" must be a valid date',
    "date.iso": '"dueDate" must be a valid ISO date string in format YYYY-MM-DD',
  }),
  priority: Joi.string().optional().valid("Low", "Medium", "High").default("Medium").messages({
    "any.only": 'priority must be one of "Low", "Medium", or "High"',
  }),
});

module.exports = { taskSchema };
