const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth.js");

dotenv.config();

const app = express();
app.use(cors()); // middleware gibi
// app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded);
app.use("/api", authRouter);

const PORT = process.env.PORT || 8000;

db();

app.listen(PORT, () => {
  console.log("server is running on port 8000");
});
