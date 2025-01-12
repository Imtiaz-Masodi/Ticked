const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(8).max(18).required().label("Password"),
}).messages({
  "any.required": "{{#label}} is a mandatory field and cannot be left blank.",
  "string.min": "{{#label}} must be at least {{#limit}} characters long.",
  "string.max": "{{#label}} cannot be more than {{#limit}} characters long.",
  "string.email": "Please provide a valid email address.",
});

module.exports = userSchema;
