const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, `${__dirname}/../uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;