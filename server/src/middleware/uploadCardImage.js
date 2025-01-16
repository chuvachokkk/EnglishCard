const multer = require('multer');
const path = require('path');

const cardStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/cards/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Можно загружать только изображения!'), false);
  }
};

// Настройка Multer
const uploadCardImage = multer({
  storage: cardStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = uploadCardImage;
