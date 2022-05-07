const {
  createComment,
  deleteComment,
} = require("../models/DAL/CommentRepository");

const postComments = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  await createComment(id, comment);
  res.redirect(`/post/${id}`);
};

const commentDelete = (req, res) => {
  const { id } = req.params;
  const { commentId } = req.params;
  deleteComment(commentId);
  res.redirect(`/post/${id}`);
};

module.exports = { postComments, commentDelete };
