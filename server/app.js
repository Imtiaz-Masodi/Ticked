if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const mongoDB = require("./db/mongo");
const { handleCors } = require("./utils");
const PORT = process.env.PORT;

const accountRouter = require("./routes/AccountRoute");
const categoryRouter = require("./routes/CategoryRoute");
const taskRouter = require("./routes/TaskRoute");
const { initializeRequest } = require("./middlewares/initializeRequest");

const SERVER_PORT = PORT || 3001;
const app = express();

app.use(handleCors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(initializeRequest);

app.use("/account", accountRouter);
app.use("/category", categoryRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Ticked - Task Management App API server is up and running!");
});

app.listen(SERVER_PORT, () => {
  mongoDB.connect();
  console.log(`Server started and running on port ${SERVER_PORT}`);
});
