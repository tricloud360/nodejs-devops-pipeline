const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World from NodeJS DevOps Pipeline!");
});

const startServer = () => {
  return app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};

module.exports = { app, startServer };
