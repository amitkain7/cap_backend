import multer from "multer";
import path from "path";
import fs from "fs";
import url from "url";
export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const imagesPath = path.join(path.dirname(__dirname), "uploads");

function imageFilter(req, file, cb) {
  const filetype = file.mimetype;
  const fileExtension = path.extname(file.originalname);
  const validFileExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    // ".svg"
  ];
  const validImageTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
    // "image/svg+xml",
  ];
  if (
    !validImageTypes.includes(filetype) ||
    !validFileExtensions.includes(fileExtension)
  ) {
    console.log("invalid image type");
    req.multerError =
      file.fieldname +
      " : " +
      "Only .png, .jpg, .jpeg, and.webp  format allowed!";
    cb(null, false);
  }
  cb(null, true);
}

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
});
imageUpload._delete = (filename) => {
  try {
    fs.unlinkSync(`${imagesPath}/${filename}`);
  } catch (err) {
    console.log(err.message);
  }
};
imageUpload._handleError = (req, res, next) => {
  if (!req?.multerError) return next();
  if (req?.file?.filename) {
    imageUpload._delete(req?.file?.filename);
  }
  if (req?.files?.length)
    req.files.forEach((file) => {
      imageUpload._delete(file?.filename);
    });
  return res.status(400).json({
    status: "error",
    message: req.multerError,
  });
};

// module.exports.imagesPath = imagesPath;
