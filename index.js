const express = require("express");

const server = express();

server.get("/", (req, res) => {
  return res.send("welcome to inventory app");
});

server.listen(3100);
console.log("server is running in 3100 port");
