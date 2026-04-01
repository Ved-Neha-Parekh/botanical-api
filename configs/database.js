const mongoose = require("mongoose");
const env = require("../configs/dotenv");

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(`Error in connecting to database ${error.message}`);
  }
};

module.exports = connectDB;
