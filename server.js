const express = require("express");
const env = require("./configs/dotenv");
const connectDB = require("./configs/database");
const plantRouter = require("./routes/plant.route");
const authRouter = require("./routes/auth.route");
const rateLimiter = require("./middlewares/rate.limiter"); 

const PORT = env.PORT || 8081;
const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use("/api/plants",plantRouter);
app.use("/api/auth",authRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error in connecting to database ${err.message}`);
  });
