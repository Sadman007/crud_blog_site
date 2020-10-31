const express = require("express");
const router = express.Router();
const db = require("./ConnectionHandler");

const {
  validateData,
  validateDataForUpdate,
} = require("../modules/DBvalidator");

router.get("/all", (req, res) => {
  const sqlSelect = "SELECT * FROM blog_table;";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send(result);
  });
});

router.post("/insert", (req, res) => {
  const title = req.body.title;
  const username = req.body.username;
  const content = req.body.content;
  const validationVerdict = validateData(req);
  if (validationVerdict.error) {
    res.status(400).send(validationVerdict.error.details[0]);
    return;
  }
  const sqlInsert =
    "INSERT INTO blog_table (title, username, content) VALUES (?,?,?);";
  db.query(sqlInsert, [title, username, content], (err, result) => {
    if (err) {
      res.status(404).send("Failed to insert a new blog!");
      return;
    }
    res.send(result);
  });
  return;
});

router.get("/view/:id", (req, res) => {
  const id = req.params.id;
  const sqlSelect = "SELECT * FROM blog_table WHERE id=(?);";
  db.query(sqlSelect, id, (err, result) => {
    if (err) {
      res.status(404).send("Could not find the blog!");
      return;
    }
    res.send(result);
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM blog_table WHERE id = (?);";
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      res.status(404).send("Could not delete the blog!");
      return;
    }
    res.send(result);
  });
});

router.put("/update", (req, res) => {
  const id = req.body.id;
  const content = req.body.content;
  const validationVerdict = validateDataForUpdate(req);
  if (validationVerdict.error) {
    res.status(400).send(validationVerdict.error.details[0]);
    return;
  }
  const sqlUpdate = "UPDATE blog_table SET content = ? WHERE id = ?;";
  db.query(sqlUpdate, [content, id], (err, result) => {
    if (err) {
      res.status(404).send("Could not update the blog!");
      return;
    }
    res.send(result);
  });
});

module.exports = router;
