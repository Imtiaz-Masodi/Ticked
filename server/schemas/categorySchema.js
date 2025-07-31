const Joi = require("joi");
const constants = require("../utils/constants");

const categorySchema = Joi.object({
  categoryName: Joi.string().min(3).max(30).required().label("Category Name").messages({
    "any.required": "{{#label}} is a mandatory field and cannot be left blank.",
    "string.min": "{{#label}} must be at least {{#limit}} characters long.",
    "string.max": "{{#label}} cannot be more than {{#limit}} characters long.",
  }),
  categoryColorCode: Joi.string().pattern(constants.COLOR_HEX_CODE_PATTERN).optional().messages({
    "string.pattern.base": '"categoryColorCode" should be a valid hex color code',
  }),
});

module.exports = {
  categorySchema,
};
