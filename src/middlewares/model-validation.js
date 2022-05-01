const Joi = require("joi");
const { BlogErrors } = require("../helpers/BlogErrors");

const validatePosts = (req, res, next) => {
  const PostSchema = Joi.object({
    post: Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required(),
    }).required(),
  });

  const { error } = PostSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((v) => v.message).join();
    throw new BlogErrors(msg, 400);
  }
  next();
};

module.exports = { validatePosts };
