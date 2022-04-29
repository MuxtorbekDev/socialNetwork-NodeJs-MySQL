const express = require("express");
const { connect } = require("./db/config");
const { buildDB } = require("./models/db-architechture/build");
const { Post } = require("./models/Post");
const path = require("path");
const app = express();

buildDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../templates/views"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", async (req, res) => {
  const posts = await Post.findAll({});
  res.json(posts);
});

app.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

app.listen(4001, () => {
  console.log("Server port 4001 da ishga tushdi");
});
