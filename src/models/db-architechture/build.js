const { connect } = require("../../db/config");
const { Comment } = require("../Comment");
const { Post } = require("../Post");

const buildDB = async (forceOption = false) => {
  Comment.belongsTo(Post, { onDelete: "CASCADE" });
  Post.hasMany(Comment, { onDelete: "CASCADE" });

  connect(forceOption);
};

module.exports = { buildDB };
