const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const weatherRouter = require("./src/routes/weather");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the weather routes
app.use("/api/weather", weatherRouter);

app.get("/", async (req, res) => {
  console.log("application has started");
  res.send("Application has started");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
