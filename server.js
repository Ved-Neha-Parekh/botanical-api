const express = require("express");
const env = require("./configs/dotenv");
const connectDB = require("./configs/database");
const plantRouter = require("./routes/plant.route");

const PORT = env.PORT || 8081;
const app = express();

app.use(express.json());

app.use("/api/plants",plantRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error in connecting to database ${err.message}`);
  });
