const express = require("express");
const { validatePosts } = require("../middlewares/model-validation");
const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");
const PostRouter = express.Router();
const multer = require("multer");
const createPhotos = require("../helpers/createPhotos");
const { Photo } = require("../models/Photo");
const { BlogErrors } = require("../helpers/BlogErrors");
const moment = require("moment");

const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new BlogError("Iltimos faqat rasm yuklang", 405));
    }
    cb(undefined, true);
  },
});

PostRouter.get("/posts", async (req, res) => {
  const posts = await Post.findAll({
    include: [
      {
        model: Photo,
        attributes: ["data", "description"],
      },
    ],
  });
  res.render("posts/index", { posts });
});

PostRouter.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

PostRouter.post(
  "/posts",
  upload.array("image"),
  validatePosts,
  async (req, res) => {
    const { post } = req.body;
    const { files } = req;
    const postData = Post.build(post);
    await postData.save();

    await createPhotos(files, postData._id);
    res.redirect("/posts");
  }
);

PostRouter.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id, {
    include: [
      {
        model: Comment,
        attributes: ["_id", "content", "createdAt", "updatedAt"],
      },
      {
        model: Photo,
        attributes: ["data", "description"],
      },
    ],
  });

  if (!post) throw new BlogErrors("Post topilmadi!", 404);
  const comments = post.dataValues.Comments;
  const photos = post.dataValues.Photos;
  const createAt = moment(post.createAt).fromNow();
  res.render("posts/single", { post, comments, photos, createAt });
});

PostRouter.get("/post/:id/edit", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) return console.log("Post topilmadi");
  res.render("posts/edit", { post });
});

PostRouter.put("/post/:id", upload.array("image"), async (req, res) => {
  const { id } = req.params;
  const { files } = req;
  const { post } = req.body;
  console.log(files);
  await Post.update({ ...post }, { where: { _id: id } });
  await createPhotos(files, id);
  res.redirect(`/post/${id}`);
});

PostRouter.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  await Post.destroy({ where: { _id: id } });
  res.redirect("/posts");
});

module.exports = PostRouter;
