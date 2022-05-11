const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async function () {
  return mongoose
    .connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_SECRET}@${process.env.DATABASE_CLUSTER}/${process.env.DATABASE_NAME}`
    )
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB..."));
};
