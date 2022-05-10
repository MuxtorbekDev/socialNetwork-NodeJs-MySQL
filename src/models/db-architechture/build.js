const { connect } = require("../../db/config");
const { Comment } = require("../Comment");
const { Photo } = require("../Photo");
const { Post } = require("../Post");
const { User } = require("../User");

const buildDB = async (forceOption = false) => {
  // Post for comments
  Comment.belongsTo(Post, { onDelete: "CASCADE" });
  Post.hasMany(Comment, { onDelete: "CASCADE" });

  // Post for Photos
  Photo.belongsTo(Post, { onDelete: "CASCADE" });
  Post.hasMany(Photo, { onDelete: "CASCADE" });

  // User for Posts
  User.hasMany(Post, { onDelete: "CASCADE" });
  Post.belongsTo(User, { onDelete: "CASCADE" });

  // User for Comments
  User.hasMany(Comment, { onDelete: "CASCADE" });
  Comment.belongsTo(User, { onDelete: "CASCADE" });

  connect(forceOption);
};

module.exports = { buildDB };
