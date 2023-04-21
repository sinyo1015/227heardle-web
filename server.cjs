const express = require("express");
const app = express(); // create express app

// add middleware
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// start express server on port 3001
app.listen(3001, () => {
  console.log("server started on port 3001");
});