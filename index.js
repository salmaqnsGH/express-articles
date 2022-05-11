const articleRouter = require("./routes/article");
const commentRouter = require("./routes/comment");
const express = require("express");
const app = express();
var cors = require("cors");
const database = require("./configs/database");
database.connect();

app.use(cors());

app.use(express.json());
app.use("/article", cors(), articleRouter);
app.use("/comment", cors(), commentRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
