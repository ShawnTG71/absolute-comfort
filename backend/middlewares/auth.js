const User = require("../models/user");

const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Check if user is authenticated and
exports.isAuthenticatedUser = catchAsyncErrors(
  async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler(
          "Login first to access resource",
          401
        )
      );
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = await User.findById(decoded.id);
    next();
  }
);
