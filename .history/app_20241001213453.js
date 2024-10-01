const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our Node.js application!" });
});

app.get("/api/status", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app; // Export for testing
