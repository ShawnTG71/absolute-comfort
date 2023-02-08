const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // let error = { ...err };

  // error.message = err.message;

  // res.status(error.statusCode).json({
  //   success: false,
  //   message: error.message || "Internal Server Error",
  // });

  // if (process.env.NODE_ENV === "DEVELOPMENT") {
  //   res.status(err.statusCode).json({
  //     success: false,
  //     error: err,
  //     errMessge: err.message,
  //     stack: err.stack,
  //   });
  // }

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    let error = { ...err };

    error.message = err.message;
    error.stack = err.stack;

    //Wrong Mongoose Object ID Error
    if (err.name === "CastError") {
      const message = `Resource not found.Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
      console.log(error.stack);
    }

    //Handling Mongoose Validation Error

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(
        (value) => value.message
      );
      error = new ErrorHandler(message, 400);
    }
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
    console.log(error.stack);
  }
};
