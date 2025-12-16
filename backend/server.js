//downloaded dependencies declare in variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

//declare a variable for define port
const PORT = process.env.PORT || 8070;

//use declared dependencies
app.use(cors());
app.use(bodyParser.json());

//get a .env url
const MONGO_URL = process.env.MONGODB_URL;

//DB configuration
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB Error:", err));

//DB connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection success!");
});

// Middleware
app.use(express.json());

const jobseekerRouter = require("./routes/JobseekerRoute.js");

app.use("/jobseeker", jobseekerRouter);

//load/run in port
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
