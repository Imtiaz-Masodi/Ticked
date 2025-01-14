const express = require("express");
const mongoDB = require("./db/mongo");
const { handleCors } = require("./utils");
const { PORT } = require("./utils/constants");

const accountRouter = require("./routes/AccountRoutes");
const categoryRouter = require("./routes/CategoryRoute");
const { initializeRequest } = require("./middlewares/initializeRequest");

const SERVER_PORT = PORT || 3001;
const app = express();

app.use(handleCors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(initializeRequest);

app.use("/account", accountRouter);
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("Task Management API server is up and running!");
});

app.listen(SERVER_PORT, () => {
  mongoDB.connect();
  console.log(`Server started and running on port ${SERVER_PORT}`);
});
