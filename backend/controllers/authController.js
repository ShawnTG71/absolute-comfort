const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Register user => /api/v1/register
exports.registerUser = catchAsyncErrors(
  async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id:
          "avatars/michael-dam-mEZ3PoFGs_k-unsplash_ggjgde",
        url: "https://res.cloudinary.com/dlkez27ab/image/upload/v1675707543/acimages/avatars/michael-dam-mEZ3PoFGs_k-unsplash_ggjgde.jpg",
      },
    });
    sendToken(user, 200, res);
  }
);

// Login User => /api/v1/login

exports.loginUser = catchAsyncErrors(
  async (req, res, next) => {
    const { email, password } = req.body;

    //Check if email and password is entered by user
    if (!email || !password) {
      return next(
        new ErrorHandler(
          "Please enter email and password",
          400
        )
      );
    }

    // Find user in database
    const user = await User.findOne({ email }).select(
      "+password"
    );

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    // Check if password in correct
    const isPasswordMatched = await user.comparePassword(
      password
    );

    if (!isPasswordMatched) {
      return next(
        new ErrorHandler("Invalid Email or Password", 401)
      );
    }
    sendToken(user, 200, res);
  }
);
