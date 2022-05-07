const express = require("express");
const {
  postComments,
  commentDelete,
} = require("../controllers/CommentController");
const catchAsync = require("../middlewares/tryCatchAsync");
const CommentRoutes = express.Router();

CommentRoutes.post("/post/:id/comment", catchAsync(postComments));
CommentRoutes.delete("/post/:id/comment/:commentId", catchAsync(commentDelete));

module.exports = CommentRoutes;
