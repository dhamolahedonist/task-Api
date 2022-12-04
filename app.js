const express = require("express");
const tasks = require("./routes/tasksRoutes");
const connectDB = require("./db/connectDb");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handlers");

const app = express();

// middleware
app.use(express.static("./public"));
app.use(express.json());
// routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3300;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
