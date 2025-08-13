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

const schemaForUpdatingPassword = Joi.object({
  currentPassword: Joi.string().required().label("Password"),
  newPassword: Joi.string().min(8).max(18).required().label("New Password"),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required().label("Confirm Password"),
}).messages({
  "any.required": "{{#label}} is a mandatory field and cannot be left blank.",
  "string.min": "{{#label}} must be at least {{#limit}} characters long.",
  "string.max": "{{#label}} cannot be more than {{#limit}} characters long.",
  "any.only": "{{#label}} doesn't match with New Password.",
});

const schemaForUpdatingProfile = Joi.object({
  name: Joi.string().min(3).max(50).optional().label("Name"),
  bio: Joi.string().max(500).optional().allow("").label("Bio"),
  location: Joi.string().max(100).optional().allow("").label("Location"),
  dateOfBirth: Joi.date().optional().label("Date of Birth"),
}).messages({
  "string.min": "{{#label}} must be at least {{#limit}} characters long.",
  "string.max": "{{#label}} cannot be more than {{#limit}} characters long.",
  "string.uri": "{{#label}} must be a valid URL.",
  "string.pattern.base": "{{#label}} must be a valid phone number.",
  "date.base": "{{#label}} must be a valid date.",
});

module.exports = {
  userSchema,
  schemaForUpdatingPassword,
  schemaForUpdatingProfile,
};
