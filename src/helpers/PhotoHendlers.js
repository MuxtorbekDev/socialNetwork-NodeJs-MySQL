const { Photo } = require("../models/Photo");
const sharp = require("sharp");
const { createPhoto, photoDestroy } = require("../models/DAL/PhotoRepository");

const createPhotos = async (files, post_id) => {
  if (files) {
    for (let file of files) {
      const description = file.originalname;
      const rawData = await sharp(file.buffer)
        .resize({
          width: 250,
          height: 250,
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .png()
        .toBuffer();
      const data = rawData.toString("base64");
      const PostId = post_id;
      const photo = { data, description, PostId };
      await createPhoto(photo);
    }
  }
};

const deletePhoto = async (photoIds = []) => {
  for (const id of photoIds) {
    photoDestroy(id);
  }
};

module.exports = { createPhotos, deletePhoto };
