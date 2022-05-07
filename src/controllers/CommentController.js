const { Comment } = require("../models/Comment");

const postComments = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const commentObj = Comment.build(comment);
  commentObj.PostId = id;
  await commentObj.save();
  res.redirect(`/post/${id}`);
};

const commentDelete = (req, res) => {
  const { id } = req.params;
  const { commentId } = req.params;
  Comment.destroy({ where: { _id: commentId } });
  res.redirect(`/post/${id}`);
};

module.exports = { postComments, commentDelete };
