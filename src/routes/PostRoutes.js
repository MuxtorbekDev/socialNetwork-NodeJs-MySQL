const express = require("express");
const { validatePosts } = require("../middlewares/model-validation");
const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");
const PostRouter = express.Router();

PostRouter.get("/posts", async (req, res) => {
  const posts = await Post.findAll({});
  res.render("posts/index", { posts });
});

PostRouter.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

PostRouter.post("/posts", validatePosts, async (req, res) => {
  const { post } = req.body;
  await Post.create(post);
  res.redirect("/posts");
});

PostRouter.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id, {
    include: [
      {
        model: Comment,
        attributes: ["_id", "content", "createdAt", "updatedAt"],
      },
    ],
  });

  if (!post) throw new BlogErrors("Post topilmadi!", 404);
  const comments = post.dataValues.Comments;
  res.render("posts/single", { post, comments });
});

PostRouter.get("/post/:id/edit", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) return console.log("Post topilmadi");
  res.render("posts/edit", { post });
});

PostRouter.put("/post/:id", validatePosts, async (req, res) => {
  const { id } = req.params;
  const { post } = req.body;
  await Post.update({ ...post }, { where: { _id: id } });
  res.redirect(`/post/${id}`);
});

PostRouter.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  await Post.destroy({ where: { _id: id } });
  res.redirect("/posts");
});

module.exports = PostRouter;
