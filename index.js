const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const notFound = require("./middleware/not-found");
// const url=process.env.MONGO_URL
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/task", taskRoutes);

app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
