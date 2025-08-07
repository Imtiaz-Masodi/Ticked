const Joi = require("joi");
const { OtpPurpose } = require("../utils/enums");

const otpResendSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  purpose: Joi.string()
    .valid(...Object.values(OtpPurpose))
    .required()
    .label("Purpose"),
}).messages({
  "any.required": "{{#label}} is a mandatory field and cannot be left blank.",
  "string.email": "Please provide a valid email address.",
  "any.only": "{{#label}} must be one of the allowed values.",
});

const otpVerifySchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  otp: Joi.string().length(6).pattern(/^\d+$/).required().label("OTP"),
  purpose: Joi.string()
    .valid(...Object.values(OtpPurpose))
    .required()
    .label("Purpose"),
}).messages({
  "any.required": "{{#label}} is a mandatory field and cannot be left blank.",
  "string.email": "Please provide a valid email address.",
  "string.length": "{{#label}} must be exactly {{#limit}} characters long.",
  "string.pattern.base": "{{#label}} must contain only digits.",
  "any.only": "{{#label}} must be one of the allowed values.",
});

module.exports = {
  otpResendSchema,
  otpVerifySchema,
};
