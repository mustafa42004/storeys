const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");

const signToken = (id) =>
  // returns a signed jwt
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (res, user) => {
  // creates token and send response to user
  const token = signToken(user._id);

  user.password = undefined;
  user.isActive = undefined;
  user.updatedAt = undefined;

  res.status(200).json({ status: "success", data: { user, token } });
};

exports.signup = catchAsync(async (req, res, next) => {
  // getting passwords from body
  const { password, confirmPassword } = req.body;

  // checking for passwords in body
  if (!password || !confirmPassword) {
    return next(
      new ApiError("Please Enter password and confirm your password", 400)
    );
  }

  // checking password length
  if (password.length < 8) {
    return next(
      new ApiError("Password length should be more than 8 characters", 400)
    );
  }

  // checking both paswords are same or not
  if (password !== confirmPassword) {
    return next(new ApiError("Password not matching", 400));
  }

  // creating user
  const user = await User.create(req.body);

  // filtering fields for response
  user.password = undefined;
  user.updatedAt = undefined;

  // sending response
  res.status(201).json({ status: "success", data: user });
});

exports.login = catchAsync(async (req, res, next) => {
  // getting email and password from request body
  const { email, password } = req.body;

  // validation checks
  if (!email || !password) {
    return next(new ApiError("Email and password are required", 400));
  }

  // finding user with email
  const user = await User.findOne({ email }).select("+password");

  // check user
  if (!user?.email) {
    return next(new ApiError("user does not exists", 404));
  }

  // check password
  if (!(await user.comparePasswords(password, user.password))) {
    return next(
      new ApiError("Invalid credentials. Please check email or password", 400)
    );
  }

  // if each checks are passed then create and send token to user
  createAndSendToken(res, user);
});

exports.changePassword = catchAsync(async (req, res, next) => {
  // find user
  const user = await User.findById(req.user.id).select("+password");

  // checks;
  if (!req.body.currentPassword) {
    return next(new ApiError("Enter currentPassword", 400));
  }

  // check previous password
  if (!(await user.comparePasswords(req.body.currentPassword, user.password))) {
    return next(new ApiError("Your current password is wrong.", 401));
  }

  // checks
  if (!req.body.confirmPassword || !req.body.password) {
    return next(new ApiError("please enter password and confirmPassword", 400));
  }

  // checks;
  if (
    req.body.currentPassword.length < 8 ||
    req.body.password.length < 8 ||
    req.body.confirmPassword.length < 8
  ) {
    return next(
      new ApiError("passwords should be more than 8 characters", 400)
    );
  }

  // check new passwords
  if (req.body.confirmPassword != req.body.password) {
    return next(new ApiError("passwords not matching", 400));
  }

  // set new password
  user.password = req.body.password;
  await user.save();

  // create and token to user
  createAndSendToken(res, user);
});
