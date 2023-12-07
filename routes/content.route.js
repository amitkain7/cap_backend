import express from "express";
const router = express.Router();

import {
  createContent,
  deleteContent,
  fetchContent,
  fetchContentById,
  fetchContentByType,
  updateContent,
} from "../controllers/content.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  validateEnumWithCase,
  validateMongoId,
} from "../utils/custom-validators.js";
import validateReq from "../middlewares/validate-req.js";
import { contentTypes } from "../utils/custom-types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = path.join(path.dirname(__dirname), "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadStorage = multer({ storage: storage });
router.post(
  "/create",
  isUser,
  uploadStorage.fields([
    { name: "document", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createContent
);
router.patch(
  "/update/:id",
  isUser,
  uploadStorage.fields([
    { name: "document", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateContent
);

router.get("/read", isUser, fetchContent);
// router.get('/read/single/:id',isUser,fetchContentById)
router.delete("/delete/:id", isUser, deleteContent);

router.get(
  "/read/single/:id",
  validateMongoId("id", true),
  validateReq,
  fetchContentById
);

router.get(
  "/read/:contentType",
  validateEnumWithCase("contentType", contentTypes, true),
  validateReq,
  fetchContentByType
);

export default router;
