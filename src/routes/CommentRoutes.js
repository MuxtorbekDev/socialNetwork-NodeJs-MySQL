const express = require("express");
const { Comment } = require("../models/Comment");
const CommentRoutes = express.Router();

CommentRoutes.post("/post/:id/comment", async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const commentObj = Comment.build(comment);
  commentObj.PostId = id;
  await commentObj.save();
  res.redirect(`/post/${id}`);
});

CommentRoutes.delete("/post/:id/comment/:commentId", (req, res) => {
  const { id } = req.params;
  const { commentId } = req.params;
  Comment.destroy({ where: { _id: commentId } });
  res.redirect(`/post/${id}`);
});

module.exports = CommentRoutes;
