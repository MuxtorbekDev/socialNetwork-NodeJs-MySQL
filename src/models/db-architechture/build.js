const { connect } = require("../../db/config");
const { Comment } = require("../Comment");
const { Photo } = require("../Photo");
const { Post } = require("../Post");

const buildDB = async (forceOption = false) => {
  // Post for comments
  Comment.belongsTo(Post, { onDelete: "CASCADE" });
  Post.hasMany(Comment, { onDelete: "CASCADE" });

  // Post for Photos
  Photo.belongsTo(Post, { onDelete: "CASCADE" });
  Post.hasMany(Photo, { onDelete: "CASCADE" });

  connect(forceOption);
};

module.exports = { buildDB };
