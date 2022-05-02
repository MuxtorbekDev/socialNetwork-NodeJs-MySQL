const { connect } = require("../../db/config");
const { Post } = require("../../models/Post");
const { Comment } = require("../Comment");

const buildDB = async (forceOption = false) => {
  Comment.belongsTo(Post, { onDelete: "cascade" });
  Post.hasMany(Comment, { onDelete: "cascade" });

  connect(forceOption);
};

module.exports = { buildDB };
