const { BlogError } = require("../helpers/BlogErrors");
const { Photo } = require("../models/Photo");
const { Post } = require("../models/Post");
const moment = require("moment");
const {
  getAllPosts,
  createPosts,
  findById,
  findByIdFull,
  updatePost,
  deletePost,
} = require("../models/DAL/PostRepository");

const showAll = async (req, res) => {
  const posts = await getAllPosts();
  res.render("posts/index", { posts });
};

const postNew = (req, res) => {
  res.render("posts/new");
};

const createPost = async (req, res) => {
  const { post } = req.body;
  const { files } = req;
  await createPosts(post, files);
  res.redirect("/posts");
};

const postFull = async (req, res) => {
  const { id } = req.params;
  const post = await findByIdFull(id);

  if (!post) throw new BlogError("Post topilmadi!", 404);
  const comments = post.dataValues.Comments;
  const photos = post.dataValues.Photos;
  const createAt = moment(post.createAt).format("YYYY-MM-DD").toString();
  res.render("posts/single", { post, comments, photos, createAt });
};

const postEdit = async (req, res) => {
  const { id } = req.params;
  // const post = findById(id);
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
  const newPhotos = req.files;
  const { post } = req.body;
  const { deletePhotos } = req.body;
  await updatePost(id, post, newPhotos, deletePhotos);
  res.redirect(`/post/${id}`);
};

const postDelete = async (req, res) => {
  const { id } = req.params;
  deletePost(id);
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
