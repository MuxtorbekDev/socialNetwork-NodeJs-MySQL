const { createPhotos, deletePhoto } = require("../../helpers/PhotoHendlers");
const { Comment } = require("../Comment");
const { Photo } = require("../Photo");
const { Post } = require("../Post");

const getAllPosts = async () => {
  return await Post.findAll({
    include: [
      {
        model: Photo,
        attributes: ["data", "description"],
      },
    ],
  });
};

const createPosts = async (post, files) => {
  const postData = Post.build(post);
  await postData.save();
  await createPhotos(files, postData._id);
};

const findById = async (id) => {
  return await Post.findByPk(id, {
    include: [
      {
        model: Photo,
        attributes: ["_id", "data", "description"],
      },
    ],
  });
};

const findByIdFull = async (id) => {
  return await Post.findByPk(id, {
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
};

const updatePost = async (id, post, newPhotos, deletePhotos) => {
  await deletePhoto(deletePhotos);
  await Post.update({ ...post }, { where: { _id: id } });
  await createPhotos(newPhotos, id);
};

const deletePost = async (id) => {
  return await Post.destroy({ where: { _id: id } });
};

module.exports = {
  getAllPosts,
  createPosts,
  findById,
  findByIdFull,
  updatePost,
  deletePost,
};
