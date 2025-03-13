const User = require("../models/User");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

module.exports.protect = catchAsync(async (req, res, next) => {
  // allows access to only signed users
  let token;

  // get token from request headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // check token
  if (!token) {
    return next(
      new ApiError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // verify jwt
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // find current user from jwt id
  const currentUser = await User.findById(decoded.id);
  if (!currentUser || !currentUser.isActive) {
    return next(
      new ApiError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new ApiError("User recently changed password! Please log in again.", 401)
    );
  }

  // setting user field in request object
  req.user = currentUser;
  next();
});
