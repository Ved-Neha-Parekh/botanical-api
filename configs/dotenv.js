const env = require("dotenv").config();

const dotenv = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
};

module.exports = dotenv;