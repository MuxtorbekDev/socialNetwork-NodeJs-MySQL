const { Photo } = require("../Photo");

const createPhoto = async (photo) => {
  await Photo.create(photo);
};

const photoDestroy = async (photoId) => {
  await Photo.destroy({ where: { _id: photoId } });
};
module.exports = { createPhoto, photoDestroy };
