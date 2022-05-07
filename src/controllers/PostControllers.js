const { BlogError } = require("../helpers/BlogErrors");
const { createPhotos, deletePhoto } = require("../helpers/PhotoHendlers");
const { Comment } = require("../models/Comment");
const { Photo } = require("../models/Photo");
const { Post } = require("../models/Post");
const moment = require("moment");

const showAll = async (req, res) => {
  const posts = await Post.findAll({
    include: [
      {
        model: Photo,
        attributes: ["data", "description"],
      },
    ],
  });
  res.render("posts/index", { posts });
};

const postNew = (req, res) => {
  res.render("posts/new");
};

const createPost = async (req, res) => {
  const { post } = req.body;
  const { files } = req;
  const postData = Post.build(post);
  await postData.save();

  await createPhotos(files, postData._id);
  res.redirect("/posts");
};

const postFull = async (req, res) => {
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

  if (!post) throw new BlogError("Post topilmadi!", 404);
  const comments = post.dataValues.Comments;
  const photos = post.dataValues.Photos;
  const createAt = moment(post.createAt).format("YYYY-MM-DD").toString();
  res.render("posts/single", { post, comments, photos, createAt });
};

const postEdit = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id, {
    include: [
      {
        model: Photo,
        attributes: ["_id", "data", "description"],
      },
    ],
  });
  if (!post) return console.log("Post topilmadi");
  const photos = post.dataValues.Photos;
  res.render("posts/edit", { post, photos });
};

const postEditPut = async (req, res) => {
  const { id } = req.params;
  const { files } = req;
  const { post } = req.body;
  await deletePhoto(req.body.deletePhotos);
  await Post.update({ ...post }, { where: { _id: id } });
  await createPhotos(files, id);
  res.redirect(`/post/${id}`);
};

const postDelete = async (req, res) => {
  const { id } = req.params;
  await Post.destroy({ where: { _id: id } });
  res.redirect("/posts");
};

module.exports = {
  showAll,
  postNew,
  createPost,
  postFull,
  postEdit,
  postEditPut,
  postDelete,
};
