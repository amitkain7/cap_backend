import express from "express";
const router = express.Router();

import {
  createStaff,
  getStaffData,
  getStaffDataById,
  updateStaff,
} from "../../controllers/SchoolAdmin/staff.controller.js";
import { isUser } from "../../middlewares/auth.middleware.js";
import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { imageUpload } from "../../middlewares/image-upload.middleware.js";

router.post(
  "/create",
  isUser,
  imageUpload.single("photograph"),
  imageUpload._handleError,
  createStaff
);
router.put(
  "/update/:id",
  isUser,
  imageUpload.single("photograph"),
  imageUpload._handleError,
  updateStaff
);

router.get(
  "/read", getStaffData
);

router.get(
  "/readById/:id", getStaffDataById
);
export default router;
