const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");

/**
 * Register a new user
 * - Call the userService to create a new user
 * - Generate auth tokens for the user
 * - Return the response in the given format
 */
const register = catchAsync(async (req, res) => {
  // Create a new user
  const user = await userService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  res.status(httpStatus.CREATED).send({user,tokens})
});

/**
 * User login
 * - Call the authService to verify if the password and email are valid
 * - Generate auth tokens for the user
 * - Return the response in the given format
 */
const login = catchAsync(async (req, res) => {
  // Verify email and password
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  
  // Generate tokens
  const tokens = await tokenService.generateAuthTokens(user);

  // Return the response
  return res.status(200).json({
    user,
    tokens,
  });
});

module.exports = {
  register,
  login,
};
