const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    console.log(file);
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new BlogError("Iltimos faqat rasm yuklang", 405));
    }
    cb(undefined, true);
    console.log(file);
  },
});

module.exports = { upload };
