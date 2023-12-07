import express from "express";
import validateReq from "../middlewares/validate-req.js";
import {
  validateInt,
  validateEnum,
  validateMongoId,
} from "../utils/custom-validators.js";
import {
  addCourseContent,
  changePriority,
  deleteContent,
  fetchContentById,
  fetchCourseContent,
  updateCourseContent,
} from "../controllers/course-content.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";
import { courseContentType } from "../utils/custom-types.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";
import path from "path";
import url from "url";
import multer from "multer";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const storagePath = path.join(path.dirname(__dirname), "uploads");
const commonStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const commonUpload = multer({ storage: commonStorage });

const router = express.Router();

router.post(
  "/",
  isUser,
  commonUpload.single("file"),
  // imageUpload._handleError,
  [
    validateInt("priorityOrder"),
    validateEnum("type", courseContentType, true),
    validateMongoId("subTopicId", true),
    validateMongoId("tabId", true),
    validateMongoId("contentId"),
  ],
  validateReq,
  addCourseContent
);
router.put(
  "/",
  isUser,
  commonUpload.single("file"),
  [
    validateEnum("type", courseContentType, true),
    validateMongoId("contentId"),
    validateMongoId("courseContentId", true),
  ],
  validateReq,
  updateCourseContent
);

router.get(
  "/:tabId",
  validateMongoId("tabId", true),
  validateReq,
  fetchCourseContent
);
// router.get(
//   "/:subTopicId",
//   validateMongoId("subTopicId", true),
//   validateReq,
//   fetchCourseContent
// );

router.put("/priority", isUser, changePriority);

router.get(
  "/by-id/:contentId",
  validateMongoId("contentId", true),
  validateReq,
  fetchContentById
);
router.delete(
  "/:contentId",
  isUser,
  validateMongoId("contentId"),
  validateReq,
  deleteContent
);

export default router;
