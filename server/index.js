const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const {
  validateData,
  validateDataForUpdate,
} = require("./modules/DBvalidator");

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

db.connect((err) => {
  if (err) {
    console.log(err);
    console.log("Could not connect with mysql DB!");
  } else console.log("Connected with mysql DB!");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/blogs", (req, res) => {
  const sqlSelect = "SELECT * FROM blog_table;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/blog/view/:id", (req, res) => {
  const id = req.params.id;
  const sqlSelect = "SELECT * FROM blog_table WHERE id=(?);";
  db.query(sqlSelect, id, (err, result) => {
    res.send(result);
  });
});

app.get("/user/:username", (req, res) => {
  const username = req.params.username;
  const sqlSearch = "SELECT * FROM blog_table WHERE username=(?);";
  db.query(sqlSearch, username, (err, result) => {
    res.send(result);
  });
});

app.delete("/blog/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM blog_table WHERE id = (?);";
  db.query(sqlDelete, id, (err, result) => {
    res.send(result);
  });
});

app.put("/blog/update", (req, res) => {
  const id = req.body.id;
  const content = req.body.content;
  const validationVerdict = validateDataForUpdate(req);
  if (validationVerdict.error) {
    res.status(400).send(validationVerdict.error.details[0]);
    return;
  }
  const sqlUpdate = "UPDATE blog_table SET content = ? WHERE id = ?;";
  db.query(sqlUpdate, [content, id], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/insert_blog", (req, res) => {
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
    if (err) console.log(err);
    res.send(result);
  });
  return;
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
