import { validationResult } from "express-validator";
import { imageUpload } from "../middlewares/image-upload.middleware.js";

export default function validateReq(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = {};
  result.errors.forEach((err) => {
    errors[err.path] = err.msg;
  });
  res.status(400).json({
    status: "error",
    message: "validation error",
    errors,
  });
}

validateReq.withImage = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  if (req?.file?.filename) imageUpload._delete(req?.file?.filename);
  if (req?.files) {
    req?.files.forEach((file) => {
      if (file?.filename) imageUpload._delete(file.filename);
    });
  }
  const errors = {};
  ``;
  result.errors.forEach((err) => {
    errors[err.path] = err.msg;
  });
  res.status(400).json({
    status: "error",
    message: "validation error",
    errors,
  });
};
