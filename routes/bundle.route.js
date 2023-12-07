import express from "express";
const router = express.Router();

import {
  addBundle,
  deleteBundle,
  updatedBundle,
  getAllBundle,
  inactiveStatus,
  cloneBundle,
} from "../controllers/bundle.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

import { imageUpload } from "../middlewares/image-upload.middleware.js";

router.post(
  "/create",
  isUser,
  imageUpload.single("thumbnail"),
  imageUpload._handleError,
  addBundle
);
router.post("/clone", isUser, cloneBundle);
router.patch(
  "/update/:id",
  isUser,
  imageUpload.single("thumbnail"),
  imageUpload._handleError,
  updatedBundle
);
router.get("/read", getAllBundle);
router.patch("/inactive/status/:id", isUser, inactiveStatus);
router.delete("/delete/:id", isUser, deleteBundle);
export default router;
