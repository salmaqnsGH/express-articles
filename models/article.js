const mongoose = require("mongoose");

let articleSchema = mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: Date,
  },
  content: {
    type: String,
  },
  author_name: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("articles", articleSchema);
