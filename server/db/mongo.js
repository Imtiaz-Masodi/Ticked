const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
const connectOptions = {
  dbName: process.env.MONGO_DB_NAME,
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
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
