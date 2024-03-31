// Import the mongoose module
const mongoose = require("mongoose");
require('dotenv').config('../../server')

mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = process.env.MONGODB_URI;

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connnected to MongoDB Database");
}


module.exports = main;
