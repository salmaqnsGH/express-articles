const mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
  article_id: {
    type: mongoose.Types.ObjectId,
  },
  date: {
    type: Date,
  },
  content: {
    type: String,
  },
  guest_name: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("comments", commentSchema);
