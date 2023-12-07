import express from "express";
const router = express.Router();

import {
  createDomain,
  deleteDomain,
  fetchDomain,
  updateDomain,
  inactiveStatus,
  fetchDomainById,
} from "../controllers/domain.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { validateMongoId } from "../utils/custom-validators.js";
import validateReq from "../middlewares/validate-req.js";

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
router.post("/create", isUser, uploadStorage.single("file"), createDomain);
router.patch("/update/:id", isUser, uploadStorage.single("file"), updateDomain);
router.patch("/inactive/status/:id", isUser, inactiveStatus);

router.get(
  "/read/:domainId",
  isUser,
  validateMongoId("domainId", true),
  validateReq,
  fetchDomainById
);
router.get("/read", isUser, fetchDomain);
router.delete("/delete/:id", isUser, deleteDomain);
export default router;
