const { connect } = require("../../db/config");
const { Post } = require("../../models/Post");

const buildDB = async (forceOption = false) => {
  connect(forceOption);
};

module.exports = { buildDB };
