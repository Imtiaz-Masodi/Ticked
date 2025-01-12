const mongoose = require("mongoose");
const { MONGO_DB_URI, MONGO_DB_NAME, MONGO_USERNAME, MONGO_PASSWORD } = require("../utils/constants");

const uri = MONGO_DB_URI;
const connectOptions = {
  dbName: MONGO_DB_NAME,
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD,
  // useNewUrlParser: true, // deprecated
  // useUnifiedTopology: true, // deprecated
};

async function connect() {
  try {
    if (mongoose.ConnectionStates.connected !== mongoose.connection.readyState) {
      await mongoose.connect(uri, connectOptions);
      console.log("Connected to the Mongo Database!");
    } else {
      console.log("Already connected to the Mongo Database!");
    }
  } catch (err) {
    throw err;
  }
}

async function disconnect() {
  try {
    if (mongoose.ConnectionStates.connected === mongoose.connection.readyState) {
      await mongoose.disconnect();
    }
    console.log("Disconnected from the Mongo Database!");
  } catch (err) {
    throw err;
  }
}

module.exports = { connect, disconnect };
