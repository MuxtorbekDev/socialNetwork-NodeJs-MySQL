const { Comment } = require("../Comment");

const createComment = async (id, comment) => {
  const commentObj = Comment.build(comment);
  commentObj.PostId = id;
  await commentObj.save();
};

const deleteComment = async (commentId) => {
  Comment.destroy({ where: { _id: commentId } });
};

module.exports = { createComment, deleteComment };
