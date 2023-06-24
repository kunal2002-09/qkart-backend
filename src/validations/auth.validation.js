const Joi = require("joi");
const { password } = require("./custom.validation");

// Request validation schema for user registration
const register = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().custom(password),
    name: Joi.string().required(),
  }),
};

module.exports = {
  register,
};

// Request validation schema for user login
const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
