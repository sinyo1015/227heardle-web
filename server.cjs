const express = require("express");
const app = express(); // create express app

// add middleware
app.use(express.static("dist"));

// start express server on port 3001
app.listen(3001, () => {
  console.log("server started on port 3001");
});