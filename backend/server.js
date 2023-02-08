const connectDataBase = require("./config/database");
const app = require("./app");
const dotenv = require("dotenv");

// Handle Uncaught exeptions errors

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(
    "Shutting down server due to uncaught exeptions"
  );
  process.exit(1);
});

// Condfig File Set Up
dotenv.config({ path: "backend/config/config.env" });

// Database Connection
connectDataBase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandles Promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(
    "Shutting down server due to Unhandles Promise Rejection"
  );
  server.close(() => {
    process.exit(1);
  });
});
