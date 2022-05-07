const express = require("express");
const { validatePosts } = require("../middlewares/model-validation");
const PostRouter = express.Router();
const { upload } = require("../middlewares/uploadImage");
const {
  showAll,
  postNew,
  createPost,
  postFull,
  postEdit,
  postEditPut,
  postDelete,
} = require("../controllers/PostControllers");
const catchAsync = require("../middlewares/tryCatchAsync");

PostRouter.get("/posts", catchAsync(showAll));
PostRouter.get("/posts/new", postNew);
PostRouter.post(
  "/posts",
  upload.array("image"),
  validatePosts,
  catchAsync(createPost)
);
PostRouter.get("/post/:id", catchAsync(postFull));
PostRouter.get("/post/:id/edit", catchAsync(postEdit));
PostRouter.put("/post/:id", upload.array("image"), catchAsync(postEditPut));
PostRouter.delete("/post/:id", catchAsync(postDelete));

module.exports = PostRouter;
