const express = require("express");
const { buildDB } = require("./models/db-architechture/build");
const { Post } = require("./models/Post");
const engine = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const { validatePosts } = require("./middlewares/model-validation");
const app = express();

buildDB();

app.use(express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/posts", async (req, res) => {
  const posts = await Post.findAll({});
  res.render("posts/index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

app.post("/posts", validatePosts, async (req, res) => {
  const { post } = req.body;
  await Post.create(post);
  res.redirect("/posts");
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);

  if (!post) return console.log("Post topilmadi");
  res.render("posts/single", { post });
});

app.get("/post/:id/edit", validatePosts, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) return console.log("Post topilmadi");
  res.render("posts/edit", { post });
});

app.put("/post/:id", async (req, res) => {
  const { id } = req.params;
  const { post } = req.body;
  await Post.update({ ...post }, { where: { _id: id } });
  res.redirect(`/post/${id}`);
});

app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  await Post.destroy({ where: { _id: id } });
  res.redirect("/posts");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "No'malum xatolik yuz berdi!" } = err;
  res.status(status).render("error", { message, status });
});

app.listen(4001, () => {
  console.log("Server port 4001 da ishga tushdi");
});
