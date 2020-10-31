const express = require("express");
const router = express.Router();
const db = require("./ConnectionHandler");

router.get("/:username", (req, res) => {
  const username = req.params.username;
  const sqlSearch = "SELECT * FROM blog_table WHERE username=(?);";
  db.query(sqlSearch, username, (err, result) => {
    if (err) {
      res.status(404).send("Could not find the user!");
      return;
    }
    res.send(result);
  });
});

module.exports = router;