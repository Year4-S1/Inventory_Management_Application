const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log("Database error", error.message);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Database Synced");
});

// app.listen(PORT, () => {
//   console.log(`Server is Up and Running on PORT ` + PORT);
// });

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

app.route("/").get((req, res) => {
  res.send("Inventory Management Application Backend");
});
