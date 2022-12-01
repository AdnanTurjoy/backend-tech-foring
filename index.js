require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const dbUrl =
  "mongodb+srv://adnan:lfwv6gf5VefjjpXe@cluster0.zuejeov.mongodb.net/tech-foring";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

app.use("/api/user", userRoute);
app.use("/api/job", jobRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
