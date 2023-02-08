const mongoose = require("mongoose");

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
  console.log("MongoDB Database Connected");
};

module.exports = connectDataBase;
