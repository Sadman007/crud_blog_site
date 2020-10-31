const express = require("express");

const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected with mysql DB!");
  }
});

module.exports = db;
