const rateLimiter = require("express-rate-limit");

// Formula Breakdown
/*
    1000 = 1 Second (1 second mein 1000 milliseconds hote hain).
    60 * 1000 = 1 Minute (60 seconds).
    15 * 60 * 1000 = 15 Minutes.
*/

const rateConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status:429,
    success:false,
      errorMsg: "Too many requests from this IP, please try again after 15 minutes.",
  },
};

const limiter = rateLimiter(rateConfig);

module.exports = limiter;