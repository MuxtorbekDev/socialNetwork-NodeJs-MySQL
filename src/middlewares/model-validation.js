const Joi = require("joi");
const { BlogError } = require("../helpers/BlogErrors");

const validatePosts = (req, res, next) => {
  const PostSchema = Joi.object({
    post: Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required(),
    }).required(),
    deletePhotos: Joi.array(),
  });

  const { error } = PostSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((v) => v.message).join();
    console.log(error);
    throw new BlogError(msg, 400);
  }
  next();
};

module.exports = { validatePosts };
