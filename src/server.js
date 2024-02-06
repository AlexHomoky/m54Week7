const express = require("express");

const app = express();

app.use("/example", express.static("example"));

app.use("/dogs", express.static("dogs"));

app.listen(5001, () => {
  console.log("Server is listening on 5001");
});
